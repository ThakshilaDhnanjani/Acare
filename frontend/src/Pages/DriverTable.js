import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DriverTable.css";
//import jwtDecode from "jwt-decode";
import Navbar from '../components/Navbar';


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
          }

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
    <div className="driver-table-container">
      <Navbar />
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
              <td colSpan="3">No drivers found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </>

  );
};

export default DriverTable;
