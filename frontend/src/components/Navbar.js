// import React from 'react';
// import './Navbar.css';
// import { FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Import the icons
// import logo from '../Assets/logo.png';

// function Header() {
//   return (
//     <header className='nav-links'>
//       <nav>
//         <img src={logo} alt='' className='logo' />
//         <ul>
//           <li><a href="/">Home</a></li>
//           <li><a href="/ICU List">ICU List</a></li>
//           <li><a href="/ambulance">Ambulance</a></li>
//           <li><a href="/location">Live Location</a></li>
//          {/* { <li><a href="/about">About</a></li>} */}
//           {/* <li><a href="/contact">Contact</a></li> */}
//         </ul>
        
//           <a href="/notifications"><FaBell className='abc' /></a>
//           <a href="/settings"><FaCog  /></a>
//           <a href="/logout"><FaSignOutAlt  /></a>
        
//       </nav>
//     </header>
//   );
// }

// export default Header;

import React from 'react';
import './Navbar.css';
import { FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';
import logo from '../Assets/logo.png';

function Header() {
  return (
    <header>
      <nav>
        <img src={logo} alt='Logo' className='logo' />
        <div className='nav-links'>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/ICU List">ICU List</a></li>
            <li><a href="/ambulance">Ambulance</a></li>
            <li><a href="/location">Live Location</a></li>
          </ul>
        </div>
        <div className='icons'>
          <a href="/notifications"><FaBell /></a>
          <a href="/settings"><FaCog /></a>
          <a href="/logout"><FaSignOutAlt /></a>
        </div>
      </nav>
    </header>
  );
}

export default Header;