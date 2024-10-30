import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import Navbar from '../components/Navbar';
import logo from '../Assets/logo.png';

function Home() {
  const location = useLocation();
  
  // Extract data passed via `state` from the previous page
  const { beds = 0, username = '' ,ventilators = 0, theaters = 0, oxygen =0} = location.state || {}; // Default values

  // Initialize state variables with default values
  const [bed, setBed] = useState(beds);
  const [message, setMessage] = useState('');
  const [oxygenCapacity, setOxygen] = useState(oxygen);
  const [ventilator, setVentilators] = useState(ventilators);
  const [theater, setTheater] = useState(theaters);
  const [hospitalName] = useState(username);
  const name = localStorage.getItem('rememberedUsername');
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/Bedavailability/fetchBed', {
          name,
        });

        console.log(response); 
        if (response) {
          const data = response.data; 
          setBed(data.beds); 
          setVentilators(data.ventilators)
          setOxygenCapacity(data.oxygen)
          setTheater(data.theaters)
        } else {
          console.error('error fetch');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData(); 
  }, [name]);
  






  const updateBeds = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/api/Bedavailability/updatebeds',
        {
          username: username,
          beds: bed,

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

  // Function to update oxygen capacity in the backend
  const updateOxygen = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/api/Bedavailability/updateoxygen',
        {
          username: username,
          oxygen: oxygenCapacity
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setMessage(response.data.status === 'SUCCESS'
        ? 'Oxygen capacity updated successfully!'
        : 'Failed to update oxygen capacity!');
    } catch (error) {
      setMessage('Error occurred while updating oxygen capacity.');
    }
  };

  // Function to update theater count in the backend
  const updateTheater = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/api/Bedavailability/updatetheaters',
        {
          username: username,
          theaters: theater
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setMessage(response.data.status === 'SUCCESS'
        ? 'Theater count updated successfully!'
        : 'Failed to update theater count!');
    } catch (error) {
      setMessage('Error occurred while updating theater count.');
    }
  };

  // Function to update ventilators in the backend
  const updateVentilators = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/api/Bedavailability/updateventilators',
        {
          username: username,
          ventilators: ventilator
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setMessage(response.data.status === 'SUCCESS'
        ? 'Ventilators count updated successfully!'
        : 'Failed to update ventilators count!');
    } catch (error) {
      setMessage('Error occurred while updating ventilators count.');
    }
  };

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/home';
    }
  }, []);

  return (
    <div className="home-container">
      <Navbar />
      {message && <p>{message}</p>}
      <div className="home">
        <div className='sidebar'>
          <ul>
            <img src={logo} alt='Logo' className='logo' />
            <div className='hospitalname'>{hospitalName}</div>
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
                onChange={(e) => setOxygen(Number(e.target.value))}
                placeholder="Enter Oxygen Capacity"
              />
              <button onClick={updateOxygen}>Update</button>
            </div>

            <div className='box'>
              <h2>Available Theater</h2>
              <input
                type="number"
                value={theater}
                onChange={(e) => setTheater(Number(e.target.value))}
                placeholder="Enter Theater"
              />
              <button onClick={updateTheater}>Update</button>
            </div>

            <div className='box'>
              <h2>Available Ventilators</h2>
              <input
                type="number"
                value={ventilator}
                onChange={(e) => setVentilators(Number(e.target.value))}
                placeholder="Enter Ventilators"
              />
              <button onClick={updateVentilators}>Update</button>
            </div>
          </div>

          <div className='available-beds'>
            <h2>Available Beds</h2>
            <div className="bed-controls">
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
            
          </div>
          
        </div>
        
      </div>
    </div>
  );
}

export default Home;
