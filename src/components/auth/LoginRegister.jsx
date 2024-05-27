import React, { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Login } from "./Login";
import { Register } from "./Register";

export const LoginRegister = ({ setActiveLoginRegister }) => {
  // State to toggle login/register form
  const [isLoginActive, setIsLoginActive] = useState(true);

  //Toggle login/regster form
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
      <div className="w-1/4 h-2/3 bg-white rounded-lg p-4">
        <div className="justify-end flex">
          <button onClick={() => setActiveLoginRegister(false)} className="">
            <IoMdCloseCircleOutline className="text-blue-600 text-3xl" />
          </button>
        </div>
        <div className="">{isLoginActive ? <Login /> : <Register />}</div>
        <div>
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
