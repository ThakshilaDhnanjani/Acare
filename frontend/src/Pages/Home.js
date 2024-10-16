import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import Navbar from '../components/Navbar';
import logo from '../Assets/logo.png';

function Home() {
  const location = useLocation();
  
  // Extract data passed via `state` from the previous page
  const { beds = 0, username = '' } = location.state || {}; // Default values

  // Initialize state variables with default values
  const [bed, setBed] = useState(beds);
  const [message, setMessage] = useState('');
  const [oxygenCapacity, setOxygenCapacity] = useState(0);
  const [ventilators, setVentilators] = useState(0);
  const [thetory, setThetory] = useState(0);

  // Auto-fill hospital name from location.state
  const [hospitalName, setHospitalName] = useState(username);

  // Function to update bed count in the backend
  const updateBeds = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/api/Bedavailability/updatebeds', 
        {
          username: username, // Send hospitalId to identify the hospital
          beds: bed // Send the updated bed count
        }, 
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setMessage(response.data.status === 'SUCCESS' 
        ? 'Bed count updated successfully!' 
        : 'Failed to update bed count!');
    } catch (error) {
      setMessage('Error occurred while updating bed count.');
    }
  };

  // Example functions for oxygen capacity and ventilators (similar structure)
  const handleOxygenSubmit = () => {
    alert(`Oxygen capacity updated: ${oxygenCapacity}`);
  };

  const handleThetorySubmit = () => {
    alert(`Thetory updated: ${thetory}`);
  };

  const handleVentilatorsSubmit = () => {
    alert(`Ventilators updated: ${ventilators}`);
  };

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
  }, []);

  return (
    <div className="home-container">
      <div className='header'>
        <Navbar />
      </div>
      <div className="home">
        <div className='sidebar'>
          <ul>
            <img src={logo} alt='Logo' className='logo' />
            <li><a href="./AddAmbulance">Add Ambulance</a></li>
            <li><a href="/AddDrivers">Add Drivers</a></li>
          </ul>
        </div>
        
        <div className="main-content">
          <div className='boxes-container'>
            <div className='box'>
              <h2>Available Oxygen</h2>
              <input
                type="number"
                value={oxygenCapacity}
                onChange={(e) => setOxygenCapacity(e.target.value)}
                placeholder="Enter Oxygen Capacity"
              />
              <button onClick={handleOxygenSubmit}>Update</button>
            </div>

            <div className='box'>
              <h2>Available Thetory</h2>
              <input
                type="number"
                value={thetory}
                onChange={(e) => setThetory(e.target.value)}
                placeholder="Enter Thetory"
              />
              <button onClick={handleThetorySubmit}>Update</button>
            </div>

            <div className='box'>
              <h2>Available Ventilators</h2>
              <input
                type="number"
                value={ventilators}
                onChange={(e) => setVentilators(e.target.value)}
                placeholder="Enter Ventilators"
              />
              <button onClick={handleVentilatorsSubmit}>Update</button>
            </div>
          </div>

          <div className='available-beds'>
            <h2>Available Beds</h2>
            <div className="bed-controls">
              {/* Auto-filled Hospital Name (read-only) */}
              <input
                type="text"
                value={hospitalName}
                readOnly
                className="hospital-input"
              />
              
              {/* Bed count input */}
              <input
                type="number"
                value={bed}
                onChange={(e) => setBed(Number(e.target.value))}
                placeholder="Enter Bed Count"
                className="bed-input"
              />
            </div>
            <button id="submit-button" onClick={updateBeds}>Update</button>
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
