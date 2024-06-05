import { useState, useEffect } from 'react';

const WindowSizeHook = () => {
  // State for storing window size
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Function to handle window resize event
    const handleResize = () => {
      // Update window size state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Call handleResize to set initial window size
    handleResize();

    // Remove event listener when component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array ensures that effect runs only once after initial render

  return windowSize; // Return current window size
};

export default WindowSizeHook;
