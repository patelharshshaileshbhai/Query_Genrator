import React from 'react';
import './Home.css'; // Import the CSS for styling
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="home-container">
      <h1>WELCOME TO MY TERRITORY</h1>
      <p>If Any Query Please Contact</p>
      <button className="btn-reg" ><Link to="/register">Register</Link></button>
    </div>
  );
};

export default Home;
