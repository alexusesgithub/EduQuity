import '../styles/globals.css';
import '../styles/simple.css';
import React from 'react';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp; 