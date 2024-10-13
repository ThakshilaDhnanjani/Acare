import React, { useState, useEffect } from 'react';
import './AmbulanceList.css'; 
import Navbar from '../components/Navbar';

const AmbulanceList = () => {
  const [ambulances, setAmbulances] = useState([]);

  // Fetch ambulances from the backend
  useEffect(() => {
    fetch('http://localhost:5000/api/Ambulance') 
      .then((response) => response.json())
      .then((data) => {
        setAmbulances(data);
      })
      .catch((error) => {
        console.error('Error fetching ambulances:', error);
      });
  }, []);

  const handleSendLocation = (ambulanceId) => {
    alert(`Send location for ambulance with ID: ${ambulanceId}`);
  };

  return (
    <>
      <div className='header'>
        <Navbar />
      </div>
      <div className="ambulance-list">
        {ambulances.map((ambulance, index) => (
          <div key={ambulance._id} className="ambulance-box">
            <p>Vehicle Number: {ambulance.Ambulance_no}</p>
            <button id="submit-button" onClick={() => handleSendLocation(ambulance._id)}>
              Send Location
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default AmbulanceList;
