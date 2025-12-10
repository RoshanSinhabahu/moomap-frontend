import { useState, useEffect } from 'react';

export default function useDevices(token) {
  const [devices, setDevices] = useState([]);

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
            };
          })
        );

        setDevices(devicesWithLocation);
      } catch (err) {
        console.error(err);
      }
    }

    if (token) fetchDevices();
  }, [token]);

  return { devices };
}
