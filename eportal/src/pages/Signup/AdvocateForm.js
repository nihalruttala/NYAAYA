import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdvocateForm.css';
import Navbar4 from '../../Components/Navbar4';
import TrackBox from '../../Components/Signupcomponents/TrackBox';

const API_BASE_URL = 'http://localhost:3001';
const SUBMIT_FORM_URL = `${API_BASE_URL}/signup/advocate`;


const AdvocateForm = () => {

  console.log('AdvocateForm component rendered');

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    state: 'Select State/Union Territory',
    gender: 'default',
    dob: '',
    barRegistrationNumber: '',

    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: '',
    lawyertype: '',
    experience: '',
    profileurl: 'https://',
    nalsa: 'default',
    education: '',
  });
  const [barnumber, setBarnumber] = useState('');
  const [error, setError] = useState('');
  const [error2, setError2] = useState('');

  const navigate = useNavigate();
  const clearError = () => {
    setError('');
  };

  const clearError2 = () => {
    setError2('');
  };
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const validatePhoneNumber = () => {
    const phoneNumberRegex = /^\d{10}$/;

    if (!phoneNumberRegex.test(formData.phone)) {
      setPhoneNumberError('Please enter a valid 10-digit phone number.');
    } else {
      setPhoneNumberError('');
    }
  };

  const handleNext = async (event) => {
    event.preventDefault();
    /// bar Registration Verfying
    try {
      const response = await fetch('http://localhost:3001/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ barRegistrationNumber: formData.barRegistrationNumber }),
      });

      const data = await response.json();

      if (response.ok && data.status === 'ok') {
        console.log('verified:', data);
        clearError();
        setError2('verified');
        setStep(step + 1);
      } else {
        console.error('not verified:', data);
        alert('Bar registration number: Not verified');
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

    try {
      // Verifying  OTP
      const otpVerificationResponse = await fetch(`${API_BASE_URL}/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, otp: parseInt(formData.otp, 10) }),
      });

      const otpVerificationData = await otpVerificationResponse.json();

      if (otpVerificationResponse.ok && otpVerificationData.status === 'ok') {

        try {
          const response = await fetch('http://localhost:3001/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ barRegistrationNumber: formData.barRegistrationNumber }),
          });

          const data = await response.json();

          if (response.ok && data.status === 'ok') {
            console.log('verified:', data);

            try {

              const submitResponse = await fetch(SUBMIT_FORM_URL, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
              });

              const submitData = await submitResponse.json();
              console.log(submitData.formData);
              console.log('Form submitted successfully:', submitData);

              if (submitData.status === 'error' && submitData.message) {
                alert(submitData.message);
              }

              if (submitData.status === 'ok') {
                alert('Submitted successfully');
                navigate("/login/advocate");
              }
            } catch (submitError) {
              console.error('Error submitting form:', submitError);
            }
          } else {
            console.error('not verified:', data);
            alert(' Bar registration number : Not verified ');
            setError('Not Verified');
          }
        } catch (error) {
          console.error('Error during verification:', error);
        }
      } else {
        console.error('OTP verification failed:', otpVerificationData);
        alert('OTP verification failed. Please enter the correct OTP.');
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      alert('An error occurred. Please try again.');
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

            <div className="step">



              <TrackBox step={step} setStep={setStep} />
              <div className="advocRightbox">


                <p className='bar'>BAR REGISTRATION</p>
                <div className="form-group row">


                  <label htmlFor="name" className="col-sm-3 col-form-label">Name:</label>

                  <div className="inputs col-sm-7">
                    <input type="text" className="form-control" id="name" placeholder="Enter Your Name" value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)} />
                  </div>
                </div>



                <div className="form-group row">
                  <label htmlFor="state" className="col-sm-3 col-form-label">Select State:</label>
                  <div className="inputs col-sm-7">
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
                  <label htmlFor="dob" className="col-sm-3 col-form-label">DOB:</label>
                  <input type="date" id="dob" name="dob" className='form-control' style={{marginTop:'0.5rem', width: '56%', marginLeft: '10px'}} value={formData.dob} onChange={(e) => handleInputChange('dob', e.target.value)} />
                  <br></br>
                </div>

                <div className="form-group row">
                  <label htmlFor="barRegistrationNumber" className="col-sm-9 col-form-label">Bar Registration Number:</label>
                  <div className="inputs col-sm-9 barverify">
                    <input
                      className="form-control"
                      id="barRegistrationNumber"
                      name="barnumber"
                      placeholder="State Code/Bar Code/Bar Year"
                      value={barnumber}
                      onChange={(e) => {
                        setBarnumber(e.target.value);
                        handleInputChange('barRegistrationNumber', e.target.value);
                      }}

                    />
                  </div>
                  <div>
                    {error2 && <p style={{ color: 'green' }}>{error2}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                  </div>

                </div>
                <button type="submit" className='saveNext ' onClick={handleNext}>Save and Next</button>

              </div>


            </div>


          </form>
        );

      case 2:
        return (
          <form onSubmit={handleform}>
            <div className="step">

              <TrackBox step={step} setStep={setStep} />

              <div className="advocRightbox">
                <p className='bar'>Profile Details</p>

                <div className="form-group row">
                  <label htmlFor="lawyertype" className="col-sm-3 col-form-label">Type Of Lawyer:</label>
                  <div className="inputs col-sm-7">
                    <select id='lawyertype' className="custom-select" style={{ height: '35px', width: '100%', textAlign: 'left' }} value={formData.lawyertype} onChange={(e) => handleInputChange('lawyertype', e.target.value)}>
                      <option value="" >Type of Lawyer</option>
                      <option value="Civil">Civil</option>
                      <option value="Criminal">Criminal</option>
                      <option value="Both">Both</option>
                    </select>
                  </div>
                </div>



                <div className="form-group row">
                  <label htmlFor="experience" className="col-sm-3 col-form-label">Years Of Experience:</label>
                  <div className="inputs col-sm-7">
                    <input type="text" id='experience' className="form-control" placeholder="experience" value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                    />
                  </div>

                </div>
                <div className="form-group row">
                  <label htmlFor="experience" className="col-sm-3 col-form-label">Educational Qualifications:</label>
                  <div className="inputs col-sm-7">
                    <input type="text" id='Educationalqualification' className="form-control" placeholder="Educational qualifications" value={formData.education}
                      onChange={(e) => handleInputChange('education', e.target.value)}
                    />
                  </div>

                </div>
                <div className="form-group row">
                  <label htmlFor="experience" className="col-sm-3 col-form-label">Linkedin Profile:</label>
                  <div className="inputs col-sm-7">
                    <input type="text" id='profileurl' className="form-control" placeholder="profile url" value={formData.profileurl}
                      onChange={(e) => handleInputChange('profileurl', e.target.value)}
                    />
                  </div>

                </div>
                <div className='popbuttons advbuttons'>
                  <button className='back' onClick={handleBack}>Back</button>
                  <button type="submit" className='saveNext' onClick={handleNext}>Save and Next</button>
                </div>
              </div>

            </div>
          </form>
        );

      case 3:
        return (
          <form onSubmit={handleform} >
            <div className="step">

              <TrackBox step={step} setStep={setStep} />


              <div className="advocRightbox">
                <p className='bar'>CONTACT DETAILS</p>

                <div className="advcontactContainer">
                  <div class="form-group row">
                    <label for="name" class="col-sm-3 col-form-label">Phone:</label>
                    <div class="inputs col-sm-7">
                      <input
                        type="text"
                        class="form-control"
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
                    <label for="name" className="col-sm-3 col-form-label" >Email ID:</label>

                    <div className="inputs col-sm-7">
                      <input type="email" className="form-control" id="inputPassword" placeholder="Enter Your Email ID" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} required />
                    </div>
                  </div>

              
                    <div className="form-group row">
                    <label htmlFor="nalsa" className="col-sm-3 col-form-label">National Legal Services Authority (NALSA):&nbsp; &nbsp;</label>
                    <div className="inputs col-sm-7">
                      <select id='nalsa' name="nalsa" className="custom-select" style={{ height: '35px', width: '100%', textAlign: 'left' }} value={formData.nalsa} onChange={(e) => handleInputChange('nalsa', e.target.value)}>
                        <option value="">select</option>
                        <option value="yes">YES</option>
                        <option value="no">NO</option>
                         {/* <label htmlFor="da">Differently abled&nbsp; &nbsp;</label> */}
                                  {/* <input
                              type="checkbox"
                              id="nalsa"
                              name="da"
                              style={{ transform: 'scale(1.5)' }}
                              checked={formData.nalsa}
                              onChange={(e) => handleInputChange('nalsa', e.target.checked)}
                            /> */}
                        
                      </select>
                      
                    </div>
                  </div>
                </div>
                <div className='contactButtons advbuttons'>
                  <button className='back' onClick={handleBack}>Back</button>

                  <button type="submit" className='saveNext' onClick={handleNext}>Save and Next</button>
                </div>
              </div>

            </div>
          </form>
        );

      case 4:
        return (
          <form onSubmit={handleSubmit}>
            <div className="step">

              <TrackBox step={step} setStep={setStep} />


              <div className="advocRightbox">
                <p className='bar'>CREATE PASSWORD <br />& OTP VERIFICATION</p>
                <div className="form-group row">
                  <label htmlForfor="name" className="col-sm-3 col-form-label">Password:</label>
                  <div className="inputs col-sm-7">
                    <input type="password" className="form-control" id="inputPassword" placeholder="Enter Your Password" value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)} required />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlForfor="name" className="col-sm-3 col-form-label">Confirm Password:</label>
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
                  <button type="submit" className='saveNext'>Submit</button>

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

export default AdvocateForm;


