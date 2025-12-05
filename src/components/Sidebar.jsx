import React from 'react';

export default function Sidebar({ open, toggle, user, devices }) {
  return (
    <div
      className={`h-full bg-white shadow-xl transition-all duration-300 ${open ? 'w-80 p-4' : 'w-14 p-2'}`}
    >
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
              {user.initials}
            </div>
            <div>
              <div className="font-semibold">{user.name}</div>
              <div className="text-xs text-gray-500">{user.email}</div>
            </div>
          </div>
        )}
      </div>

      {open && (
        <div className="mt-6">
          <h3 className="font-medium text-sm">Devices</h3>
          <div className="mt-2 max-h-72 overflow-auto flex flex-col gap-2">
            {devices.map((d) => (
              <div key={d.id} className="p-2 hover:bg-gray-100 rounded">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    🐄
                  </div>
                  <div>
                    <div className="text-sm font-medium">{d.name}</div>
                    <div className="text-xs text-gray-500">{d.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
