import React from 'react';
import {
  MapContainer,
  TileLayer,
  LayersControl,
  Marker,
  Popup
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapShow = ({ 
  latitude, 
  longitude, 
  zoom = 13,
  height = '400px',
  width = '100%'
}) => {
  // Convert to numbers and validate
  const parseCoordinate = (coord) => {
    const num = Number(coord);
    return isNaN(num) ? null : num;
  };

  const validLat = parseCoordinate(latitude);
  const validLng = parseCoordinate(longitude);
  
  // Default to New Delhi if no valid coordinates
  const position = validLat && validLng ? [validLat, validLng] : [28.6139, 77.2090];

  // Custom marker icon
  const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      style={{ height, width }}
      scrollWheelZoom={true}
      className="map-container"
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Street View">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Satellite View">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Terrain View">
          <TileLayer
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a>'
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      <Marker position={position} icon={customIcon}>
        <Popup>
          <div style={{ textAlign: 'center' }}>
            <strong>Location Details</strong><br />
            Latitude: {validLat?.toFixed?.(6) ?? 'N/A'}<br />
            Longitude: {validLng?.toFixed?.(6) ?? 'N/A'}<br />
            {!validLat || !validLng && <small>Showing default location</small>}
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapShow;