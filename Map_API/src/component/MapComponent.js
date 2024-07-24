// src/components/MapComponent.js
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

// Fix Leaflet's default icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const RoutingMachine = ({ currentLocation, destination }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Remove existing routing control
    map.eachLayer((layer) => {
      if (layer instanceof L.Routing.Control) {
        map.removeControl(layer);
      }
    });

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(currentLocation[0], currentLocation[1]),
        L.latLng(destination[0], destination[1])
      ],
      routeWhileDragging: true,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, currentLocation, destination]);

  return null;
};

const MapComponent = () => {
  const [currentLocation, setCurrentLocation] = useState([7.8731, 80.7718]); // Centered in Sri Lanka
  const [destination, setDestination] = useState([7.8731, 80.7718]); // Default destination
  const [currentLat, setCurrentLat] = useState('');
  const [currentLng, setCurrentLng] = useState('');
  const [destLat, setDestLat] = useState('');
  const [destLng, setDestLng] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation([latitude, longitude]);
      });
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentLat && currentLng) {
      setCurrentLocation([parseFloat(currentLat), parseFloat(currentLng)]);
    }
    setDestination([parseFloat(destLat), parseFloat(destLng)]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Set Locations</h2>
        <div>
          <label>
            Current Location Latitude:
            <input
              type="number"
              step="any"
              value={currentLat}
              onChange={(e) => setCurrentLat(e.target.value)}
            />
          </label>
          <label>
            Current Location Longitude:
            <input
              type="number"
              step="any"
              value={currentLng}
              onChange={(e) => setCurrentLng(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Destination Latitude:
            <input
              type="number"
              step="any"
              value={destLat}
              onChange={(e) => setDestLat(e.target.value)}
              required
            />
          </label>
          <label>
            Destination Longitude:
            <input
              type="number"
              step="any"
              value={destLng}
              onChange={(e) => setDestLng(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Update Map</button>
      </form>

      <MapContainer
        center={currentLocation}
        zoom={8} // Adjust zoom level as needed
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={currentLocation}>
          <Popup>Your current location.</Popup>
        </Marker>
        <Marker position={destination}>
          <Popup>Your destination.</Popup>
        </Marker>
        <RoutingMachine currentLocation={currentLocation} destination={destination} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
