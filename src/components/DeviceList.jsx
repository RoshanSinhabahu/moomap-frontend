import React, { useEffect, useRef } from 'react';
import Cow from '../assets/cow.png';

export default function DeviceTileList({ devices, selectedDevice, onSelectDevice, isOpen, onToggle }) {
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
      if (isOpen && containerRef.current && !containerRef.current.contains(event.target)) {
        onToggle();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onToggle]);

  return (
    <div
      ref={containerRef}
      className={`bg-white rounded-lg shadow-md p-2 transition-all duration-300 ${isOpen ? 'w-full' : 'w-full'
        }`}
    >
      {/* Header / toggle */}
      <div
        className="flex items-center justify-between cursor-pointer p-1"
        onClick={onToggle}
      >
        <span className="font-medium">My Cattle</span>
        <span>{isOpen ? '<' : '>'}</span>
      </div>

      {/* Device tiles */}
      <div
        className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 mt-0'
          }`}
      >
        <div className="overflow-hidden">
          <div className="grid grid-cols-1">
            {devices.map((d) => (
              <div
                key={d.collarId}
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100 ${selectedDevice?.collarId === d.collarId ? 'bg-gray-100' : ''
                  }`}
                onClick={() => {
                  onSelectDevice(d);
                  if (isOpen) onToggle();
                }}
              >
                <img
                  src={d.Image?.trim() || Cow}
                  alt={d.name}
                  className="w-10 h-10 rounded-full object-cover bg-gray-200"
                />
                <div className="flex flex-col text-sm">
                  <span className="font-medium">{d.name}</span>
                  <span className={`text-xs capitalize ${d.status?.toLowerCase() === 'active' ? 'text-green-600' : 'text-red-500'}`}>
                    {d.status?.toLowerCase() === 'active' ? '● Active' : '● Inactive'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
