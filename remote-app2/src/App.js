import React, {useEffect, useState} from "react";

export const App = () => {
  const [sendTime, setSendTime] = useState(0);
  const [input, setInput] = useState('');
  // useEffect(()=>{
  //   // const ws = new WebSocket('ws://localhost:3000/socket');
  //   // // const data = {data:"text"}
  //   //
  //   //
  //   // ws.onopen = (event)=>{
  //   //   console.log(2,performance.now())
  //   //   setSendTime(performance.now())
  //   //   ws.send(JSON.stringify(input))
  //   // }
  //
  //
  //
  //   ws.addEventListener('close', () => {
  //     console.log('WebSocket connection is closed');
  //   });
  //   return () => {
  //     ws.close();
  //   };
  // },[input])

  const sendData = () => {
    const ws = new WebSocket('ws://localhost:3000/socket');
    ws.onopen = (event)=>{
      console.log(2,performance.now())
      setSendTime(performance.now())
      ws.send(JSON.stringify(input))
    }
  }
  return(
      <>
        <div className={"data-input"}>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} />
        </div>
        <button onClick={() => sendData()}>Send Data</button>
        <p>Data Send Time : {sendTime}</p>
      </>
  )

};

export default App;