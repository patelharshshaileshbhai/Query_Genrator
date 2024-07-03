import React, { useState } from 'react';
import axios from 'axios';
import './QueryForm.css'; 
import {BASE_URL} from '../../helper/config.js'
const QueryForm = ({ addQuery }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      const res = await axios.post(`${BASE_URL}/queries`, { name, description }, {
        headers: {
          token:localStorage.getItem("token")
        },
      });
      addQuery(res.data);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="query-form">
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="query-input"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="query-textarea"
      />
      <button type="submit" className="query-button">Submit Query</button>
      <h5>Status Will be update on your email Id as soon as possible</h5>
    </form>
  );
};

export default QueryForm;
