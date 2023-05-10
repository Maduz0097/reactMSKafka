const express = require('express');
const cors = require('cors');
const app = express();
const { Kafka } = require('kafkajs');
const expressWs = require('express-ws')(app);
app.use(cors());


const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'my-group' });

// Connect to Kafka producer and consumer
(async () => {
    await producer.connect();
    await consumer.connect();
    await consumer.subscribe({ topic: 'my-topic' });

    consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            expressWs.getWss().clients.forEach((client) => {
                client.send(message.value.toString());
            });
        },
    });
})();

// Set up WebSocket connection
app.ws('/socket', (ws, req) => {
    ws.on('message', async (message) => {
        console.log(1, message);

        // Produce a message to Kafka
        await producer.send({
            topic: 'my-topic',
            messages: [{ value: message }],
        });
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
