import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Detail.css';

export default function Detail() {
  const { hospitalName } = useParams();  // Get hospital name from URL
  const [hospitalData, setHospitalData] = useState({
    name: '',
    hospitalId: '',
    email: '',
    beds: 0,
    oxygenCapacity: 0,
    ventilators: 0,
    theaters: 0
  });

  // Fetch data from backend on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/Moreinfo/get/${hospitalName}`, {  // Include hospital name in URL
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`  // Include token
          }
        });

        const result = await response.json();

        if (response.ok) {
          setHospitalData(result.Hospital);  // Update state with hospital data
        } else {
          console.error(result.status);
        }
      } catch (error) {
        console.error("Error fetching hospital data:", error);
      }
    };

    fetchData();
  }, [hospitalName]);  // Fetch data when hospitalName changes

  return (
    <>
      <div className='header'>
        <Navbar />
      </div>
      <div>
        <form className="icu-details-form">
          <div className="form-group">
            <label htmlFor="name">ICU Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={hospitalData.name || ''}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="oxygenCapacity">Oxygen Capacity</label>
            <input
              type="text"
              id="oxygenCapacity"
              name="oxygenCapacity"
              value={hospitalData.oxygenCapacity || 'N/A'}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="ventilators">Ventilators</label>
            <input
              type="text"
              id="ventilators"
              name="ventilators"
              value={hospitalData.ventilators || 'N/A'}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="theaters">Theaters</label>
            <input
              type="text"
              id="theaters"
              name="theaters"
              value={hospitalData.theaters || 'N/A'}
              readOnly
            />
          </div>
        </form>
      </div>
    </>
  );
}
