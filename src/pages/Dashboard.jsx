import React, { useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';

import MapView from '../components/MapView.jsx';
import useDevices from '../hooks/useDevices.js';

export default function Dashboard({ user, onLogout, token }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selected, setSelected] = useState(null);
  const { devices, loading } = useDevices(token);

  return (
    <div className="h-screen flex">
      <Sidebar
        open={sidebarOpen}
        toggle={() => setSidebarOpen((v) => !v)}
        user={user}
        token={token}
        devices={devices}
        selectedDevice={selected}
        onSelectDevice={setSelected}
        onLogout={onLogout}
        loading={loading}
      />
      <div className="flex-1 relative">

        <MapView devices={devices} onSelectDevice={setSelected} selectedDevice={selected} />
      </div>
    </div>
  );
}
