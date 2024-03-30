import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./Litigantsidebar.css";
import userIcon from '../../Assets/loginicons/litigantuser.jpeg';
import caseTrack from '../../Assets/loginicons/Lcasetrack.jpeg';
import caseDoc from '../../Assets/loginicons/Lcasedoc.jpeg';
import caselawyerprofile from '../../Assets/loginicons/Lprofiles.jpeg';





const Litigantsidebar = ({ switchComponent }) => {
  const location = useLocation();
  const emailFromLogin = location?.state?.email || localStorage.getItem('loggedInUserEmail') || '';
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/user1?email=${emailFromLogin}`);

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
        <div className="sidebar">

          <div className="Litigantprofile">

            <div className="profileImg">
            </div>
          </div>
          <div className="lsidebarName">
            <h3>
              {userData.name}
            </h3>
            <p>Litigant</p>
          </div>
          <ul>


            <li><h3 onClick={() => switchComponent(0)}><img className='sidebarImg' src={userIcon} alt="User Info" /> &nbsp; User Info</h3></li>
            <li><h3 onClick={() => switchComponent(1)}><img className='sidebarImg' src={caseTrack} alt="Case track" /> &nbsp; Case Tracking</h3></li>
            <li><h3 onClick={() => switchComponent(2)}><img className='sidebarImg' src={caseDoc} alt="Case Documents" />&nbsp;Case Documents</h3></li>
            <li><h3 onClick={() => switchComponent(3)}><img className='sidebarImg' src={caselawyerprofile} alt="Case Documents" />&nbsp;Lawyer Profile</h3></li>


          </ul>
          <button className="logout" onClick={handleLogout}><b>⇤Log Out</b></button>

        </div>
      )}

    </section>
  );
};

export default Litigantsidebar

