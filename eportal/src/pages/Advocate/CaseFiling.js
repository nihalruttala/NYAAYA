import React, { useState } from 'react';
import Navbar4 from '../../Components/Navbar4';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import './CaseFiling.css';




const Casefiling = () => {
  const location = useLocation();
  const emailFromsidebar = location?.state?.emailFromLogin  ||  '';
  console.log("casefile",emailFromsidebar)

  const [activeTab, setActiveTab] = useState(1);
  const [formData, setFormData] = useState({
    state: 'Select State',
    district: '',
    establishment: '',
    establishmentemail: '',
    caseType: '',
    reliefSought: '',
    appellantRespondant: '',
    mobileNo: '',

    litigantType: '',
    accused: '',
    name: '',
    relation: '',
    age: '',
    dob: '',
    gender: '',
    caste: '',
    differentlyAble: false,
    email: '',
    phone: '',
    occupation: '',
    address: '',
    pincode: '',
    litigantState: '',
    litigantDistrict: '',
    taluka: '',
    village: '',

    partyName: '',
    heirType: '',
    heirName: '',
    name2: '',
    relation2: '',
    heirAge: '',
    heirDob: '',
    heirGender: '',
    heirCaste: '',
    heirDifferentlyAble: false,
    heirEmail: '',
    heirPhone: '',
    heirOccupation: '',
    heirAddress: '',
    heirPincode: '',
    heirState: '',
    heirDistrict: '',
    heirTaluka: '',
    heirVillage: '',

    factDate: '',
    factTime: '',
    fact: '',

    actionCause: '',
    reason: '',
    actionDate: '',
    disputeState: '',
    disputeDistrict: '',
    disputeTaluka: '',
    disputeVillage: '',
    act: '',
    section: '',
    CnrNumber: '',
    uniqueCode: ''

  });
  const navigate = useNavigate();
  const handleTabChange = (tabNumber) => {
   if(tabNumber!==6){
      setActiveTab(tabNumber);}
    
  };
  const savenext=()=>{
    const generateRandomCode = (length) => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let randomCode = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomCode += characters.charAt(randomIndex);
      }
      return randomCode;
    };
  
    // Set the length of the alphanumeric code
    const codeLength = 10; // You can adjust the length
  
    // Generate and set CNR number
    const generatedCnrNumber = 'CNR' + generateRandomCode(codeLength);
    handleChange('CnrNumber', generatedCnrNumber);
    //
    
      // Check if the method is available in the current environment
      if (window.crypto && window.crypto.getRandomValues) {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        let uniqueCode = array[0].toString().replace(/\D/g, ''); // Extract only numeric characters
        uniqueCode = uniqueCode.substring(0, 6); // Ensure the length is 6
        // Use uniqueCode as needed
        handleChange('uniqueCode', uniqueCode); // Update the state with the generated unique code
      } else {
        // Fallback to Math.random() for environments that don't support crypto.getRandomValues
        let uniqueCodeFallback = Math.floor(Math.random() * 1000000).toString().replace(/\D/g, ''); // Extract only numeric characters
        uniqueCodeFallback = uniqueCodeFallback.substring(0, 6); // Ensure the length is 6
        // Use uniqueCodeFallback as needed
        handleChange('uniqueCode', uniqueCodeFallback); // Update the state with the generated unique code
      }
    
    setActiveTab(6);
    console.log(generatedCnrNumber)
   

  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // Check if all required fields are filled
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (formData[key] === '') {
          alert('Please fill in all fields before submitting the form.');
          return; // Exit the function early if any field is empty
        }
      }
    }
    try {
      // Make a POST request to the backend server for case filing
      const caseFilingResponse = await fetch('http://localhost:3001/api/casefiling', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // Process the case filing response as needed
      const caseFilingData = await caseFilingResponse.json();
      console.log('Case Filing Response:', caseFilingData);
  
      // Make a POST request to the backend server for email submission
     
       
      // Process the email response as needed
      // const emailData = await emailResponse.json();
      
      if (caseFilingResponse.ok) {
      // Optionally, you can handle success or navigate to another page
      const emailResponse = await fetch('http://localhost:3001/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({formData,email:emailFromsidebar}),
      });
      alert("Case Filed Successfully your Cnr Number and Unique Code required to access the data regarding your case has been sent to your e-mail")
      navigate('/caselegalform', { state: { formData } })
      const emailData = await emailResponse.json();
      console.log('Email Response:', emailData);
    } 

    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Handle error
    }
  };


  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleNextTab = () => {
    const nextTab = activeTab < 6 ? activeTab + 1 : 1;
    console.log(formData)
    setActiveTab(nextTab);

  };
 


  const tabNames = [
    'Establishment',
    'Litigant Details',
    'Legal Heir Details',
    'Fact Details',
    'Case Details',
    'Submit'

  ];


  const states = ['Select State',
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands',
    'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep', 'Delhi', 'Puducherry'
  ];
  const caste = ["Select a Caste", "OBC", "OC", "SC", "ST"];

  const renderTabContent = () => {

    switch (activeTab) {
      case 1:
        return (
          
          <div>
            <form className='caseform'>
              <h6 style={{ color: "red", marginLeft: "20px", paddingTop: "20px" }}>Note:This tab is compulsory.</h6>
              <div className='sideheads'>
                <b>Establishment</b>
              </div>
              <div>
                <label className="formfields" htmlFor="state">State &nbsp; &nbsp;</label>
                <select
                  id="state"
                  name="state"
                  required
                  value={formData.state}
                  onChange={(e) => handleChange('state', e.target.value)}>
                  <option value="" disabled>
                    Select a state
                  </option>
                  {states.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                <label className="formfields" htmlFor="District">District &nbsp; &nbsp;</label>
                <input type="" id="" name="" value={formData.district}
                  onChange={(e) => handleChange('district', e.target.value)} />
                <label className="formfields" htmlFor="establishment">Establishment &nbsp; &nbsp;</label>
                <input type="" id="" name="" value={formData.establishment}
                  onChange={(e) => handleChange('establishment', e.target.value)} />
                  <label className="formfields" htmlFor="establishment">Establishment-email &nbsp; &nbsp;</label>
                <input type="" id="" name="" value={formData.establishmentemail}
                  onChange={(e) => handleChange('establishmentemail', e.target.value)} />
              </div>
              <div className='sideheads'>
                <b>Case Types</b>

              </div>

              <div style={{ marginTop: "40px" }}>

                <label className="formfields" htmlFor="casetype">
                  Case Type &nbsp; &nbsp;
                </label>
                <input
                  type="radio"
                  name="caseType"
                  value="Civil"
                  checked={formData.caseType === "Civil"}
                  onChange={(e) => handleChange('caseType', e.target.value)}
                />
                <label>Civil&nbsp; &nbsp;</label>
                <input
                  type="radio"
                  name="CaseType"
                  value="Criminal"
                  checked={formData.caseType === "Criminal"}
                  onChange={(e) => handleChange('caseType', e.target.value)}
                />
                <label>Criminal</label>



                <label style={{ marginLeft: "500px" }} htmlFor="rs">Relief Sought &nbsp; &nbsp;</label>
                <input type="" id="" name="reliefsought" value={formData.reliefSought}
                  onChange={(e) => handleChange('reliefSought', e.target.value)} />
              </div>
              <div style={{ marginTop: "40px" }} className='sideheads'>
                <b>Party Details</b>
              </div>
              <label className="formfields" htmlFor="a/r">Appellant/Respondent &nbsp; &nbsp;</label>
              <input type="" name="" value={formData.appellantRespondant}
                onChange={(e) => handleChange('appellantRespondant', e.target.value)} />

              <label style={{ marginLeft: "370px" }} htmlFor="rs">Mobile No. &nbsp; &nbsp;</label>
              <input type="" id="rs" name="rs" value={formData.mobileNo}
                onChange={(e) => handleChange('mobileNo', e.target.value)} />

            </form>

          <div className="csButtons">
            <Link to ="/advocateaccount">
              <button  className='back casefilingBack' style={{marginLeft: "3rem"}}> 
                back
              </button>
            </Link>
            
            <button className="nexttabbtn" onClick={handleNextTab}>
              Next➜
            </button>
          </div>
          </div>
          
        );
      case 2:
        return (
          <div>
            
            <form  className='caseform'>
              <h6 style={{ color: "red", marginLeft: "20px", paddingTop: "20px" }}>
                Note:This tab is compulsory.</h6>
              <label style={{ paddingLeft: "80px", paddingTop: "30px" }}>Type&nbsp; &nbsp;</label>

              <input

                type="radio"
                name="litigantType"
                value="Appellant"
                checked={formData.litigantType === "Appellant"}
                onChange={(e) => handleChange('litigantType', e.target.value)}
              />
              <label>Appellant &nbsp; &nbsp;</label>

              <input
                type="radio"
                name="litigantType"
                value="Respondent"
                checked={formData.litigantType === "Respondent"}
                onChange={(e) => handleChange('litigantType', e.target.value)}
              />
              <label>Respondent</label>

              <div className='sideheads'>
                <b>Personal Details</b>
              </div>
              <div>
                <label className="formfields" htmlFor="accusedname">Accused </label>
                <input style={{ marginLeft: "40px" }} type="text" id="accusedname" name="accusedname"
                  value={formData.accused}
                  onChange={(e) => handleChange("accused", e.target.value)} /><br /><br />
                <label className="formfields" htmlFor="relation">Relation</label>
                <input style={{ marginLeft: "40px" }} type="text" id="relation" name="relation"
                  value={formData.relation}
                  onChange={(e) => handleChange("relation", e.target.value)}
                /><br /><br />
                <label className="formfields" >Date of birth&nbsp;&nbsp;</label>
                <input type="date"  name="dob" value={formData.dob}
                  onChange={(e) => handleChange("dob", e.target.value)} /><br /><br />
                <label className="formfields" htmlFor="caste">Caste</label>
                <select style={{ marginLeft: "59px" }}
                  id="caste"
                  name="caste"
                  required
                  value={formData.caste}
                  onChange={(e) => handleChange('caste', e.target.value)}
                >
                  {caste.map((caste, index) => (
                    <option key={index} value={caste}>
                      {caste}
                    </option>
                  ))}
                </select>
                <div className='leftside'>
                  <label htmlFor="name">Name&nbsp; &nbsp;</label>
                  <input type="text" id="" name="" value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)} /><br /><br />
                  <label htmlFor="age">Age</label>
                  <input style={{ marginLeft: "27px", width: "50px" }} type="number" id="age" name="age" value={formData.age}
                    onChange={(e) => handleChange("age", e.target.value)} /><br /><br />

                  <label htmlFor="gender">Gender&nbsp; &nbsp;</label>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    onChange={() => handleChange('gender', 'Male')}
                    checked={formData.gender === 'Male'}
                  />
                  <label>Male &nbsp;</label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    onChange={() => handleChange('gender', 'Female')}
                    checked={formData.gender === 'Female'}
                  />
                  <label>Female&nbsp;&nbsp;</label>
                  <input
                    type="radio"
                    id="Other"
                    name="gender"
                    onChange={() => handleChange('gender', 'Other')}
                    checked={formData.gender === 'Other'}
                  />
                  <label>Other</label><br /><br />
                  
                  <label htmlFor="da">Differently abled&nbsp; &nbsp;</label>
                  <input
                  type="radio"
                    id="yes"
                    name="da"
                    onChange={() => handleChange('differentlyAble', 'yes')}
                    checked={formData.differentlyAble === 'yes'}

                    // type="checkbox"
                    // id="da"
                    // name="da"
                    // style={{ transform: 'scale(1.5)' }}
                    // checked={formData.differentlyAble}
                    // onChange={(e) => handleChange('differentlyAble', e.target.checked)}
                  />
                  <label>yes &nbsp;</label>
                  <input
                  type="radio"
                    id="no"
                    name="da"
                    onChange={() => handleChange('differentlyAble', 'no')}
                    checked={formData.differentlyAble === 'no'}
                  />
                  <label>no &nbsp;</label>
                </div>
                <div className='sideheads'>
                  <b>Contact Details</b>
                </div>

                <label className="formfields" htmlFor="email">Email</label>
                <input style={{ marginLeft: "60px" }} type="email" id="email" name="email" value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)} /><br /><br />
                <label className="formfields" htmlFor="occ">Occupation &nbsp; &nbsp;</label>
                <input type="occ" id="occ" name="occ" value={formData.occupation}
                  onChange={(e) => handleChange('occupation', e.target.value)} /><br />
                <label className='formfields' htmlFor='address'>Address</label>
                <br />
                <textarea style={{ marginLeft: "200px" }} id="address" name="address" rows="2" cols="30" required value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}></textarea>
                <div style={{ marginTop: "-130px" }} className='leftside'>
                  <label htmlFor="phn">Mobile No.&nbsp;&nbsp;</label>
                  <input type="number" id="phn" name="phn" value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)} /><br /><br />
                  <label htmlFor="pin">Pin code&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                  <input type="number" id="pin" name="pin" value={formData.pincode}
                    onChange={(e) => handleChange('pincode', e.target.value)} />
                </div>
                <div style={{ marginTop: "70px" }} className='sideheads'>
                  <b>State Information</b>
                </div>
                <div className='formfields'>
                  <label htmlFor="state">State&nbsp;&nbsp;&nbsp;&nbsp;</label>
                  <input type="text" id="state" name="state" value={formData.litigantState}
                    onChange={(e) => handleChange("litigantState", e.target.value)} /><br /><br />
                  <label htmlFor="taluka">Taluka&nbsp;&nbsp;</label>
                  <input type="text" id="taluka" name="taluka" value={formData.taluka}
                    onChange={(e) => handleChange("taluka", e.target.value)} />
                </div>
                <div style={{ marginTop: "-80px" }} className='leftside'>
                  <label htmlFor="dis">District&nbsp;&nbsp;&nbsp;&nbsp;</label>
                  <input type="text" id="dis" name="dis" value={formData.litigantDistrict}
                    onChange={(e) => handleChange("litigantDistrict", e.target.value)} /><br /><br />
                  <label htmlFor="vlg">Village&nbsp;&nbsp;&nbsp;&nbsp;</label>
                  <input type="text" id="vlg" name="vlg" value={formData.village}
                    onChange={(e) => handleChange("village", e.target.value)} />
                </div>
              </div>
            </form>

            <button  className=" caseFilingnxt nexttabbtn" onClick={handleNextTab}>
              Next ➜
            </button>
          </div>
        );

      case 3:
        return (
          <div>
            <form  className='caseform'>
              <h6 style={{ color: "red", marginLeft: "20px", paddingTop: "20px" }}>Note:Legal heir details tab.</h6>
              <label style={{ marginLeft: "80px", paddingTop: "30px" }}>Party Name &nbsp; &nbsp;</label>
              <input type="text" id="partyname" name="partyname" value={formData.partyName}
                onChange={(e) => handleChange("partyName", e.target.value)} />
              <div className='sideheads'>
                <b>Personal Details</b>
              </div>
              <div>
                <label style={{ marginLeft: "100px", paddingTop: "10px" }}>Type &nbsp; &nbsp;</label>
                <input type="radio" name="heirType" value="Plaintiff"
                  checked={formData.heirType === "Plaintiff"}
                  onChange={(e) => handleChange('heirType', e.target.value)} />
                <label>Plaintiff &nbsp; &nbsp;</label>

                <input type="radio" name="heirType" value="Defendent"
                  checked={formData.heirType === "Defendent"}
                  onChange={(e) => handleChange('heirType', e.target.value)} />
                <label>Defendent</label><br />
                <br />
                <label className="formfields" htmlFor="heirName">Legal Heir Name</label>
                <input style={{ marginLeft: "40px" }} type="text" id="heirName" name="heirName" value={formData.heirName}
                  onChange={(e) => handleChange('heirName', e.target.value)} /><br /><br />

                <label className="formfields" htmlFor="relation">Relation</label>
                <input style={{ marginLeft: "100px" }} type="text" id="relation" name="relation" value={formData.relation2}
                  onChange={(e) => handleChange('relation2', e.target.value)} /><br /><br />
                <label className="formfields" >Date of birth&nbsp;&nbsp;</label>

                < input style={{ marginLeft: "60px" }} type="date"  name="heirDob" value={formData.heirDob}
                  onChange={(e) => handleChange("heirDob", e.target.value)} /><br /><br />
                <label className="formfields" htmlFor="caste">Caste</label>
                <select style={{ marginLeft: "118px" }}
                  id="caste"
                  name="caste"
                  required
                  value={formData.heirCaste}
                  onChange={(e) => handleChange('heirCaste', e.target.value)}>
                  {caste.map((caste, index) => (
                    <option key={index} value={caste}>
                      {caste}
                    </option>
                  ))}
                </select>


                <div className='leftside'>
                  <label htmlFor="name">Name&nbsp; &nbsp;</label>
                  <input type="text" id="name" name="name" value={formData.name2}
                    onChange={(e) => handleChange('name2', e.target.value)} /><br /><br />
                  <label htmlFor="age">Age</label>
                  <input style={{ marginLeft: "27px", width: "50px" }} type="number" id="age" name="heirAge" value={formData.heirAge}
                    onChange={(e) => handleChange('heirAge', e.target.value)} /><br /><br />
                  <label htmlFor="gender">Gender&nbsp; &nbsp;</label>

                  <input
                    type="radio"
                    id="male"
                    name="heirGender"
                    onChange={() => handleChange('heirGender', 'Male')}
                    checked={formData.heirGender === 'Male'}
                  />
                  <label>Male &nbsp;</label>
                  <input
                    type="radio"
                    id="female"
                    name="heirGender"
                    onChange={() => handleChange('heirGender', 'Female')}
                    checked={formData.heirGender === 'Female'}
                  />
                  <label>Female&nbsp;&nbsp;</label>
                  <input
                    type="radio"
                    id="Other"
                    name="heirGender"
                    onChange={() => handleChange('heirGender', 'Other')}
                    checked={formData.heirGender === 'Other'}
                  />
                  <label>Other</label><br /><br />
                  <label htmlFor="da">Differently abled&nbsp; &nbsp;</label>
{/* 
                  <input
                    type="checkbox"
                    id="da"
                    name="da"
                    style={{ transform: 'scale(1.5)' }}
                    checked={formData.heirDifferentlyAble}
                    onChange={(e) => handleChange('heirDifferentlyAble', e.target.checked)}
                  /> */}
                  <input
                  type="radio"
                    id="yes"
                    name="da"
                    onChange={() => handleChange('dheirDifferentlyAble', 'yes')}
                    checked={formData.heirDifferentlyAble === 'yes'}
                      
                    />
                  <label>yes &nbsp;</label>
                  <input
                  type="radio"
                    id="no"
                    name="da"
                    onChange={() => handleChange('heirDifferentlyAble', 'no')}
                    checked={formData.heirDifferentlyAble === 'no'}
                  />
                  <label>no &nbsp;</label>
                </div>

                <div className='sideheads'>
                  <b>Contact Details</b>
                </div>
                <label className="formfields" htmlFor="email">Email</label>
                <input style={{ marginLeft: "60px" }} type="email" id="email" name="heirEmail" value={formData.heirEmail}
                  onChange={(e) => handleChange('heirEmail', e.target.value)} /><br /><br />
                <label className="formfields" htmlFor="occ">Occupation &nbsp; &nbsp;</label>
                <input type="occ" id="occ" name="occ" value={formData.heirOccupation}
                  onChange={(e) => handleChange('heirOccupation', e.target.value)} /><br />
                <label className='formfields' htmlFor='address'>Address</label>
                <br />
                <textarea style={{ marginLeft: "200px" }} id="address" name="address" rows="2" cols="30" required
                  value={formData.heirAddress}
                  onChange={(e) => handleChange("heirAddress", e.target.value)}

                ></textarea>
                <div style={{ marginTop: "-130px" }} className='leftside'>
                  <label htmlFor="phn">Mobile No.&nbsp;&nbsp;</label>
                  <input type="number" id="phn" name="phn" value={formData.heirPhone}
                    onChange={(e) => handleChange('heirPhone', e.target.value)} /><br /><br />
                  <label htmlFor="pin">Pin code&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                  <input type="number" id="pin" name="heirPincode" value={formData.heirPincode}
                    onChange={(e) => handleChange('heirPincode', e.target.value)} />
                </div>
                <div style={{ marginTop: "70px" }} className='sideheads'>
                  <b>State Information</b>
                </div>
                <div className='formfields'>
                  <label htmlFor="state">State&nbsp;&nbsp;&nbsp;&nbsp;</label>
                  <input type="text" id="state" name="state" value={formData.heirState}
                    onChange={(e) => handleChange('heirState', e.target.value)} /><br /><br />
                  <label htmlFor="taluka">Taluka&nbsp;&nbsp;</label>
                  <input type="text" id="taluka" name="taluka" value={formData.heirTaluka}
                    onChange={(e) => handleChange('heirTaluka', e.target.value)} />
                </div>
                <div style={{ marginTop: "-80px" }} className='leftside'>
                  <label htmlFor="dis">District&nbsp;&nbsp;&nbsp;&nbsp;</label>
                  <input type="text" id="dis" name="dis" value={formData.heirDistrict}
                    onChange={(e) => handleChange('heirDistrict', e.target.value)} /><br /><br />
                  <label htmlFor="vlg">Village&nbsp;&nbsp;&nbsp;&nbsp;</label>
                  <input type="text" id="vlg" name="vlg" value={formData.heirVillage}
                    onChange={(e) => handleChange('heirVillage', e.target.value)} />
                </div>
              </div>
            </form>
            <button  className="nexttabbtn caseFilingnxt" onClick={handleNextTab}>
              Next➜
            </button>
          </div>
        );
      case 4:
        return (
          
          <div>
            <form id='factDetailscf' className='caseform'>
              <h6 style={{ color: "red", marginLeft: "20px", paddingTop: "20px" }}>Note:This tab is not compulsory.</h6>
              <center><h3>Fact Details</h3></center>
              <div style={{ marginTop: "30px" }}>

                <label style={{ marginLeft: "190px" }}>
                  Fact Date: &nbsp;&nbsp;
                  <input
                    type="date"
                    value={formData.factDate}
                    onChange={(e) => handleChange('factDate', e.target.value)}
                  />
                </label>
                <label style={{ marginLeft: "100px" }}>
                  Fact Time: &nbsp;&nbsp;
                  <input
                    type="time"
                    value={formData.factTime}
                    onChange={(e) => handleChange('factTime', e.target.value)}

                  />
                </label>

                <label style={{ marginLeft: "150px" }}>
                  Fact
                  <input type='text'
                    value={formData.fact}
                    onChange={(e) => handleChange('fact', e.target.value)}></input>
                </label>
              </div>

            </form>
            <button  className="nexttabbtn caseFilingnxt" onClick={handleNextTab}>
              Next➜
            </button>
          </div>
        );
      case 5:
        return (
          <div>
            <form className='caseform'>
              <div>
                <center><h3>CASE DETAILS</h3></center>
              </div>
              <h6 style={{ color: "red", marginLeft: "20px", paddingTop: "20px" }}>Note:This tab is compulsory.</h6>
              <div>
                <label className="formfields" htmlFor="coa">Cause of action</label>

                <textarea style={{ marginLeft: "80px" }} id="coa" name="coa" rows="2" cols="30" required
                  value={formData.actionCause}
                  onChange={(e) => handleChange('actionCause', e.target.value)}></textarea>  <br />

                <br /><label className="formfields" htmlFor="info">Important Information <br /> or Subject or Reason</label>
                <textarea style={{ marginLeft: "30px" }} id="coa" name="coa" rows="2" cols="30" required
                  value={formData.reason}
                  onChange={(e) => handleChange('reason', e.target.value)}></textarea>  <br />
                <br /><br />
                <div className='leftside'>
                  <label htmlFor="date">Date of cause of action</label>
                  <input  type="date" id="date" name="date"
                    value={formData.actionDate}
                    onChange={(e) => handleChange('actionDate', e.target.value)}
                  /><br />

                </div>
                <br /><br />

                <div style={{ marginTop: "70px" }} className='sideheads'>
                  <b>Dispute Arising Out of</b>
                </div>
                <div className='formfields'>
                  <label htmlFor="state">State&nbsp;&nbsp;&nbsp;&nbsp;</label>
                  <input type="text" id="state" name="disputeState"
                    value={formData.disputeState}
                    onChange={(e) => handleChange('disputeState', e.target.value)}
                  /><br /><br />
                  <label htmlFor="taluka">Taluka&nbsp;&nbsp;</label>
                  <input type="text" id="taluka" name="taluka"
                    value={formData.disputeTaluka}
                    onChange={(e) => handleChange('disputeTaluka', e.target.value)}
                  />
                </div>
                <div style={{ marginTop: "-80px" }} className='leftside'>
                  <label htmlFor="dis">District&nbsp;&nbsp;&nbsp;&nbsp;</label>
                  <input type="text" id="dis" name="dis"
                    value={formData.disputeDistrict}
                    onChange={(e) => handleChange('disputeDistrict', e.target.value)}
                  /><br /><br />
                  <label htmlFor="vlg">Village&nbsp;&nbsp;&nbsp;&nbsp;</label>
                  <input type="text" id="vlg" name="vlg"
                    value={formData.disputeVillage}
                    onChange={(e) => handleChange('disputeVillage', e.target.value)}
                  />
                </div>
              </div>
              <div style={{ marginTop: "20px" }} className='sideheads'>
                <b>Act Details</b>
              </div>
              <div className='centre'>
                <label htmlFor="act">Act &nbsp; &nbsp;</label>
                <input type="text" id="act" name="act"
                  value={formData.act}
                  onChange={(e) => handleChange('act', e.target.value)}
                />
                <label style={{ marginLeft: "30px" }} htmlFor="sec">Section&nbsp; &nbsp;</label>
                <input type="text" id="sec" name="sec"
                  value={formData.section}
                  onChange={(e) => handleChange('section', e.target.value)}
                />
                
              </div>
            </form>
            <button  className=" caseFilingnxt nexttabbtn" onClick={savenext}>
              Next ➜
            </button>

          </div>
        );
      case 6:
        return (
          <div className='cFilecont' >
            <form  className='caseform'>
              {/* <button  onClick={generateCNR}>
        generate
      </button> */}
      <div className="cfSubmit" id="hide">
        <div>
      <label className='cfinline' >CNR Number:</label>
              <input
                type="text"
                id="cnrNumber"
                name="cnrNumber"
                value={formData.CnrNumber}
                onChange={(e) => handleChange('CnrNumber', e.target.value)}
              />
              </div>
           
              <div>
              <label className='cfinline'>Unique Code:</label>
              <input
                type="text"
                id="uniqueCode"
                name="uniqueCode"
                value={formData.uniqueCode}
                onChange={(e) => handleChange('uniqueCode', e.target.value)}
              />
              </div>
              </div>

              <center><button style={{ marginTop: "20px" }} onClick={handleSubmit}>Submit</button></center>

            </form>

          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section>
  <Navbar4/>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h1>
          <b>CASE FILING FORM</b>
        </h1>
      </div>
      <div className="case-filing-container">
        <div className="tab-buttons">
          {Array.from({ length: 6 }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handleTabChange(index + 1)}
              className={activeTab === index + 1 ? 'active' : ''}
            >
              {tabNames[index]}
            </button>
          ))}
        </div>


        <div className="tab-content">{renderTabContent()}</div>
      </div>
      
    </section>
  );
};

export default Casefiling;