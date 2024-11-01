
// import Navbar from '../components/Navbar'
// import React, { useState } from 'react';
// import axios from 'axios';
// import './AddDrivers.css';

// const AddDrivers = () => {
//     const [userId, setUserId] = useState('');
//     const [driver_name, setDriver_name] = useState('')
//     const [hospitalId, setHospitalId] = useState('');
//     const [contact_no, setContact_no] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         console.log('Driver ID:', userId);
//         console.log('Hospital ID:', hospitalId);
//         console.log('Driver Name:', driver_name);
//         console.log('Contact No:', contact_no);

//         setUserId('');
//         setHospitalId('');
//         setDriver_name('');
//         setContact_no('');
    

//     try {
//         const requestData = { userId,hospitalId,driver_name,contact_no };
//         console.log('Sending Driver data:', requestData); 
//         const response = await axios.post('http://localhost:5000/api/Driver/add', requestData);
//         console.log(response.data); 
//       } catch (error) {
//         console.error('Error during adding:', error);
//       }
    
//     };


//     return (

//         <>
//         <div className='header'>
//             <Navbar />
            
//         </div>
        
//     <div className='.add-driver-page'>
        

//         <div className="add-driver-container">


//             <h2>Add Drivers</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label htmlFor="userId">Driver ID:</label>
//                     <input
//                         type="text"
//                         id="userId"
//                         value={userId}
//                         onChange={(e) => setUserId(e.target.value)}
//                         required />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="driver_name">Driver Name:</label>
//                     <input
//                         type="text"
//                         id= "driver_name"
//                         value={driver_name}
//                         onChange={(e) => setDriver_name(e.target.value)}
//                         required />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="hospitalId">Hospital ID:</label>
//                     <input
//                         type="text"
//                         id="hospitalId"
//                         value={hospitalId}
//                         onChange={(e) => setHospitalId(e.target.value)}
//                         required />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="contact_no">Contact_no:</label>
//                     <input
//                         type="text"
//                         id="contact_no"
//                         value={contact_no}
//                         onChange={(e) => setContact_no(e.target.value)}
//                         required />
//                 </div>
//                 <button type="submit" className="submit-button">Add</button>
//             </form>

            
//         </div>
//      </div>
        
//         </>
    
//     );
// };

// export default AddDrivers;

import React, { useState } from 'react';
import { 
  UserCircle2, 
  Building, 
  Phone, 
  BadgeCheck, 
  CheckCircle2,
  AlertCircle 
} from 'lucide-react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './AddDrivers.css';

const AddDrivers = () => {
    const [userId, setUserId] = useState('');
    const [driver_name, setDriver_name] = useState('');
    const [hospitalId, setHospitalId] = useState('');
    const [contact_no, setContact_no] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const requestData = { userId, hospitalId, driver_name, contact_no };
            const response = await axios.post('http://localhost:5000/api/Driver/add', requestData);
            
            setIsSuccess(true);
            setMessage('Driver added successfully!');
            
            // Reset form
            setUserId('');
            setHospitalId('');
            setDriver_name('');
            setContact_no('');
            
            setTimeout(() => {
                setMessage('');
                setIsSuccess(false);
            }, 3000);
        } catch (error) {
            setIsSuccess(false);
            setMessage('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);

        } catch (error) {
            console.error('Error during adding:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="driver-registration-page">
                <div className="animated-circles">
                    <div className="circle circle-1"></div>
                    <div className="circle circle-2"></div>
                    <div className="circle circle-3"></div>
                </div>
                
                <div className="registration-container">
                    <div className="form-header">
                        <div className="header-icon">
                            <UserCircle2 size={40} />
                        </div>
                        <h2>Driver Registration</h2>
                        <p>Add a new driver to the system</p>
                    </div>

                    <form onSubmit={handleSubmit} className="registration-form">
                        <div className="form-grid">
                            <div className="input-group">
                                <div className="input-wrapper">
                                    <BadgeCheck className="field-icon" size={20} />
                                    <input
                                        type="text"
                                        value={userId}
                                        onChange={(e) => setUserId(e.target.value)}
                                        placeholder="Driver ID"
                                        required
                                    />
                                    <label>Driver ID</label>
                                </div>
                            </div>

                            <div className="input-group">
                                <div className="input-wrapper">
                                    <UserCircle2 className="field-icon" size={20} />
                                    <input
                                        type="text"
                                        value={driver_name}
                                        onChange={(e) => setDriver_name(e.target.value)}
                                        placeholder="Driver Name"
                                        required
                                    />
                                    <label>Driver Name</label>
                                </div>
                            </div>

                            <div className="input-group">
                                <div className="input-wrapper">
                                    <Building className="field-icon" size={20} />
                                    <input
                                        type="text"
                                        value={hospitalId}
                                        onChange={(e) => setHospitalId(e.target.value)}
                                        placeholder="Hospital ID"
                                        required
                                    />
                                    <label>Hospital ID</label>
                                </div>
                            </div>

                            <div className="input-group">
                                <div className="input-wrapper">
                                    <Phone className="field-icon" size={20} />
                                    <input
                                        type="tel"
                                        value={contact_no}
                                        onChange={(e) => setContact_no(e.target.value)}
                                        placeholder="Contact Number"
                                        required
                                    />
                                    <label>Contact Number</label>
                                </div>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className={`submit-button ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="loading-spinner"></span>
                            ) : (
                                <>Register Driver</>
                            )}
                        </button>

                        <button type="submit" className="submit-button">Add Driver</button>
                        
                        {message && <p>{message}</p>}

                    </form>

                    {message && (
                        <div className={`notification ${isSuccess ? 'success' : 'error'}`}>
                            {isSuccess ? (
                                <CheckCircle2 size={20} />
                            ) : (
                                <AlertCircle size={20} />
                            )}
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AddDrivers;
