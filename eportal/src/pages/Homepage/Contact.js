import React from 'react'

import "./Contact.css";



const Contact = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className="contact" id='contacts'>
        <div className="homecontactContainer">
        <div className="contactLeft">
          
          <div className="contactContent">
          <h3>Contact us at:</h3>
            <address>
              
            <a href="mailto:nyaaya160@gmail.com">✉️ nyaaya160@gmail.com</a>
            </address>
            </div>
            <div className="contactAddr">
            <p>🏠 Neil Gogte Institute of Technology,Uppal, <br />Kachawanisingaram Village,Hyderabad,Telangana,500039</p>
            </div>
          </div>
        
      
        </div>
        <div className="contactCopyright">
          <hr />
          <h4>©️{currentYear} Nyaaya,All Rights Reserved</h4>
          <br />
        </div>
      </div>
     



    </>
  )
}

export default Contact