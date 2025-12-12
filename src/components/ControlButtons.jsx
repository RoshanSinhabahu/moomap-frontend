import React from 'react';
import { Locate, ZoomIn, ZoomOut, Filter, RefreshCw } from 'lucide-react';

export default function ControlButtons({
    onRecenterMap,
    onZoomIn,
    onZoomOut,
    onToggleFilter,
    onRefresh,
    filterActive
}) {
    return (
        <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
            {/* Recenter Button */}
            <button
                onClick={onRecenterMap}
                className="bg-white hover:bg-gray-50 rounded-xl shadow-lg p-3 transition-colors"
                title="Center map on all devices"
            >
                <Locate size={20} className="text-gray-700" />
            </button>

            {/* Zoom Controls */}
            <div className="flex flex-col gap-1 bg-white rounded-xl shadow-lg overflow-hidden">
                <button
                    onClick={onZoomIn}
                    className="p-3 hover:bg-gray-50 transition-colors border-b border-gray-100"
                    title="Zoom in"
                >
                    <ZoomIn size={20} className="text-gray-700" />
                </button>
                <button
                    onClick={onZoomOut}
                    className="p-3 hover:bg-gray-50 transition-colors"
                    title="Zoom out"
                >
                    <ZoomOut size={20} className="text-gray-700" />
                </button>
            </div>

            {/* Filter Toggle */}
            <button
                onClick={onToggleFilter}
                className={`rounded-xl shadow-lg p-3 transition-colors ${filterActive
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-white hover:bg-gray-50 text-gray-700'
                    }`}
                title={filterActive ? "Showing active only" : "Show all devices"}
            >
                <Filter size={20} />
            </button>
        </div>
    );
}
