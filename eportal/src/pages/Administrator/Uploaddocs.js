import React, { useEffect, useState } from 'react';
import Filetable from '../../Components/Filetable';
import "./Uploaddocs.css";

const Uploaddocs = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedFileType, setSelectedFileType] = useState("");
  const [cnr, setCnr] = useState(''); 

  useEffect(() => {
  const fetchFiles = async () => {
    try {
      const cnrCheck = await fetch(`http://localhost:3001/checkCNR?cnr=${cnr}`);
      const cnrExists = await cnrCheck.json();
      if(cnrExists){
      const response = await fetch(`http://localhost:3001/files?cnr=${cnr}`);
      const filesData = await response.json();
      setFiles(filesData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  fetchFiles();
}, [cnr]);

  const toggleForm = () => {
    setFormVisible(!formVisible);
  };
  const handleFileTypeChange = (event) => {
    setSelectedFileType(event.target.value);
  };
  
  const submitForm = async () => {
    const fileName = document.getElementById("fileName").value;
    const cnrValue = document.getElementById("cnr").value;
    const fileUpload = document.getElementById("fileUpload");
  
    // Update the cnr state with the entered CNR value
    setCnr(cnrValue);
   
    if (fileName && fileUpload.files.length > 0) {
      const fileSizeLimit = 5* 1024 * 1024;
      if (fileUpload.files[0].size > fileSizeLimit) {
        alert('File size exceeds the limit (5 MB). Please choose a smaller file.');
        return;}
      
      const formData = new FormData();
      formData.append('fileName', fileName);
      formData.append('cnr', cnrValue);
      formData.append('fileType', selectedFileType);
      //formData.append('fileUpload', fileUpload.files[0]);
      for (let i = 0; i < fileUpload.files.length; i++) {
        formData.append('fileUpload', fileUpload.files[i]);
      }
  
      try {
        const response = await fetch('http://localhost:3001/upload', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          const filesResponse = await fetch(`http://localhost:3001/files?cnr=${cnrValue}`);
          const filesData = await filesResponse.json();
          setFiles(filesData);
        } else {
          
          const errorMessage = await response.json();
          if (errorMessage.error === 'Invalid CNR') {
            alert('Please enter a valid CNR.');
          } else {
            alert('Upload failed. Please enter all the fields.');
          }
        }
      } catch (error) {
        console.error(error);
        alert('Upload failed ');
      }
  
      document.getElementById("fileName").value = "";
      fileUpload.value = "";
    } else {
      alert("Please provide a file name and choose at least one file.");
    }
  };
  
  const viewFile = async (filename) => {
    try {
      const response = await fetch(`http://localhost:3001/files/${encodeURIComponent(filename)}`);
      if (response.ok) {
        const fileContentBase64 = await response.text();
  
        // Determine the file type based on filename extension
        const fileType = filename.split('.').pop().toLowerCase();
  
        if (fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png' || fileType === 'gif') {
          // Display the image using a data URL
          const imageSrc = `data:image/${fileType};base64,${fileContentBase64}`;
  
          // Open a new window and display the image
          const newTab = window.open();
          newTab.document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>${filename}</title>
              </head>
              <body>
              <image width="1500" height="700" controls>
                <img src="${imageSrc}" alt="${filename}" />
                </image>
              </body>
            </html>
          `);
        } else if (fileType === 'mp4' || fileType === 'webm' || fileType === 'ogg') {
          
          const videoSrc = `data:video/${fileType};base64,${fileContentBase64}`;
  
          
          const newTab = window.open();
          newTab.document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>${filename}</title>
              </head>
              <body>
                <video width="1500" height="700" controls>
                  <source src="${videoSrc}" type="video/${fileType}">
                  Your browser does not support the video tag.
                </video>
              </body>
            </html>
          `);
        } else if (fileType === 'pdf') {
         
          const pdfSrc = `data:application/pdf;base64,${fileContentBase64}`;
  
   
          const newTab = window.open();
          newTab.document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>${filename}</title>
              </head>
              <body>
                <embed src="${pdfSrc}" type="application/pdf" width="100%" height="700px">
              </body>
            </html>
          `);

        } 
        else if (fileType === 'mp3') {
          
          const audioSrc = `data:audio/mpeg;base64,${fileContentBase64}`;
  
          const newTab = window.open();
          newTab.document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>${filename}</title>
                <style>
          body {
            display: flex;align-items: center;justify-content: center;height: 100vh;
          }
        </style>
              </head>
              <body>
                <audio controls>
                  <source src="${audioSrc}" type="audio/mpeg">
                  Your browser does not support the audio tag.
                </audio>
              </body>
            </html>
          `);
  
        } else if (fileType === 'txt') {
    
          const decodedContent = atob(fileContentBase64);
          const newTab = window.open();
          newTab.document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>${filename}</title>
              </head>
              <body>
                <pre>${decodedContent}</pre>
              </body>
            </html>
          `);
        } else {
          console.error('Unsupported file type:', fileType);
          alert('Unsupported file type');
        }
      } else {
        console.error('Error fetching file content:', response.status);
        alert('Error fetching file content');
      }
    } catch (error) {
      console.error(error);
      alert('Error fetching file content');
    }
  };
  const fileType = ["Select","text", "pdf", "image"," video","audio"];
  return (
    <section>
      <div>
        <h2 className='title'>Upload Case Documents</h2>
        <p style={{color:"red" , marginTop:"-50px", marginLeft:"750px"}}> Note:Click on below upload button to upload files</p>
        <br />
       
        <button className='uploadbtn' onClick={toggleForm}>Upload</button>
        <br />
        <br />
      </div>

      {formVisible && (
        <div>
          <form id="uploadForm" action="/upload" method="post" encType="multipart/form-data">
          
            <table>
            <tbody>
              <tr>
                <td>
                <label className="data" htmlFor="cnr"><b>CNR Number:&nbsp;&nbsp;</b></label>
                  <input type="" id="cnr" name="cnr" required/>
                  <label className="data" htmlFor="fileName"><b>File Name:&nbsp;&nbsp;</b></label>
                  <input type="text" id="fileName" name="fileName" required/>
                  <br/>
                  <label className="data" htmlFor="fileType"><b>File Type:&nbsp;&nbsp;</b></label>
                  <select id="fileType" name="fileType" required value={selectedFileType}  onChange={handleFileTypeChange}>
                      {fileType.map((type, index) => (
                      <option key={index} value={type}>
                      {type}
                      </option>))}
                  </select>

                  <label  className="data" htmlFor="fileUpload"><b>Choose File:&nbsp;&nbsp;</b></label>
                  <input  type="file" id="fileUpload" name="fileUpload" accept=".txt, .pdf, image/*, video/*, .jpg, .jpeg, .png, .gif,.mp3 "/>
                  <p style={{marginLeft:"19rem",marginTop:"10px"}}><b>File size should be less than 5 MB.</b></p>
                  <button className='uploadbtn' type="button" onClick={submitForm}>Submit</button>
                  <br/>
                  <br/>
                </td>
              </tr>
            </tbody>
          </table>
          </form>
        </div>
      )}

      <div>
        
        <Filetable files={files} onViewFile={viewFile} />
      </div>
      
    </section>
  );
}

export default Uploaddocs;