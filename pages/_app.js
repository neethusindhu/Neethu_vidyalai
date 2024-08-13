import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { WindowWidthProvider } from '../components/context/WindowWidthContext';

const App = ({ Component, pageProps }) => (
  <WindowWidthProvider>
    <Component {...pageProps} />
  </WindowWidthProvider>
);

// Define PropTypes for the component
App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App;
