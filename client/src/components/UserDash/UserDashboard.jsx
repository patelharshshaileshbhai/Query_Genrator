import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QueryForm from '../QueryForm/QueryForm.jsx'; 
import { useLocation } from 'react-router-dom';
import './UserDashboard.css'; 
import {BASE_URL} from '../../helper/config.js'

const UserDashboard = () => {
  const [queries, setQueries] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null); 

  // Retrieve token from location state
  const location = useLocation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/auth/me`, {
          headers: {
            token: localStorage.getItem("token") 
          },
        });

        console.log(data.user);
        setUserProfile(data.user); 
         
        setError(null); 
      } catch (err) {
        console.error('Error fetching user profile:', err);
        if (err.response) {
          
          setError(err.response.data.message || 'Error fetching user profile');
        } else if (err.request) {
         
          setError('No response from the server. Please try again.');
        } else {
          
          setError('Error setting up the request. Please try again.');
        }
      }
    };

    fetchUserProfile();
  }, []); 

  const addQuery = (query) => {
    setQueries([...queries, query]);
  };

  return (
    <div className="dashboard-container">
      <h2>User Dashboard</h2>
      {error ? (
        <p className="error-message">{error}</p>
      ) : userProfile ? (
        <div>
          <h3>Welcome, {userProfile.name}</h3>
          <p>Email: {userProfile.email}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
      <QueryForm addQuery={addQuery} />
      {queries.map((query) => (
        <div key={query._id} className="query-card">
          <h3 className="query-title"> {query.name}</h3>
          <p className="query-description">{query.description}</p>
        </div>
      ))}
    </div>
  );
};

export default UserDashboard;
