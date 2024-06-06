import React, { useState } from "react";
import TokenVerifyRefreshHook from "../../../hooks/TokenVerifyRefreshHook";

export const AddNewFriend = ({ refreshFriendRequests }) => {
  // State to store the username of the friend to add
  const [receiverUsername, setReceiverUsername] = useState("");
  // Accessing token verification function
  const { verifyToken } = TokenVerifyRefreshHook();
  // State to store the status of the friend request
  const [friendRequestStatus, setFriendRequestStatus] = useState("");

  // Function to send a friend request
  const fetchPostFriendRequest = async (receiverUsername) => {
    // Function to make API call
    const makeApiCall = async (token) => {
      const response = await fetch(
        `http://localhost:8000/api/users/friendRequest/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
          body: JSON.stringify({ receiver_username: receiverUsername }),
        }
      );
      return response;
    };

    try {
      let token = localStorage.getItem("token");
      let response = await makeApiCall(token);
      let data = await response.json();

      if (response.ok) {
        // Trigger a refresh of friend requests list
        refreshFriendRequests();
        // Set friend request status
        setFriendRequestStatus("Friend Request Sent");
      } else if (response.status === 401) {
        // If unauthorized, try refreshing token and retrying the API call
        await verifyToken();
        token = localStorage.getItem("token");
        response = await makeApiCall(token);
        data = await response.json();
        if (response.ok) {
          // Trigger a refresh of friend requests list
          refreshFriendRequests();
          // Set friend request status
          setFriendRequestStatus("Friend Request Sent");
        } else {
          setFriendRequestStatus(data.error || "Unknown error occurred");
        }
      } else {
        setFriendRequestStatus(data.error || "Unknown error occurred");
      }
    } catch (error) {
      setFriendRequestStatus(error.message);
    }
  };

  // Function to handle sending a friend request
  const handleSendFriendRequest = () => {
    fetchPostFriendRequest(receiverUsername);
    // Clear the input field after sending the request
    setReceiverUsername("");
  };

  return (
    <div>
      <div className="my-4 flex items-center">
        {/* Input field to enter the username */}
        <input
          type="text"
          value={receiverUsername}
          onChange={(e) => setReceiverUsername(e.target.value)}
          placeholder="Enter username"
          className="p-2 w-full text-black rounded-s-lg focus:outline-none text-sm"
        />
        {/* Button to send the friend request */}
        <button
          onClick={handleSendFriendRequest}
          className="p-2 bg-gray-500 rounded-e-lg text-sm text-white hover:bg-gray-600 transition duration-200"
        >
          Send
        </button>
      </div>

      {/* Display friend request status */}
      {friendRequestStatus && (
        <div className="my-2 text-sm text-white">{friendRequestStatus}</div>
      )}
    </div>
  );
};
