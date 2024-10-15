import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5001');

function App() {
  const [alerts, setAlerts] = useState([]);
  const [showNotificationIcon, setShowNotificationIcon] = useState(false);

  useEffect(() => {
    // Fetch initial alert history
    fetchAlertHistory();

    // Listen for new alerts
    socket.on('new_alert', (newAlert) => {
      setAlerts((prevAlerts) => [newAlert, ...prevAlerts]);
      showNotification(newAlert.message);
      setShowNotificationIcon(true);
    });

    return () => {
      socket.off('new_alert');
    };
  }, []);

  const fetchAlertHistory = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/alert-history');
      setAlerts(response.data);
    } catch (error) {
      console.error('Failed to fetch alert history:', error);
    }
  };

  const showNotification = (message) => {
    if (Notification.permission === 'granted') {
      new Notification('Emergency Alert', { body: message });
      playNotificationSound();
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('Emergency Alert', { body: message });
          playNotificationSound();
        }
      });
    }
  };

  const playNotificationSound = () => {
    const audio = new Audio('/notification-sound.mp3'); // Add your notification sound file
    audio.play();
  };

  const toggleAlertHistory = () => {
    setShowNotificationIcon(false);
    // Implement your logic to show/hide alert history
  };

  return (
    <div className="App">
      <header>
        <h1>Emergency Alert System</h1>
        <button onClick={toggleAlertHistory}>
          {showNotificationIcon ? '🔔' : '🔕'} Notifications
        </button>j
      </header>
      <main>
        <h2>Alert History</h2>
        <ul>
          {alerts.map((alert, index) => (
            <li key={index}>
              {alert.message} - {new Date(alert.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;