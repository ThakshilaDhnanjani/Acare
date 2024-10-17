import React, { createContext, useState, useContext, useEffect } from 'react';
import alertSound from '../Assets/alert.wav';

const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState([]);
  const [audio] = useState(new Audio(alertSound)); // Placeholder for audio file

  const addAlert = (message) => {
    const newAlert = { id: Date.now(), message };
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
    audio.play().catch(error => console.error('Failed to play sound:', error));
  };

  const removeAlert = (id) => {
    setAlerts((prevAlerts) => prevAlerts.filter(alert => alert.id !== id));
  };

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/alerts');
        if (!response.ok) throw new Error('Failed to fetch alerts');
        const data = await response.json();
        data.forEach(alert => addAlert(alert.message));
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    fetchAlerts();
    const intervalId = setInterval(fetchAlerts, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlerts() {
  return useContext(AlertContext);
}