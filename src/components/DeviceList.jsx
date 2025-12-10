import React, { useState, useEffect, useRef } from 'react';

export default function DeviceTileList({ devices, selectedDevice, onSelectDevice }) {
  const [open, setOpen] = useState(true); // start expanded or collapsed
  const containerRef = useRef(null);

  // Set first device as default on mount
  useEffect(() => {
    if (devices.length > 0 && !selectedDevice) {
      onSelectDevice(devices[0]);
    }
  }, [devices, selectedDevice, onSelectDevice]);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`bg-white rounded-lg shadow-md p-2 transition-all duration-300 ${
        open ? 'w-full' : 'w-full'
      }`}
    > 
      {/* Header / toggle */}
      <div
        className="flex items-center justify-between cursor-pointer p-1"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="font-medium">Devices</span>
        <span>{open ? '<' : '>'}</span>
      </div>

      {/* Device tiles */}
      {open && (
        <div className="grid grid-cols-1 mt-2">
          {devices.map((d) => (
            <div
              key={d.collarId}
              className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100 ${
                selectedDevice?.collarId === d.collarId ? 'bg-gray-100' : ''
              }`}
              onClick={() => onSelectDevice(d)}
            >
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                🐄
              </div>
              <div className="flex flex-col text-sm">
                <span className="font-medium">{d.name}</span>
                <span className="text-gray-500">{d.breed}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
