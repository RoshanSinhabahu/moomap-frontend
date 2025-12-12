import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';
import Cow from '../assets/cow.png';
import ControlButtons from './ControlButtons';
import {
  BatteryLow,
  BatteryMedium,
  BatteryFull,
  Signal,
  SignalHigh,
  SignalMedium,
  SignalLow,
  SignalZero
} from 'lucide-react';

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

function RecenterAutomatically({ devices }) {
  const map = useMap();

  useEffect(() => {
    const validDevices = devices.filter((d) => d.lat && d.lng);
    if (validDevices.length > 0) {
      const bounds = L.latLngBounds(validDevices.map((d) => [d.lat, d.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [devices, map]);

  return null;
}

function FlyToActiveDevice({ activeDevice }) {
  const map = useMap();
  useEffect(() => {
    if (activeDevice && activeDevice.lat && activeDevice.lng) {
      map.flyTo([activeDevice.lat, activeDevice.lng], 16, {
        animate: true,
      });
    }
  }, [activeDevice, map]);
  return null;
}

function RecenterMapButton({ devices, triggerRecenter }) {
  const map = useMap();

  useEffect(() => {
    if (triggerRecenter) {
      const validDevices = devices.filter((d) => d.lat && d.lng);
      if (validDevices.length > 0) {
        const bounds = L.latLngBounds(validDevices.map((d) => [d.lat, d.lng]));
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [triggerRecenter, devices, map]);

  return null;
}

function ZoomControl({ zoomTrigger }) {
  const map = useMap();

  useEffect(() => {
    if (zoomTrigger.action === 'in') {
      map.zoomIn();
    } else if (zoomTrigger.action === 'out') {
      map.zoomOut();
    }
  }, [zoomTrigger, map]);

  return null;
}

export default function MapView({ devices, onSelectDevice, selectedDevice }) {
  const [recenterTrigger, setRecenterTrigger] = React.useState(0);
  const [zoomTrigger, setZoomTrigger] = React.useState({ action: null, count: 0 });
  const [filterActiveOnly, setFilterActiveOnly] = React.useState(false);
  const [showNotification, setShowNotification] = React.useState(false);
  const [isFadingOut, setIsFadingOut] = React.useState(false);

  // Auto-hide notification after 2 seconds with fade-out
  React.useEffect(() => {
    if (showNotification) {
      // Start fade-out after 1.7 seconds
      const fadeOutTimer = setTimeout(() => {
        setIsFadingOut(true);
      }, 1700);

      // Actually hide after 2 seconds (gives 300ms for fade-out animation)
      const hideTimer = setTimeout(() => {
        setShowNotification(false);
        setIsFadingOut(false);
      }, 2000);

      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [showNotification]);
  const getBatteryIcon = (level) => {
    let OverlayIcon = BatteryFull;
    let colorClass = 'text-green-500';

    if (level <= 20) {
      OverlayIcon = BatteryLow;
      colorClass = 'text-red-500';
    } else if (level <= 50) {
      OverlayIcon = BatteryMedium;
      colorClass = 'text-yellow-500';
    }

    return (
      <div className="relative w-5 h-5">
        <BatteryFull className="text-gray-300 absolute top-0 left-0" size={20} />
        <OverlayIcon className={`${colorClass} absolute top-0 left-0`} size={20} />
      </div>
    );
  };

  const getSignalIcon = (signal) => {
    // If signal is -999 or undefined, treat as no signal (Background only)
    if (!signal || signal === -999) {
      return (
        <div className="relative w-5 h-5">
          <Signal className="text-gray-300 absolute top-0 left-0" size={20} />
          <SignalZero className="text-red-500 absolute top-0 left-0" size={20} />
        </div>
      );
    }

    let OverlayIcon = SignalHigh;
    let colorClass = 'text-green-500';

    // RSSI values
    if (signal > -70) {
      OverlayIcon = SignalHigh;
      colorClass = 'text-green-500';
    } else if (signal > -85) {
      OverlayIcon = SignalMedium;
      colorClass = 'text-yellow-500';
    } else {
      OverlayIcon = SignalLow;
      colorClass = 'text-red-500';
    }

    return (
      <div className="relative w-5 h-5">
        <Signal className="text-gray-300 absolute top-[1px] left-0" size={16} />
        <OverlayIcon className={`${colorClass} absolute top-[1px] left-0`} size={16} />
      </div>
    );
  };

  const getActiveStatus = (status) => {
    if (status && status.toLowerCase() === 'active')
      return (
        <span className="bg-green-500 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-sm whitespace-nowrap">
          Active
        </span>
      );
    return (
      <span className="bg-red-500 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-sm whitespace-nowrap">
        Inactive
      </span>
    );
  };

  // Filter devices based on active status
  const filteredDevices = filterActiveOnly
    ? devices.filter(d => d.status?.toLowerCase() === 'active')
    : devices;

  // Handle refresh - this will be passed to parent to trigger data reload
  const handleRefresh = () => {
    window.location.reload();
  };

  // Center on the first device with valid coordinates (initial fallback)
  const firstDevice = filteredDevices.find((d) => d.lat && d.lng);

  return (
    <MapContainer
      center={firstDevice ? [firstDevice.lat, firstDevice.lng] : [6.9271, 79.8612]}
      zoom={13}
      zoomControl={false}
      className="w-full h-full z-0"
    >
      <RecenterAutomatically devices={devices} />
      <FlyToActiveDevice activeDevice={selectedDevice} />
      <RecenterMapButton devices={filteredDevices} triggerRecenter={recenterTrigger} />
      <ZoomControl zoomTrigger={zoomTrigger} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <ControlButtons
        onRecenterMap={() => setRecenterTrigger(prev => prev + 1)}
        onZoomIn={() => setZoomTrigger({ action: 'in', count: zoomTrigger.count + 1 })}
        onZoomOut={() => setZoomTrigger({ action: 'out', count: zoomTrigger.count + 1 })}
        onToggleFilter={() => {
          setFilterActiveOnly(prev => !prev);
          setShowNotification(true);
        }}
        onRefresh={handleRefresh}
        filterActive={filterActiveOnly}
      />

      {/* Filter Notification Toast */}
      {showNotification && (
        <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 z-[1001] transition-all ${isFadingOut ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
          <div className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium text-md">
              {filterActiveOnly ? 'Showing active devices only' : 'Showing all devices'}
            </span>
          </div>
        </div>
      )}

      {filteredDevices
        .filter((d) => d.lat && d.lng) // only valid positions
        .map((d) => (
          <Marker
            key={d.cattleId || d.collarId}
            position={[d.lat, d.lng]}
            icon={L.divIcon({
              className: 'custom-icon',
              html: `<div class="relative w-10 h-10 group">
                      <div class="absolute"></div>
                      <svg viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10 text-red-600 drop-shadow-xl transform transition-transform group-hover:scale-110">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>`,
              iconSize: [40, 40],
              iconAnchor: [20, 40],
              popupAnchor: [0, -40],
            })}
            eventHandlers={{
              click: () => onSelectDevice(d),
              mouseover: (e) => e.target.openPopup(),
              mouseout: (e) => e.target.closePopup(),
            }}
          >
            <Popup closeButton={false} className="custom-popup">
              <div className="flex flex-row gap-4 p-1 min-w-[220px]">
                <img
                  src={d.Image?.trim() || Cow}
                  alt="Cattle"
                  className="w-24 h-24 rounded-2xl object-cover shadow-lg border border-gray-100"
                />
                <div className="flex flex-col justify-center items-center gap-2">
                  <div className="font-bold text-2xl text-gray-800">{d.name?.trim()}</div>
                  <div className='-mt-1'>
                    {getActiveStatus(d.status)}
                  </div>
                  <div className='flex gap-4 mt-2'>
                    <div className="">
                      {getBatteryIcon(d.battery)}
                    </div>
                    <div className="">
                      {getSignalIcon(d.signal)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-px bg-gray-200 mt-3 mb-2 w-full" />
              <div className="text-center text-[12px] text-gray-400 font-medium">
                Tap marker for details
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
