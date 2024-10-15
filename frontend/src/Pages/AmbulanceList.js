// import React, { useState, useEffect } from 'react';
// import './AmbulanceList.css'; 
// import Navbar from '../components/Navbar';

// const AmbulanceList = () => {
//   const [ambulances, setAmbulances] = useState([]);

//   // Fetch ambulances from the backend
//   useEffect(() => {
//     fetch('http://localhost:5000/api/Ambulance') // Adjust the URL to match your backend
//       .then((response) => response.json())
//       .then((data) => {
//         setAmbulances(data);
//       })
//       .catch((error) => {
//         console.error('Error fetching ambulances:', error);
//       });
//   }, []);

//   const handleSendLocation = (ambulanceId) => {
//     // You can replace this with logic to actually send location
//     alert(`Send location for ambulance with ID: ${ambulanceId}`);
//   };

//   return (
//     <>
//       <div className='header'>
//         <Navbar />
//       </div>
//       <div className="ambulance-list">
//         {ambulances.map((ambulance, index) => (
//           <div key={ambulance._id} className="ambulance-box">
//             <p>Vehicle Number: {ambulance.Ambulance_no}</p>
//             <button id="submit-button" onClick={() => handleSendLocation(ambulance._id)}>
//               Send Location
//             </button>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default AmbulanceList;


import React, { useState, useEffect } from 'react';
import './AmbulanceList.css'; 
import Navbar from '../components/Navbar';

const AmbulanceIcon = () => (
  <svg className="ambulance-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M3,15h1v1c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-1h1c0.5,0,1,0.5,1,1v2c0,0.5-0.5,1-1,1h-1c0,1.1-0.9,2-2,2h-2 c-1.1,0-2-0.9-2-2H9c0,1.1-0.9,2-2,2H5c-1.1,0-2-0.9-2-2H2c-0.5,0-1-0.5-1-1v-2C1,15.5,1.5,15,2,15h1V7c0-1.1,0.9-2,2-2h9 c1.1,0,2,0.9,2,2v8h6l-2-4h-3v-2h3c0.8,0,1.5,0.5,1.8,1.2l2.7,5.4c0.2,0.3,0.3,0.7,0.3,1.1v1C23,18.9,22.1,19.8,21,19.8z M7,12h4 v-2H7V12z M15,5c-0.6,0-1,0.4-1,1s0.4,1,1,1h2v-2H15z"/>
  </svg>
);

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
        {ambulances.map((ambulance) => (
          <div key={ambulance._id} className="ambulance-box">
            <AmbulanceIcon />
            <p>Vehicle Number: {ambulance.Ambulance_no}</p>
            <button onClick={() => handleSendLocation(ambulance._id)}>
              Send Location
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default AmbulanceList;