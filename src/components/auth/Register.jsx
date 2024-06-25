import React, { useState } from "react";
import { useUserContext } from "../../context/UserContext";

/**
 * Component for user registration.
 * @param {Object} props - Component props.
 * @param {Function} props.setActiveLoginRegister - Function to set the active state of login/register.
 * @returns {JSX.Element} - JSX of the Register component.
 */
export const Register = ({ setActiveLoginRegister }) => {
  const { login } = useUserContext();

  // State for form data
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    re_password: "",
    email: "",
  });

  // State for error messages
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");

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
    setPasswordError("")
    setApiError("")
    const { username, password, re_password, email } = formData;

    // Checking if passwords match
    if (password !== re_password) {
      setPasswordError("Passwords do not match.");
      return;
    }

    try {
      // Sending registration data to the server
      const registerResponse = await fetch(
        "http://127.0.0.1:8000/auth/users/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password, email }),
        }
      );

      // Handling registration response
      if (!registerResponse.ok) {
        const errorData = await registerResponse.json();

        if (errorData.username && errorData.username.includes("A user with that username already exists.")) {
          setApiError("A user with that username already exists.");
        } else if (errorData.password) {
          setPasswordError(errorData.password.join(" "));
        } else {
        }
        console.error("Registration request error:", registerResponse.status);
        return;
      }

      const registerData = await registerResponse.json();
      console.log("Server response (register):", registerData);

      try {
        // Sending login data to the server after registration
        const loginFormData = { username, password };
        const loginResponse = await fetch(
          "http://127.0.0.1:8000/auth/jwt/create/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginFormData),
          }
        );

        // Handling login response
        if (!loginResponse.ok) {
          console.error("Login request failed:", loginResponse.status);
          return;
        }

        const loginData = await loginResponse.json();

        // Storing tokens in local storage and logging in the user
        localStorage.setItem("token", loginData.access);
        localStorage.setItem("refresh-token", loginData.refresh);
        login();

        // Setting active state to false to close login/register modal
        setActiveLoginRegister(false);
      } catch (loginError) {
        console.error("Error while making login request:", loginError);
      }
    } catch (error) {
      setApiError("Error when making the request.");
      console.error("Error when making the request:", error);
    }
  };

  return (
    <div className="">
      <div className="">
        <form className="space-y-6" onSubmit={handleSubmit}>
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
                type="text"
                value={formData.username}
                onChange={handleChange}
                autoComplete="username"
                required
                className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 pl-2 ring-gray-300 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Email input field */}
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
                className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 pl-2 ring-gray-300 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Password input field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
                className={`w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 pl-2 ring-gray-300 placeholder:text-gray-400 ${
                  passwordError && "border-red-500"
                }`}
              />
            </div>
          </div>

          {/* Confirm Password input field */}
          <div>
            <label
              htmlFor="re_password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                id="re_password"
                name="re_password"
                type="password"
                value={formData.re_password}
                onChange={handleChange}
                autoComplete="new-password"
                required
                className={`w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 pl-2 ring-gray-300 placeholder:text-gray-400 ${
                  passwordError && "border-red-500"
                }`}
              />
            </div>
            {/* Displaying password error message */}
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          {/* API error message */}
          {apiError && (
            <div className="text-red-500 text-sm mt-2">
              {apiError}
            </div>
          )}

          {/* Submit button */}
          <div>
            <button
              type="submit"
              className="w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
