const express = require('express');
const cors = require('cors');
const app = express();
const { Kafka, CompressionTypes, CompressionCodecs } = require('kafkajs');
const SnappyCodec = require('kafkajs-snappy');
const expressWs = require('express-ws')(app);
const WebSocket = require('ws');
const zlib = require('zlib');
const { gzip } = require('pako')
const { decode } = require('msgpack-lite');
app.use(cors());
CompressionCodecs[CompressionTypes.Snappy] = SnappyCodec;

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['20.244.24.1:9092'],
    producer: {
        maxMessageBytes: 10 * 1024 * 1024, // Set max message size to 10MB
        allowAutoTopicCreation: true, // Enable auto topic creation if required
    },
    consumer: {
        maxBytesPerPartition: 10 * 1024 * 1024, // Set max bytes per partition to 10MB
    },
});

const producer = kafka.producer({
    batchSize: 100000, // Adjust batch size as needed for better performance
    compressionThreshold: 1, // Set a low compression threshold to compress all messages
});

const consumer = kafka.consumer({
    groupId: 'my-group',
    maxBytes: 10 * 1024 * 1024, // Set max bytes per fetch to 10MB
});

// Connect to Kafka producer and consumer
(async () => {
    await producer.connect();
    await consumer.connect();
    await consumer.subscribe({ topic: 'my-topic' });

    consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            // Broadcast the message to connected WebSocket clients

            // console.log(message.value.toString())
let decoded = decode(message.value)

            let jsonData = JSON.stringify(decoded)
            const decompressedData = gzip(jsonData);
            console.log(decompressedData);
            // console.log(decode(compressed.toString()))
            expressWs.getWss().clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(decompressedData);
                }
            });
        },
    });
})();

// Set up WebSocket connection
app.ws('/socket', (ws, req) => {
    ws.on('message', async (message) => {
        // Determine compression type based on message size
        const compressionType =
            message.length > 1024 * 1024 ? CompressionTypes.GZIP : CompressionTypes.Snappy;

        // Compress the message
        let compressedMessage = message;
        if (compressionType === CompressionTypes.GZIP) {
            compressedMessage = await new Promise((resolve, reject) => {
                zlib.gzip(message, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
        }

        // Produce a message to Kafka
        await producer.send({
            topic: 'my-topic',
            compression: compressionType,
            messages: [{ value: compressedMessage }],
        });
    });

    // Handle WebSocket close event
    ws.on('close', () => {
        // Clean up resources or perform any necessary operations
    });
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
