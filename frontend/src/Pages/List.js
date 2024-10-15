import React, { useState } from 'react';
import './List.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';//new

const icus = [
  { name: 'ICU 1', location: 'Location 1', contact: '123-456-7890', availableBeds: 5 },
  { name: 'ICU 2', location: 'Location 2', contact: '123-456-7891', availableBeds: 2 },
  { name: 'ICU 3', location: 'Location 3', contact: '123-456-7892', availableBeds: 0 },
];

export default function List() {
  const [icuData, setIcuData] = useState(icus);
  const navigate = useNavigate();//new

  const handleRequestBed = (index) => {
    setIcuData(prevIcus => {
      const updatedIcus = [...prevIcus];
      if (updatedIcus[index].availableBeds > 0) {
        updatedIcus[index].availableBeds -= 1;
      }
      return updatedIcus;
    });
  };
//new
  const handleViewMore = (icu) => {
    navigate('/Detail', { state: { ...icu } });
  };
//



  return (
    <>
      <div className='header'><Navbar /></div>
      <div className="icu-list">
        {icuData.map((icu, index) => (
          <div key={index} className="icu-box">
            <div className="icu-header">
              <h2>{icu.name}</h2>
              
              <button className="view-more-button"  onClick={() => handleViewMore(icu)}
              >View More Info</button>

            </div>
            <p><strong>Location:</strong> {icu.location}</p>
            <p><strong>Contact:</strong> {icu.contact}</p>
            <table>
              <thead>
                <tr>
                  <th>ICU Name</th>
                  <th>Available Beds</th>
                  <th>Request Bed</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{icu.name}</td>
                  <td>{icu.availableBeds}</td>
                  <td>
                    <button 
                      className="request-bed-button"
                      onClick={() => handleRequestBed(index)}
                      disabled={icu.availableBeds === 0}
                    >
                      Request Bed
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </>
  );
}
