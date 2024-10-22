import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import caseDoc from '../../Assets/loginicons/Lcasedoc.jpeg';
import casefiling from '../../Assets/loginicons/casefiling.jpeg';
import userIcon from '../../Assets/loginicons/litigantuser.jpeg';


const Advocatesidebar = ({switchComponent}) => {
  const location = useLocation();
  const emailFromLogin = location?.state?.email || localStorage.getItem('loggedInUserEmail') || '';
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate= useNavigate();
  
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/user2?email=${emailFromLogin}`);

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
    // Storing  email in localStorage
    localStorage.setItem('loggedInUserEmail', emailFromLogin);
  }, [emailFromLogin]);

  const handleLogout = () => {
   
    localStorage.removeItem('loggedInUserEmail');
    
    navigate('/login');
  };
const handlecasefile=() =>{
  navigate("/casefiling",{state:{emailFromLogin}})
}
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
          <p>Advocate</p>
          </div>
          
          <div>
   
          </div>
        <ul>
          
       
        <li><h3 onClick={() => switchComponent(0)}><img className='sidebarImg' src={userIcon} alt="User Info" /> &nbsp; User Info</h3></li>
        <li><h3 onClick={() => switchComponent(1)}><img className='sidebarImg' src={caseDoc} alt="Case Documents" />&nbsp;Case Documents</h3></li>
        {/* <li><Link to="/casefiling" style={{ textDecoration:"none"}}><h3 style={{color:"white" }}  ><img className='sidebarImg' src={casefiling} alt="Case Filing"  onClick={handlecasefile}/>&nbsp;Case Filing</h3></Link></li> */}
        <li><h3 style={{color:"white" }}  onClick={handlecasefile} ><img className='sidebarImg' src={casefiling} alt="Case Filing"  />&nbsp;Case Filing</h3></li>

          
        </ul>
        {/* <Link smooth to='/#home'><button className="logout"><b>⇤Log Out</b></button></Link> */}
        <button className="logout" onClick={handleLogout} ><b>⇤Log Out</b></button>
    
      </div>
    
    )}
    </section>
  )
}



export default Advocatesidebar