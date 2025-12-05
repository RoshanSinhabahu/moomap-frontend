import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import Cow from '../assets/cow.png'; //for test
import { BatteryFull, Wifi } from 'lucide-react';

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

export default function MapView({ devices, onSelectDevice }) {
  // Battery icon with color
  const getBatteryIcon = (level) => {
    if (level <= 20) return <BatteryFull className="text-red-500" size={20} />;
    if (level <= 50)
      return <BatteryFull className="text-yellow-500" size={20} />;
    return <BatteryFull className="text-green-500" size={20} />;
  };

  // Signal icon with color
  const getSignalIcon = (signal) => {
    if (signal === 0) return <Wifi className="text-red-500" size={20} />;
    if (signal <= 2) return <Wifi className="text-yellow-500" size={20} />;
    return <Wifi className="text-green-500" size={20} />;
  };

  //Active status
  const getActiveStatus = (status) => {
    if (status === 'Active')
      return <span className="text-green-500 font-semibold">● Active</span>;
    return <span className="text-red-500 font-semibold">● Inactive</span>;
  };

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
            <div className="w-52 h-30 flex flex-row space-x-4">
              <img
                src={d.image || Cow}
                alt="Cattle"
                className="w-20 h-20 rounded-2xl object-cover shadow-md"
              />
              <div className="flex flex-col">
                <div className="font-bold text-lg">{d.name}</div>
                <div className="font-medium">{getActiveStatus(d.status)}</div>
                <div className="mt-3 text-sm flex w-full space-x-4 ">
                  {getBatteryIcon(d.battery)}
                  {getSignalIcon(d.signal)}
                </div>
              </div>
              
            </div>
            <hr className='my-3'></hr>
            <div className='text-center text-xs text-gray-400'>Click marker to see details</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
