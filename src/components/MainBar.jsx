import React, { useState } from "react";
import { SummonerBrowser } from "./summoners/SummonerBrowser";
import { LoginRegister } from "./auth/LoginRegister";
import { useUserContext } from "../context/UserContext";
import { IoIosMenu } from "react-icons/io";
import { SideBar } from "./sideBar/SideBar";

/**
 * MainBar component that displays the navigation bar and main content area.
 * @returns {JSX.Element} - MainBar component JSX.
 */
export const MainBar = () => {
  // State to toggle loginRegister active
  const [activeLoginRegister, setActiveLoginRegister] = useState(false);

  // State to toggle sidebar open
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Destructure "isLogged" and "logout" from UserContext
  const { isLogged, logout } = useUserContext();

  return (
    <div className="mt-16">
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
      {/* SummonerBrowser component */}
      <div className="">
        <SummonerBrowser />
      </div>
      {/* Conditional rendering of LoginRegister component */}
      {activeLoginRegister && (
        <LoginRegister setActiveLoginRegister={setActiveLoginRegister} />
      )}
      {/* Conditional rendering of SideBar component */}
      {sidebarOpen && <SideBar setActiveLoginRegister={setActiveLoginRegister} />}
    </div>
  );
};
