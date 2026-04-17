import axios from 'axios';

const API_BASE_URL = '/api/resources';

// Mock data for fallback when API is not available
const mockResources = [
  {
    id: 1,
    resourceCode: 'LH001',
    name: 'Main Lecture Hall',
    type: 'LECTURE_HALL',
    location: 'Building A, Floor 1',
    capacity: 200,
    description: 'Large lecture hall for presentations and seminars',
    status: 'ACTIVE',
    availabilityStart: '2024-01-01T09:00:00',
    availabilityEnd: '2024-12-31T17:00:00'
  },
  {
    id: 2,
    resourceCode: 'LAB101',
    name: 'Computer Lab 101',
    type: 'LAB',
    location: 'Building B, Floor 2',
    capacity: 30,
    description: 'Computer lab with 30 workstations',
    status: 'ACTIVE',
    availabilityStart: '2024-01-01T08:00:00',
    availabilityEnd: '2024-12-31T20:00:00'
  },
  {
    id: 3,
    resourceCode: 'MR201',
    name: 'Meeting Room 201',
    type: 'MEETING_ROOM',
    location: 'Building C, Floor 2',
    capacity: 12,
    description: 'Small meeting room for team discussions',
    status: 'ACTIVE',
    availabilityStart: '2024-01-01T09:00:00',
    availabilityEnd: '2024-12-31T18:00:00'
  },
  {
    id: 4,
    resourceCode: 'PROJ001',
    name: 'Multimedia Projector',
    type: 'EQUIPMENT',
    location: 'Storage Room A',
    capacity: 1,
    description: 'Portable multimedia projector for presentations',
    status: 'OUT_OF_SERVICE',
    availabilityStart: '2024-01-01T09:00:00',
    availabilityEnd: '2024-12-31T17:00:00'
  }
];

// Helper function to handle API errors gracefully
const handleApiError = (error, fallbackData = null) => {
  console.warn('API Error, using fallback data:', error.message);
  return fallbackData;
};

export const getAllResources = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    // Ensure we always return an array
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    // Return mock data when API fails
    return handleApiError(error, mockResources);
  }
};

export const getResourceById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    // Try to find in mock data
    const mockResource = mockResources.find(r => r.id === parseInt(id));
    return handleApiError(error, mockResource || null);
  }
};

export const createResource = async (resourceData) => {
  try {
    const response = await axios.post(API_BASE_URL, resourceData);
    return response.data;
  } catch (error) {
    // Simulate successful creation with mock data
    const newResource = {
      id: mockResources.length + 1,
      ...resourceData,
      capacity: parseInt(resourceData.capacity, 10)
    };
    mockResources.push(newResource);
    return handleApiError(error, newResource);
  }
};

export const updateResource = async (id, resourceData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, resourceData);
    return response.data;
  } catch (error) {
    // Simulate successful update in mock data
    const index = mockResources.findIndex(r => r.id === parseInt(id));
    if (index !== -1) {
      mockResources[index] = {
        ...mockResources[index],
        ...resourceData,
        capacity: parseInt(resourceData.capacity, 10)
      };
      return handleApiError(error, mockResources[index]);
    }
    return handleApiError(error, null);
  }
};

export const deleteResource = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
    return true;
  } catch (error) {
    // Simulate successful deletion in mock data
    const index = mockResources.findIndex(r => r.id === parseInt(id));
    if (index !== -1) {
      mockResources.splice(index, 1);
    }
    return handleApiError(error, true);
  }
};

export const searchResources = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    // Simulate search in mock data
    const filtered = mockResources.filter(resource => 
      resource.name.toLowerCase().includes(query.toLowerCase()) ||
      resource.description.toLowerCase().includes(query.toLowerCase()) ||
      resource.location.toLowerCase().includes(query.toLowerCase())
    );
    return handleApiError(error, filtered);
  }
};

