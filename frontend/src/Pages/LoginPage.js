import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { FaUser, FaLock } from "react-icons/fa";

function Signin() {
  const [hospitalId, setHospitalId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/Hospital_login/signin', {
        hospitalId,
        password,
      });

      if (response.data.status === 'SUCCESS') {
        // Navigate to Home and pass beds count and hospitalId
        navigate('/', { state: { beds: response.data.beds, hospitalId }});
        console.log(response.data);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage('An error occurred during signin');
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className='input-box'>
          <input 
            type='text' 
            placeholder='Username' 
            id='hospitalId' 
            required 
            value={hospitalId} 
            onChange={(e) => setHospitalId(e.target.value)} 
          />
          <FaUser className='icon' />
        </div>
        <div className='input-box'>
          <input 
            type='password' 
            placeholder='Password' 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <FaLock className='icon' />
        </div>
        <div className='remember-forget'>
          <label><input type='checkbox' />Remember me</label>
          <a href='#'>Forget password?</a>
        </div>
        <button type='submit'>Login</button>
        <div className='register-link'>
          <p>Don't have an account?<a href='./SignupPage'>Register</a></p>
        </div>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default Signin;
