import React from 'react';
import UserInfo from './UserInfo.jsx';
import SelectedDeviceCard from './SelectedDeviceCard.jsx';
import DeviceList from './DeviceList.jsx';

export default function Sidebar({ open, toggle, user, devices, selectedDevice, onSelectDevice, onLogout }) {
  return (
    <div className={`bg-white shadow-xl transition-all duration-300 ${open ? 'w-80 p-4' : 'w-14 p-2'}`}>
      <UserInfo user={user} toggle={toggle} open={open} />
      {open && <SelectedDeviceCard device={selectedDevice} />}
      {open && <DeviceList devices={devices} selectedDevice={selectedDevice} onSelectDevice={onSelectDevice} />}
      {open && (
        <div className="relative mt-4">
          <button
            onClick={onLogout}
            className="text-bold text-red-500 font-semibold bg-red-50 hover:bg-red-100 transition p-2 w-full rounded-full"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
