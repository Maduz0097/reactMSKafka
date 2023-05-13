// host-app/src/App.js
import React, { useState, useEffect } from 'react';
import "./App.css"
const RemoteApp = React.lazy(() => import("Remote1/App"));
const RemoteApp2 = React.lazy(() => import("Remote2/App"));

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
const [receivedTime,setReceivedTime] = useState([])
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:3000/socket');
// const data = "text"
// ws.onopen = (event)=>{
//     ws.send(JSON.stringify(data))
//         }
        ws.onmessage = (e) => {
            console.log(JSON.parse(e?.data))
            const newMessage = JSON.parse(e?.data);
            console.log(1,performance.now())
            let performanceTime = performance.now()
            setReceivedTime((prevTime)=> [...prevTime,performanceTime])
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
        <div>
            {/*<div>*/}
            {/*    <h1>Kafka WebSocket Example</h1>*/}
            {/*    <ul>*/}
            {/*        {messages.map((message, index) => (*/}
            {/*            <li key={index}>{message}</li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*</div>*/}
            {/*<h1>This is the Host!</h1>*/}
            {/*<h2>Remote App:</h2>*/}
            {/*<RemoteWrapper>*/}
            {/*    <RemoteApp />*/}
            {/*</RemoteWrapper>*/}
            {/*<h2>Remote Button:</h2>*/}
            {/*<RemoteWrapper>*/}
            {/*    <RemoteButton />*/}
            {/*</RemoteWrapper>*/}
            {/*<br />*/}
            <a href="http://localhost:4000">Link to Remote App</a>

            <div className={"main-container"}>
                <h2>Main Container</h2>
                <div className={"data-view"}>
                    <h3>Data View</h3>
                    <div className={"data-list"}>
                        <ul>
                            {
                                messages?.map((message,index)=>(
<li>
    {message} | {receivedTime[index]}
</li>
                                ))
                            }
                        </ul>

                    </div>
                </div>
                <div className="grid-container">
                    <div className="grid-item">
                        <h3>Micro Frontend 1</h3>
                        <div>
                            <RemoteApp />
                        </div>
                    </div>
                    <div className="grid-item">
                        <h3>Micro Frontend 2</h3>
                        <div>
                        <RemoteApp2/>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}


export default App;