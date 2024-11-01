// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./DriverTable.css";
// import Navbar from '../components/Navbar';

// const DriverTable = () => {
//   const [drivers, setDrivers] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const hospitalID = localStorage.getItem("hospitalId");  // Retrieve hospital ID from local storage

//     const fetchDrivers = async () => {
//       if (!hospitalID) {
//         console.error("Hospital ID not found in local storage.");
//         return;
//       }

//       try {
//         const response = await axios.get("http://localhost:5000/api/Driver", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
// <<<<<<< HEAD
//           params: { hospitalId },
//         });

//         setDrivers(response.data);
//         console.log("Drivers:", response.data);
//       } catch (error) {
//         console.error("Error fetching drivers:", error);
//       }
//     };

//     fetchDrivers();
//   }, [hospitalId]);

//   return (
//     <div className="driver-table-container">
//       <Navbar />
//       <h2>Drivers for Hospital {hospitalId}</h2>
//       <table className="driver-table">
//         <thead>
//           <tr>
//             <th>User ID</th>
//             <th>Driver Name</th>
//             <th>Contact No</th>
//           </tr>
//         </thead>
//         <tbody>
//           {drivers.length > 0 ? (
//             drivers.map((driver) => (
//               <tr key={driver._id}>
//                 <td>{driver.userId || "N/A"}</td>
//                 <td>{driver.driver_name}</td>
//                 <td>{driver.contact_no}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="3">No drivers found for this hospital</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// */
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DriverTable.css";
//import jwtDecode from "jwt-decode";
import Navbar from '../components/Navbar';
import { FaUser } from 'react-icons/fa';
import { color } from "@mui/system";


const DriverTable = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const hospitalID = localStorage.getItem("hospitalId");  // Retrieve hospital ID from local storage
    const fetchDrivers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/Driver", {
          headers: {
            Authorization: `Bearer ${token}`,
        },
        params: { hospitalId: hospitalID },  // Send hospital ID as a query parameter
        });

        setDrivers(response.data);
        console.log("Drivers:", response.data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchDrivers();
  }, []);

  return (
    <>
      <Navbar />
    <div className="driver-table-container">
      <h2>All Drivers</h2>
      <table className="driver-table">
        <thead>
          <tr>
            <th></th>
            <th>User ID</th>
            <th>Driver Name</th>
            <th>Contact No</th>
          </tr>
        </thead>
        <tbody>
          {drivers.length > 0 ? (
            drivers.map((driver) => (
              <tr key={driver._id}>
                <td><FaUser/></td>
                <td>{driver.userId || "N/A"}</td>
                <td>{driver.driver_name}</td>
                <td>{driver.contact_no}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No drivers found for this hospital</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default DriverTable;
