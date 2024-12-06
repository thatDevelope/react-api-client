import React, { useState } from 'react';
import axios from 'axios';

const BalancePage = () => {
  const [userId, setUserId] = useState('');
  const [balance, setBalance] = useState(null);
  const [message, setMessage] = useState('');

  const handleFetchBalance = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');  // Get token from localStorage

    if (!token) {
      setMessage('No authentication token found. Please log in again.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/api/balance',  // Your API endpoint
        { user_id: userId },  // Send the user ID to the backend
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Pass the token in the Authorization header
          },
        }
      );

      setBalance(response.data.balance);  // Set the balance from the response
      setMessage(`Balance fetched successfully: $${response.data.balance}`);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error || 'An error occurred while fetching the balance.');
      } else {
        setMessage('Network error or server unavailable.');
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Fetch Your Balance</h2>
      <form onSubmit={handleFetchBalance}>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Fetch Balance</button>
      </form>

      {message && <p>{message}</p>}
      {balance !== null && <p>Your current balance: ${balance}</p>}
    </div>
  );
};

export default BalancePage;
