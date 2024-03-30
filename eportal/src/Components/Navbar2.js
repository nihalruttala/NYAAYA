import React, { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';

import AdministratorForm from './AdministratorForm';
import AdvocateForm from './AdvocateForm';
import LitigantForm from './LitigantForm';
import './Navbar2.css';

const Navbar2 = () => {
  const[selectedOption,setSelectedOption]=useState('advocate')

  const renderForm=()=>{
    switch(selectedOption){
      case 'advocate':
        return <AdvocateForm/>;
      case 'litigant':
        return <LitigantForm/>;
      case 'administrator':
        return <AdministratorForm/>;
      default:
        return null;
    }
  }
  return (
    <>
      <section className='navbar2'>
         <div className='regheads'>
          
        </div> 
        
        <div className="registrationform">
        <p><span className='icon'><i className="fa-solid fa-arrow-right"></i></span>REGISTRATION FORM</p>
        </div>
        <div className="options">
          <p>Register As :</p>
        <div className='radiogrp'>
        <div className="options1">
              <Link to="/signup/advocate">
                <input 
                type="radio"
                id="option1"
                name="radio-group"
                onChange={() => setSelectedOption('advocate')}
                checked={selectedOption==='advocate'}
              />
              </Link>
              <label htmlFor="option1">Advocate</label><br />
            </div>
            <div className="options2">
            <Link to="/signup/litigant">
              <input
                type="radio"
                id="option2"
                name="radio-group"
                onChange={() => setSelectedOption('litigant')}
                checked={selectedOption==='litigant'}
              />
              </Link>
              <label htmlFor="option2">Litigant</label><br />
            </div>
            <div className="options3">
            <Link to="/signup/administrator">
             
      
             
              <input
                type="radio"
                id="option3"
                name="radio-group"
                onChange={() => setSelectedOption('administrator')}
                checked={selectedOption==='administrator'}
              />
              </Link>
              <label htmlFor="option3">Court Administrator</label><br />
            </div>
        </div>
        </div>

      </section>
      {renderForm()}



    </>
  )
}

export default Navbar2;


