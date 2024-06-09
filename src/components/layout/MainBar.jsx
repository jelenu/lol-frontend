import React, { useState } from "react";
import { SummonerBrowser } from "../summoners/SummonerBrowser";
import { LoginRegister } from "../auth/LoginRegister";
import { useUserContext } from "../../context/UserContext";
import { IoIosMenu } from "react-icons/io";
import { SideBar } from "./SideBar";
import { Users } from "../users/Users";
import { useTabContext } from "../../context/TabContext";

/**
 * MainBar component that displays the navigation bar and main content area.
 * @returns {JSX.Element} - MainBar component JSX.
 */
export const MainBar = () => {
  // State to toggle LoginRegister component
  const [activeLoginRegister, setActiveLoginRegister] = useState(false);


  // State to toggle the sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Destructure "isLogged" and "logout" from UserContext
  const { isLogged, logout } = useUserContext();

  const { activeTab, changeActiveTab } = useTabContext();

  return (
    <div className="mt-16">
      {/* Navigation bar */}
      <nav className="bg-gray-800 p-3 fixed top-0 w-full z-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* Button to toggle sidebar */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white pr-4 rounded"
            >
              <IoIosMenu className=" text-white text-3xl" />
            </button>
            {/* Site title */}
            <div className="text-white text-xl font-bold">LoL Stats</div>
          </div>
          <div className="flex items-center">
            {/* Botones para cambiar entre SummonerBrowser y Users */}
            <button
              onClick={() => changeActiveTab("summoners")}
              className={`text-white px-4 py-2 rounded hover:bg-gray-700 ${
                activeTab === "summoners" ? "bg-gray-700" : ""
              }`}
            >
              Summoners
            </button>
            <button
              onClick={() => changeActiveTab("users")}
              className={`text-white px-4 py-2 rounded hover:bg-gray-700 ${
                activeTab === "users" ? "bg-gray-700" : ""
              }`}
            >
              Users
            </button>
          </div>

          <div className="flex items-center">
            {/* Conditional rendering based on login status */}
            {isLogged ? (
              <button
                onClick={logout}
                className="text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => setActiveLoginRegister(true)}
                className="text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
      <div className="">
        {/* Conditional rendering based on activeTab */}
        {activeTab === "summoners" ? (
          <SummonerBrowser />
        ) : (
          <Users/>
        )}
      </div>
      {/* Conditional rendering of LoginRegister component */}
      {activeLoginRegister && (
        <LoginRegister setActiveLoginRegister={setActiveLoginRegister} />
      )}
      {/* Conditional rendering of SideBar component */}
      {sidebarOpen && (
        <SideBar setActiveLoginRegister={setActiveLoginRegister} />
      )}
    </div>
  );
};
