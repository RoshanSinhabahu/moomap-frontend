import React from 'react';
import Cow from '../assets/cow.png'; // fallback image
import {
  BatteryLow,
  BatteryMedium,
  BatteryFull,
  WifiOff,
  WifiLow,
  WifiHigh,
} from 'lucide-react';

export default function SelectedDeviceCard({ device, onRename, onDelete }) {
  if (!device) return null;

  // Battery icon with color
  const getBatteryIcon = (level) => {
    if (level <= 20) return <BatteryLow className="text-red-500" size={30} />;
    if (level <= 50)
      return <BatteryMedium className="text-yellow-500" size={30} />;
    return <BatteryFull className="text-green-500" size={30} />;
  };

  // Signal icon with color
  const getSignalIcon = (signal) => {
    if (signal === 0) return <WifiOff className="text-red-500" size={30} />;
    if (signal <= 2) return <WifiLow className="text-yellow-500" size={30} />;
    return <WifiHigh className="text-green-500" size={30} />;
  };

  // Active status
  const getActiveStatus = (status) => {
    if (status === 'Active')
      return <span className="text-green-500 font-semibold">● Active</span>;
    return <span className="text-red-500 font-semibold">● Inactive</span>;
  };

  return (
    <div className="p-4 bg-white rounded-xl flex flex-col items-center gap-3 shadow-lg">
      {/* Profile Image */}
      <img
        src={device.Image || Cow}
        alt={device.name}
        className="w-24 h-24 rounded-full object-cover shadow-md"
      />

      {/* Name & Basic Info */}
      <div className="text-xl font-semibold">{device.name}</div>
      <div className="text-sm text-gray-500 text-center">
        {device.breed} | {device.gender} | {device.age} yrs
      </div>
      <div className="text-sm text-gray-500 text-center">{device.color}</div>

      {/* Farm Info */}
      <div className="text-sm text-gray-600 text-center mt-1">
        Farm: {device.farmName} <br /> Address: {device.address}
      </div>

      {/* Health Notes */}
      <div className="text-sm text-gray-500 text-center mt-1">
        Notes: {device.healthNotes || 'No notes available'}
      </div>

      {/* Status */}
      <div className="mt-2">{getActiveStatus(device.status)}</div>

      {/* Battery & Signal */}
      <div className="flex w-full px-6 justify-around mt-2">
        <div className="flex items-center gap-1 font-medium">
          {getBatteryIcon(device.battery)}
          <span className="text-gray-700">{device.battery || 0}%</span>
        </div>
        <div className="flex items-center gap-1 font-medium">
          {getSignalIcon(device.signal)}
          <span className="text-gray-700">
            {device.signal ? (device.signal / 5) * 100 : 0}%
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-3 w-full">
        <button
          onClick={() => onRename(device.collarId)}
          className="py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition font-medium w-1/2"
        >
          Rename Cattle
        </button>
        <button
          onClick={() => onDelete(device.collarId)}
          className="py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium w-1/2"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
