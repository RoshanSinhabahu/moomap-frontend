import React from 'react';
import UserInfo from './UserInfo.jsx';
import SelectedDeviceCard from './SelectedDeviceCard.jsx';
import DeviceList from './DeviceList.jsx';

export default function Sidebar({
  open,
  toggle,
  user,
  token,
  devices,
  selectedDevice,
  onSelectDevice,
  onFocus,
  onLogout,
  loading,
}) {
  const [deviceListOpen, setDeviceListOpen] = React.useState(false);

  return (
    <div
      className={`bg-gray-50 h-full flex flex-col justify-between transition-all duration-300 ${open ? 'w-80 p-4' : 'w-14 p-2'}`}
    >
      <UserInfo user={user} token={token} toggle={toggle} open={open} onLogout={onLogout} />

      <div className="scrollbar-hide w-full flex-1 overflow-y-auto flex flex-col items-center justify-evenly">
        {open && (
          <DeviceList
            devices={devices}
            selectedDevice={selectedDevice}
            onSelectDevice={onSelectDevice}
            isOpen={deviceListOpen}
            onToggle={() => setDeviceListOpen(prev => !prev)}
          />
        )}
        {open && !deviceListOpen && <SelectedDeviceCard device={selectedDevice} onFocus={onFocus} loading={loading} />}
      </div>


    </div>
  );
}
