import React from 'react';
import DP from '../assets/dp.jpg';

export default function UserInfo({ user, toggle, open }) {
  return (
    <div className="flex items-center gap-2">
      <button onClick={toggle} className="p-2 hover:bg-gray-100 rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
          />
        </svg>
      </button>

      {open && (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <img src={DP} className="rounded-full" />
          </div>
          <div>
            <div className="font-semibold">{user.name}</div>
            <div className="text-xs text-gray-500">{user.email}</div>
          </div>
        </div>
      )}
    </div>
  );
}
