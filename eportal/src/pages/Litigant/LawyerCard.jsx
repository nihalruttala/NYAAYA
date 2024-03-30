import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LawyerCard = ({ name, lawyertype, imageUrl, email, phone, experience, profileurl, education }) => {
  const navigate = useNavigate();
  const [averageRating, setAverageRating] = useState(null);
  const [fontSize, setFontSize] = useState(16);
  console.log(averageRating)

  useEffect(() => {
    // Fetch average rating data when the component mounts
    const fetchAverageRating = async () => {
      try {
        const response = await fetch(`http://localhost:3001/ratings/average/${encodeURIComponent(email)}`);
        if (response.ok) {
          const data = await response.json();
          setAverageRating(data.averageRating);
        } else {
          throw new Error('Failed to fetch average rating');
        }
      } catch (error) {
        console.error('Error fetching average rating:', error);
      }
    };

    fetchAverageRating();
  }, [email]);

  useEffect(() => {
    
    const calculateFontSize = () => {
      const length = education.length;
      const baseFontSize = 40; 
      const maxLength = 20; 
      const reductionFactor = 0.5; 

      if (length > maxLength) {
        const newSize = baseFontSize - (length - maxLength) * reductionFactor;
        setFontSize(newSize < 10 ? 10 : newSize); 
      }
    };

    calculateFontSize();
  }, [education]);

  const request = (event) => {
    navigate('/requestform', { state: { email } });
  };

  const navigateToRating = (event) => {
    navigate('/Rating', { state: { email } });
  };
  const renderRatingStars = () => {
    const rating = Math.round(averageRating); 
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      // if (i <= rating) {
      //   stars.push(<i key={i} className="fa fa-star" aria-hidden="true"></i>);
      // } else {
      //   stars.push(<i key={i} className="fa fa-star-o" aria-hidden="true"></i>);
      // }
      if (i <= rating) {
        stars.push(<i key={i} className="fa fa-star" aria-hidden="true"></i>);
      } else if (i === Math.ceil(averageRating) && !Number.isInteger(averageRating)) {
        stars.push(<i key={i} className="fa fa-star-half-o" aria-hidden="true"></i>);
      } else {
        stars.push(<i key={i} className="fa fa-star-o" aria-hidden="true"></i>);
      }
    }
    return stars;
  };
  return (
    <div className="lawyerCard d-flex flex-row">
      <div className="d-flex flex-row justify-content-start">
          <div className="content">
            <b><h2 className='cardName'>{name} </h2></b>
            <div className="cardInline">
              <p className='cardSpecialization'>{lawyertype}</p>
            </div>
            <div className="cardInline">
            <p style={{ fontSize }}>{education}</p>
            {/* <p>{education}</p> */}
            </div>
            <p><i class="fa fa-envelope icon" aria-hidden="true"></i>{email}</p>
            <p><i class="fa fa-phone icon" aria-hidden="true"></i>{phone}</p>
            {/* <p><i class="fa fa-linkedin-square icon" aria-hidden="true"></i>{profileurl}</p> */}
            <p><a href={profileurl} target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin-square icon" aria-hidden="true"></i>{profileurl}</a></p>
          </div>
      </div>

      
      <div className="rating d-flex flex-row justify-content-end">  
        <div className="lawyerRatings">
          <div className="star cardInline d-flex flex-row" style={{ marginBottom: '10px' }}>
            {averageRating && renderRatingStars()}
            {/* <p>Average Rating: {averageRating}</p> */}
            {averageRating && <p style={{ marginTop:'-7px', marginLeft:'10px', fontSize: '30px' }}>{averageRating.toFixed(1)}</p>}
          </div>
          <div className="cardInline">
            <p>{experience}<br />Years of Experience</p>&nbsp;&nbsp;&nbsp;
          </div>
          <div className="d-flex flex-row">
            <button onClick={request} className="butn">Request</button>
            <button className="butn" onClick={navigateToRating} >Rating</button>
          </div>
        </div>
      </div>
    </div>
  );

};

export default LawyerCard;