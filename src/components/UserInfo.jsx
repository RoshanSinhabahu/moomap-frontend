import React from 'react';
import DP from '../assets/dp.jpg';
import UserDetailsPopup from './UserDetailsPopup';

export default function UserInfo({ user, token, toggle, open, onLogout }) {
  const [openPopup, setOpenPopup] = React.useState(false);

  return (
    <>
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
          <div
            className="flex items-center gap-3 cursor-pointer p-3 rounded-lg transition-colors hover:bg-gray-100"
            onClick={() => setOpenPopup(true)}
          >
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <img src={DP} className="rounded-xl border-4 border-white" />
            </div>
            <div>
              <div className="font-semibold text-gray-800">
                {user?.firstName} {user?.lastName}
              </div>
              <div className="text-xs text-gray-500">{user?.mobile}</div>
            </div>
          </div>
        )}
      </div>

      {openPopup && (
        <UserDetailsPopup
          user={user}
          token={token}
          onClose={() => setOpenPopup(false)}
          onLogout={onLogout}
        />
      )}
    </>
  );
}
