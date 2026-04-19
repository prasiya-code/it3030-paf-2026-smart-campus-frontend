import React, { useState, useEffect } from 'react';

const NOTIFICATION_CATEGORIES = [
  { id: 'BOOKING_APPROVED', name: 'Booking Approved', icon: '✅', description: 'When your booking requests are approved' },
  { id: 'BOOKING_REJECTED', name: 'Booking Rejected', icon: '❌', description: 'When your booking requests are rejected' },
  { id: 'BOOKING_CANCELLED', name: 'Booking Cancelled', icon: '🚫', description: 'When bookings are cancelled' },
  { id: 'TICKET_STATUS_CHANGED', name: 'Ticket Status Changed', icon: '🔄', description: 'When ticket status is updated' },
  { id: 'TICKET_COMMENT_ADDED', name: 'Ticket Comments', icon: '💬', description: 'When comments are added to tickets' },
  { id: 'TICKET_ASSIGNED', name: 'Ticket Assigned', icon: '👤', description: 'When tickets are assigned to you' }
];

const NotificationPreferences = ({ isOpen, onClose, onSave }) => {
  const [preferences, setPreferences] = useState({});

  useEffect(() => {
    // Load preferences from localStorage
    const saved = localStorage.getItem('notificationPreferences');
    if (saved) {
      setPreferences(JSON.parse(saved));
    } else {
      // Default: all enabled
      const defaults = {};
      NOTIFICATION_CATEGORIES.forEach(cat => {
        defaults[cat.id] = true;
      });
      setPreferences(defaults);
    }
  }, []);

  const handleToggle = (categoryId) => {
    setPreferences(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleSave = () => {
    localStorage.setItem('notificationPreferences', JSON.stringify(preferences));
    onSave && onSave(preferences);
    onClose();
  };

  const handleReset = () => {
    const defaults = {};
    NOTIFICATION_CATEGORIES.forEach(cat => {
      defaults[cat.id] = true;
    });
    setPreferences(defaults);
  };

  const enabledCount = Object.values(preferences).filter(v => v).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Notification Preferences</h2>
              <p className="text-indigo-100 text-sm">Choose which notifications you want to receive</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="mb-4 text-sm text-gray-600">
            {enabledCount} of {NOTIFICATION_CATEGORIES.length} categories enabled
          </div>

          <div className="space-y-3">
            {NOTIFICATION_CATEGORIES.map(category => (
              <div
                key={category.id}
                className={`flex items-start gap-4 p-4 rounded-lg border-2 transition-all ${
                  preferences[category.id]
                    ? 'border-indigo-200 bg-indigo-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex-shrink-0">
                  <button
                    onClick={() => handleToggle(category.id)}
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-all ${
                      preferences[category.id]
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {preferences[category.id] ? category.icon : '🔕'}
                  </button>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-semibold ${preferences[category.id] ? 'text-indigo-900' : 'text-gray-500'}`}>
                      {category.name}
                    </h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences[category.id]}
                        onChange={() => handleToggle(category.id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                  <p className={`text-sm ${preferences[category.id] ? 'text-indigo-700' : 'text-gray-400'}`}>
                    {category.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Reset to defaults
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPreferences;
