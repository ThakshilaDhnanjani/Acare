import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { FaUser, FaLock } from "react-icons/fa";

function Signin() {
  const [username, setUsername] = useState(''); // State to store the username
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // For navigation after successful login

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // POST request to authenticate user
      const response = await axios.post('http://localhost:5000/api/Hospital_login/signin', {
        username, // Sending the username and password to the backend
        password,
      });

      if (response.data.status === 'SUCCESS') {
        // Store token in localStorage
        localStorage.setItem('authToken', response.data.token);

        // Use navigate to go to the home page and pass the data using `state`
        navigate('/:id', {
          state: {
            beds: response.data.beds,         // Passing the bed count from response
            username: response.data.username, // Passing the username from response
            hospitalId: response.data.hospitalId, // Passing the hospitalId from response
            token: response.data.token,       // Passing the token from response
          }
        });
        console.log(response.data);
        alert('Login successful!');
      } else {
        // Display the error message from the response
        alert('Login failed. Please try again.');
      }
    } catch (error) {
      // Display a generic error message if any error occurs
      alert('An error occurred during signin. Please try again.');
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className='input-box'>
          <input 
            type='text' 
            placeholder='Hospital Name' // Changed placeholder to Hospital Name
            id='username' // Set input field id to username
            required 
            value={username} // Bind username to input value
            onChange={(e) => setUsername(e.target.value)} // Handle username input changes
          />
          <FaUser className='icon' />
        </div>
        <div className='input-box'>
          <input 
            type='password' 
            placeholder='Password' 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} // Handle password input changes
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
      {errorMessage && <p className='error-message'>{errorMessage}</p>} {/* Display error message */}
    </div>
  );
}

export default Signin;
