import React, {useEffect, useState} from "react";
import {obj8} from "./testObj"
import {obj2} from "./testObj"
import {obj9} from "./testObj"
import {obj6} from "./testObj"
import {obj} from "./testObj"
import {obj25} from "./testObj"
export const App = () => {
  const [sendTime, setSendTime] = useState(0);
  const [input, setInput] = useState('');
  const time = performance.timeOrigin
    const ws = new WebSocket('ws://localhost:3000/socket');
    const stringifiedObj8 = JSON.stringify(obj8)
    const stringifiedObj6 = JSON.stringify(obj6)
    const stringifiedObj9 = JSON.stringify(obj9)
    const stringifiedObj2 = JSON.stringify(obj2)
    const stringifiedObj = JSON.stringify(obj)
  const stringifiedObj25 = JSON.stringify(obj25)



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

const sendData = (object) => {
    const ws = new WebSocket('ws://localhost:3000/socket');
  ws.onopen = (event)=>{
    console.log(2,performance.now())
    setSendTime(performance.now())
    ws.send(object)
  }
}
  return(
      <>
        <div className={"data-input"}>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} />
        </div>
          <p>Origin time: {time}</p>
          <button onClick={() => sendData(stringifiedObj2)} >Send Data 24.12KB </button>
        <button onClick={() => sendData(stringifiedObj)}>Send Data 70.98KB</button>
          <button onClick={() => sendData(stringifiedObj6)} id="one">Send Data 500KB</button>
          <button onClick={() => sendData(stringifiedObj9)}>Send Data 3.35MB</button>
          <button onClick={() => sendData(stringifiedObj8)}>Send Data 4.42MB</button>
        <button onClick={() => sendData(stringifiedObj25)}>Send Data 5MB</button>

        <p name={"send"}>{sendTime}</p>
      </>
  )

};

export default App;