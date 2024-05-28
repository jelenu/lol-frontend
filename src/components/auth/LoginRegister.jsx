import React, { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Login } from "./Login";
import { Register } from "./Register";

/**
 * Component for login and registration modal.
 * @param {Object} props - Component props.
 * @param {Function} props.setActiveLoginRegister - Function to set the active state of login/register.
 * @returns {JSX.Element} - JSX of the LoginRegister component.
 */
export const LoginRegister = ({ setActiveLoginRegister }) => {
  // State to toggle login/register form
  const [isLoginActive, setIsLoginActive] = useState(true);

  // Toggle login/register form
  const handleToggleForm = () => {
    setIsLoginActive(!isLoginActive);
  };

  useEffect(() => {
    // Remove scroll when mounting component
    document.body.style.overflow = "hidden";
    return () => {
      // Restore scroll when unmounting the component
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className=" w-2/5 bg-white rounded-lg p-8">
        <div className="justify-end items-start  flex  ">
          {/* Close button */}
          <button onClick={() => setActiveLoginRegister(false)} className="">
            <IoMdCloseCircleOutline className="text-blue-600 text-3xl" />
          </button>
        </div>
        <div className="">
          {/* Render Login or Register component based on isLoginActive state */}
          {isLoginActive ? (
            <Login setActiveLoginRegister={setActiveLoginRegister} />
          ) : (
            <Register setActiveLoginRegister={setActiveLoginRegister} />
          )}
        </div>
        <div className=" pt-4 ">
          {/* Display message and toggle button for switching between login and registration */}
          {isLoginActive ? (
            <span>Don't have an account? </span>
          ) : (
            <span>Already have an account? </span>
          )}
          <button onClick={() => handleToggleForm()} className=" text-blue-500">
            {isLoginActive ? "Register" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};
