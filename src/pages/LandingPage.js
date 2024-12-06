import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const backgroundStyle = {
    backgroundImage: 'url("https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920")', // Curated Unsplash image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '20px',
  };

  const buttonStyle = {
    margin: '10px',
    padding: '12px 25px',
    fontSize: '18px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#007BFF',
    color: '#fff',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  return (
    <div style={backgroundStyle}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px', fontWeight: 'bold', textShadow: '2px 2px 6px rgba(0, 0, 0, 0.6)' }}>
        Welcome to Our Application
      </h1>
      <div>
        <Link to="/login">
          <button
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
          >
            Login
          </button>
        </Link>
        <Link to="/register">
          <button
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
          >
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;

