import api from './axios';

const API_BASE_URL = '/api/bookings';

export const getAllBookings = async () => {
  try {
    const response = await api.get(API_BASE_URL, {
      withCredentials: true
    });
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('GET ALL BOOKINGS ERROR:', error);
    throw error;
  }
};

export const getMyBookings = async () => {
  try {
    const response = await api.get(`${API_BASE_URL}/my-bookings`, {
      withCredentials: true
    });
    return response.data || [];
  } catch (error) {
    console.error('GET MY BOOKINGS ERROR:', error);
    throw error;
  }
};

export const getBookingById = async (id) => {
  try {
    const response = await api.get(`${API_BASE_URL}/${id}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('GET BOOKING BY ID ERROR:', error);
    throw error;
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await api.post(API_BASE_URL, bookingData, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('CREATE BOOKING ERROR:', error);
    throw error;
  }
};

export const cancelBooking = async (id) => {
  try {
    const response = await api.patch(`${API_BASE_URL}/${id}/cancel`, null, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('CANCEL BOOKING ERROR:', error);
    throw error;
  }
};

export const updateBooking = async (id, bookingData) => {
  try {
    const response = await api.put(`${API_BASE_URL}/${id}`, bookingData, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('UPDATE BOOKING ERROR:', error);
    throw error;
  }
};

export const updateBookingWithAdmin = async (id, updateData, adminId) => {
  try {
    const response = await api.patch(`${API_BASE_URL}/${id}/admin-update`, {
      ...updateData,
      adminId
    }, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('ADMIN UPDATE BOOKING ERROR:', error);
    throw error;
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
    const response = await api.get(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`, {
      withCredentials: true
    });
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('SEARCH BOOKINGS ERROR:', error);
    throw error;
  }
};