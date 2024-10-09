import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import Navbar from '../components/Navbar';



function Home() {
  const location = useLocation();
  const [bedCount, setBedCount] = useState(location.state ? location.state.beds : 0); // Get beds from location state
  const [message, setMessage] = useState('');

  const increaseBeds = () => setBedCount(bedCount + 1);

  const decreaseBeds = () => {
    if (bedCount > 0) {
      setBedCount(bedCount - 1);
    }
  };

  const updateBeds = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.put('http://localhost:5000/api/Bed_availability/update-beds', {hospitalId: location.state.hospitalId,
        beds: bedCount, token: token
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure the syntax is correct
        }
      });

      setMessage(response.data.status === 'SUCCESS' ? 'Bed count updated successfully!' : 'Failed to update bed count!');
    } catch (error) {
      setMessage('Error occurred while updating bed count.');
    }
  };

  // In your home page component
useEffect(() => {
  const token = localStorage.getItem('authToken');
  
  if (token) {
    // Use the token for API calls or authentication checks
    console.log('Token:', token);
  } else {
    // Handle the case where there is no token (e.g., redirect to login page)
    window.location.href = '/loginPage';
  }
}, []);


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
