import api from './axios';

export const getMyTickets = async () => {
  try {
    const response = await api.get('/api/tickets/my-tickets');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAllTickets = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const url = queryParams ? `/api/tickets?${queryParams}` : '/api/tickets';
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getTicketById = async (id) => {
  try {
    const response = await api.get(`/api/tickets/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createTicket = async (payload) => {
  try {
    const response = await api.post('/api/tickets', payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateTicket = async (id, payload) => {
  try {
    const response = await api.put(`/api/tickets/${id}`, payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteTicket = async (id) => {
  try {
    const response = await api.delete(`/api/tickets/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
