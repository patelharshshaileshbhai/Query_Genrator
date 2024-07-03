// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import {BASE_URL} from '../helper/config.js'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const url = `${BASE_URL}/auth/login`;
    const payload = { email, password };

    try {
      const res = await axios.post(url, payload);
      const { token, user } = res.data;
      
      localStorage.setItem('token', token);
      console.log('Token:', token);
      console.log('User:', user);

      // Redirect based on the user's role
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'user') {
        navigate('/user');
      } else {
        setError('Unknown role');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response) {
        
        setError(err.response.data.message || 'Login failed');
      } else if (err.request) {
        
        setError('No response from the server. Please try again.');
      } else {
       
        setError('Error setting up the request. Please try again.');
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <button onClick={() => navigate('/register')}>Switch to Register</button>
    </div>
  );
};

export default Login;
