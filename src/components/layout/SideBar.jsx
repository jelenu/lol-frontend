import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { UserAccounts } from "../users/userAccounts/UserAccounts";
import { useUserContext } from "../../context/UserContext";
import { FollowedSummoners } from "../users/followedSummoners/FollowedSummoners";
import { Friends } from "../users/friends/Friends";
/**
 * SideBar component to display a sidebar with dropdown items.
 * @returns {JSX.Element} - SideBar component JSX.
 */
export const SideBar = ({ setActiveLoginRegister }) => {
  const { isLogged } = useUserContext();

  // State to manage the dropdown states
  const [dropdowns, setDropdowns] = useState({
    myAccounts: false,
    myFollowedSummoners: false,
    friends: false,

  });

  /**
   * Function to toggle the dropdown state for a given item.
   * @param {string} dropdown - The key of the dropdown to toggle.
   */
  const toggleDropdown = (dropdown) => {
    if (!isLogged) {
        setActiveLoginRegister(true);
    } else {
      setDropdowns((prevState) => ({
        ...prevState,
        [dropdown]: !prevState[dropdown],
      }));
    }
  };

  return (
    <div className="fixed inset-0 mt-16 w-64 flex justify-center bg-gray-800 text-white z-40">
      <div className="w-full h-full px-10">
        <ul>
          {/* Dropdown item for My Accounts */}
          <li
            className="py-2  cursor-pointer flex items-center justify-between"
            onClick={() => toggleDropdown("myAccounts")}
          >
            My accounts
            <span
              className={`transform transition-transform ${
                dropdowns.myAccounts ? "rotate-180" : ""
              }`}
            >
              <FaChevronDown />
            </span>
          </li>
          {/* Conditional rendering for My Accounts dropdown content */}
          {dropdowns.myAccounts && <UserAccounts  />}

          {/* Dropdown item for Followed Summoners */}
          <li
            className="py-2 mt-8 cursor-pointer flex items-center justify-between truncate"
            onClick={() => toggleDropdown("myFollowedSummoners")}
          >
            Followed Summoners
            <span
              className={`transform transition-transform ${
                dropdowns.myFollowedSummoners ? "rotate-180" : ""
              }`}
            >
              <FaChevronDown />
            </span>
          </li>
          {/* Conditional rendering for Followed summoners dropdown content */}
          {dropdowns.myFollowedSummoners && <FollowedSummoners />}

          {/* Dropdown item for friends*/}
          <li
            className="py-2 mt-8 cursor-pointer flex items-center justify-between truncate"
            onClick={() => toggleDropdown("friends")}
          >
            Friends
            <span
              className={`transform transition-transform ${
                dropdowns.friends ? "rotate-180" : ""
              }`}
            >
              <FaChevronDown />
            </span>
          </li>
          {/* Conditional rendering for Followed summoners dropdown content */}
          {dropdowns.friends && <Friends />}
        </ul>
      </div>
    </div>
  );
};
