import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CaseTrackbox.css';

const CaseTrackbox = () => {
  const navigate = useNavigate();
  const [cnr, setCnr] = useState('');
  const [error, setError] = useState('');
 const handleOpenButtonClick = async () => {

console.log('cnr number:', cnr);
      try {
        const response = await fetch('http://localhost:3001/api/checkCNR', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cnr }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          
          console.log('success:', data);
           
           navigate('/casetracking', { state: { cnr} });
          
        } else {
                    setError('User not found. Please try again.');
                  }
                } catch (error) {
                  console.error('Error checking CNR:', error);
                  setError('Error checking CNR. Please try again later.');
                }
              };

  return (
    <div className="caseTbox">
      <h4>CASE TRACKING ACCESS</h4>
      <div className="caseTinbox">
        <div className="cnrInput">
          <h5>CNR:</h5>
          <input
            type="text"
            placeholder="Enter CNR"
            value={cnr}
            onChange={(e) => setCnr(e.target.value)}
          />
        </div>
        <div className="caseTlogin">
          <button onClick={handleOpenButtonClick}>OPEN</button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default CaseTrackbox;
