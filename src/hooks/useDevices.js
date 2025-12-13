import { useState, useEffect } from 'react';

export default function useDevices(token) {
  const [devices, setDevices] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDevices() {
      try {
        // Fetch all cattle
        const res = await fetch('http://213.199.51.193:8000/api/cattles', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const cattles = await res.json();

        // Fetch each cattle's collar location
        const devicesWithLocation = await Promise.all(
          cattles.map(async (cattle) => {
            const collarRes = await fetch(
              `http://213.199.51.193:8000/api/collar-data/${cattle.collarId}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            const collarData = await collarRes.json();
            return {
              ...cattle,
              lat: parseFloat(collarData.lastLocation?.lat) || 0,
              lng: parseFloat(collarData.lastLocation?.lon) || 0,
              battery: collarData.lastBatteryPercent ?? 0,
              signal: collarData.gsm_rssi || collarData.lora_rssi || -999,
              status: collarData.status || 'unknown',
              lastSeen: collarData.last_seen || collarData.lastSeen || null,
            };
          })
        );

        setDevices(devicesWithLocation);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      // Initial fetch
      fetchDevices();

      // Set up polling to refresh device locations every 30 seconds
      const intervalId = setInterval(() => {
        fetchDevices();
      }, 5000); // 5 seconds

      // Clean up interval on component unmount or token change
      return () => clearInterval(intervalId);
    }
  }, [token]);

  return { devices, loading };
}
