import React, { useState } from "react";
import { useUserContext } from "../../context/UserContext";

/**
 * Component for login functionality.
 * @param {Object} props - Component props.
 * @param {Function} props.setActiveLoginRegister - Function to set the active state of login/register.
 * @returns {JSX.Element} - JSX of the Login component.
 */
export const Login = ({ setActiveLoginRegister }) => {
  const { login } = useUserContext();

  // State for form data
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // State for error message
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending login credentials to the server
      const response = await fetch("http://localhost:8000/auth/jwt/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Handling response from server
      if (!response.ok) {
        setErrorMessage("Username or password incorrect");
        console.error("Request error:", response.status);
        return;
      }

      const data = await response.json();

      // Storing tokens in local storage
      localStorage.setItem("token", data.access);
      localStorage.setItem("refresh-token", data.refresh);

      // Logging in the user
      login();

      // Setting active state to false to close login/register modal
      setActiveLoginRegister(false);
    } catch (error) {
      setErrorMessage("Error when making request");
      console.error("Error when making request", error);
    }
  };

  return (
    <div className="">
      <div className="">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Error message */}
          {errorMessage && (
            <div className="text-red-500">
              {errorMessage}
            </div>
          )}
          {/* Username input field */}
          <div>
            <label
              htmlFor="username"
              className="text-sm font-medium leading-6 text-gray-900"
            >
              UserName
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="username"
                value={formData.username}
                onChange={handleChange}
                autoComplete="username"
                required
                className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 pl-2 ring-gray-300 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Password input field */}
          <div>
            <div className="">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
                className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 pl-2 ring-gray-300 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              className="w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
