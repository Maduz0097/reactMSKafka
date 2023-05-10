// host-app/src/App.js
import React, { useState, useEffect } from 'react';




const RemoteApp = React.lazy(() => import("Remote/App"));
const RemoteButton = React.lazy(() => import("Remote/Button"));

const RemoteWrapper = ({ children }) => (
    <div
        style={{
          border: "1px solid red",
          background: "white",
        }}
    >
      {children}
    </div>
);

export const App = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:3000/socket');
const data = "text"
ws.onopen = (event)=>{

    ws.send(JSON.stringify(data))
        }
        // ws.addEventListener('open', () => {
        //     console.log("tets")
        //     ws.send(JSON.stringify(data));
        // })
        ws.onmessage = (e) => {
            console.log(JSON.parse(e.data))
            const newMessage = JSON.parse(e.data);
            console.log(1,performance.now())
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        }


        ws.addEventListener('close', () => {
            console.log('WebSocket connection is closed');
        });
        return () => {
            ws.close();
        };
    }, []);
    return(
        <div style={{ background: "rgba(43, 192, 219, 0.3)" }}>
            <div>
                <h1>Kafka WebSocket Example</h1>
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
            </div>
            <h1>This is the Host!</h1>
            <h2>Remote App:</h2>
            <RemoteWrapper>
                <RemoteApp />
            </RemoteWrapper>
            <h2>Remote Button:</h2>
            <RemoteWrapper>
                <RemoteButton />
            </RemoteWrapper>
            <br />
            <a href="http://localhost:4000">Link to Remote App</a>
        </div>
    )
}


export default App;