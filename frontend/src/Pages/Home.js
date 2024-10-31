import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import Navbar from '../components/Navbar';
import logo from '../Assets/logo.png';
import PieChart from '../components/Blood_Count';
import { Bed } from 'lucide-react';



function Home() {
  const location = useLocation();

  // Initialize variables with values from localStorage
  const [bed, setBed] = useState(0);
  const [message, setMessage] = useState('');
  const [oxygenCapacity, setOxygen] = useState(0);
  const [ventilator, setVentilators] = useState(0);
  const [theater, setTheater] = useState(0);
  const [hospitalName] = useState(localStorage.getItem('username')); // Username from localStorage
  const hospitalId = localStorage.getItem('hospitalId'); // hospitalId from localStorage

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/Bedavailability/fetchBed?name=${hospitalName}`);
        
        if (response) {
          const data = response.data; 
          setBed(data.beds); 
          setVentilators(data.ventilators);
          setOxygen(data.oxygen);
          setTheater(data.theaters);
        } else {
          console.error('Error fetching data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchUserData(); 
  }, [hospitalName]);

  // Update bed count in the backend
  const updateBeds = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/api/Bedavailability/updatebeds',
        {
          username: hospitalName,
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

  // Update oxygen capacity in the backend
  const updateOxygen = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/api/Bedavailability/updateoxygen',
        {
          username: hospitalName,
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

  // Update theater count in the backend
  const updateTheater = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/api/Bedavailability/updatetheaters',
        {
          username: hospitalName,
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

  // Update ventilators in the backend
  const updateVentilators = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/api/Bedavailability/updateventilators',
        {
          username: hospitalName,
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

  // Check token on mount and redirect if missing
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

          <div className='boxes-container'>
            <div className='box'>
              <div className="bed-title"><Bed className='bed'/> Available beds</div>
              <input
                type="number"
                value={bed}
                onChange={(e) => setBed(Number(e.target.value))}
                placeholder="Enter Bed Count"
                className="bed-input"
              />
              <button id="submit-button" onClick={updateBeds}>Update</button>
            </div>

            <div className='box'>
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
