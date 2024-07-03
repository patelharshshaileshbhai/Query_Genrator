// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './AdminDashboard.css'; // Import CSS for styling

// const AdminDashboard = () => {
//   const [queries, setQueries] = useState([]);
//   const [error, setError] = useState(null); // To handle any errors

//   useEffect(() => {
//     const fetchQueries = async () => {
//       try {

        
//         const token = localStorage.getItem('token');
//         if (!token) {
//           console.error('No token found');
//           return;
//         }

//         const res = await axios.get('http://localhost:8000/api/queries', {
//           headers: {
//             token:localStorage.getItem("token") // Correctly format the Authorization header
//           },
//         });

//         console.log('Full Response:', res); // Log the full response
//         console.log('Response Data:', res.data); // Log the response data

//         // Ensure queries is an array from the response data
//         const { queries: fetchedQueries } = res.data;
//         if (Array.isArray(fetchedQueries)) {
//           setQueries(fetchedQueries);
//         } else {
//           console.error('Queries is not an array:', fetchedQueries);
//           setQueries([]);
//         }
//       } catch (err) {
//         console.error('Error fetching queries:', err);
//         setError('Error fetching queries');
//       }
//     };

//     fetchQueries();
//   }, []);
//   const updateQueryStatus = async (id, status) => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         console.error('No token found');
//         return;
//       }
         
//       const res = await axios.put(`http://localhost:8000/api/queries/${id}`, { status }, {
//         headers: {
//           token:localStorage.getItem("token") // Ensure the correct header format
//         },
//       });

//       setQueries((prevQueries) => 
//         prevQueries.map((query) => (query._id === id ? res.data : query))
//       );
//     } catch (err) {
//       console.error('Error updating query status:', err);
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       <h2>Admin Dashboard</h2>
//       {error && <p className="error-message">{error}</p>}
//       <div className="queries-container">
//         {queries.length === 0 ? (
//           <p>No queries available.</p>
//         ) : (
//           queries.map((query) => (
//             <div key={query._id} className="query-card">
//               <h3>{query.title}</h3>
//               <p>{query.description}</p>
//               Uncomment and adjust this section if you need to update query statuses
//               <select
//                 value={query.status}
//                 onChange={(e) => updateQueryStatus(query._id, e.target.value)}
//               >
//                 <option value="open">Open</option>
//                 <option value="in-progress">In Progress</option>
//                 <option value="resolved">Resolved</option>
//               </select>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css'; 

const AdminDashboard = () => {
  const [queries, setQueries] = useState([]);
  const [adminProfile, setAdminProfile] = useState(null); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchQueriesAndProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        // Fetch admin profile
        const profileRes = await axios.get('http://localhost:8000/api/auth/me', {
          headers: {
            token: localStorage.getItem("token"), 
          },
        });
        console.log('Full Response:', profileRes.data.user); 
        setAdminProfile(profileRes.data);

        // Fetch queries
        const queriesRes = await axios.get('http://localhost:8000/api/queries', {
          headers: {
            token: localStorage.getItem("token"), 
          },
        });

        console.log('Full Response:', queriesRes); 
        console.log('Response Data:', queriesRes.data); 

        
        const { queries: fetchedQueries } = queriesRes.data;
        if (Array.isArray(fetchedQueries)) {
          setQueries(fetchedQueries);
        } else {
          console.error('Queries is not an array:', fetchedQueries);
          setQueries([]);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error fetching data');
      }
    };

    fetchQueriesAndProfile();
  }, []);

  const updateQueryStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const res = await axios.put(`http://localhost:8000/api/queries/${id}`, { status }, {
        headers: {
          token: localStorage.getItem("token"), 
        },
      });

      setQueries((prevQueries) =>
        prevQueries.map((query) => (query._id === id ? res.data : query))
      );
    } catch (err) {
      console.error('Error updating query status:', err);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1 >Admin Dashboard</h1>
      {error && <p className="error-message">{error}</p>}
      
      
      {adminProfile ? (
        <div className="admin-profile">
          <h3>Admin Profile</h3>
          <p><strong>Name:</strong> {adminProfile.user.name}</p>
          <p><strong>Email:</strong> {adminProfile.user.email}</p>
          
        </div>
      ) : (
        <p>Loading admin profile...</p>
      )}

      <div className="queries-container">
        {queries.length === 0 ? (
          <p>No queries available.</p>
        ) : (
          queries.map((query) => (
            <div key={query._id} className="query-card">
              <h3> Title :- {query.title}</h3>
              <p>Query :- {query.description}</p>
              
              <select
                value={query.status}
                onChange={(e) => updateQueryStatus(query._id, e.target.value)}
              >
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
