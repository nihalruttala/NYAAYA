import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { HashLink as Link } from 'react-router-hash-link';
import Navbar4 from '../../Components/Navbar4';
import './LitigantForm.css';
import TrackBox from '../../Components/Signupcomponents/TrackBox';

const API_BASE_URL = 'http://localhost:3001';
const SUBMIT_FORM_URL = `${API_BASE_URL}/signup/litigant`;


const LitigantForm = () => {
  console.log('litigiantForm component rendered');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    state: 'Select State/Union Territory',
    gender: 'default',
    dob: '',

    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: '',
  });
  const navigate = useNavigate();
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const validatePhoneNumber = () => {
    const phoneNumberRegex = /^\d{10}$/;

    if (!phoneNumberRegex.test(formData.phone)) {
      setPhoneNumberError('Please enter a valid 10-digit phone number.');
    } else {
      setPhoneNumberError('');
    }
  };



  const handleNext = (event) => {
    validatePhoneNumber();

    if (phoneNumberError) {
      event.preventDefault();
      return;
    }

    setStep(step + 1);
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
      // sending otp
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
      // verify otp
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
          navigate('/login/litigant');
        }
      } else {
        console.error('OTP verification failed:', otpVerificationData);
        alert('OTP verification failed. Please enter the correct OTP.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleform = (event) => {
    event.preventDefault();


  }


  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={handleform}>
            <Navbar4 />
            <div className="phoneNote">
              <p>Note: For any future use, please utilize only the registered mobile number.</p>
            </div>
            <div className="step">
            
              <TrackBox step={step} setStep={setStep} />

              <div className="litigantRightbox">
                <p className='bar'>PERSONAL DETAILS</p>
                  <div className="form-group row">
                    <label htmlFor="name" className="col-sm-3 col-form-label">Name:</label>
                    <div className="inputs col-sm-7">
                      <input type="name" className="form-control" id="inputPassword" placeholder="Enter Your Name" value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)} required />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="state" className="col-sm-3 col-form-label">Select State:</label>
                    <div className="inputs col-sm-7" >
                      <select id="state" name="state" className="custom-select" style={{ height: '35px', width: '100%', textAlign: 'left' }} value={formData.state} onChange={(e) => handleInputChange('state', e.target.value)}>
                        <option value="" >Select State/Union territory</option>
                        <option value="AndhraPradesh">Andhra Pradesh</option>
                        <option value="ArunachalPradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="HimachalPradesh">Himachal Pradesh</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="MadhyaPradesh">Madhya Pradesh</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="TamilNadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="UttarPradesh">Uttar Pradesh</option>
                        <option value="WestBengal">West Bengal</option>
                        <option value="AndamanNicobarIslands">Andaman and Nicobar Islands</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="DadraNagarHaveliDamanDiu">Dadra and Nagar Haveli and Daman and Diu</option>
                        <option value="Delhi">Govt of NCT of Delhi</option>
                        <option value="JammuKashmir">Jammu and Kashmir</option>
                        <option value="Ladakh">Ladakh</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Puducherry">Puducherry</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="gender" className="col-sm-3 col-form-label">Gender:</label>
                    <div className="inputs col-sm-7">
                      <select name="gender" id="gender" style={{ height: '35px', width: '100%' }} value={formData.gender} onChange={(e) => handleInputChange('gender', e.target.value)}>
                        <option value="default">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>

                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="name" className="col-sm-3 col-form-label">DOB:</label>

                    <input type="date" id="dob" name="dob" className='form-control' style={{ width: '56%', marginLeft: '10px'}} value={formData.dob} onChange={(e) => handleInputChange('dob', e.target.value)} required />
                    <br></br>

                  </div>
                <div>
                  <button type="submit" className='saveNext' onClick={handleNext}>Save and Next</button>
                </div>
              </div>
            </div>
          </form>
        );



      case 2:
        return (
          <form onSubmit={handleform}>
            <div className="phoneNote">
              <p>For Litigant: Your registration mobile number should be same as used in case, to access your case data.</p>
            </div>
            <div className="step">
              
              <TrackBox step={step} setStep={setStep} />


              <div className="litigantRightbox">
                <p className='bar'>CONTACT DETAILS</p>
                  <div className="contactContainer">
                    <div className="form-group row">
                      <label htmlFor="name" className="col-sm-3 col-form-label">Phone:</label>
                      <div className="inputs col-sm-7">
                        <input
                          type="text"
                          className="form-control"
                          id="inputPassword"
                          placeholder="Enter Your Phone Number"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          onBlur={validatePhoneNumber}
                          required
                        />
                        {phoneNumberError && <p style={{ color: 'red' }}>{phoneNumberError}</p>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="name" className="col-sm-3 col-form-label">Email ID:</label>
                      <div className="inputs col-sm-7">
                        <input type="email" className="form-control" id="inputPassword" placeholder="Enter Your Email ID" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} required />
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
            <div className="phoneNote">
              <p>For Litigant: Your registration mobile number should be same as used in case, to access your case data.</p>
            </div>
            <div className="step">
              
              <TrackBox step={step} setStep={setStep} />


              <div className="litigantRightbox">
                <p className='bar'>CREATE PASSWORD <br />& OTP VERIFICATION</p>
                  <div className="form-group row">
                    <label htmlFor="name" className="col-sm-3 col-form-label">Password:</label>
                    <div className="inputs col-sm-7">
                      <input type="password" className="form-control" id="inputPassword" placeholder="Enter Your Password" value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)} required />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="name" className="col-sm-3 col-form-label">Confirm Password:</label>
                    <div className="inputs col-sm-7">
                      <input type="password" className="form-control" id="inputPassword" placeholder="Re-Enter Password" value={formData.confirmPassword} onChange={(e) => handleInputChange('confirmPassword', e.target.value)} required />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="name" className="col-sm-7 col-form-label">OTP Authentication:</label>
                    <div className="otpInput inputs col-sm-12">

                      <button onClick={handleSendOTP}>Send OTP</button>
                      <input
                        type="text"
                        className="form-control"
                        id="inputOtp"
                        placeholder="Enter OTP"
                        value={formData.otp}
                        onChange={(e) => handleInputChange('otp', e.target.value)}
                        required
                      />
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

export default LitigantForm;