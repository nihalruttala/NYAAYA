

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { HashLink as Link } from 'react-router-hash-link';
import Navbar4 from '../../Components/Navbar4';
import './AdministratorForm.css';
import TrackBox from '../../Components/Signupcomponents/TrackBox';


const API_BASE_URL = 'http://localhost:3001'; 
const SUBMIT_FORM_URL = `${API_BASE_URL}/signup/administrator`;


const AdministratorForm= () => {
  console.log('AdminstrationForm component rendered');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    // state: 'Select State/Union Territory',
    gender: 'default',
    dob: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: '',
    
    employeeid:'',

  });

  const navigate=useNavigate();
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const validatePhoneNumber = () => {
    const phoneNumberRegex = /^\d{10}$/;
  
    if (!phoneNumberRegex.test(formData.phone)) {
      setPhoneNumberError('Please enter a valid 10-digit phone number.');
    } else {
      setPhoneNumberError('');
    }
  };

  
  const [error, setError] = useState('');
  const [error2, setError2] = useState('');
  
  
  const clearError = () => {
    setError('');
  };
  
  const clearError2 = () => {
    setError2('');
  };
  const handleNext = async (event) => {
    event.preventDefault();
    /// bar Registration Verfying
    try {
      const response = await fetch('http://localhost:3001/verifyid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employeeid: formData.employeeid }),
      });
  
      const data = await response.json();
  
      if (response.ok && data.status === 'ok') {
        console.log('verified:', data);
        clearError();
        setError2('verified');
        setStep(step + 1);
      } else {
        console.error('not verified:', data);
        alert('Employee Id: Not verified');
        setError('Not Verified');
        clearError2();
      }
    } catch (error) {
      console.error('Error during verification:', error);
    }
    validatePhoneNumber();

    if (phoneNumberError) {
      event.preventDefault();
      return;
    }
  
    
    event.preventDefault();
    
  };
   
  const handleBack = () => {
    setStep(step - 1);
  };
  
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  
  };

  const handleSendOTP = async (event) => {
    event.preventDefault();
  
    try {
      /// sending otp
      const otpResponse = await fetch(`${API_BASE_URL}/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });
  
      const otpData = await otpResponse.json();
  
      if (otpResponse.ok && otpData.status === 'ok') {
        alert('OTP sent successfully!');
      } else {
        alert('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('An error occurred. Please try again.');
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
  
    try {
     /// verifing otp 
      const otpVerificationResponse = await fetch(`${API_BASE_URL}/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, otp: parseInt(formData.otp, 10) }),
      });
  
      const otpVerificationData = await otpVerificationResponse.json();
  
      if (otpVerificationResponse.ok && otpVerificationData.status === 'ok') {
      
        const response = await fetch(SUBMIT_FORM_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
  
        const data = await response.json();
        console.log('Form submitted successfully:', data);
  
        if (data.status === 'error' && data.message) {
          alert(data.message);
        }
  
        
  
        if (data.status === 'ok') {
          alert('Submitted successfully');
          navigate('/login/administrator');
        }
      } else {
        console.error('OTP verification failed:', otpVerificationData);
        alert('OTP verification failed. Please enter the correct OTP.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  
  const handleform = (event)=>
  {
    event.preventDefault();
   
  } 

const renderStep = () => {
  switch (step) {
    case 1:
      return (
        <form onSubmit={handleform}>
        <Navbar4/>
         <div className="step">
          
              <TrackBox step={step} setStep={setStep} />
 
           <div className="litigantRightbox">
             <p className='bar'>PERSONAL DETAILS</p>
               <div className="form-group row">
                 <label htmlFor="name" className="col-sm-3 col-form-label">Name:</label>
                 <div className="inputs col-sm-7">
                   <input type="name" className="form-control" id="name" placeholder="Enter Your Name"  value={formData.name}
           onChange={(e) => handleInputChange('name', e.target.value)} required />
                 </div>
               </div>
 
               {/* <div className="form-group row">
                 <label htmlFor="courtname" className="col-sm-3 col-form-label">Court Name:</label>
                 <div className="inputs col-sm-7" >
                <input type="text" className="form-control" placeholder='Court Name' value={formData.courtname} onChange={(e) => handleInputChange('courtname', e.target.value)} required />
                 </div>
               </div> */}
               <div className="form-group row">
                 <label htmlFor="employeeid" className="col-sm-3 col-form-label">Employee ID:</label>
                 <div className="inputs col-sm-7" >
                <input type="text" className="form-control" placeholder='employee id' value={formData.employeeid} onChange={(e) => handleInputChange('employeeid', e.target.value)} required />
                 </div>
                 {/* <div className="employee_ver col-sm-2 inputs  ">
                  <button>Verify</button>
                 </div> */}
                 </div>
               {/* <div className="form-group row">
                 <label htmlFor="gender" className="col-sm-3 col-form-label">Gender:</label>
                 <div className="inputs col-sm-7">
                   <select name="gender" id="gender" style={{ height: '35px', width: '100%' }}  value={formData.gender} onChange={(e) => handleInputChange('gender', e.target.value)}>
                     <option value="default">Select Gender</option>
                     <option value="male">Male</option>
                     <option value="female">Female</option>
                     <option value="other">Other</option>
                   </select>
 
                 </div>
               </div> */}
               {/* <div className="form-group row">
                 <label htmlFor="name" className="col-sm-3 col-form-label">DOB:</label>
                 
                 <input type="date"  id="dob" name="dob" className='form-control' style={{ width: '56%', marginLeft:'10px',backgroundColor:'grey'}} value={formData.dob} onChange={(e) => handleInputChange('dob', e.target.value)} required/>
                 <br></br>
                 
               </div> */}
             {error2 && <p style={{ color: 'green' }}>{error2}</p>}
              {error && <p style={{ color: 'red' }}>{error}</p>}
             <div>
               <button  type="submit" className='saveNext' onClick={handleNext}>Save and Next</button>
             </div>
           </div>
         </div>
         </form>
      );

 

    case 2:
      return (
        <form onSubmit={handleform}>
        <Navbar4/>
        <div className="step">
          
              <TrackBox step={step} setStep={setStep} />

          <div className="litigantRightbox">
            <p className='bar'>CONTACT DETAILS</p>
            
            <div className="admcontactContainer">
              <div className="form-group row">
                <label htmlFor="name" className="col-sm-3 col-form-label">Phone:</label>
                <div className="inputs col-sm-7">
                  <input type="number" className="form-control" id="inputPassword" placeholder="Enter Your Phone Number" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} onBlur={validatePhoneNumber} required />
                  {phoneNumberError && <p style={{color:'red'}}>{phoneNumberError}</p>}
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="name" className="col-sm-3 col-form-label">Email ID:</label>
                <div className="inputs col-sm-7">
                  <input type="email" className="form-control" id="inputPassword" placeholder="Enter Your Email ID"   value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} required />
                </div>
              </div>
              </div>
            
            <div className='advbuttons'>
              <button className='back' onClick={handleBack}>Back</button>
              <button type="submit" className='saveNext' onClick={handleNext}>Save and Next</button>
            </div>
          </div>

        </div>
        </form>
      );

    case 3:
      return (
        <form onSubmit={handleSubmit}>
       <Navbar4/>
        <div className="step">
          
              <TrackBox step={step} setStep={setStep} />

          <div className="litigantRightbox">
            <p className='bar'>CREATE PASSWORD <br />& OTP VERIFICATION</p>
              <div className="form-group row">
                <label htmlFor="name" className="col-sm-3 col-form-label">Password:</label>
                <div className="inputs col-sm-7">
                  <input type="password" className="form-control" id="inputPassword" placeholder="Enter Your Password" value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}  required />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="name" className="col-sm-3 col-form-label">Confirm Password:</label>
                <div className="inputs col-sm-7">
                  <input type="password" className="form-control" id="inputPassword" placeholder="Re-Enter Password" value={formData.confirmPassword} onChange={(e) => handleInputChange('confirmPassword', e.target.value)}  required />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="name" className="col-sm-7 col-form-label">OTP Authentication:</label>
                <div className="otpInput inputs col-sm-12">
                  <button onClick={handleSendOTP}>Send OTP</button>
                  <input type="text" className="form-control" id="inputOtp" placeholder="Enter OTP" value={formData.otp} onChange={(e) => handleInputChange('otp', e.target.value)} required   />
                </div>
              </div>
            <div className='advbuttons'>
              <button className='back' onClick={handleBack}>Back</button>
              <button type="submit" className='saveNext' >Save and Submit</button>
              
            </div>
          </div>

        </div>
        </form>
      );



    default:
      return null;
  }
};

return (
  <div>
    {renderStep()}
  </div>
);
}

export default AdministratorForm;