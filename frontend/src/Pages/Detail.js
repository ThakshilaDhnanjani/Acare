// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import axios from 'axios';
// import './Detail.css';

// export default function Detail() {
//   const [bed, setBed] = useState(0);
//   const [message, setMessage] = useState('');
//   const [oxygenCapacity, setOxygenCapacity] = useState(0);
//   const [ventilators, setVentilators] = useState(0);
//   const [theater, setTheater] = useState(0);
//   const[HName, setHname] = useState('')
//   const name = localStorage.getItem('rememberedUsername');
//   const { hospitalName } = useParams();

//   console.log(hospitalName)
  
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.post(`http://localhost:5000/api/Bedavailability/fetchDetails/${hospitalName}`);
//         if (response) {
//           const data = response.data;
//           setBed(data.beds); 
//           setVentilators(data.ventilators)
//           setOxygenCapacity(data.oxygen)
//           setTheater(data.theaters)
//           setHname(data.username)
//         } else {
//           console.error('error fetch');
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };

//     fetchUserData(); 
//   }, [name]);








//   return (
//     <>
//       <div className='header'>
//         <Navbar />
//       </div>
//       <div>
//         <form className="icu-details-form">
//           <div className="form-group">
//             <label htmlFor="name">ICU Name</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={HName || ''}
//               readOnly
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="oxygenCapacity">Oxygen Capacity</label>
//             <input
//               type="text"
//               id="oxygenCapacity"
//               name="oxygenCapacity"
//               value={oxygenCapacity || 'N/A'}
//               readOnly
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="ventilators">Ventilators</label>
//             <input
//               type="text"
//               id="ventilators"
//               name="ventilators"
//               value={ventilators || 'N/A'}
//               readOnly
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="theaters">Theaters</label>
//             <input
//               type="text"
//               id="theaters"
//               name="theaters"
//               value={theater || 'N/A'}
//               readOnly
//             />
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Building2, 
  Wind, 
  Stethoscope, 
  Hospital
} from 'lucide-react';
import axios from 'axios';
import './Detail.css';
import Navbar from '../components/Navbar'

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="stat-card">
    <div className="stat-card-content">
      <div className="stat-card-inner">
        <div className={`icon-container ${color}`}>
          <Icon className="stat-icon" />
        </div>
        <div className="stat-info">
          <p className="stat-label">{label}</p>
          <h3 className="stat-value">{value || 'N/A'}</h3>
        </div>
      </div>
    </div>
  </div>
);

const Detail = () => {
  const [bed, setBed] = useState(0);
  const [oxygenCapacity, setOxygenCapacity] = useState(0);
  const [ventilators, setVentilators] = useState(0);
  const [theater, setTheater] = useState(0);
  const [HName, setHname] = useState('');
  const { hospitalName } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post(`http://localhost:5000/api/Bedavailability/fetchDetails/${hospitalName}`);
        if (response) {
          const data = response.data;
          setBed(data.beds);
          setVentilators(data.ventilators);
          setOxygenCapacity(data.oxygen);
          setTheater(data.theaters);
          setHname(data.username);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, [hospitalName]);

  return (
    <>
    <Navbar/>
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">{HName || 'Hospital Details'}</h1>
          <p className="dashboard-subtitle">ICU Facility Information Dashboard</p>
        </div>
        
        <div className="stats-grid">
          <StatCard 
            icon={Building2}
            label="ICU Name"
            value={HName}
            color="bg-blue"
          />
          <StatCard 
            icon={Wind}
            label="Oxygen Capacity"
            value={oxygenCapacity}
            color="bg-green"
          />
          <StatCard 
            icon={Stethoscope}
            label="Ventilators"
            value={ventilators}
            color="bg-purple"
          />
          <StatCard 
            icon={Hospital}
            label="Theaters"
            value={theater}
            color="bg-orange"
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default Detail;