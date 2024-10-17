
import Navbar from '../components/Navbar'
import React, { useState } from 'react';
import axios from 'axios';
import './AddAmbulance.css';

const AddAmbulance = () => {
    const [Ambulance_no, setAmbulance_no] = useState('');
    const [hospitalId, setHospitalId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log('Ambulance ID:', Ambulance_no);
        console.log('Hospital ID:', hospitalId);
       
        setAmbulance_no('');
        setHospitalId('');
    
    try {
      const requestData = { Ambulance_no,hospitalId, };
      console.log('Sending ambulance data:', requestData); 
      const response = await axios.post('http://localhost:5000/api/Ambulance/add', requestData);
      console.log(response.data); 
    } catch (error) {
      console.error('Error during adding:', error);
    }
  };

    return (
        <>
    <div className='.add-ambulance-page'>
        
   
        <div className="add-ambulance-container">


            <h2>Add Ambulance</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="Ambulance_no">Ambulance ID:</label>
                    <input
                        type="text"
                        id="Ambulance_no"
                        value={Ambulance_no}
                        onChange={(e) => setAmbulance_no(e.target.value)}
                        required />
                </div>
                <div className="form-group">
                    <label htmlFor="hospitalId">Hospital ID:</label>
                    <input
                        type="text"
                        id="hospitalId"
                        value={hospitalId}
                        onChange={(e) => setHospitalId(e.target.value)}
                        required />
                </div>
                <button type="submit" className="submit-button">Add</button>
            </form>

            
        </div>
     </div>
        
        </>
    
    );
};

export default AddAmbulance;
