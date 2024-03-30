import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const CSTcomponent = () => {

 const location = useLocation();
  const cnrdata = location?.state?.cnr || '';
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);


useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/cd?cnr=${cnrdata}`);

        if (!response.ok) {
          if (response.status === 404) {
            setError('No users found for the given CNR');
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        } else {
          const data = await response.json();
          if (data && Array.isArray(data) && data.length > 0) {
            setUserData(data);
          } else {
            setError('User data not available.');
          }
        }
      } catch (error) {
        setError(`Error fetching user data: ${error.message}`);
      }
    };

    fetchUserData();
  }, [cnrdata]);



  return (
    <div className="trackCards">
      {error && <p>{error}</p>}
      {userData.map((user, index) => (
        <div key={index} className="trackCard">
          <div className="trackHeader">
            <p>{user.title}</p>
          </div>
          <div className="trackContent">
            <p><i className="fa-regular fa-calendar icon"></i>{user.date}</p>
            <p>{user.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};


export default CSTcomponent;