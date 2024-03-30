import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./RequestForm.css";

const RequestForm = () => {
  const location = useLocation();
  const emailFromcard = location?.state?.email   || '';
  console.log(emailFromcard)
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [description, setDescription] = useState('');
  const navigate=useNavigate()

  const handleSendMail = async () => {
    const emailFromcard = location?.state?.email   || '';
    const subject = 'Request for Case Review and Trial Representation';


    
    const htmlContent = `
  <p style="color: #000;">Respected Sir/Madam,</p>
  <p style="color: #000;">I trust this message finds you well. My name is ${name}, and I recently came across your profile on the "Nyaaya" website. I am writing to seek your esteemed attention and consideration for the review of my case.</p>
  <p style="color: #000;">The details of my case are outlined as follows: ${description}.</p>
  <p style="color: #000;">For further information or to discuss this matter in detail, I can be reached at ${contact} or via email at ${senderEmail}.</p>
  <p style="color: #000;">I kindly request you to carefully examine the specifics of my situation. I am hopeful that your expertise and guidance would be invaluable in representing me during the trial. Your assistance in this matter would be greatly appreciated.</p>
  <p style="color: #000;">Thank you for taking the time to consider my request. I look forward to the possibility of having you represent me.</p>
  <p style="color: #000;">Yours sincerely,</p>
  <p style="color: #000;">${name}.</p>
`;

    const response = await fetch('http://localhost:3001/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: emailFromcard,
        subject,
        text: '', // You can keep text empty since you are using HTML
        html: htmlContent,
      }),
    });

    if (response.ok) {
      alert('Email sent successfully!');
      navigate('/litigantaccount')
    } else {
      alert('Failed to send email. Please try again.');
    }
  };
  return (
    <div className='reqform'>
    <center><h1>Request Form</h1></center>
    
    <label className="req" htmlFor='name'><h3>Name: &nbsp;&nbsp;</h3></label>
    <input className="inputs" style={{ marginLeft: "60px" }}  value={name} onChange={(e) => setName(e.target.value)} />
    <br />
    <label className="req" htmlFor='name'><h3>Contact: &nbsp;&nbsp;</h3></label>
    <input className="inputs" style={{ marginLeft: "35px" }} value={contact} onChange={(e) => setContact(e.target.value)} />
    <br />
    <label className="req" htmlFor='name'><h3>Email: &nbsp;&nbsp;</h3></label>
    <input className="inputs" style={{ marginLeft: "70px", marginBottom: "20px" }} value={senderEmail} onChange={(e) => setSenderEmail(e.target.value)} />
    <br />
    <label className="req" htmlFor='name'><h3>Description: &nbsp;&nbsp;</h3></label>
    <textarea className="inputs" style={{ marginTop: "20px" }} rows={2} cols={70}  value={description} onChange={(e) => setDescription(e.target.value)} />
    <button id='reqFormbutton' style={{ marginLeft: "45rem", marginTop: "10px" }} onClick={handleSendMail}>Send mail</button>
    <p style={{ marginLeft: "520px", marginTop: "10px" }}>Note:By hitting send mail button a mail will be <br />  &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;sent to the advocate you have chosen. </p>
  </div>
  )
}

export default RequestForm
