import React from 'react';

export default function SelectedDeviceCard({ device, onRename, onDelete }) {
  if (!device) return null;

  return (
    <div className="mt-4 p-3 bg-gray-50 shadow rounded flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="font-medium">{device.name}</div>
        <div className="flex gap-1">
          <button
            onClick={() => onRename(device.id)}
            className="text-blue-500 text-xs hover:underline"
          >
            Rename
          </button>
          <button
            onClick={() => onDelete(device.id)}
            className="text-red-500 text-xs hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="text-xs text-gray-500">{device.desc}</div>
      <div className="flex justify-between text-xs mt-2">
        <div>Battery: {device.battery}%</div>
        <div>Signal: {device.signal}/5</div>
      </div>
    </div>
  );
}
