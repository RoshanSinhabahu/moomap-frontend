import React from 'react';

export default function CountData({ devices }) {
    const total = devices.length;

    const activeCount = devices.filter(
        (d) => d.status && d.status.toLowerCase() === 'active'
    ).length;

    const inactiveCount = devices.filter(
        (d) => !d.status || d.status.toLowerCase() !== 'active'
    ).length;

    const totalPercentage = 100;
    const activePercentage = total > 0 ? Math.round((activeCount / total) * 100) : 0;
    const inactivePercentage = total > 0 ? Math.round((inactiveCount / total) * 100) : 0;

    return (
        <div className="flex gap-3">
            {/* Total Devices Tile */}
            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-gray-100 min-w-[120px]">
                <div className="flex justify-between items-start mb-2 gap-2">
                    <div>
                        <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Total</p>
                        <h3 className="text-xl font-bold text-gray-800">{String(total).padStart(2, '0')}</h3>
                    </div>
                    <div className="bg-blue-50 p-1 rounded-md">
                        <div className="w-3 h-3 rounded-full border-[2px] border-blue-500"></div>
                    </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                    <div
                        className="bg-blue-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${totalPercentage}%` }}
                    ></div>
                </div>
            </div>

            {/* Active Devices Tile */}
            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-gray-100 min-w-[120px]">
                <div className="flex justify-between items-start mb-2 gap-2">
                    <div>
                        <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Active</p>
                        <h3 className="text-xl font-bold text-gray-800">{String(activeCount).padStart(2, '0')}</h3>
                    </div>
                    <span className="relative flex h-2 w-2 mt-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                    <div
                        className="bg-green-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${activePercentage}%` }}
                    ></div>
                </div>
            </div>

            {/* Inactive Devices Tile */}
            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-gray-100 min-w-[120px]">
                <div className="flex justify-between items-start mb-2 gap-2">
                    <div>
                        <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Inactive</p>
                        <h3 className="text-xl font-bold text-gray-800">{String(inactiveCount).padStart(2, '0')}</h3>
                    </div>
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-1"></div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                    <div
                        className="bg-red-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${inactivePercentage}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
