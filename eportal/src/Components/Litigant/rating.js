import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./rating.css";



const Rating = () => {
    const location = useLocation();
    const [rate, setRate] = useState(0);
    const [message, setMessage] = useState('');
    const [cnrNumber, setCnrNumber] = useState('');
    const [Error, setError ] = useState('');
    const emailFromcard = location?.state?.email   || '';
    console.log(emailFromcard)
    
    const navigate=useNavigate()
    
    
   

    const handleRatingChange = (event) => {
        setRate(event.target.value);
    };
 
  

    const handleCnrNumberChange = (event) => {
        setCnrNumber(event.target.value);
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:3001/api/ratings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rate, cnrNumber, email: emailFromcard }),
        });

        if (response.ok) {
            console.log('Rating submitted successfully');
            navigate('/litigantaccount');
        } else {
            const errorMessage = await response.text();
            
            console.error('Failed to submit rating:', errorMessage);
            setMessage('Failed to submit rating. Please try again.');
        }
    } catch (error) {
        console.error('Error submitting rating:', error);
        setMessage('An error occurred. Please try again later.');
    }
};

    return (
      <div className="bg d-flex flex-column justify-content-center align-items-center">
        <div className="r-container">
        <h1 className="head">Rate a Lawyer</h1>
          <form onSubmit={handleSubmit} className="d-flex flex-column justify-content-center align-items-center">
              <label className="ops">
                  CNR Number:
                  <input style={{marginLeft:"25px"}}
                      type="text"
                      value={cnrNumber}
                      onChange={handleCnrNumberChange}
                  />
              </label>
              <label className="ops">
                  Rating:
                  <select value={rate} onChange={handleRatingChange} style={{marginLeft:"65px"}}>
                      <option value="0">Select Rating</option>
                      <option value="1">1 star</option>
                      <option value="2">2 stars</option>
                      <option value="3">3 stars</option>
                      <option value="4">4 stars</option>
                      <option value="5">5 stars</option>
                  </select> 
              </label>
              <button type="submit" className="butn">Submit Rating</button>
          </form>
          <p>{message}</p>
        </div>
      </div>
    );
};

export default Rating;