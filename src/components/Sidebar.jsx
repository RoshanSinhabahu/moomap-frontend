import React from 'react';
import UserInfo from './UserInfo.jsx';
import SelectedDeviceCard from './SelectedDeviceCard.jsx';
import DeviceList from './DeviceList.jsx';

export default function Sidebar({
  open,
  toggle,
  user,
  devices,
  selectedDevice,
  onSelectDevice,
  onLogout,
}) {
  return (
    <div
      className={`bg-gray-50 h-full flex flex-col justify-between transition-all duration-300 ${open ? 'w-80 p-4' : 'w-14 p-2'}`}
    >
      <UserInfo user={user} toggle={toggle} open={open} />
      {open && (
        <DeviceList
          devices={devices}
          selectedDevice={selectedDevice}
          onSelectDevice={onSelectDevice}
        />
      )}
      {open && <SelectedDeviceCard device={selectedDevice} />}
      {open && (
        <div>
          <button
            onClick={onLogout}
            className="text-bold text-red-500 font-semibold border-2 border-red-300 hover:bg-red-100 transition p-2 w-full rounded-full top-4"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
