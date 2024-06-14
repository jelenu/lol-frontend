import React, { createContext, useContext, useEffect, useState } from 'react';
import TokenVerifyRefreshHook from '../hooks/TokenVerifyRefreshHook';

// Create context for user data
const UserContext = createContext();

// UserProvider component to provide user data to the application
export const UserProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] = useState(null); // State to store user data
  const { verifyToken } = TokenVerifyRefreshHook(); // Custom hook to verify token validity
  const [chatUsername, setChatUsername] = useState(null);
  // Function to check login status when component mounts
  const checkLoginStatus = async () => {
    const isAuthenticated = await verifyToken(); // Verifying token
    if (isAuthenticated) {
      setIsLogged(true); // Set isLogged state to true if user is authenticated
      const storedUserData = localStorage.getItem('user-data');
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData)); // Load user data from localStorage
      } else {
        await fetchUserData(); // Fetch user data if not in localStorage
      }
    }
  };

  useEffect(() => {
    checkLoginStatus();
    // eslint-disable-next-line
  }, []); // Run only on component mount

  // Function to set isLogged state to true (user logged in)
  const login = () => {
    setIsLogged(true);
    fetchUserData(); // Fetch user data after login
  };

  // Function to clear token data and set isLogged state to false (user logged out)
  const logout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    localStorage.removeItem('refresh-token'); // Remove refresh token from local storage
    localStorage.removeItem('user-data'); // Remove user data from local storage
    setIsLogged(false); // Set isLogged state to false
    setUserData(null); // Clear user data
    window.location.reload(); // Reload the page after logout
  };

  // Function to fetch user data from API
  const fetchUserData = async () => {
    const makeApiCall = async (token) => {
      const response = await fetch('http://localhost:8000/auth/users/me/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${token}`,
        }
      });
      return response;
    };

    try {
      let token = localStorage.getItem('token');
      let response = await makeApiCall(token);

      if (response.ok) {
        // Handle successful response, e.g., update user data
        const userData = await response.json();
        setUserData(userData); // Update user data in state
        localStorage.setItem('user-data', JSON.stringify(userData)); // Store user data in localStorage
      } else if (response.status === 401) {
        await verifyToken();
        token = localStorage.getItem('token');
        response = await makeApiCall(token);

        if (response.ok) {
          // Handle successful response after token refresh
          const userData = await response.json();
          setUserData(userData); // Update user data in state
          localStorage.setItem('user-data', JSON.stringify(userData)); // Store user data in localStorage
        } else {
          // Handle error response after token refresh attempt
          console.error('Failed to fetch user data after token refresh');
        }
      } else {
        // Handle other error responses
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    // Provide user data to child components through context
    <UserContext.Provider value={{ isLogged, userData, login, logout, fetchUserData, chatUsername, setChatUsername }}>
      {children} {/* Render child components */}
    </UserContext.Provider>
  );
};

// Custom hook to consume user data from context
export const useUserContext = () => {
  return useContext(UserContext);
};
