import React from 'react';
import DP from '../assets/dp.jpg';

export default function TopBar({ toggleSidebar }) {
  return (
    <div className="flex absolute z-30 w-full top-4 right-4 justify-end">
      <div className="p-0.5 bg-white shadow-xl rounded-full flex flex-col items-center justify-center transform hover:scale-105 transition duration-200">
        <button onClick={toggleSidebar}>
          <img src={DP} className="w-14 rounded-full" />
        </button>
      </div>
    </div>
  );
}
