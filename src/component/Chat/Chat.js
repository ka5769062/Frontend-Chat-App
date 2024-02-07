import React, { useEffect, useState } from "react";
import { user } from "../Join/Join";
import socketIo from "socket.io-client";
import "./Chat.css";
import send from "../../images/send.png";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png";

// let socket;

const Chat = () => {

    const ENDPOINT = "https://msg-app.fly.dev/";
    const socket  = socketIo(ENDPOINT, { transports: ["websocket"] });
    

    const [ id, setid] = useState("")
    const [messages, setMessages] = useState([])
   const sendMsg = () =>{
   
   const message = document.getElementById('chatInput').value;
   console.log(message);
   socket.emit('message',{message,id});
   document.getElementById('chatInput').value = "";
  
}


  useEffect(() => {

    socket.on("connect", () => {
    //   alert("connected");
      setid(socket.id)
    });
    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setMessages([...messages,data]);
      console.log(data.user, data.message);
    });

    socket.on("userJoined", (data) => {
      setMessages([...messages,data]);

      console.log(data.user, data.message);
    });


    socket.on('leave',(data)=>{
      setMessages([...messages,data]);

        console.log(data.user,data.message);
    })

    return () => {
      socket.off('disconnect')
    };
  }, []);

 console.log(messages);
  useEffect(() => {
  
   socket.on('sendMessage',(data)=>{
    setMessages([...messages,data]);
    console.log(data.user, data.message, data.id);

   })

    return () => {
      socket.off()
    }
  }, [messages])
  
  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>C CHAT</h2>
         
          <a href="/"> <img src={closeIcon} alt="close"/> </a>
        
        </div>
        <ReactScrollToBottom className="chatBox">
            
       {messages.map((item,i)=> <Message message={item.message} user={item.id===id?'':item.user} classs={item.id===id?'right':'left'}/>)}
            
        </ReactScrollToBottom>
        <div className="inputBox">
          <input onKeyDown={(e)=>e.key === 'Enter'? sendMsg() : null    }   type="text" id="chatInput" />
          <button onClick={sendMsg} className="sendBtn">
            <img src={send} alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
