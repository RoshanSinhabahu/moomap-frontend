import React, { useEffect, useState } from 'react';
import DP from '../assets/dp.jpg';
import { Riple } from 'react-loading-indicators';

export default function UserDetailsPopup({ user, token, onClose, onLogout }) {
  const [details, setDetails] = useState(user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("http://213.199.51.193:8000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch details");
        const data = await res.json();
        // Merge existing user data with fetched details
        setDetails(prev => ({ ...prev, ...data }));
      } catch (err) {
        console.warn("Failed to fetch user details:", err);
        setError("Could not load full details");
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [token]);

  if (!details) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-[420px] p-6 transform transition-all scale-100 relative" onClick={(e) => e.stopPropagation()}>
        {/* Profile Section */}
        <div className="flex gap-4 mb-4">
          <img
            src={DP}
            alt="Profile"
            className="w-20 h-20 rounded-2xl object-cover shadow-md"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">
              {details.firstName?.trim()} {details.lastName?.trim()}
            </h2>
            <p className="text-sm text-gray-500 font-medium mb-2">Moomap User</p>
          </div>
        </div>

        {/* Stats Section */}
        {loading ? (
          <div className="flex justify-center py-8">
            <Riple color="#4f46e5" size="small" text="" textColor="" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <div className="text-xs text-gray-500 mb-1">Mobile</div>
                <div className="text-sm font-bold text-gray-800">{details.mobile || '-'}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <div className="text-xs text-gray-500 mb-1">Gender</div>
                <div className="text-sm font-bold text-gray-800 capitalize">{details.gender || '-'}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <div className="text-xs text-gray-500 mb-1">User ID</div>
                <div className="text-sm font-bold text-gray-800">{details.userId || '-'}</div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="space-y-2 mb-4">
              <InfoRow label="NIC No" value={details.nicNo} />
              <InfoRow label="Address" value={details.address} />
              {error && <p className="text-xs text-red-400 text-center mt-2">{error}</p>}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={onLogout}
                className="flex-1 py-3 rounded-full bg-red-200 text-red-700 font-semibold hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 border-2 border-gray rounded-full text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between text-sm bg-gray-50 rounded-lg px-4 py-2">
      <span className="text-gray-500 font-medium">{label}</span>
      <span className="text-gray-800 font-semibold text-right truncate ml-2">
        {value?.trim() || '-'}
      </span>
    </div>
  );
}
