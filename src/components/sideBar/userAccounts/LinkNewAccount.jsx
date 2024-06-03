import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

export const LinkNewAccount = ({setActiveLinkNewAccount}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className=" w-2/5 bg-white rounded-lg p-8">
        <div className="justify-end items-start  flex  ">
          {/* Close button */}
          <button onClick={() => setActiveLinkNewAccount(false)} className="">
            <IoMdCloseCircleOutline className="text-blue-600 text-3xl" />
          </button>
        </div>
        
      </div>
    </div>
  );
};
