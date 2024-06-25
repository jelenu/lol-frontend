import React, { useState, useEffect, useRef } from "react";
import { useUserContext } from "../../../context/UserContext";
import { IoSend } from "react-icons/io5";

export const Chat = () => {
  // Extracting necessary data from the user context
  const { userData, chatUsername } = useUserContext();
  const username1 = userData ? userData.username : "";
  const username2 = chatUsername ? chatUsername : "";

  // State variables for message input, conversation history, WebSocket connection, and ref for scrolling
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [chatSocket, setChatSocket] = useState(null);
  const messagesEndRef = useRef(null);


  // Effect hook to establish WebSocket connection and handle messages
  useEffect(() => {
    // Retrieve token from local storage
    let token = localStorage.getItem("token");
    // Generate room name based on the sorted usernames
    const newRoomName = `${[username1, username2].sort().join("_")}`;
    // Initialize WebSocket connection
    const ws = new WebSocket(`wss://127.0.0.1:8000/ws/chat/${newRoomName}/`);
    setChatSocket(ws); // Update WebSocket state

    // WebSocket event listeners
    ws.onopen = () => {
      console.log("WebSocket connected");
      // Authenticate user with token
      ws.send(JSON.stringify({ type: "auth", token: token }));
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    ws.onmessage = (message) => {
      // Parse incoming message from the server
      const dataFromServer = JSON.parse(message.data);
      console.log(dataFromServer);
      // Update conversation history based on server response
      if (dataFromServer && dataFromServer.history) {
        setConversation(dataFromServer.history);
      } else if (dataFromServer && dataFromServer.message) {
        setConversation((prevConversation) => [
          ...prevConversation,
          {
            message: dataFromServer.message,
            sender: dataFromServer.sender,
            timestamp: dataFromServer.timestamp,
          },
        ]);
      }
    };

    // Clean-up function to close WebSocket connection
    return () => {
      ws.close();
    };
  }, [username1, username2]);

  // Effect hook to scroll to the bottom when conversation updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  // Function to update message state based on input change
  const updateMessage = (e) => {
    setMessage(e.target.value);
  };

  // Function to send message via WebSocket
  const send = () => {
    if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
      chatSocket.send(
        JSON.stringify({
          type: "message",
          message: message,
        })
      );
      setMessage(""); // Clear message input after sending
    } else {
      console.log("WebSocket connection is not yet open.");
    }
  };

  // Function to format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toISOString().split("T")[0];
  };

  // Function to format time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toTimeString().split(" ")[0].slice(0, 5);
  };

  // Function to determine if date should be displayed
  const shouldDisplayDate = (currentDate, previousDate) => {
    return !previousDate || currentDate !== previousDate;
  };

  // JSX for rendering chat interface
  return (
    <div className="w-full mt-4">
      <div className="w-full bg-white overflow-auto rounded-xl" style={{ height: "80vh" }}>
        {/* Mapping through conversation history to render messages */}
        {conversation.map((msg, index) => {
          const currentDate = formatDate(msg.timestamp);
          const currentTime = formatTime(msg.timestamp);

          const previousDate =
            index > 0 ? formatDate(conversation[index - 1].timestamp) : null;

          return (
            <div key={index}>
              {/* Display date if it's a new day */}
              {shouldDisplayDate(currentDate, previousDate) && (
                <div className="text-center my-2 text-gray-500">
                  {currentDate}
                </div>
              )}
              {/* Render message and its sender with proper styling */}
              <div
                className={`flex flex-col ${
                  msg.sender === username1 ? "items-end" : "items-start"
                } my-2 mx-2`}
              >
                <div className="bg-gray-200 px-3 py-2 rounded w-max">
                  {msg.message}
                </div>
                <div className="text-xs text-gray-500 mt-1">{currentTime}</div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} /> {/* Reference for scrolling to bottom */}
      </div>
      {/* Input field and send button for sending messages */}
      <div className="flex items-center w-full p-2 bg-white rounded-3xl mt-2">
        <input type="text" placeholder="Send Message..." value={message} onChange={updateMessage} className="w-full outline-none" />
        <button onClick={send}><IoSend className="text-3xl" /></button>
      </div>
    </div>
  );
};
