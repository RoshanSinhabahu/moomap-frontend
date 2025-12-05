import React from 'react';

export default function DeviceList({
  devices,
  selectedDevice,
  onSelectDevice,
}) {
  return (
    <div className="mt-3 pt-3 px-2 bg-white rounded-lg">
      <h3 className="ml-2 font-medium text-sm">Devices</h3>
      <div className="mt-2 max-h-72 overflow-auto flex flex-col gap-1">
        {devices.map((d) => (
          <div
            key={d.id}
            className={`p-2 hover:bg-gray-100 rounded cursor-pointer ${
              selectedDevice?.id === d.id ? 'bg-gray-100' : ''
            }`}
            onClick={() => onSelectDevice(d)}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                🐄
              </div>
              <div>
                <div className="text-sm font-medium">{d.name}</div>
                <div className="text-xs text-gray-500">{d.desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
