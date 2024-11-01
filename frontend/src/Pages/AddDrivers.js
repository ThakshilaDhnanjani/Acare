import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './AddDrivers.css';

const AddDrivers = () => {
    const [userId, setUserId] = useState('');
    const [driver_name, setDriver_name] = useState('');
    const [hospitalId, setHospitalId] = useState(''); // No input for hospitalId
    const [contact_no, setContact_no] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Retrieve hospitalId from local storage
        const storedHospitalId = localStorage.getItem('hospitalId');
        if (storedHospitalId) {
            setHospitalId(storedHospitalId);
        } else {
            setMessage('Hospital ID not found in local storage.');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const requestData = { userId, hospitalId, driver_name, contact_no };
            console.log('Sending Driver data:', requestData);
            const response = await axios.post('http://localhost:5000/api/Driver/add', requestData);
            console.log(response.data);
            
            // Clear form fields after successful submission
            setUserId('');
            setDriver_name('');
            setContact_no('');
        } catch (error) {
            console.error('Error during adding:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <>
            <Navbar />
            <main className="add-driver-page">
                <div className="add-driver-container">
                    <h2>Add Driver</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="userId">Driver ID</label>
                            <input
                                type="text"
                                id="userId"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="driver_name">Driver Name</label>
                            <input
                                type="text"
                                id="driver_name"
                                value={driver_name}
                                onChange={(e) => setDriver_name(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact_no">Contact Number</label>
                            <input
                                type="tel"
                                id="contact_no"
                                value={contact_no}
                                onChange={(e) => setContact_no(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="submit-button">Add Driver</button>
                        
                        {message && <p>{message}</p>}
                    </form>
                </div>
            </main>
        </>
    );
};

export default AddDrivers;
