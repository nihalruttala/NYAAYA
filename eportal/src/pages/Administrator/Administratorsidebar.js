import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import userIcon from '../../Assets/loginicons/litigantuser.jpeg';
import update from '../../Assets/loginicons/update.jpeg';
import upload from '../../Assets/loginicons/upload.jpeg';
import "./Administratorsidebar.css";


const Administratorsidebar = ({ switchComponent }) => {

  const location = useLocation();
  const emailFromLogin = location?.state?.email || localStorage.getItem('loggedInUserEmail') || '';
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/user?email=${emailFromLogin}`);

        if (!response.ok) {
          if (response.status === 404) {
            setError('User not found.');
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        } else {
          const data = await response.json();
          if (data && Object.keys(data).length > 0) {
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
  }, [emailFromLogin]);

  useEffect(() => {
    // Storing  email in localStorage for further use 
    localStorage.setItem('loggedInUserEmail', emailFromLogin);
  }, [emailFromLogin]);
  const handleLogout = () => {

    localStorage.removeItem('loggedInUserEmail');

    navigate('/login');
  };
  return (
    <section>
      {error && <p>{error}</p>}
      {userData && (
        <div class="sidebar">
          <div className="Litigantprofile">
            <div className="profileImg">
            </div>
          </div>
          <div className="lsidebarName">
            <h3>
              {userData.name}
            </h3>
            <p>Administrator</p>
          </div>
          <div>
            <ul>
            <li><h3 onClick={() => switchComponent(0)}><img className='sidebarImg' src={userIcon} alt="User Info" /> &nbsp; User Info</h3></li>
            <li><h3 onClick={() => switchComponent(1)}><img className='sidebarImg' src={upload} alt="User Info" />&nbsp;Upload Case <br /> &nbsp; &nbsp;&nbsp;    Documents</h3></li>
            <li><h3 onClick={() => switchComponent(2)}><img className='sidebarImg' src={update} alt="User Info" />&nbsp; Update Case <br /> &nbsp; &nbsp;&nbsp; &nbsp;  Details</h3></li>

            </ul>
            <button className="logout" onClick={handleLogout}><b>⇤Log Out</b></button>
          </div>
        </div>
      )}
    </section>
  )
}



export default Administratorsidebar