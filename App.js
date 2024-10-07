import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import './App.css'; 

function App() {
  
  const [formData, setFormData] = useState({
    patientName: '',
    bloodGroup: '',
    age: '',
    disease: ''
  });

  
  const [formDataList, setFormDataList] = useState([]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleAddRecord = (e) => {
    e.preventDefault();
    
    
    setFormDataList([...formDataList, formData]);

    
    setFormData({
      patientName: '',
      bloodGroup: '',
      age: '',
      disease: ''
    });
  };

  
  const handleExportToExcel = () => {
    if (formDataList.length === 0) {
      alert("No data to export!");
      return;
    }
    
    const worksheet = XLSX.utils.json_to_sheet(formDataList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'PatientData');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const fileData = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(fileData, 'PatientData.xlsx');
  };

  return (
    <div className="form-container">
      <h1>Patient Information</h1>
      <form className="form" onSubmit={handleAddRecord}>
        <label>
          Patient Name:
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            placeholder="Enter patient name"
            required
          />
        </label>
        <label>
          Blood Group:
          <input
            type="text"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            placeholder="Enter blood group"
            required
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter age"
            required
          />
        </label>
        <label>
          Disease:
          <input
            type="text"
            name="disease"
            value={formData.disease}
            onChange={handleChange}
            placeholder="Enter disease"
            required
          />
        </label>
        <button type="submit" className="submit-button">Add Record</button>
      </form>

      <button onClick={handleExportToExcel} className="submit-button">Export All Records to Excel</button>

      <h2>All Entries</h2>
      <div className="entries">
        {formDataList.map((data, index) => (
          <div key={index} className="entry">
            <p><strong>Patient Name:</strong> {data.patientName}</p>
            <p><strong>Blood Group:</strong> {data.bloodGroup}</p>
            <p><strong>Age:</strong> {data.age}</p>
            <p><strong>Disease:</strong> {data.disease}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
