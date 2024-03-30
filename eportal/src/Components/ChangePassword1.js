//Advocate Change Password 
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import "./PasswordReset.css";

const PasswordChange1 = () => {
    const [password, setPassword] = useState('');
   
    const location=useLocation();
    const emailFrominfo = location?.state?.emailFromLogin ||  '';
    const [newPassword, setNewPassword] = useState('');
    const [confirmnewPassword, setConfirmnewPassword] = useState('');

    const navigate=useNavigate();
   console.log(emailFrominfo)
    const handlePasswordChange = async (event) => {
      event.preventDefault();
      try {
          const response = await fetch('http://localhost:3001/ChangePassword1-Advocate', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email:emailFrominfo, password, newPassword,confirmnewPassword }),
            });
  
        const data = await response.json();
        if (data.status === 'error' && data.message) {
          alert(data.message);
        }
  
  
        if (response.ok) {
          console.log('Password Change successful:', data);
         
        alert('password changed  successfully');
        navigate("/advocateaccount");
        
        } else {
         
          console.error('Password Change failed:', data);
          alert("Password Change failed");
        }
      } catch (error) {
        console.error('Error during password change:', error);
      }
    };
  
    return (
      <div className="centered-container">
      <div>
      <center>
        <h1>Change Password</h1>
        <form onSubmit={handlePasswordChange}>
          {/* <label className='elements'>Email:</label>
          <input style={{marginLeft:"30px"}}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /> */}
          <br />
  
          <label className='elements' style={{marginLeft:"-100px"}}>Old Password:</label>
          <input style={{marginLeft:"30px"}}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
  
          <label className='elements' style={{marginLeft:"-10px"}}>New Password</label>
          <input  style={{marginLeft:"25px"}}
              type="password"
              name="phone"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              />
  
          <br />
  
          <label className='elements'  style={{marginLeft:"-50px"}}> Confirm New Password:</label>
          <input style={{marginLeft:"20px",marginBottom:"30px"}}
            type="password"
            value={confirmnewPassword}
            onChange={(e) => setConfirmnewPassword(e.target.value)}
            required
          />
          <br />
  
          <button type="submit" class="butn" onClick={handlePasswordChange}>Change Password</button>
        </form></center></div>
      </div>
    );
  };
  
  export default PasswordChange1;