/**
 * ✅ BOOKING-SPECIFIC HELPER FUNCTIONS
 * 
 * These functions safely handle nested objects and null values from booking API responses.
 * Located in the booking module for clear module boundaries.
 */

/**
 * Safely get resource name from a booking
 * Handles both object and string formats
 */
export const getResourceName = (booking) => {
  if (!booking) return "Unknown";

  // If resource is an object with name property
  if (typeof booking.resource === "object" && booking.resource !== null && booking.resource.name) {
    return booking.resource.name;
  }

  // If resource is already a string
  if (typeof booking.resource === "string") {
    return booking.resource;
  }

  // Fallback
  return "Unknown";
};

/**
 * Safely get user name from a booking
 * Handles both nested user objects and string fields
 */
export const getUserName = (booking) => {
  if (!booking) return "Unknown";

  // If booking has user object with firstName/lastName
  if (typeof booking.user === "object" && booking.user !== null) {
    const firstName = booking.user.firstName || "";
    const lastName = booking.user.lastName || "";
    const name = `${firstName} ${lastName}`.trim();
    if (name) return name;
  }

  // If booking has userName field (string)
  if (typeof booking.userName === "string" && booking.userName) {
    return booking.userName;
  }

  // Fallback
  return "Unknown";
};

/**
 * Safely get booking code
 * Handles missing or null values
 */
export const getBookingCode = (booking) => {
  if (!booking) return "N/A";
  return booking.bookingCode || "N/A";
};

/**
 * Safely get booking date as string
 */
export const getBookingDate = (booking) => {
  if (!booking || !booking.bookingDate) return "N/A";
  return booking.bookingDate;
};

/**
 * Safely get booking start time
 */
export const getStartTime = (booking) => {
  if (!booking || !booking.startTime) return "N/A";
  return booking.startTime;
};

/**
 * Safely get booking end time
 */
export const getEndTime = (booking) => {
  if (!booking || !booking.endTime) return "N/A";
  return booking.endTime;
};

/**
 * Safely convert any value to searchable text
 * Handles objects, null, undefined, and primitives
 */
export const safeText = (value) => {
  // Handle null/undefined
  if (value === null || value === undefined) {
    return "";
  }

  // Handle objects - try to extract meaningful string
  if (typeof value === "object") {
    // For resource objects
    if (value.name) return String(value.name);
    // For user objects
    if (value.firstName || value.lastName) {
      return `${value.firstName || ""} ${value.lastName || ""}`.trim();
    }
    // For other objects, convert to string
    return String(value);
  }

  // For strings and primitives, convert to string
  return String(value).toLowerCase();
};

/**
 * Safely normalize a value for comparison (case-insensitive)
 * Returns lowercase string, safe for searching
 */
export const normalizeValue = (value) => {
  const text = safeText(value);
  return text.toLowerCase();
};

/**
 * Safe string comparison for filtering
 * Returns true if searchTerm is found in value
 */
export const includesText = (value, searchTerm) => {
  if (!searchTerm || searchTerm.trim() === "") {
    return true; // Empty search matches everything
  }

  const normalizedValue = normalizeValue(value);
  const normalizedSearch = normalizeValue(searchTerm);

  return normalizedValue.includes(normalizedSearch);
};

/**
 * Safely get booking status
 * Handles missing or null values
 */
export const getBookingStatus = (booking) => {
  if (!booking || !booking.status) return "UNKNOWN";
  return booking.status;
};

/**
 * Safely get expected attendees count
 */
export const getExpectedAttendees = (booking) => {
  if (!booking) return "N/A";

  const attendees = booking.expectedAttendees;

  // Handle null/undefined
  if (attendees === null || attendees === undefined) {
    return "N/A";
  }

  // Handle number
  if (typeof attendees === "number") {
    return attendees;
  }

  // Handle string representation
  return String(attendees);
};

/**
 * Get booking purpose safely
 */
export const getBookingPurpose = (booking) => {
  if (!booking || !booking.purpose) return "N/A";
  return booking.purpose;
};

/**
 * Format date string for display
 */
export const formatDate = (dateString) => {
  if (!dateString) return "N/A";

  try {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
      return dateString; // Return original if invalid
    }
    return date.toLocaleDateString();
  } catch (e) {
    return dateString; // Return original on error
  }
};

/**
 * Safely extract all filterable fields from booking
 * Used for comprehensive search/filter operations
 */
export const getSearchableBookingText = (booking) => {
  if (!booking) return "";

  const parts = [
    getBookingCode(booking),
    getResourceName(booking),
    getUserName(booking),
    getBookingPurpose(booking),
    getBookingStatus(booking),
    getBookingDate(booking),
    getStartTime(booking),
    getEndTime(booking),
  ];

  return parts.filter(p => p !== "N/A").join(" ").toLowerCase();
};

export default {
  getResourceName,
  getUserName,
  getBookingCode,
  getBookingDate,
  getStartTime,
  getEndTime,
  safeText,
  normalizeValue,
  includesText,
  getBookingStatus,
  getExpectedAttendees,
  getBookingPurpose,
  formatDate,
  getSearchableBookingText,
};
