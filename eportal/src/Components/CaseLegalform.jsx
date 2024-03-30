// CaseLegalForm.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './CaseLegalform.css'; // Import the CSS file for styling
// import Navbar4 from './Navbar4';

const CaseLegalForm = () => {
  const location = useLocation();
  const formData = location.state?.formData;

  if (!formData) {
    // Handle case where formData is not available
    return <div>No data available</div>;
  }
  const handleprint =()=>{
    window.print();
  }

  return (
    <>
    {/* <Navbar4/> */}
    <div className="case-legal-form">
  <div className="case-file">
    <h1 id='csHeading' >CASE FILE</h1>
    <h3 id='cfilingCNR'>CNR : {formData.CnrNumber}</h3>
    <hr />
  

  <div className="caseHeads">
    <p><b>ESTABLISHMENT</b></p>
  </div>

  <div className="caseformEst">
    <p><b>STATE:</b>{formData.state}</p>
    <p><b>DISTRICT:</b> {formData.district}</p>
  </div>

  <div className="caseformEst">
    <p><b>ESTABLISHMENT:</b> {formData.establishment}</p>
    <p><b>CASE TYPE:</b> {formData.caseType}</p>
  </div>

  <div className="caseformEst">
    <p><b>RELIEF SOUGHT:</b> {formData.reliefSought}</p>
    <p><b>APPELLANT / RESPONDANT:</b> {formData.appellantRespondant}</p>
  </div>

  <div className="caseformEst">
    <p><b>MOBILE NO.:</b>{formData.mobileNo}</p>
  </div>
  <hr />


  <div className="caseHeads">
    <p><b>LITIGANT DETAILS</b></p>
  </div>

  <div className="caseformEst">
    <p><b>ACCUSED:</b> {formData.accused}</p>
    <p><b>NAME:</b> {formData.name}</p>
  </div>

  <div className="caseformEst">
    <p><b>RELATION:</b> {formData.relation}</p>
    <p><b>AGE:</b> {formData.age}</p>
  </div>

  <div className="caseformEst">
    <p><b>DOB:</b> {formData.dob}</p>
    <p><b>GENDER:</b> {formData.gender}</p>
  </div>

  <div className="caseformEst">
    <p><b>CASTE:</b> {formData.caste}</p>
    <p><b>DIFFERENTLY ABLED:</b> {formData.differentlyAble}</p>
  </div>

  <div className="caseformEst">
    <p><b>EMAIL:</b>{formData.email}</p>
    <p><b>MOBILE NUMBER:</b>{formData.phone}</p>
  </div>

  <div className="caseformEst">
    <p><b>OCCUPATION:</b> {formData.occupation}</p>
    <p><b>PIN CODE:</b> {formData.pincode}</p>
  </div>

  <div className="caseformCasedetails">
    <p><b>ADDRESS:</b>{formData.address}</p>
  </div>

  <div className="caseformEst">
    <p><b>TALUKA:</b> {formData.taluka}</p>
    <p><b>VILLAGE:</b> {formData.village}</p>
  </div>
  <div className="caseformEst">
    <p><b>STATE:</b> {formData.litigantState}</p>
    <p><b>DISTRICT:</b> {formData.litigantDistrict}</p>
  </div>
  <hr />


  <div className="caseHeads">
    <p><b>CASE DETAILS</b></p>
  </div>
  <div className="caseformEst">
    <p><b>DATE OF CAUSE OF ACTION:</b> {formData.actionDate}</p>
  </div>
  <div className="caseformCasedetails">
    <p><b>CAUSE OF ACTION:  </b>{formData.disputeState}</p>
  </div>
  <div className="caseformCasedetails">
  <p><b>IMPORTANT INFORMATION / SUBJECT / REASON :    </b>{formData.reason}</p>

</div>
<div className="caseformEst">
    <p><b>STATE:</b> {formData.disputeState}</p>
    <p><b>DISTRICT:</b> {formData.disputeDistrict}</p>
  </div>
  <div className="caseformEst">
  <p><b>TALUKA:</b> {formData.disputeTaluka}</p>
    <p><b>VILLAGE:</b> {formData.disputeVillage}</p>
    </div>
    <div className="caseformEst">
    <p><b>ACT :    </b>{formData.act}</p>
    <p><b>SECTION :    </b>{formData.act}</p>
    <hr />


</div>
<div className="caseHeads">
    <p><b>LEGAL HEIR</b></p>
  </div>
  <div className="caseformEst">
  <p><b>PARTY NAME:</b> {formData.partyName}</p>
    <p><b>TYPE:</b> {formData.heirType}</p>
    </div>
    <div className="caseformEst">
    <p><b>LEGAL HEIR NAME:</b> {formData.heirName}</p>
    <p><b>NAME:</b> {formData.partyName}</p>
  </div>
  <div className="caseformEst">
    <p><b>RELATION:</b> {formData.name2}</p>
    <p><b>AGE:</b> {formData.heirAge}</p>
    </div>
    <div className="caseformEst">
    <p><b>DOB:</b> {formData.heirDob}</p>
    <p><b>GENDER:</b> {formData.heirGender}</p>

  </div>
  <div className="caseformEst">
    <p><b>CASTE:</b> {formData.heirCaste}</p>
    <p><b>DIFFERENTLY ABLED:</b> {formData.heirDifferentlyAble}</p>

  </div>
  <div className="caseformEst">
    <p><b>EMAIL:</b> {formData.heirEmail}</p>
    <p><b>OCCUPATION:</b> {formData.heirOccupation}</p>

  </div>
  <div className="caseformEst">
    <p><b>MOBILE:</b> {formData.heirPhone}</p>
    <p><b>PIN CODE:</b> {formData.heirPincode}</p>

  </div>
  <div className="caseformCasedetails">
    <p><b>ADDRESS:</b>{formData.heirAddress}</p>
</div>
<div className="caseformEst">
    <p><b>STATE:</b> {formData.disputeState}</p>
    <p><b>DISTRICT:</b> {formData.disputeDistrict}</p>
  </div>
  <div className="caseformEst">
  <p><b>TALUKA:</b> {formData.disputeTaluka}</p>
    <p><b>VILLAGE:</b> {formData.disputeVillage}</p>
    </div>
    <hr />


    <div className="caseHeads">
    <p><b>FACT DETAILS</b></p>
  </div>
  <div className="caseformEst">
  <p><b>FACT DATE:</b> {formData.factDate}</p>
    <p><b>FACT TIME:</b> {formData.factTime}</p>
    </div>
    <div className="caseformCasedetails">
    <p><b>FACT:</b>{formData.fact}</p>
</div>

</div>
<div className="csButtons">
            <Link to="/advocateaccount">
              <button className='nexttabbtn'>
                Back
              </button>
            </Link>
            <button className="nexttabbtn" onClick={handleprint} >
              PRINT
            </button>
          </div>
</div>
      
    </>
  );
};

export default CaseLegalForm;

