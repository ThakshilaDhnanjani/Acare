import React from 'react';
import './Navbar.css';
import { FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Import the icons
import logo from '../Assets/logo.png';

function Header() {
  return (
    <header className='nav-links'>
      <nav>
        <img src={logo} alt='' className='logo' />
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/ICU List">ICU List</a></li>
          <li><a href="/ambulance">Ambulance</a></li>
          <li><a href="/location">Live Location</a></li>
         {/* { <li><a href="/about">About</a></li>} */}
          {/* <li><a href="/contact">Contact</a></li> */}
        </ul>
        
          <a href="/notifications"><FaBell className='abc' /></a>
          <a href="/settings"><FaCog  /></a>
          <a href="/logout"><FaSignOutAlt  /></a>
        
      </nav>
    </header>
  );
}

export default Header;
