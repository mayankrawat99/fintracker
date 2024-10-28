import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        flexDirection: 'column',
        backgroundColor: '#e0e0e0', // Duller body background color (light grey)
      }}
    >
  <FaExclamationTriangle
  size={120} // Slightly larger logo
  style={{
    color: '#eb3737', // Softer red for the logo
    marginBottom: '20px',
  }}
/>

      <h1 style={{ fontSize: '6rem', margin: '0' }}>404</h1>
      <p style={{ fontSize: '1.5rem', marginTop: '10px' }}>
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '5px',
          fontSize: '1.2rem',
        }}
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;

