import React, { useState } from "react";
import { AddNewFriend } from "./AddNewFriend";
import { FriendRequests } from "./FriendRequests";
import { ListFriends } from "./ListFriends";

export const Friends = () => {
  // State to manage the visibility of the "Add New Friend" section
  const [showAddFriend, setShowAddFriend] = useState(false);
  // State to manage the visibility of the "Friend Requests" section
  const [showFriendRequests, setShowFriendRequests] = useState(false);
  // State to trigger a refresh of the friend requests list
  const [refreshKey, setRefreshKey] = useState(0);

  // Function to refresh the friend requests by updating the refresh key
  const refreshFriendRequests = () => {
    setRefreshKey((refreshKey) => refreshKey + 1);
  };

  // Function to toggle the visibility of the "Add New Friend" section
  const handleAddFriendClick = () => {
    setShowAddFriend(!showAddFriend);
  };

  // Function to toggle the visibility of the "Friend Requests" section
  const handleShowFriendRequestClick = () => {
    setShowFriendRequests(!showFriendRequests);
  };

  return (
    <div className="pl-4">
      <div>
        <ListFriends refreshKey={refreshKey}/>
      </div>
      {/* Button to toggle the "Add New Friend" section */}
      <button
        className="w-full my-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-200"
        onClick={handleAddFriendClick}
      >
        Add New Friend
      </button>
      {/* Render the "Add New Friend" section if showAddFriend is true */}
      {showAddFriend && <AddNewFriend refreshFriendRequests={refreshFriendRequests} />}
      {/* Button to toggle the "Friend Requests" section */}
      <button
        className="w-full my-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-200"
        onClick={handleShowFriendRequestClick}
      >
        Friend Requests
      </button>
      {/* Render the "Friend Requests" section if showFriendRequests is true */}
      {showFriendRequests && <FriendRequests refreshKey={refreshKey} refreshFriendRequests={refreshFriendRequests} />}
    </div>
  );
};
