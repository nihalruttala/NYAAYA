import React from 'react';

const Filetable = ({ files, onViewFile }) => {
  return (
    <table id="fileTable">
      <thead>
        <tr>
          <th className='fields'>S.No.</th>
          <th className='fields'>Date</th>
          <th className='fields'>File Name(File Type)</th>
          <th className='fields'>View File</th>
        </tr>
      </thead>
      <tbody>
        {files.map((file, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{file.date}</td>
            <td>{file.name}({file.fileType})</td>
            <td>
              <button onClick={() => onViewFile(file.filename)}>View File</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Filetable;
