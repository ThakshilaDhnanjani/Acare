
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css';
// import { FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';

// function Navbar() {


//   return (
//     <header>
//       <nav>
//         <div className='nav-links'>
//           <ul>
//             <li><Link to="/">Home</Link></li>
//             <li><Link to="/icu-list">ICU List</Link></li>
//             <li><Link to="/ambulance">Ambulance</Link></li>
//             <li><Link to="/location">Live Location</Link></li>
//           </ul>
//         </div>
//         <div className='icons'>
//           <Link to="/emergency-alerts"><FaBell /></Link>
//           <Link to="/settings"><FaCog /></Link>
//           <Link to="/login"><FaSignOutAlt /></Link>
//         </div>
//       </nav>
//     </header>
//   );
// }

// export default Navbar;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaBell, FaCog, FaSignOutAlt, FaBars } from 'react-icons/fa';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <nav>
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
            <li><Link to="/icu-list" onClick={toggleMenu}>ICU List</Link></li>
            <li><Link to="/ambulance" onClick={toggleMenu}>Ambulance</Link></li>
            <li><Link to="/location" onClick={toggleMenu}>Live Location</Link></li>
          </ul>
        </div>
        <div className='icons'>
          <Link to="/emergency-alerts"><FaBell /></Link>
          <Link to="/settings"><FaCog /></Link>
          <Link to="/login"><FaSignOutAlt /></Link>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          <FaBars />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;