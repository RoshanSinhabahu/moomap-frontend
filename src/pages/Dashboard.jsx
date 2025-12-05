import React, { useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import UserAvatar from '../components/UserAvatar.jsx';
import MapView from '../components/MapView.jsx';
import useDevices from '../hooks/useDevices.js';

export default function Dashboard({ user, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selected, setSelected] = useState(null);
  const { devices } = useDevices();

  return (
    <div className="h-screen flex">
      <Sidebar
        open={sidebarOpen}
        toggle={() => setSidebarOpen((v) => !v)}
        user={user}
        devices={devices}
        selectedDevice={selected}
        onSelectDevice={setSelected}
        onLogout={onLogout}
      />
      <div className="flex-1 relative">
        <UserAvatar
          user={user}
          toggleSidebar={() => setSidebarOpen((v) => !v)}
        />
        <MapView devices={devices} onSelectDevice={setSelected} />
      </div>
    </div>
  );
}
