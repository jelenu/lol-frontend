import React, { useState, useEffect } from "react";
import TokenVerifyRefreshHook from "../../../hooks/TokenVerifyRefreshHook";
import { useUserContext } from "../../../context/UserContext";
import { useTabContext } from "../../../context/TabContext";

export const ListFriends = ({ refreshKey }) => {
  // Accessing token verification function
  const { verifyToken } = TokenVerifyRefreshHook();

  // State to store the list of friends
  const [friends, setFriends] = useState([]);

  const { setChatUsername } = useUserContext();
  const { changeActiveTab } = useTabContext();


  // Function to fetch the list of friends from the API
  const fetchGetFriendRequests = async () => {
    const makeApiCall = async (token) => {
      const response = await fetch(
        `http://localhost:8000/api/users/friendsList/`,
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
        // Update the state with the list of friends
        setFriends(data);
      } else if (response.status === 401) {
        // If unauthorized, try refreshing token and retrying the API call
        await verifyToken();
        token = localStorage.getItem("token");
        response = await makeApiCall(token);
        data = await response.json();
        if (response.ok) {
          // Update the state with the list of friends
          setFriends(data);
        } else {
          console.log(data.error || "Unknown error occurred");
        }
      } else {
        console.log(data.error || "Unknown error occurred");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Fetch the list of friends when the component mounts or refresh key changes
  useEffect(() => {
    fetchGetFriendRequests();
    // eslint-disable-next-line
  }, [refreshKey]);

  return (
    <div className="font-bold ">
      <h2>Friends</h2>
      {friends.length > 0 ? (
        // Render the list of friends if there are any
        <div className="font-normal pl-4">
          {/* Map through the list of friends and display each one */}
          {friends.map((friend, index) => (
            <button className="block" key={index}  onClick={() => {
              setChatUsername(friend);
              changeActiveTab("users");
            }}>{friend}</button>
          ))}
        </div>
      ) : (
        // Render a message if there are no friends
        <p className="font-normal pl-4">No friends</p>
      )}
    </div>
  );
};
