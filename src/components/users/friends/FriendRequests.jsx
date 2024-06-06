import React, { useState, useEffect } from "react";
import TokenVerifyRefreshHook from "../../../hooks/TokenVerifyRefreshHook";
import { HiOutlineCheck } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

export const FriendRequests = ({ refreshKey, refreshFriendRequests }) => {
  // Accessing token verification function
  const { verifyToken } = TokenVerifyRefreshHook();
  // State to store friend requests
  const [friendRequests, setFriendRequests] = useState({
    sent_requests: [],
    received_requests: [],
  });
  // State to store status of friend requests
  const [friendRequestsStatus, setFriendRequestsStatus] = useState("");

  // Function to fetch friend requests from the API
  const fetchGetFriendRequests = async () => {
    // Function to make API call
    const makeApiCall = async (token) => {
      const response = await fetch(
        `http://localhost:8000/api/users/friendRequestList/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        }
      );
      return response;
    };

    try {
      let token = localStorage.getItem("token");
      let response = await makeApiCall(token);
      let data = await response.json();

      if (response.ok) {
        // Update friend requests state
        setFriendRequests(data);
        // Trigger a refresh of friend requests list
      } else if (response.status === 401) {
        // If unauthorized, try refreshing token and retrying the API call
        await verifyToken();
        token = localStorage.getItem("token");
        response = await makeApiCall(token);
        data = await response.json();
        if (response.ok) {
          // Update friend requests state
          setFriendRequests(data);
          // Trigger a refresh of friend requests list
        } else {
          setFriendRequestsStatus(data.error || "Unknown error occurred");
        }
      } else {
        setFriendRequestsStatus(data.error || "Unknown error occurred");
      }
    } catch (error) {
      setFriendRequestsStatus(error.message);
    }
  };

  // Fetch friend requests when component mounts or refresh key changes
  useEffect(() => {
    fetchGetFriendRequests();
    // eslint-disable-next-line
  }, [refreshKey]);

  // Function to accept a friend request
  const fetchAcceptFriendRequest = async (senderUsername) => {
    // Function to make API call
    const makeApiCall = async (token) => {
      const response = await fetch(
        `http://localhost:8000/api/users/friendRequestRecived/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
          body: JSON.stringify({ sender_username: senderUsername }),
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
      } else if (response.status === 401) {
        // If unauthorized, try refreshing token and retrying the API call
        await verifyToken();
        token = localStorage.getItem("token");
        response = await makeApiCall(token);
        data = await response.json();
        if (response.ok) {
          // Trigger a refresh of friend requests list
          refreshFriendRequests();
        } else {
          setFriendRequestsStatus(data.error || "Unknown error occurred");
        }
      } else {
        setFriendRequestsStatus(data.error || "Unknown error occurred");
      }
    } catch (error) {
      setFriendRequestsStatus(error.message);
    }
  };

  // Function to deny a friend request
  const fetchDenyFriendRequest = async (senderUsername) => {
    // Function to make API call
    const makeApiCall = async (token) => {
      const response = await fetch(
        `http://localhost:8000/api/users/friendRequestRecived/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
          body: JSON.stringify({ sender_username: senderUsername }),
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
      } else if (response.status === 401) {
        // If unauthorized, try refreshing token and retrying the API call
        await verifyToken();
        token = localStorage.getItem("token");
        response = await makeApiCall(token);
        data = await response.json();
        if (response.ok) {
          // Trigger a refresh of friend requests list
          refreshFriendRequests();
        } else {
          setFriendRequestsStatus(data.error || "Unknown error occurred");
        }
      } else {
        setFriendRequestsStatus(data.error || "Unknown error occurred");
      }
    } catch (error) {
      setFriendRequestsStatus(error.message);
    }
  };

  const sentRequests = friendRequests.sent_requests || [];
  const receivedRequests = friendRequests.received_requests || [];

  return (
    <div className=" ">
      <div className="my-4">
        <div className="font-bold">To be Accepted</div>
        {sentRequests.length > 0 ? (
          <ul>
            {sentRequests.map((request, index) => (
              <li key={index}>{request.receiver}</li>
            ))}
          </ul>
        ) : (
          <div>No sent friend requests.</div>
        )}
      </div>
      <div className="my-4">
        <div className="font-bold">Received Requests</div>
        {receivedRequests.length > 0 ? (
          <ul>
            {receivedRequests.map((request, index) => (
              <li className="flex items-center" key={index}>
                {request.sender}
                {/* Button to accept friend request */}
                <button
                  className="bg-green-500 m-1 rounded"
                  onClick={() => fetchAcceptFriendRequest(request.sender)}
                >
                  <HiOutlineCheck className="text-black" />
                </button>
                {/* Button to deny friend request */}
                <button
                  className="bg-red-500 m-1 rounded"
                  onClick={() => fetchDenyFriendRequest(request.sender)}
                >
                  <IoMdClose />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div>No received friend requests.</div>
        )}
      </div>
      {/* Display friend requests status */}
      {friendRequestsStatus && (
        <div className="text-red-500 mt-4">{friendRequestsStatus}</div>
      )}
    </div>
  );
};
