import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import Navbar from '../components/Navbar';

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract data passed via `state` in the `Signin` component
  const { beds, username, hospitalId } = location.state || {};

  const [bedCount, setBedCount] = useState(beds || 0);
  const [message, setMessage] = useState('');

  // Function to increase the bed count
  const increaseBeds = () => setBedCount(bedCount + 1);

  // Function to decrease the bed count
  const decreaseBeds = () => {
    if (bedCount > 0) {
      setBedCount(bedCount - 1);
    }
  };

  // Function to update bed count in the backend
  const updateBeds = async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      // Send a request to update the bed count with token
      const response = await axios.put('http://localhost:5000/api/Bed_availability/updatebeds', {
        hospitalId: hospitalId,
        username: username,
        beds: bedCount,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token for authorization
        }
      });

      setMessage(response.data.status === 'SUCCESS' 
        ? 'Bed count updated successfully!' 
        : 'Failed to update bed count!');
    } catch (error) {
      setMessage('Error occurred while updating bed count.');
    }
  };

  // Ensure the user is logged in (token is present in localStorage)
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/loginPage');
    }
  }, [navigate]);

  return (
    <>
      <div className='header'>
        <Navbar />
      </div>
      <div className="home">
        <div className='sidebar'>
          <ul>
            <li><a href="./AddAmbulance">Add Ambulance</a></li>
            <li><a href="/AddDrivers">Add Drivers</a></li>
          </ul>
        </div>
        <div className='home-contents'>
          <h2>Welcome to A-care</h2>
          <p>Enhance critical ICU optimization</p>

          <div className='available-beds'>
            <h2>Available Beds</h2>
            <div className="bed-controls">
              <button onClick={decreaseBeds} className="bed-button">-</button>
              <span>{bedCount}</span>
              <button onClick={increaseBeds} className="bed-button">+</button>
            </div>
            <button id="submit-button" onClick={updateBeds}>Update</button>
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
