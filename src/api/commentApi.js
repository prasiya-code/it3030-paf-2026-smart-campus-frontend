import api from './axios';

export const getCommentsByTicket = async (ticketId) => {
  try {
    const response = await api.get(`/api/comments/ticket/${ticketId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createComment = async (payload) => {
  try {
    const response = await api.post('/api/comments', payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
