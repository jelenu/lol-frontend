import React, { useState, useEffect } from "react";

function Chat() {

  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);

  const chatSocket = new WebSocket("ws://localhost:8000/ws/chat/roomName/");


  function updateMessage(e) {
    setMessage(e.target.value);
  }

  function send() {
    if (chatSocket.readyState === WebSocket.OPEN) {
      chatSocket.send(
        JSON.stringify({
          type: "message",
          message: message,
        })
      );
      setMessage("");
    } else {
      console.log("WebSocket connection is not yet open.");
    }
  }

  useEffect(() => {
    chatSocket.onopen = () => {
      console.log("WebSocket connected");
    };
    chatSocket.onclose = () => {
      console.log("WebSocket disconnected");
    };
    chatSocket.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      if (dataFromServer && dataFromServer.message) {
        setConversation(prevConversation => [...prevConversation, dataFromServer.message]);
      }
    };
  }, []);

  return (
    <div>
      
          <div id="body" className=" w-80 h-96 bg-slate-200">
            {conversation.map((message, index) => (
              <div key={index}>{message}</div>
            ))}
          </div>
          <label>Message</label>
          <input type="text" value={message} onChange={(e) => updateMessage(e)} />
          <button onClick={send}>Send</button>
    </div>
  );
}

export default Chat;
