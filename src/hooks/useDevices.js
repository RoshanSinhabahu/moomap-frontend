import { useEffect, useState } from 'react';
import { fakeFetchDevices } from '../utils/fakeApi.js';

export default function useDevices() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    fakeFetchDevices().then(setDevices);
  }, []);

  return { devices };
}
