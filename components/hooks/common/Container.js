import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { useWindowWidth } from '../../context/WindowWidthContext';


function Container({ children }) {
  const { isSmallerDevice } = useWindowWidth
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <div style={{ width: isSmallerDevice ? '95%' : '85%' }}>{children}</div>
    </div>
  );
}

// Define PropTypes for the component
Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
