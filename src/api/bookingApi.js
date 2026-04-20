import api from './axios';

const API_BASE_URL = '/api/bookings';

export const getAllBookings = async (params = {}) => {
  try {
    const queryString = Object.keys(params)
      .filter((key) => params[key] !== undefined && params[key] !== null && params[key] !== '')
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');

    const url = queryString ? `${API_BASE_URL}?${queryString}` : API_BASE_URL;

    const response = await api.get(url, {
      withCredentials: true,
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
      withCredentials: true,
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
      withCredentials: true,
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
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('CREATE BOOKING ERROR:', error);
    throw error;
  }
};

export const cancelBooking = async (id) => {
  try {
    const response = await api.post(`${API_BASE_URL}/${id}/cancel`, null, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('CANCEL BOOKING ERROR:', error);
    throw error;
  }
};

export const updateBooking = async (id, bookingData) => {
  try {
    // Admin status update only
    const response = await api.put(`${API_BASE_URL}/${id}`, bookingData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('UPDATE BOOKING ERROR:', error);
    throw error;
  }
};

export const editMyBooking = async (id, bookingData) => {
  try {
    // User edit own pending booking details
    const response = await api.put(`${API_BASE_URL}/${id}/edit`, bookingData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('EDIT MY BOOKING ERROR:', error);
    throw error;
  }
};

export const approveBooking = async (id) => {
  try {
    const response = await api.put(
      `${API_BASE_URL}/${id}`,
      { status: 'APPROVED' },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error('APPROVE BOOKING ERROR:', error);
    throw error;
  }
};

export const rejectBooking = async (id, adminReason) => {
  try {
    const response = await api.put(
      `${API_BASE_URL}/${id}`,
      {
        status: 'REJECTED',
        adminReason: adminReason || 'Rejected by admin',
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error('REJECT BOOKING ERROR:', error);
    throw error;
  }
};

export const searchBookings = async (query) => {
  try {
    const response = await api.get(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`, {
      withCredentials: true,
    });
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('SEARCH BOOKINGS ERROR:', error);
    throw error;
  }
};