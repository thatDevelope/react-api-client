import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TransferPage from '../pages/TransferPage';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('dashboard');
  const [balance, setBalance] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBalance();
    fetchUserInfo();
  }, []);

  const fetchBalance = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');
    
    if (!token || !userId) {
      setMessage('No user or token found. Please log in.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/api/balance', // API to fetch balance
        { user_id: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.balance !== undefined) {
        setBalance(response.data.balance);
      } else {
        setMessage('Balance not found.');
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error || 'An error occurred while fetching the balance.');
      } else {
        setMessage('Network error or server unavailable.');
      }
    }
  };

  const fetchUserInfo = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');
    
    if (!token || !userId) {
      setMessage('User information not found.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8000/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setUserInfo(response.data);
    } catch (error) {
      setMessage('Failed to fetch user information.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user_id');
    alert('You have been logged out.');
    navigate('/login');
  };

  const validateToken = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('No token found! Please log in first.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8000/api/validate', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { user } = response.data;
      if (user) {
        alert(`Token is valid! User: ${user.name}`);
      } else {
        alert('Token is valid, but no user data was returned.');
      }
    } catch (error) {
      alert('Invalid token or error occurred. Please log in again.');
    }
  };

  const sidebarStyle = {
    width: isSidebarOpen ? '250px' : '0',
    background: '#333',
    color: '#fff',
    height: '100vh',
    position: 'fixed',
    top: '0',
    left: '0',
    overflowX: 'hidden',
    transition: '0.3s',
    padding: isSidebarOpen ? '20px' : '0',
  };

  const mainContentStyle = {
    marginLeft: isSidebarOpen ? '250px' : '0',
    padding: '20px',
    transition: '0.3s',
  };

  const navbarStyle = {
    background: '#007bff',
    padding: '10px 20px',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const buttonStyle = {
    background: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const sidebarLinkStyle = {
    display: 'block',
    padding: '10px',
    textDecoration: 'none',
    color: '#fff',
    marginBottom: '10px',
    borderRadius: '5px',
    background: '#444',
    textAlign: 'center',
  };

  const sidebarToggleStyle = {
    position: 'absolute',
    top: '10px',
    left: isSidebarOpen ? '250px' : '10px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    transition: '0.3s',
  };

  const cardContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  };

  const cardStyle = {
    background: '#f8f9fa',
    borderRadius: '5px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    width: '30%',
    textAlign: 'center',
  };

  return (
    <div>
      {/* Navbar */}
      <div style={navbarStyle}>
        <h1>Dashboard</h1>
        <button style={buttonStyle} onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Sidebar */}
      <div style={sidebarStyle}>
        <h2>Menu</h2>
        <a href="#dashboard" style={sidebarLinkStyle}>
          Dashboard
        </a>
        <a href="#profile" style={sidebarLinkStyle}>
          Profile
        </a>

        <div>
          <button onClick={() => setActivePage('transfer')}>Transfer</button>
        </div>

        <button style={{ ...sidebarLinkStyle, backgroundColor: '#007BFF' }}>Refresh</button>
        <button onClick={validateToken} style={{ ...sidebarLinkStyle, backgroundColor: '#007BFF' }}>Validate Token</button>
      </div>

      {/* Sidebar Toggle Button */}
      <button style={sidebarToggleStyle} onClick={() => setSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
      </button>

      {/* Main Content */}
      <div style={mainContentStyle}>
        <h2>Welcome to the Dashboard</h2>
        <p>This is your main content area. You can add graphs, tables, or any other widgets here.</p>

        {/* Cards Display */}
        <div style={cardContainerStyle}>
          <div style={cardStyle}>
            <h3>Balance</h3>
            <p>{balance !== null ? `$${balance}` : '99250'}</p>
          </div>
          <div style={cardStyle}>
            <h3>Transaction History</h3>
            <p>Coming Soon!</p>
          </div>
          <div style={cardStyle}>
            <h3>User Info</h3>
            {userInfo ? (
              <div>
                <p>Name: {userInfo.name}</p>
                <p>Email: {userInfo.email}</p>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>

        {/* Transfer Page */}
        {activePage === 'transfer' && <TransferPage />}
      </div>
    </div>
  );
};

export default Dashboard;
