import React from 'react';
import { Alert, AlertTitle } from 'EmergencyAlertsPage';
import { useAlerts } from './AlertContext';

export function PersistentAlertComponent() {
  const { alerts, removeAlert } = useAlerts();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4 space-y-2">
      {alerts.map((alert) => (
        <Alert key={alert.id} variant="destructive" className="mb-2">
          <AlertTitle>{alert.message}</AlertTitle>
          <button 
            onClick={() => removeAlert(alert.id)}
            className="absolute top-2 right-2 text-sm"
          >
            ✕
          </button>
        </Alert>
      ))}
    </div>
  );
}