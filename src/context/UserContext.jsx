import React, { createContext, useContext, useEffect, useState } from 'react';
import useTokenVerifyRefresh from '../hooks/useTokenVerifyRefresh';

// Create context for user data
const UserContext = createContext();

// UserProvider component to provide user data to the application
export const UserProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const { verifyToken } = useTokenVerifyRefresh(); // Custom hook to verify token validity

  useEffect(() => {
    // Function to check login status when component mounts
    const checkLoginStatus = async () => {
      const isAuthenticated = await verifyToken(); // Verifying token
      if (isAuthenticated) {
        setIsLogged(true); // Set isLogged state to true if user is authenticated
      }
    };
    checkLoginStatus();
    // eslint-disable-next-line
  }, []); // Run only on component mount

  // Function to set isLogged state to true (user logged in)
  const login = () => {
    setIsLogged(true);
  };

  // Function to clear token data and set isLogged state to false (user logged out)
  const logout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    localStorage.removeItem('refresh-token'); // Remove refresh token from local storage
    setIsLogged(false); // Set isLogged state to false
  };

  return (
    // Provide user data to child components through context
    <UserContext.Provider value={{ isLogged, login, logout }}>
      {children} {/* Render child components */}
    </UserContext.Provider>
  );
};

// Custom hook to consume user data from context
export const useUserContext = () => {
  return useContext(UserContext);
};
