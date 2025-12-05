import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

export default function MapView({ devices, onSelectDevice }) {
  return (
    <MapContainer
      center={[6.9271, 79.8612]}
      zoom={13}
      className="w-full h-full z-0"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {devices.map((d) => (
        <Marker
          key={d.id}
          position={[d.lat, d.lng]}
          eventHandlers={{ click: () => onSelectDevice(d) }}
        >
          <Popup>
            <div className="w-40">
              <div className="font-bold">{d.name}</div>
              <div className="text-xs text-gray-500">{d.desc}</div>
              <div className="mt-1 text-sm">
                Battery: <strong>{d.battery}%</strong>
                <br />
                Signal: <strong>{d.signal}/5</strong>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
