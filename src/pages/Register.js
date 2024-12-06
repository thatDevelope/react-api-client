import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState(''); // State for confirmation password

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Make the API request
        const response = await axios.post('http://localhost:8000/api/register', {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation, // Match Laravel's validation rules
        });
  
        // Extract the token and user from the response
        const { token, user } = response.data;
  
        // Save the token to localStorage
        localStorage.setItem('authToken', token);
  
        alert(`Registration successful! Welcome, ${user.name}`);
        console.log('Token:', token);
        console.log('User:', user);
      } catch (error) {
        console.error(error.response?.data); // Log server errors for debugging
  
        if (error.response && error.response.data.errors) {
          // Display validation errors
          alert(`Error: ${JSON.stringify(error.response.data.errors)}`);
        } else {
          alert('Registration failed. Please try again.');
        }
      }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url("https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const formStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    width: '400px',
    textAlign: 'center',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '18px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#218838',
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Register</h2>
        <input
          style={inputStyle}
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          style={inputStyle}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          style={inputStyle}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          style={inputStyle}
          type="password"
          placeholder="Confirm Password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)} // Updated for state
          required
        />
        <button
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
