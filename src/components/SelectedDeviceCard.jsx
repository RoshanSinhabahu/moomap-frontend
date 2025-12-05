import React from 'react';
import Cow from '../assets/cow.png'; //for test
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

  //Active status
  const getActiveStatus = (status) => {
    if (status === 'Active')
      return <span className="text-green-500 font-semibold">● Active</span>;
    return <span className="text-red-500 font-semibold">● Inactive</span>;
  };

  return (
    <div className="p-4 bg-white rounded-xl flex flex-col items-center gap-2 ">
      {/* Profile Image */}
      <img
        src={device.image || Cow}
        alt="Cattle"
        className="w-20 h-20 rounded-full object-cover shadow-md"
      />

      {/* Name */}
      <div className="text-xl font-semibold">{device.name}</div>

      {/* Description */}
      <div className="text-sm text-gray-500 text-center -mt-2">
        {device.desc}
      </div>

      <div className="mt-1 text-sm text-gray-500 text-center">
        {getActiveStatus(device.status)}
      </div>

      {/* Status Section (icons + values) */}
      <div className="flex flex-co w-full px-6 items-center justify-center space-x-8">
        {/* Battery */}
        <div className="flex items-center gap-1 font-medium">
          {getBatteryIcon(device.battery)}
          <span className="text-gray-700">{device.battery}%</span>
        </div>

        {/* Signal */}
        <div className="flex items-center gap-1 text-sm font-medium">
          {getSignalIcon(device.signal)}
          <span className="text-gray-700">{(device.signal / 5) * 100}%</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-2 w-full justify-between">
        <button
          onClick={() => onRename(device.id)}
          className="py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition font-medium w-1/2"
        >
          Rename Cattle
        </button>
        <button
          onClick={() => onDelete(device.id)}
          className="py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium w-1/2"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
