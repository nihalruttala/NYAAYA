import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Filetable from '../../Components/Filetable';
// import "./Litigant/CaseDocinfo.css";
const AdvCaseDocinfo = () => {
    const location = useLocation();
    const cnrdata = location?.state?.CnrNumber|| '';
    const [files, setFiles] = useState([]);
    useEffect(() => {
      const fetchFiles = async () => {
          try {
              const response = await fetch(`http://localhost:3001/files?cnr=${cnrdata}`);
              const filesData = await response.json();
              setFiles(filesData);
          } catch (error) {
              console.error(error);
          }
      };
      fetchFiles();
  }, [cnrdata]);
  
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
                <img src="${imageSrc}" alt="${filename}" />
              </body>
            </html>
          `);
        } else if (fileType === 'mp4' || fileType === 'webm' || fileType === 'ogg') {
          // Display the video using a data URL
          const videoSrc = `data:video/${fileType};base64,${fileContentBase64}`;
  
          // Open a new window and display the video
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
          // Display the PDF using <embed> element
          const pdfSrc = `data:application/pdf;base64,${fileContentBase64}`;
  
          // Open a new window and display the PDF
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
        } else if (fileType === 'mp3' || fileType === 'wav' || fileType === 'ogg') {
          // Display the audio using a data URL
          const audioSrc = `data:audio/${fileType};base64,${fileContentBase64}`;
          // Open a new window and display the audio
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
                  <source src="${audioSrc}" type="audio/${fileType}">
                  Your browser does not support the audio tag.
                </audio>
              </body>
            </html>
          `);
        }
        else {
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

return (
    <section>
    <div>
        <h1 className='doctitle'>Case Documents</h1>
        <br />
      </div>
    <div className='doctable'>
        <Filetable files={files} onViewFile={viewFile} />
      </div>
      <Link to ="/advocateaccount">
      <button style={{marginLeft:"30px", marginTop:"20px"}}>
        back
      </button>
      </Link>
      </section>
  );
};

export default AdvCaseDocinfo