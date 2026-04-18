import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/resources';

export const getAllResources = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    console.log('getAllResources response:', response.data);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('getAllResources error:', error.message);
    throw error;
  }
};

export const getResourceById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    console.log('getResourceById response:', response.data);
    return response.data;
  } catch (error) {
    console.error('getResourceById error:', error.message);
    throw error;
  }
};

export const createResource = async (resourceData) => {
  try {
    const response = await axios.post(API_BASE_URL, resourceData);
    console.log('createResource response:', response.data);
    return response.data;
  } catch (error) {
    console.error('createResource error:', error.message);
    throw error;
  }
};

export const updateResource = async (id, resourceData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, resourceData);
    console.log('updateResource response:', response.data);
    return response.data;
  } catch (error) {
    console.error('updateResource error:', error.message);
    throw error;
  }
};

export const deleteResource = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
    console.log('deleteResource success for id:', id);
    return true;
  } catch (error) {
    console.error('deleteResource error:', error.message);
    throw error;
  }
};

export const searchResources = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
    console.log('searchResources response:', response.data);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('searchResources error:', error.message);
    throw error;
  }
};

