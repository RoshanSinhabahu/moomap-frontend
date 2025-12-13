import React from 'react';
import Cow from '../assets/cow.png'; // fallback image
import {
  BatteryLow,
  BatteryMedium,
  BatteryFull,
  Signal,
  SignalHigh,
  SignalMedium,
  SignalLow,
  SignalZero,
  MapPin,
  Forward,
  Crosshair
} from 'lucide-react';
import { Riple } from 'react-loading-indicators';

export default function SelectedDeviceCard({ device, onRename, onFocus, loading }) {
  if (loading) {
    return (
      <div className="p-4 bg-white rounded-xl flex items-center justify-center h-full w-full shadow-lg">
        <Riple color="#4f46e5" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (!device) return null;
  // Active status
  const getActiveStatus = (status) => {
    if (status && status.toLowerCase() === 'active')
      return (
        <span className="text-green-500 font-semibold flex items-center justify-center gap-2">
          <span className="relative flex h-4 w-4 justify-center items-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          Active
        </span>
      );
    return <span className="text-red-500 font-semibold flex items-center justify-center gap-2">
      <span className="relative flex h-4 w-4 justify-center items-center">
        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
      </span>
      Inactive
    </span>
  };

  // Battery icon with color
  const getBatteryIcon = (level) => {
    let OverlayIcon = BatteryFull;
    let colorClass = 'text-green-500';

    if (level <= 20) {
      OverlayIcon = BatteryLow;
      colorClass = 'text-red-500';
    } else if (level <= 50) {
      OverlayIcon = BatteryMedium;
      colorClass = 'text-yellow-500';
    }

    return (
      <div className="relative w-8 h-8">
        <BatteryFull className="text-gray-300 absolute top-0 left-0" size={2} />
        <OverlayIcon className={`${colorClass} absolute top-0 left-0`} size={30} />
      </div>
    );
  };

  // Signal icon with color (RSSI based: > -70 good, > -85 fair, else poor)
  const getSignalIcon = (signal) => {
    // If signal is -999 or undefined, treat as no signal
    if (!signal || signal === -999) {
      return (
        <div className="relative w-8 h-8">
          <Signal className="text-gray-300 absolute top-[1px] left-0" size={25} />
          <SignalZero className="text-red-500 absolute top-[1px] left-0" size={25} />
        </div>
      );
    }

    let OverlayIcon = SignalHigh;
    let colorClass = 'text-green-500';

    if (signal > -70) {
      OverlayIcon = SignalHigh;
      colorClass = 'text-green-500';
    } else if (signal > -85) {
      OverlayIcon = SignalMedium;
      colorClass = 'text-yellow-500';
    } else {
      OverlayIcon = SignalLow;
      colorClass = 'text-red-500';
    }

    return (
      <div className="relative w-8 h-8">
        <Signal className="text-gray-300 absolute top-[1px] left-0" size={25} />
        <OverlayIcon className={`${colorClass} absolute top-[1px] left-0`} size={25} />
      </div>
    );
  };

  return (
    <div className="py-6 px-5 bg-white rounded-xl flex flex-col items-center gap-4 shadow-lg animate-expand w-full">
      {/* Profile Image */}
      <img
        src={device.Image || Cow}
        alt={device.name}
        className="w-24 h-24 rounded-full object-cover shadow-md"
      />

      {/* Name & Basic Info */}
      <div className="text-xl font-semibold capitalize">{device.name}</div>
      <div className="text-sm text-center">

        {/* Status */}
        <div className="mb-3 text-center">
          {getActiveStatus(device.status)}
          {device.lastSeen && (
            <div className="text-xs text-gray-500 mt-1">
              {device.status?.toLowerCase() === 'active' ? 'Last update' : 'Last seen'}: <span className="font-bold">{new Date(device.lastSeen).toLocaleString()}</span>
            </div>
          )}
        </div>

        <span className="capitalize">{device.breed}</span> | <span className="capitalize">{device.gender}</span> | {device.age} yrs
      </div>
      <div className="text-sm  text-center">{device.color}</div>

      {/* Farm Info */}
      <div className="text-sm text-center mt-1">
        Farm: <span className="font-bold">{device.farmName}</span> <br /> <MapPin className='inline w-[14px] h-[14px] mb-[3px] mr-[2px] ' />Address: <span className="font-bold">{device.address}</span>
      </div>

      {/* Health Notes */}
      <div className="text-sm text-center mt-1">
        Notes: <span className="font-bold">{device.healthNotes || 'No notes available'}</span>
      </div>

      {/* Battery & Signal */}
      <div className="flex w-full px-6 justify-around mt-2">
        <div className="flex items-center gap-1 font-medium">
          {getBatteryIcon(device.battery)}
          <span className="text-gray-700">{device.battery || 0}%</span>
        </div>
        <div className="flex items-center gap-1 font-medium">
          {getSignalIcon(device.signal)}
          <span className="text-gray-700">
            {!device.signal || device.signal === -999
              ? 'No Signal'
              : device.signal > -70
                ? 'Excellent'
                : device.signal > -85
                  ? 'Good'
                  : 'Weak'}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-3 w-full">
        <button
          onClick={() => {
            if (device.lat && device.lng) {
              window.open(`https://www.google.com/maps/dir/?api=1&destination=${device.lat},${device.lng}`, '_blank');
            }
          }}
          className="py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition font-medium w-1/2 flex items-center justify-center gap-2"
        >
          <Forward size={16} />
          Direction
        </button>
        <button
          onClick={() => onFocus(device)}
          className="py-2 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition font-medium w-1/2 flex items-center justify-center gap-2"
        >
          <Crosshair size={16} />
          Focus
        </button>
      </div>
    </div>
  );
}
