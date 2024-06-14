import React from "react";
import { Chat } from "./chat/Chat";
import { ListFriends } from "./friends/ListFriends";

export const Users = () => {
  return (
    <div className="flex justify-between">
      <div className="w-1/5 max-xl:w-1/12 max-md:hidden ">
      <ListFriends/>
      </div>
      <div className="w-2/5 max-xl:w-8/12 max-md:w-full mx-4">
        <Chat/> 
      </div>
      <div className="w-1/5 max-xl:w-1/12 max-md:hidden "></div>
    </div>
  );
};
