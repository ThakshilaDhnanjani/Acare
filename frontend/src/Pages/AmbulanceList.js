

import React from 'react';
import './AmbulanceList.css'; 
import Navbar from '../components/Navbar'

const ambulances = [
  { vehicleNumber: 'AMB-001' },
  { vehicleNumber: 'AMB-002' },
  { vehicleNumber: 'AMB-003'},
  { vehicleNumber: 'AMB-004' },
  { vehicleNumber: 'AMB-005' },
  { vehicleNumber: 'AMB-006' }
];

const AmbulanceList = () => {
  return (
   
    <><div className='header'><Navbar /></div><div className="ambulance-list">

          {ambulances.map((ambulance, index) => (
              <div key={index} className="ambulance-box">
                 
                  <p>Vehicle Number: {ambulance.vehicleNumber}</p>

                  <button id="submit-button">Send Location</button>
              </div>
          ))}
      </div></>
  );
};

export default AmbulanceList;
