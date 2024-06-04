import { useState } from 'react';

// Custom hook to verify and refresh tokens
const TokenVerifyRefreshHook = () => {
  // State variables for token, refresh token, and refresh attempt status
  const [refresh, setRefresh] = useState(localStorage.getItem('refresh-token') || null);
  const [refreshAttempted, setRefreshAttempted] = useState(false);

  // Function to verify token validity
  const verifyToken = async () => {
    try {
      // Verifying token with server
      const verifyResponse = await fetch('http://localhost:8000/auth/jwt/verify/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: localStorage.getItem('token') }),
      });

      // If token is valid, return true
      if (verifyResponse.ok) {
        console.log("tokencorrecto")
        return true;
      } 
      // If token is invalid and refresh hasn't been attempted yet, attempt refresh
      else if (!refreshAttempted) {

        setRefreshAttempted(true); // Set refresh attempt status to true
        const refreshSuccess = await refreshToken(); // Attempt token refresh
        // If refresh is successful, return true
        if (refreshSuccess) {
          console.log("refrescado")
          return true;
        } 
        // If refresh fails, clear tokens and return false
        else {
          console.log("no refrescado")
          setRefresh(null);
          localStorage.removeItem('token');
          localStorage.removeItem('refresh-token');
          
        }
      }
    } catch (error) {
      console.error('Error verifying token:', error);
    }

    return false; // Return false if any error occurs during token verification
  };

  // Function to refresh token
  const refreshToken = async () => {
    try {
      // Requesting token refresh from server
      const refreshResponse = await fetch('http://localhost:8000/auth/jwt/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refresh }),
      });

      // If token refresh is successful, update token and local storage
      if (refreshResponse.ok) {
        const newToken = await refreshResponse.json();
        localStorage.setItem('token', newToken.access);
        return true; // Return true to indicate successful token refresh
      }
    } catch (error) {
      console.error('Error updating token:', error);
    }

    return false; // Return false if token refresh fails
  };

  // Return functions for verifying and refreshing tokens
  return { verifyToken, refreshToken };
};

export default TokenVerifyRefreshHook; // Export the custom hook
