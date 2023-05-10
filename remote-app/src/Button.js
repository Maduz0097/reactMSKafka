import React, {useEffect, useState} from "react";

export const Button = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    useEffect(()=>{
        const ws = new WebSocket('ws://localhost:3000/socket');
        const data = {data:"text"}


        ws.onopen = (event)=>{
            console.log(2,performance.now())
            ws.send(JSON.stringify(input))
        }
        // ws.addEventListener('open', () => {
        //     console.log("tets")
        //     ws.send(JSON.stringify(data));
        // })
ws.onmessage = (e) => {
            console.log(JSON.parse(e.data))
    const newMessage = JSON.parse(e.data);

    setMessages((prevMessages) => [...prevMessages, newMessage]);
}

        ws.addEventListener('close', () => {
            console.log('WebSocket connection is closed');
        });
        return () => {
            ws.close();
        };
    },[input])

    // const sendMessage = () => {
    //     socket.emit('send-message', input);
    //     setInput('');
    // };
    return(
        <>
            {messages?.map((message) => (
                <p>{message?.content}</p>
            ))}
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            {/*<button onClick={sendMessage}>Send</button>*/}
            <button onClick={() => console.log("click")}>Hello!</button>
        </>
        )

};

export default Button;


//TODO add gpl and relay