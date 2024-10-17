import React from 'react';
import { useAlerts } from './AlertContext';

function ExampleComponent() {
  const { addAlert } = useAlerts();

  const handleClick = () => {
    addAlert("This is a new alert!");
  };

  return (
    <div>
      <h2>Example Component</h2>
      <button onClick={handleClick}>Trigger Alert</button>
    </div>
  );
}

export default ExampleComponent;