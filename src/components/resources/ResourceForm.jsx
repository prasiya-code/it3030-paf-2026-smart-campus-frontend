import React, { useState, useEffect } from 'react';

const RESOURCE_TYPES = [
  'LECTURE_HALL',
  'LAB',
  'MEETING_ROOM',
  'EQUIPMENT'
];

const RESOURCE_STATUSES = [
  'ACTIVE',
  'OUT_OF_SERVICE'
];

const ResourceForm = ({ 
  initialData = {}, 
  onSubmit, 
  loading = false,
  error = null 
}) => {
  const [formData, setFormData] = useState({
    resourceCode: '',
    name: '',
    type: 'LECTURE_HALL',
    location: '',
    capacity: '',
    description: '',
    status: 'ACTIVE',
    availabilityStart: '',
    availabilityEnd: '',
    ...initialData
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        resourceCode: initialData.resourceCode || '',
        name: initialData.name || '',
        type: initialData.type || 'LECTURE_HALL',
        location: initialData.location || '',
        capacity: initialData.capacity || '',
        description: initialData.description || '',
        status: initialData.status || 'ACTIVE',
        availabilityStart: initialData.availabilityStart || '',
        availabilityEnd: initialData.availabilityEnd || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Resource Code validation
    if (!formData.resourceCode.trim()) {
      newErrors.resourceCode = 'Resource Code is required';
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.resourceCode)) {
      newErrors.resourceCode = 'Resource Code must contain only letters and numbers (no spaces)';
    }
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }
    
    // Type validation
    if (!formData.type) {
      newErrors.type = 'Type is required';
    }
    
    // Location validation
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    // Capacity validation
    if (!formData.capacity) {
      newErrors.capacity = 'Capacity is required';
    } else if (isNaN(formData.capacity) || Number(formData.capacity) <= 0) {
      newErrors.capacity = 'Capacity must be a number greater than 0';
    }
    
    // Date validation
    if (formData.availabilityStart && formData.availabilityEnd) {
      const startDate = new Date(formData.availabilityStart);
      const endDate = new Date(formData.availabilityEnd);
      if (startDate >= endDate) {
        newErrors.availabilityEnd = 'Availability End must be after Availability Start';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    } else {
      alert('Please fix errors before submitting');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{error}</span>
          </div>
        </div>
      )}
      
      {/* Basic Information Section */}
      <div className="space-y-4">
        <h3 className="text-base font-medium text-gray-900">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="resourceCode" className="block text-sm font-medium text-gray-700 flex items-center">
              Resource Code
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
                type="text"
                id="resourceCode"
                name="resourceCode"
                value={formData.resourceCode}
                onChange={handleChange}
                placeholder="e.g., LH001"
                className={`block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm ${
                  errors.resourceCode 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-gray-300'
                }`}
              />
            {errors.resourceCode && (
              <p className="text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.resourceCode}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 flex items-center">
              Name
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Main Lecture Hall"
                className={`block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm ${
                  errors.name 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-gray-300'
                }`}
              />
            {errors.name && (
              <p className="text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 flex items-center">
              Type
              <span className="ml-1 text-red-500">*</span>
            </label>
            <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm ${
                  errors.type 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-300'
                }`}
              >
                {RESOURCE_TYPES.map(type => (
                  <option key={type} value={type}>
                    {type.replace('_', ' ')}
                  </option>
                ))}
              </select>
            {errors.type && (
              <p className="text-sm text-red-500">{errors.type}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 flex items-center">
              Location
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Building A, Floor 1"
                className={`block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm ${
                  errors.location 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-gray-300'
                }`}
              />
            {errors.location && (
              <p className="text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.location}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 flex items-center">
              Capacity
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                min="1"
                placeholder="e.g., 200"
                className={`block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm ${
                  errors.capacity 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-gray-300'
                }`}
              />
            {errors.capacity && (
              <p className="text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.capacity}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                {RESOURCE_STATUSES.map(status => (
                  <option key={status} value={status}>
                    {status.replace('_', ' ')}
                  </option>
                ))}
              </select>
          </div>
        </div>
      </div>

      {/* Availability Section */}
      <div className="space-y-4">
        <h3 className="text-base font-medium text-gray-900">Availability Schedule</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="availabilityStart" className="block text-sm font-medium text-gray-700">
              Availability Start
            </label>
            <input
                type="datetime-local"
                id="availabilityStart"
                name="availabilityStart"
                value={formData.availabilityStart}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
              />
          </div>

          <div className="space-y-2">
            <label htmlFor="availabilityEnd" className="block text-sm font-medium text-gray-700">
              Availability End
            </label>
            <input
                type="datetime-local"
                id="availabilityEnd"
                name="availabilityEnd"
                value={formData.availabilityEnd}
                onChange={handleChange}
                className={`block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm ${
                  errors.availabilityEnd 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-300'
                }`}
              />
            {errors.availabilityEnd && (
              <p className="text-sm text-red-500">{errors.availabilityEnd}</p>
            )}
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="space-y-4">
        <h3 className="text-base font-medium text-gray-900">Description</h3>
        
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Additional Information
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            placeholder="Provide any additional details about this resource..."
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-500 text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 text-sm"
        >
          {loading ? 'Saving...' : 'Save Resource'}
        </button>
      </div>
    </form>
  );
};

export default ResourceForm;
