/**
 * Time Utilities for Resource Availability Simulator
 * Helper functions for time comparison and availability calculations
 */

/**
 * Convert time string (HH:MM) to minutes since midnight
 * @param {string} time - Time in format "HH:MM"
 * @returns {number} Minutes since midnight
 */
export const timeToMinutes = (time) => {
  if (!time || typeof time !== 'string') return 0;
  const [hours, minutes] = time.split(':').map(Number);
  if (isNaN(hours) || isNaN(minutes)) return 0;
  return hours * 60 + minutes;
};

/**
 * Convert minutes to time string (HH:MM)
 * @param {number} minutes - Minutes since midnight
 * @returns {string} Time in format "HH:MM"
 */
export const minutesToTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

/**
 * Format time for display (e.g., "8:00 AM")
 * @param {string} time - Time in format "HH:MM"
 * @returns {string} Formatted time string
 */
export const formatTimeDisplay = (time) => {
  if (!time) return '';
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

/**
 * Calculate availability status based on current time
 * @param {string} currentTime - Current time in format "HH:MM"
 * @param {string} availabilityStart - Start time in format "HH:MM"
 * @param {string} availabilityEnd - End time in format "HH:MM"
 * @returns {Object} Status object with type, label, color, and message
 */
export const calculateAvailabilityStatus = (currentTime, availabilityStart, availabilityEnd) => {
  const current = timeToMinutes(currentTime);
  const start = timeToMinutes(availabilityStart);
  const end = timeToMinutes(availabilityEnd);

  // Default if no availability times set
  if (!availabilityStart || !availabilityEnd) {
    return {
      type: 'unknown',
      label: 'Unknown',
      color: 'gray',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-800',
      message: 'No hours set',
      isAvailable: false
    };
  }

  // Available: current time is within availability window
  if (current >= start && current <= end) {
    return {
      type: 'available',
      label: 'Available',
      color: 'green',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      borderColor: 'border-green-200',
      message: `Open until ${formatTimeDisplay(availabilityEnd)}`,
      isAvailable: true
    };
  }

  // Opens Later: current time is before availability start
  if (current < start) {
    const minutesUntilOpen = start - current;
    const hoursUntil = Math.floor(minutesUntilOpen / 60);
    const minsUntil = minutesUntilOpen % 60;
    
    let timeUntilText = '';
    if (hoursUntil > 0) {
      timeUntilText = `${hoursUntil}h ${minsUntil}m`;
    } else {
      timeUntilText = `${minsUntil}m`;
    }

    return {
      type: 'opens-later',
      label: 'Opens Later',
      color: 'yellow',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-200',
      message: `Opens at ${formatTimeDisplay(availabilityStart)} (in ${timeUntilText})`,
      opensAt: availabilityStart,
      isAvailable: false
    };
  }

  // Closed: current time is after availability end
  return {
    type: 'closed',
    label: 'Closed',
    color: 'red',
    bgColor: 'bg-red-100',
    textColor: 'text-red-800',
    borderColor: 'border-red-200',
    message: `Closed at ${formatTimeDisplay(availabilityEnd)}`,
    isAvailable: false
  };
};

/**
 * Get color class based on availability type
 * @param {string} type - Availability type (available, opens-later, closed)
 * @returns {string} Tailwind color class
 */
export const getAvailabilityColor = (type) => {
  const colors = {
    'available': 'bg-green-500',
    'opens-later': 'bg-yellow-500',
    'closed': 'bg-red-500',
    'unknown': 'bg-gray-500'
  };
  return colors[type] || colors['unknown'];
};

/**
 * Check if a resource is available at a specific time
 * @param {string} currentTime - Current time in format "HH:MM"
 * @param {Object} resource - Resource object with availabilityStart and availabilityEnd
 * @returns {boolean} True if available
 */
export const isResourceAvailable = (currentTime, resource) => {
  if (!resource?.availabilityStart || !resource?.availabilityEnd) return false;
  
  const current = timeToMinutes(currentTime);
  const start = timeToMinutes(resource.availabilityStart);
  const end = timeToMinutes(resource.availabilityEnd);
  
  return current >= start && current <= end;
};

/**
 * Get next available time for a resource
 * @param {string} currentTime - Current time in format "HH:MM"
 * @param {Object} resource - Resource object
 * @returns {string|null} Next available time or null if not applicable
 */
export const getNextAvailableTime = (currentTime, resource) => {
  if (!resource?.availabilityStart) return null;
  
  const current = timeToMinutes(currentTime);
  const start = timeToMinutes(resource.availabilityStart);
  
  if (current < start) {
    return resource.availabilityStart;
  }
  
  return null;
};

/**
 * Get complete availability status for a resource
 * Handles both resource.status (ACTIVE/OUT_OF_SERVICE) and availability times
 * 
 * Priority:
 * 1. If status === 'OUT_OF_SERVICE' → Always "Out of Service" (Red)
 * 2. If status === 'ACTIVE' → Check availability times
 *    - Within hours → "Available" (Green)
 *    - Before hours → "Opens Later" (Yellow)
 *    - After hours → "Closed" (Red)
 * 
 * @param {Object} resource - Resource object with status, availabilityStart, availabilityEnd
 * @param {string} selectedTime - Current selected time in format "HH:MM"
 * @returns {Object} Status object with label, color, badge styling
 */
export const getAvailabilityStatus = (resource, selectedTime) => {
  // Default: No resource or no time selected
  if (!resource || !selectedTime) {
    return {
      label: 'Unknown',
      type: 'unknown',
      color: 'gray',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-800',
      borderColor: 'border-gray-200',
      dotColor: 'bg-gray-400',
      message: 'No data',
      isAvailable: false
    };
  }

  // Priority 1: Check if resource is OUT_OF_SERVICE
  if (resource.status === 'OUT_OF_SERVICE') {
    return {
      label: 'Out of Service',
      type: 'out-of-service',
      color: 'red',
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      borderColor: 'border-red-200',
      dotColor: 'bg-red-500',
      message: 'Resource is currently out of service',
      isAvailable: false
    };
  }

  // Priority 2: If ACTIVE, check availability times
  if (resource.status === 'ACTIVE') {
    // If no availability times set
    if (!resource.availabilityStart || !resource.availabilityEnd) {
      return {
        label: 'No Hours Set',
        type: 'unknown',
        color: 'gray',
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-800',
        borderColor: 'border-gray-200',
        dotColor: 'bg-gray-400',
        message: 'Availability hours not configured',
        isAvailable: false
      };
    }

    const current = timeToMinutes(selectedTime);
    const start = timeToMinutes(resource.availabilityStart);
    const end = timeToMinutes(resource.availabilityEnd);

    // Available: current time is within availability window
    if (current >= start && current <= end) {
      return {
        label: 'Available',
        type: 'available',
        color: 'green',
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        borderColor: 'border-green-200',
        dotColor: 'bg-green-500',
        message: `Open until ${formatTimeDisplay(resource.availabilityEnd)}`,
        isAvailable: true
      };
    }

    // Opens Later: current time is before availability start
    if (current < start) {
      const minutesUntilOpen = start - current;
      const hoursUntil = Math.floor(minutesUntilOpen / 60);
      const minsUntil = minutesUntilOpen % 60;
      
      let timeUntilText = '';
      if (hoursUntil > 0) {
        timeUntilText = `${hoursUntil}h ${minsUntil}m`;
      } else {
        timeUntilText = `${minsUntil}m`;
      }

      return {
        label: 'Opens Later',
        type: 'opens-later',
        color: 'yellow',
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-800',
        borderColor: 'border-yellow-200',
        dotColor: 'bg-yellow-500',
        message: `Opens at ${formatTimeDisplay(resource.availabilityStart)} (in ${timeUntilText})`,
        isAvailable: false
      };
    }

    // Closed: current time is after availability end
    return {
      label: 'Closed',
      type: 'closed',
      color: 'red',
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      borderColor: 'border-red-200',
      dotColor: 'bg-red-500',
      message: `Closed at ${formatTimeDisplay(resource.availabilityEnd)}`,
      isAvailable: false
    };
  }

  // Fallback for unknown status
  return {
    label: 'Unknown',
    type: 'unknown',
    color: 'gray',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-800',
    borderColor: 'border-gray-200',
    dotColor: 'bg-gray-400',
    message: 'Unknown status',
    isAvailable: false
  };
};

/**
 * Validate if selected time is not in the past
 * @param {string} selectedDate - Date string (YYYY-MM-DD)
 * @param {string} selectedTime - Time string (HH:MM)
 * @returns {Object} Validation result { isValid: boolean, message: string }
 */
export const validateFutureTime = (selectedDate, selectedTime) => {
  const now = new Date();
  const selected = new Date(`${selectedDate}T${selectedTime}`);
  
  if (selected < now) {
    return {
      isValid: false,
      message: 'Cannot select past time and date'
    };
  }
  
  return {
    isValid: true,
    message: ''
  };
};

/**
 * Get current date and time formatted for inputs
 * @returns {Object} { date: 'YYYY-MM-DD', time: 'HH:MM' }
 */
export const getCurrentDateTime = () => {
  const now = new Date();
  const date = now.toISOString().split('T')[0];
  const time = now.toTimeString().slice(0, 5);
  return { date, time };
};
