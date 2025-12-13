import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar.jsx';

import MapView from '../components/MapView.jsx';
import useDevices from '../hooks/useDevices.js';

export default function Dashboard({ user, onLogout, token }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [focusTrigger, setFocusTrigger] = useState(0);
  const { devices, loading } = useDevices(token);

  // Find the selected device object based on ID
  const selectedDevice = devices.find(d => d.collarId === selectedId) || null;

  // Auto-select first device on initial load (for card display, doesn't affect map centering)
  useEffect(() => {
    if (!selectedId && devices.length > 0) {
      setSelectedId(devices[0].collarId);
    }
  }, [devices, selectedId]);

  // Update selected device when devices change (to keep the reference fresh)
  useEffect(() => {
    if (selectedId && devices.length > 0) {
      const found = devices.find(d => d.collarId === selectedId);
      if (!found) {
        // If previously selected device no longer exists, clear selection
        setSelectedId(null);
      }
    }
  }, [devices, selectedId]);

  const handleFocus = (device) => {
    if (device?.collarId) {
      if (selectedId !== device.collarId) {
        setSelectedId(device.collarId);
      }
      setFocusTrigger(prev => prev + 1);
    }
  };

  return (
    <div className="h-screen flex">
      <Sidebar
        open={sidebarOpen}
        toggle={() => setSidebarOpen((v) => !v)}
        user={user}
        token={token}
        devices={devices}
        selectedDevice={selectedDevice}
        onSelectDevice={(device) => setSelectedId(device?.collarId || null)}
        onFocus={handleFocus}
        onLogout={onLogout}
        loading={loading}
      />
      <div className="flex-1 relative">

        <MapView
          devices={devices}
          onSelectDevice={(device) => setSelectedId(device?.collarId || null)}
          selectedDevice={selectedDevice}
          focusTrigger={focusTrigger}
        />
      </div>
    </div>
  );
}
