import React, { useState } from 'react';
import axios from 'axios';

const TransferPage = () => {
  const [recipientId, setRecipientId] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleTransfer = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');  // Retrieve token from localStorage

      if (!token) {
        setMessage('No authentication token found. Please log in again.');
        return;
      }

      const response = await axios.post(
        'http://localhost:8000/api/wallet',
        {
          recipient_id: recipientId,
          amount: parseFloat(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token in the header
          },
        }
      );

      setMessage(response.data.message || 'Transfer successful!');
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error || 'An error occurred during the transfer.');
      } else {
        setMessage('Network error or server unavailable.');
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Transfer Funds</h2>
      <form onSubmit={handleTransfer}>
        <div>
          <label>Recipient ID:</label>
          <input
            type="text"
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="1"
          />
        </div>
        <button type="submit">Transfer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default TransferPage;
