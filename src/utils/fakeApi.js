export function fakeFetchDevices() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 10 }).map((_, i) => ({
          id: i + 1,
          name: `Cow #${200 + i}`,
          lat: 6.9271 + (Math.random() - 0.5) * 0.05,
          lng: 79.8612 + (Math.random() - 0.5) * 0.05,
          battery: Math.floor(Math.random() * 80) + 20,
          signal: Math.floor(Math.random() * 5) + 1,
          desc: 'Grazing and healthy',
          status: 'Active',
        }))
      );
    }, 400);
  });
}
