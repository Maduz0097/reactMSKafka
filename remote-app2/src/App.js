import React, {useEffect, useState} from "react";
import {obj2} from "./testObj";
import {obj9} from "./testObj"
export const App = () => {
  const [sendTime, setSendTime] = useState(0);
  const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [receivedTime,setReceivedTime] = useState(0)
    const time = performance.timeOrigin
    useEffect(() => {
        const ws = new WebSocket('ws://192.168.1.2:3000/socket');
// const data = "text"
// ws.onopen = (event)=>{
//     ws.send(JSON.stringify(data))
//         }

        ws.onmessage = (e) => {
            let performanceTime = performance.now()
            setReceivedTime(performanceTime)
            console.log("ok")
            console.log(JSON.parse(e?.data))
            const newMessage = JSON.parse(e?.data);
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
      const ws = new WebSocket('ws://192.168.1.2:3000/socket');
    ws.onopen = (event)=>{
      console.log(2,performance.now())
      setSendTime(performance.now())
      ws.send(JSON.stringify(obj9))
    }
  }
  return(
      <>
        <div className={"data-input"}>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} />
        </div>
        <button onClick={() => sendData()} id={"dataSend"}>Send Data</button>
        <p id={"dataSendTime"}>{sendTime}</p>
          <div className={"data-view"}>

              <h3>Data View</h3>
              <p>time origin {time}</p>
              <div className={"data-list"}>

                  <ul>
                          <p id={"dataReceivedTime"} name={"receive"}>{receivedTime}</p>
                      {/*{*/}
                      {/*    receivedTime?.map((time)=>(*/}
                      {/*        <li>*/}
                      {/*            {time}*/}
                      {/*        </li>*/}
                      {/*    ))*/}
                      {/*}*/}
                      {/*{*/}
                      {/*    messages?.map((message,index)=>(*/}
                      {/*        <li>*/}
                      {/*            {message} | {receivedTime[index]}*/}
                      {/*        </li>*/}
                      {/*    ))*/}
                      {/*}*/}
                  </ul>

              </div>
          </div>
      </>
  )

};

export default App;