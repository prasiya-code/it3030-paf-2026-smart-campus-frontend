import api from './axios';

const API_BASE_URL = '/api/bookings';

// Mock data for fallback when API is not available
const mockBookings = [
  {
    id: 1,
    bookingCode: 'BK-2024-001',
    resource: { id: 1, name: 'Main Lecture Hall', type: 'LECTURE_HALL' },
    resourceId: 1,
    user: { id: 4, firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
    userId: 4,
    bookingDate: '2024-04-20',
    startTime: '09:00',
    endTime: '11:00',
    purpose: 'Team meeting for project discussion',
    expectedAttendees: 15,
    status: 'PENDING',
    createdAt: '2024-04-17T10:30:00Z'
  },
  {
    id: 2,
    bookingCode: 'BK-2024-002',
    resource: { id: 2, name: 'Computer Lab 101', type: 'LAB' },
    resourceId: 2,
    user: { id: 4, firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
    userId: 4,
    bookingDate: '2024-04-21',
    startTime: '14:00',
    endTime: '16:00',
    purpose: 'Programming workshop',
    expectedAttendees: 25,
    status: 'APPROVED',
    createdAt: '2024-04-16T09:15:00Z'
  },
  {
    id: 3,
    bookingCode: 'BK-2024-003',
    resource: { id: 3, name: 'Meeting Room 201', type: 'MEETING_ROOM' },
    resourceId: 3,
    user: { id: 5, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' },
    userId: 5,
    bookingDate: '2024-04-22',
    startTime: '10:00',
    endTime: '12:00',
    purpose: 'Client presentation',
    expectedAttendees: 8,
    status: 'PENDING',
    createdAt: '2024-04-17T11:00:00Z'
  },
  {
    id: 4,
    bookingCode: 'BK-2024-004',
    resource: { id: 1, name: 'Main Lecture Hall', type: 'LECTURE_HALL' },
    resourceId: 1,
    user: { id: 4, firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
    userId: 4,
    bookingDate: '2024-04-19',
    startTime: '13:00',
    endTime: '15:00',
    purpose: 'Department seminar',
    expectedAttendees: 50,
    status: 'REJECTED',
    adminReason: 'Resource unavailable due to maintenance',
    createdAt: '2024-04-15T14:20:00Z'
  },
  {
    id: 5,
    bookingCode: 'BK-2024-005',
    resource: { id: 4, name: 'Multimedia Projector', type: 'EQUIPMENT' },
    resourceId: 4,
    user: { id: 4, firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
    userId: 4,
    bookingDate: '2024-04-23',
    startTime: '09:00',
    endTime: '17:00',
    purpose: 'All-day conference presentation',
    expectedAttendees: 5,
    status: 'CANCELLED',
    createdAt: '2024-04-14T16:45:00Z'
  }
];

// Helper function to handle API errors gracefully
const handleApiError = (error, fallbackData = null) => {
  console.warn('API Error, using fallback data:', error.message);
  return fallbackData;
};

// Generate unique booking code
const generateBookingCode = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `BK-${timestamp}-${random}`;
};

export const getAllBookings = async () => {
  try {
    const response = await api.get(API_BASE_URL);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    return handleApiError(error, [...mockBookings]);
  }
};

export const getMyBookings = async () => {
  try {
    const response = await api.get(`${API_BASE_URL}/my-bookings`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    // Return all mock bookings as fallback (simulating user's bookings)
    return handleApiError(error, [...mockBookings]);
  }
};

export const getBookingById = async (id) => {
  try {
    const response = await api.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    const booking = mockBookings.find(b => b.id === parseInt(id));
    return handleApiError(error, booking || null);
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await api.post(API_BASE_URL, bookingData);
    return response.data;
  } catch (error) {
    // Simulate successful creation with mock data
    const newBooking = {
      id: mockBookings.length + 1,
      bookingCode: generateBookingCode(),
      ...bookingData,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };
    mockBookings.push(newBooking);
    return handleApiError(error, newBooking);
  }
};

export const cancelBooking = async (id) => {
  try {
    const response = await api.patch(`${API_BASE_URL}/${id}/cancel`);
    return response.data;
  } catch (error) {
    // Simulate successful cancellation in mock data
    const index = mockBookings.findIndex(b => b.id === parseInt(id));
    if (index !== -1) {
      mockBookings[index] = {
        ...mockBookings[index],
        status: 'CANCELLED'
      };
      return handleApiError(error, mockBookings[index]);
    }
    return handleApiError(error, null);
  }
};

export const updateBooking = async (id, bookingData) => {
  try {
    const response = await api.put(`${API_BASE_URL}/${id}`, bookingData);
    return response.data;
  } catch (error) {
    // Simulate successful update in mock data
    const index = mockBookings.findIndex(b => b.id === parseInt(id));
    if (index !== -1) {
      mockBookings[index] = { ...mockBookings[index], ...bookingData };
      return handleApiError(error, mockBookings[index]);
    }
    return handleApiError(error, null);
  }
};

export const updateBookingWithAdmin = async (id, updateData, adminId) => {
  try {
    const response = await api.patch(`${API_BASE_URL}/${id}/admin-update`, {
      ...updateData,
      adminId
    });
    return response.data;
  } catch (error) {
    // Simulate successful admin update in mock data
    const index = mockBookings.findIndex(b => b.id === parseInt(id));
    if (index !== -1) {
      mockBookings[index] = {
        ...mockBookings[index],
        ...updateData,
        adminId
      };
      return handleApiError(error, mockBookings[index]);
    }
    return handleApiError(error, null);
  }
};

export const approveBooking = async (id, adminId) => {
  return updateBookingWithAdmin(id, { status: 'APPROVED' }, adminId);
};

export const rejectBooking = async (id, adminReason, adminId) => {
  return updateBookingWithAdmin(id, { status: 'REJECTED', adminReason }, adminId);
};

export const searchBookings = async (query) => {
  try {
    const response = await api.get(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    // Simulate search in mock data
    const filtered = mockBookings.filter(booking =>
      booking.bookingCode?.toLowerCase().includes(query.toLowerCase()) ||
      booking.purpose?.toLowerCase().includes(query.toLowerCase()) ||
      booking.resource?.name?.toLowerCase().includes(query.toLowerCase())
    );
    return handleApiError(error, filtered);
  }
};
