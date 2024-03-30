import { useEffect, useState } from 'react';
import "./Updatedetails.css";

const Updatedetails = () => {
  const [details, setDetails] = useState([]);
  const [cnr, setCnr] = useState('');

  const toggleForm = () => {
    const form = document.getElementById("updateDetailsForm");
    form.style.display = form.style.display === "none" ? "block" : "none";
  };

  const handleChangeCnr = (event) => {
    setCnr(event.target.value);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (cnr) {
          const response = await fetch(`http://localhost:3001/details?cnr=${cnr}`);
          const detailsData = await response.json();
          setDetails(detailsData);
        } else {
          setDetails([]);
        }
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
  }, [cnr]);

  const submitForm = async () => {
    try {
      const titleInput = document.getElementById('title');
      const dateInput = document.getElementById('date');
      const descriptionInput = document.getElementById('description');

      const title = titleInput.value;
      const date = dateInput.value;
      const description = descriptionInput.value;

      if (title && date && description) {
        const response = await fetch('http://localhost:3001/details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cnr, title, date, description }),
        });

        if (response.ok) {
          const responseData = await response.json();

          const newDetail = {
            cnr: responseData.detail.cnr,
            title: responseData.detail.title,
            date: responseData.detail.date,
            description: responseData.detail.description,
          };

          setDetails([...details, newDetail]);

          // Clear input fields after successful submission
          titleInput.value = '';
          dateInput.value = '';
          descriptionInput.value = '';
        } else {
          const errorMessage = await response.json();
          alert(errorMessage.error);
        }
      } else {
        alert('Please provide all details.');
      }
    } catch (error) {
      console.error('Error storing details:', error);
      alert('Failed to store details. Please try again.');
    }
  };

  return (
    <section>
      <div>
        <h2 className='title'>Update Case Details</h2>
        <p style={{color:"red" , marginTop:"-50px", marginLeft:"600px"}}> Note:Click on below update button to update details regarding case tracking.</p>
        <br/>
        <button className='updatebtn' onClick={toggleForm}>Update</button>
        <br/>
        <br/>
      </div>
      <div>
        <form id="updateDetailsForm" style={{display:"none"}}>
          <table>
            <tbody>
              <tr>
                <td>
                  <label className="data" ><b>CNR Number:&nbsp;&nbsp;</b></label>
                  <input type="text" id="cnr" name="cnr" value={cnr} onChange={handleChangeCnr} required/>

                  <label className="data" htmlFor="title"><b>Enter Title:&nbsp;&nbsp;</b></label>
                  <input type="text" id="title" name="title" required/>

                  <label className="data" htmlFor="date"><b>Date:&nbsp;&nbsp;</b></label>
                  <input type="date" id="date" name="date" required/>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="data" htmlFor="description"><b>Description:&nbsp;&nbsp;</b></label>
                  <textarea className="data" id="description" name="description" rows="2" cols="90" placeholder='Enter description for the above title' required></textarea>
                </td>
              </tr>
              <tr>
                <td>
                  <button className='updatebtn' type="button" onClick={submitForm}>Submit</button>
                  <br/>
                  <br/>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
      <div>
        <table id="detailsTable">
          <thead>
            <tr>
              <th className='fields'>S.No.</th>
              <th className='fields'>Date</th>
              <th className='fields'>Title</th>
              <th className='fields'>Description</th>
            </tr>
          </thead>
          <tbody>
            {details.map((detail, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{detail.date}</td>
                <td>{detail.title}</td>
                <td>{detail.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Updatedetails;
