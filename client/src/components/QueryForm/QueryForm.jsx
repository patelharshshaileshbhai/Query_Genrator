import React, { useState } from 'react';
import axios from 'axios';
import './QueryForm.css'; 

const QueryForm = ({ addQuery }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      const res = await axios.post(`http://localhost:8000/api/queries`, { title, description }, {
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
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="query-input"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="query-textarea"
      />
      <button type="submit" className="query-button">Submit Query</button>
    </form>
  );
};

export default QueryForm;
