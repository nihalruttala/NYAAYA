import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../../pages/Administrator/Userinfo.css';


const UserInfo1 = () => {
  const location = useLocation();
  const emailFromLogin = location?.state?.email  || localStorage.getItem('loggedInUserEmail') || '';
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  console.log(emailFromLogin)

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
    // Storing  email in localStorage
    localStorage.setItem('loggedInUserEmail', emailFromLogin);
  }, [emailFromLogin]);
  const handleEditProfile = () => {
    // Navigate to edit profile page and pass user data as state
    navigate('/edit-profile2', { state: { emailFromLogin } });
  };

return (
  <div className="userInfo">
    {error && <p>{error}</p>}
    {userData && (
      <>
          
        
        <div className='Lprofile'>
        <div className="profile">
          </div>
          <div className='litigantName'>
            <h4>{userData.name}</h4>
            <p>Litigant</p>
          </div>
          <div className='Lbutton'>
          <button className='userInfobuttons' onClick={handleEditProfile}>✒Edit Profile</button>
          </div>
        </div>

        <div className="litigantDetails">
          <h5><b>EMAIL ID</b></h5>
          <br />
          <p>{userData.email || emailFromLogin}</p>
          <hr />
          <br />
          <h5><b>CONTACT</b></h5>
          <br />
          <p>{userData.phone}</p>
          <hr />
          <br />
          <h5><b>PASSWORD</b></h5>
          <br />
          <div className="Lpassword">
            <p>******</p>
            <p>🔑<button className='userInfobuttons'  type="button" onClick={() => navigate('/ChangePassword2', { state: { emailFromLogin} })}>Change Password</button></p>
          </div>
          <hr />
        </div>
      </>
    )}
  </div>
);
};



export default UserInfo1;