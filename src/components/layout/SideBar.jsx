import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { UserAccounts } from "../users/userAccounts/UserAccounts";
import { useUserContext } from "../../context/UserContext";
/**
 * SideBar component to display a sidebar with dropdown items.
 * @returns {JSX.Element} - SideBar component JSX.
 */
export const SideBar = ({ setActiveLoginRegister }) => {
  const { isLogged } = useUserContext();

  // State to manage the dropdown states
  const [dropdowns, setDropdowns] = useState({
    myAccounts: false,
    item2: false,
    item3: false,
  });

  /**
   * Function to toggle the dropdown state for a given item.
   * @param {string} dropdown - The key of the dropdown to toggle.
   */
  const toggleDropdown = (dropdown) => {
    if (!isLogged && dropdown === "myAccounts") {
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
            className="py-2 cursor-pointer flex items-center justify-between"
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
          {dropdowns.myAccounts && <UserAccounts />}

          {/* Dropdown item for Item 2 */}
          <li
            className="py-2 cursor-pointer flex items-center justify-between"
            onClick={() => toggleDropdown("item2")}
          >
            Item 2
            <span
              className={`transform transition-transform ${
                dropdowns.item2 ? "rotate-180" : ""
              }`}
            >
              <FaChevronDown />
            </span>
          </li>
          {/* Conditional rendering for Item 2 dropdown content */}
          {dropdowns.item2 && (
            <ul className="pl-4">
              <li className="py-2">Subitem 1</li>
              <li className="py-2">Subitem 2</li>
              <li className="py-2">Subitem 3</li>
            </ul>
          )}

          {/* Dropdown item for Item 3 */}
          <li
            className="py-2 cursor-pointer flex items-center justify-between"
            onClick={() => toggleDropdown("item3")}
          >
            Item 3
            <span
              className={`transform transition-transform ${
                dropdowns.item3 ? "rotate-180" : ""
              }`}
            >
              <FaChevronDown />
            </span>
          </li>
          {/* Conditional rendering for Item 3 dropdown content */}
          {dropdowns.item3 && (
            <ul className="pl-4">
              <li className="py-2">Subitem 1</li>
              <li className="py-2">Subitem 2</li>
              <li className="py-2">Subitem 3</li>
            </ul>
          )}
        </ul>
      </div>
    </div>
  );
};
