import React, { useState } from 'react';
import { getCurrentDateTime } from '../../utils/timeUtils';

const TimeTravelSimulator = ({ onTimeChange, initialTime = '08:00' }) => {
  const [selectedTime, setSelectedTime] = useState(initialTime);

  // Convert time string (HH:MM) to minutes for slider
  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Convert minutes to time string (HH:MM)
  const minutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  // Handle slider change
  const handleSliderChange = (e) => {
    const minutes = parseInt(e.target.value, 10);
    const newTime = minutesToTime(minutes);
    setSelectedTime(newTime);
    onTimeChange?.(newTime);
  };

  // Reset to current time
  const handleReset = () => {
    const { time } = getCurrentDateTime();
    setSelectedTime(time);
    onTimeChange?.(time);
  };

  const minMinutes = 480; // 08:00
  const maxMinutes = 1080; // 18:00
  const currentMinutes = timeToMinutes(selectedTime);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-md p-4 mb-4 border border-blue-100">
      <div className="flex flex-col lg:flex-row items-center gap-4">
        {/* Title and Icon */}
        <div className="flex items-center gap-2 min-w-fit">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">Time Travel Simulator</h3>
            <p className="text-xs text-gray-500">Check resource availability</p>
          </div>
        </div>

        {/* Time Display */}
        <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Current Time</span>
          <span className="text-2xl font-bold text-blue-600 font-mono">{selectedTime}</span>
        </div>

        {/* Time Slider */}
        <div className="flex-1 min-w-[200px]">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>08:00</span>
            <span>18:00</span>
          </div>
          <input
            type="range"
            min={minMinutes}
            max={maxMinutes}
            step={5}
            value={currentMinutes}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-600 transition-all"
          />
        </div>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium inline-flex items-center gap-1 transition-all"
          title="Reset to current time"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset
        </button>
      </div>

      {/* Status Legend */}
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-blue-100 flex-wrap">
        <span className="text-xs font-medium text-gray-500">Status Guide:</span>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          <span className="text-xs text-gray-600">Available</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
          <span className="text-xs text-gray-600">Opens Later</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="text-xs text-gray-600">Closed / Out of Service</span>
        </div>
      </div>
    </div>
  );
};

export default TimeTravelSimulator;
