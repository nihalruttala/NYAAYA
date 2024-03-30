// Advocate password reset
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./PasswordReset.css";

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const navigate=useNavigate();

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    try {
        const response = await fetch('http://localhost:3001/resetpassword-Advocate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, dob: dob.toString(), phone, newPassword }),
          });

      const data = await response.json();

      if (response.ok) {
        console.log('Password reset successful:', data);
       
      alert('password Changed  successfully');
      navigate("/login/advocate");
      
      } else {
       
        console.error('Password reset failed:', data);
        alert("Password reset failed");
      }
    } catch (error) {
      console.error('Error during password reset:', error);
    }
  };

  return (
    <div className="centered-container">
    <div>
    <center>
      <h1>Password Reset</h1>
      <form onSubmit={handlePasswordReset}>
        <label className='elements'>Email:</label>
        <input style={{marginLeft:"30px"}}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />

        <label className='elements' style={{marginLeft:"-100px"}}>Date of Birth:</label>
        <input style={{marginLeft:"30px"}}
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
        <br />

        <label className='elements' style={{marginLeft:"-10px"}}>Contact:</label>
        <input  style={{marginLeft:"25px"}}
            type="text"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            />

        <br />

        <label className='elements'  style={{marginLeft:"-50px"}}>New Password:</label>
        <input style={{marginLeft:"20px",marginBottom:"30px"}}
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <br />

        <button type="submit">Reset Password</button>
      </form></center></div>
    </div>
  );
};

export default PasswordReset;
