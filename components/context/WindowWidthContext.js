
import PropTypes from 'prop-types';
import React, { createContext, useContext, useEffect, useState } from 'react';

const WindowWidthContext = createContext();

export function useWindowWidth() {
  return useContext(WindowWidthContext);
}

export function WindowWidthProvider({ children }) {
  const [isSmallerDevice, setIsSmallerDevice] = useState(false);

  useEffect(() => {
    // Check if window is defined (i.e., running on the client side)
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsSmallerDevice(window.innerWidth <= 768);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <WindowWidthContext.Provider value={{ isSmallerDevice }}>
      {children}
    </WindowWidthContext.Provider>
  );
}

// Define PropTypes
WindowWidthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
