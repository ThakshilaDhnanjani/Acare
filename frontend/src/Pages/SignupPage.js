
import React, { useState } from 'react';
import './SignupPage.css';
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [hospitalId, setHospitalId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [beds, setBeds] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (password !== confirmPassword) {
      return alert('Passwords do not match');
    }
    try {
      const requestData = { username,hospitalId,email, password,beds };
      console.log('Sending registration data:', requestData); 
      const response = await axios.post('http://localhost:5000/api/Hospital_login/signup', requestData);
      console.log(response.data);
      alert('Registration successful!');
      navigate('/ICU List'); 
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className='input-box'>
          <input type='text' placeholder='Username' id='username' required value={username} onChange={(e) => setUsername(e.target.value)} />
          <FaUser className='icon' />
        </div>
        <div className='input-box'>
          <input type='text' placeholder='Hospital ID' id='hospitalId' required value={hospitalId} onChange={(e) => setHospitalId(e.target.value)} />
          <FaEnvelope className='icon' />
        </div>
        <div className='input-box'>
          <input type='text' placeholder='Email' id='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
          <FaEnvelope className='icon' />
        </div>
        <div className='input-box'>
          <input type='password' placeholder='Password' id='password'required value={password} onChange={(e) => setPassword(e.target.value)} />
          <FaLock className='icon' />
        </div>
        <div className='input-box'>
          <input type='password' placeholder='Confirm Password' id='confirmpassword' required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <FaLock className='icon' />
        </div>
        <div className='input-box'>
          <input type='number' placeholder='beds' id='beds' required value={beds} onChange={(e) => setBeds(e.target.value)} />
          
        </div>
        <button type='submit'>Sign Up</button>
        <div className='register-link'>
          <p>Already have an account? <a href='./LoginPage'>Login</a></p>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
