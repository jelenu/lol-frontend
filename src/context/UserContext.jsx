import React, { createContext, useContext, useEffect, useState } from 'react';
import useTokenVerifyRefresh from '../hooks/useTokenVerifyRefresh';

// Create context for user data
const UserContext = createContext();

// UserProvider component to provide user data to the application
export const UserProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const { verifyToken } = useTokenVerifyRefresh(); // Custom hook to verify token validity

  // Function to check login status when component mounts
  const checkLoginStatus = async () => {
    const isAuthenticated = await verifyToken(); // Verifying token
    if (isAuthenticated) {
      setIsLogged(true); // Set isLogged state to true if user is authenticated
    }
  };

  useEffect(() => {
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
    window.location.reload(); // Reload the page after logout

  };

  // Function to fetch user data from API
  const fetchUserData = async () => {
    checkLoginStatus();

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:8000/auth/users/me/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${token}`,
        }
      });

      if (response.ok) {
        // Handle successful response, e.g., update user data
        const userData = await response.json();
        console.log(userData); // Do something with the user data
      } else {
        // Handle error response
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };


  return (
    // Provide user data to child components through context
    <UserContext.Provider value={{ isLogged, login, logout, fetchUserData }}>
      {children} {/* Render child components */}
    </UserContext.Provider>
  );
};

// Custom hook to consume user data from context
export const useUserContext = () => {
  return useContext(UserContext);
};
