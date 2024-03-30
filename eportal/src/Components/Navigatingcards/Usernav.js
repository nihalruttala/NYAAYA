// import React, { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import admin from '../../Assets/Admin.jpg';
import AdvocateImage from '../../Assets/advocate.jpg';
import LoginNavbar from './LoginNavbar';

import './Usernav.css';


const Usernav = ({ advocatePath, litigantPath, adminPath,buttonLabel }) => {
 
  return (
    <>
      <div className="userNavmain">

        <LoginNavbar/>
        <div className='mainTitle'>{buttonLabel}</div>
        <div className="loginCards">

        <Link to={advocatePath}>
          <div className="advocateloginCard">
            <img src={AdvocateImage} alt="advocatelogo" />
            <p>Advocate</p>
            <button className='cardButtons'>{buttonLabel}</button>
          </div>
        </Link>
        <Link to={litigantPath}>
          <div className="litigantloginCard">
          <h3>"Empower your voice,<br />file for justice - <br />your story, <br />your right, <br />your victory."</h3>
            <p>Litigant</p>
            <button className='cardButtons'>{buttonLabel}</button>
          </div>
        </Link>
        <Link to={adminPath}>
          <div className="adminloginCard">
            <img src={admin} alt="adminlogo" />
            <p>Court <br />Administrator</p>
            <button className='cardButtons'>{buttonLabel}</button>
          </div>
        </Link>
      </div>

</div>

    </>
  )
}

export default Usernav;