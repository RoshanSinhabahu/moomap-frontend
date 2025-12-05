import React from 'react';

export default function TopBar({ user, toggleSidebar, onLogout }) {
  return (
    <div className="bg-red-200 absolute top-4 left-4 z-30">
      <div className="bg-white shadow p-2 rounded flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded"
        >
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <span>{user.name}</span>
        <button onClick={onLogout} className="ml-4 text-xs text-red-500">
          Logout
        </button>
      </div>
    </div>
  );
}
