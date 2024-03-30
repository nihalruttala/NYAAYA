import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../../Components/Litigant/rating.css';

const EditProfile = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const emailFrominfo = location?.state?.emailFromLogin ||  '';
  const [newphone, setNewphone] = useState('');
  const [newname, setNewname] = useState('');
  
  const [Error, setError ] = useState('');

  console.log("hii", emailFrominfo);
  // const imageUrl = `http://localhost:3001/images/DSC0598.JPG`;

  const handleSubmit = async (e) => {
    
        e.preventDefault();
    try {
      // Send updated profile data to backend
      
      const response = await fetch('http://localhost:3001/api/updateProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newname, email:emailFrominfo , newphone }),
      });
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      navigate('/Advocateaccount');
      console.log('Profile updated successfully'); // Redirect to profile page after successful update
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
    }
  };


  return (
    <div className="bg d-flex flex-column justify-content-center align-items-center">
      <div className="r-container">
        <h2 className="head">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="d-flex flex-column justify-content-center align-items-center">
          <label className="ops">
            New Name:
            <input style={{marginLeft:"30px"}} type="text" value={newname} onChange={(e) => setNewname(e.target.value)} />
          </label>
          <label className="ops">
            New Contact:
            <input style={{marginLeft:"25px"}} type="text" value={newphone} onChange={(e) => setNewphone(e.target.value)} />
          </label>
          <button type="submit" className="butn">Update Profile</button>
        </form>
      </div>
    </div>
    
  );
};

export default EditProfile;