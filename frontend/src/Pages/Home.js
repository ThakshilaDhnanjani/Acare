// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import './Home.css';
// import Navbar from '../components/Navbar';



// function Home() {
//   const location = useLocation();
//   const [bedCount, setBedCount] = useState(location.state ? location.state.beds : 0);
//   const [message, setMessage] = useState('');
//   const [oxygenCapacity, setOxygenCapacity] = useState(0); // State for oxygen capacity
//   const [ventilators, setVentilators] = useState(0); // State for ventilators

//   const increaseBeds = () => setBedCount(bedCount + 1);
  
  // const decreaseBeds = () => {
  //   if (bedCount > 0) {
  //     setBedCount(bedCount - 1);
  //   }
  // };

  // const updateBeds = async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     const response = await axios.put('http://localhost:5000/api/Bed_availability/update-beds', 
  //       {
  //         hospitalId: location.state.hospitalId,
  //         beds: bedCount, 
  //         token: token
  //       }, 
  //       {
  //         headers: { Authorization: `Bearer ${token}` }
  //       }
  //     );

  //     setMessage(response.data.status === 'SUCCESS' ? 'Bed count updated successfully!' : 'Failed to update bed count!');
  //   } catch (error) {
  //     setMessage('Error occurred while updating bed count.');
  //   }
  // };

  // const handleOxygenSubmit = () => {
  //   // Logic to handle oxygen capacity submission
  //   alert(`Oxygen capacity updated: ${oxygenCapacity}`);
  // };

  // const handleVentilatorsSubmit = () => {
  //   // Logic to handle ventilator submission
  //   alert(`Ventilators updated: ${ventilators}`);
  // };

  // useEffect(() => {
  //   const token = localStorage.getItem('authToken');
  //   if (!token) {
  //     window.location.href = '/login';
  //   }
  // }, []);

//   return (
//     <>
//       <div className='header'>
//         <Navbar />
//       </div>
//       <div className="home">
//         <div className='sidebar'>
//           <ul>
//             <li><a href="./AddAmbulance">Add Ambulance</a></li>
//             <li><a href="/AddDrivers">Add Drivers</a></li>
//           </ul>
//         </div>
        
//         <div>
//           <div className='boxes-container'>
//             <div className='box'>
//               <div className='text'>
//             <h2>Available Oxygen capacity</h2>
//             </div>
//             <div className='enter'>
//               <input
//                 type="number"
//                 value={oxygenCapacity}
//                 onChange={(e) => setOxygenCapacity(e.target.value)}
//                 placeholder="Enter Oxygen Capacity"
//               />
//               </div>
//               <div>
//               <button id="ok-button"onClick={handleOxygenSubmit}>Submit</button>
//               </div>
//             </div>
//             <div className='box'>
//               <div className='text'>
//             <h2>Available Oxygen capacity</h2>
//             </div>
//             <div className='enter'>
//               <input
//                 type="number"
//                 value={oxygenCapacity}
//                 onChange={(e) => setOxygenCapacity(e.target.value)}
//                 placeholder="Enter Oxygen Capacity"
//               />
//               </div>
//               <div>
//               <button id="ok-button"onClick={handleOxygenSubmit}>Submit</button>
//               </div>
//             </div>
//             <div className='box'>
//               <div className='text'>
//             <h2>Available ventilators</h2>
//             </div>
//             <div className='enter'>
//               <input
//                 type="number"
//                 value={oxygenCapacity}
//                 onChange={(e) => setOxygenCapacity(e.target.value)}
//                 placeholder="Enter Oxygen Capacity"
//               />
//               </div>
//               <div>
//               <button id="ok-button"onClick={handleOxygenSubmit}>Submit</button>
//               </div>
//             </div>
            
//           </div>
          
          
//           <div className='available-beds'>
          
//             <h2>Available beds </h2>
//             <div className="bed-controls">
//               <button onClick={decreaseBeds} className="bed-button">-</button>
//               <span>{bedCount}</span>
//               <button onClick={increaseBeds} className="bed-button">+</button>
//             </div>
//             <button id="submit-button" onClick={updateBeds}>Update</button>
//             {message && <p>{message}</p>}
//           </div>


          
//         </div>

        
//       </div>
      
//     </>
//   );
// }

// export default Home;


import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import Navbar from '../components/Navbar';
import logo from '../Assets/logo.png';

function Home() {
  const location = useLocation();
  const [bedCount, setBedCount] = useState(location.state ? location.state.beds : 0);
  const [message, setMessage] = useState('');
  const [oxygenCapacity, setOxygenCapacity] = useState(0);
  const [theotory, setTheotory] = useState(0);
  const [ventilators, setVentilators] = useState(0);
  const [hospitalName, setHospitalName] = useState(''); // State for hospital name

  // ... (keep existing functions)
 

   const updateBeds = async () => {
     try {
       const token = localStorage.getItem('token');
       const response = await axios.put('http://localhost:5000/api/Bed_availability/update-beds', 
         {
           hospitalId: location.state.hospitalId,
           beds: bedCount, 
           token: token
         }, 
         {
           headers: { Authorization: `Bearer ${token}` }
         }
     );

     setMessage(response.data.status === 'SUCCESS' ? 'Bed count updated successfully!' : 'Failed to update bed count!');
     } catch (error) {
       setMessage('Error occurred while updating bed count.');
     }
   };

   const handleOxygenSubmit = () => {
     // Logic to handle oxygen capacity submission
     alert(`Oxygen capacity updated: ${oxygenCapacity}`);
   };
     
   const handleTheotorySubmit = () => {
    // Logic to handle oxygen capacity submission
    alert(`Oxygen capacity updated: ${theotory}`);
  };
   const handleVentilatorsSubmit = () => {
     // Logic to handle ventilator submission
     alert(`Ventilators updated: ${ventilators}`);
   };

   useEffect(() => {
     const token = localStorage.getItem('authToken');
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
              <h2>Available theotory</h2>
              <input
                type="number"
                value={theotory}
                onChange={(e) => setTheotory(e.target.value)}
                placeholder="Enter Oxygen Capacity"
              />
              <button onClick={handleTheotorySubmit}>Update</button>
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
            <h2>Available Beds </h2>
            <div className="bed-controls">
              {/* Hospital name input */}
              <input
                type="text"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                placeholder="Enter Hospital Name"
                className="hospital-input"
              />
              
              {/* Bed count input */}
              <input
                type="number"
                value={bedCount}
                onChange={(e) => setBedCount(e.target.value)}
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