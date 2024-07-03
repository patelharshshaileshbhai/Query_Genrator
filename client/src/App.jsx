// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx';
import AdminDashboard from './components/Admin/AdminDashboard.jsx';
import UserDashboard from './components/UserDash/UserDashboard.jsx';
import Register from './components/Register.jsx';
import Unauthorized from './components/Unauthorized.jsx';
import Home from './pages/Home.jsx';

const App = () => (
  
    <Routes>
    <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      {/* Add other routes as necessary */}
    </Routes>
  
);

export default App;
