
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './Pages/About';
import Home from './Pages/Home';
import List from './Pages/List';
import AmbulanceList from './Pages/AmbulanceList';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import LiveLocation from './Pages/LiveLocation';
import AddAmbulance from './Pages/AddAmbulance';
import AddDrivers from './Pages/AddDrivers';
import Detail from './Pages/Detail';
import EmergencyAlertsPage from './Pages/EmergencyAlertsPage';



function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/ICU List" element={<List />} />
          <Route path="/Ambulance" element={<AmbulanceList />} />
          <Route path='/LoginPage' element={<LoginPage />} />
          <Route path='/SignupPage' element={<SignupPage />} />
          <Route path='/location' element={<LiveLocation />} />
          <Route path='/AddAmbulance' element={<AddAmbulance />} />
          <Route path='/AddDrivers' element={<AddDrivers />} />
          <Route path="/Detail" element={<Detail />} />
          <Route path="/emergency-alerts" element={<EmergencyAlertsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;