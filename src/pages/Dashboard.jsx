import React, { useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import TopBar from '../components/TopBar.jsx';
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
        selected={selected}
      />

      <div className="flex-1 relative">
        <TopBar
          user={user}
          toggleSidebar={() => setSidebarOpen((v) => !v)}
          onLogout={onLogout}
          className="z-50 relative"
        />
        <MapView devices={devices} onSelectDevice={setSelected} />
      </div>
    </div>
  );
}
