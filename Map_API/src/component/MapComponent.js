// src/components/MapComponent.js
import axios from 'axios';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

// Import custom marker icons
import blueMarkerIcon from '../assets/images/blue-marker-icon.png';
import redMarkerIcon from '../assets/images/red-marker-icon.png';

// Fix Leaflet's default icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Define custom icons
const startIcon = new L.Icon({
  iconUrl: blueMarkerIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const destinationIcon = new L.Icon({
  iconUrl: redMarkerIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Component to set the map view to the current location
const SetViewOnClick = ({ coords }) => {
  const map = useMap();
  map.setView(coords, map.getZoom());
  return null;
};

const MapComponent = () => {
  const [currentLocation, setCurrentLocation] = useState([51.505, -0.09]);
  const [destination, setDestination] = useState([51.51, -0.12]);
  const [searchQuery, setSearchQuery] = useState("");
  const routingControlRef = useRef(null);
  const mapRef = useRef();

  // Get the user's current location and update it in real-time using the Geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation([latitude, longitude]);
      });
    }
  }, []);

  // Initialize routing control and update waypoints when current location or destination changes
  useEffect(() => {
    if (mapRef.current && !routingControlRef.current) {
      routingControlRef.current = L.Routing.control({
        waypoints: [
          L.latLng(currentLocation[0], currentLocation[1]),
          L.latLng(destination[0], destination[1])
        ],
        routeWhileDragging: true
      }).addTo(mapRef.current);
    } else if (routingControlRef.current) {
      routingControlRef.current.setWaypoints([
        L.latLng(currentLocation[0], currentLocation[1]),
        L.latLng(destination[0], destination[1])
      ]);
    }
  }, [currentLocation, destination]);

  // Search for a location using the Nominatim API and set the destination based on the search result
  const handleSearch = async () => {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: searchQuery,
          format: 'json',
          addressdetails: 1,
          limit: 3
        }
      });
      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        const newDestination = [parseFloat(lat), parseFloat(lon)];
        setDestination(newDestination);
        if (mapRef.current) {
          mapRef.current.setView(newDestination, 13); // Adjust zoom level if necessary
        }
      }
    } catch (error) {
      console.error("Error searching location:", error);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a place..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <MapContainer
        center={currentLocation}
        zoom={13}
        style={{ height: '100vh', width: '100%' }}
        whenCreated={(mapInstance) => { mapRef.current = mapInstance; }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={currentLocation} icon={startIcon}>
          <Popup>
            Your current location.
          </Popup>
        </Marker>
        <Marker position={destination} icon={destinationIcon}>
          <Popup>
            Your destination.
          </Popup>
        </Marker>
        <SetViewOnClick coords={currentLocation} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
