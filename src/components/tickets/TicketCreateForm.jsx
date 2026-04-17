import React, { useState } from 'react';

const TicketCreateForm = () => {
  const [formData, setFormData] = useState({
    resource: '',
    category: '',
    priority: '',
    description: '',
    location: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    attachments: []
  });

  const [errors, setErrors] = useState({});

  const resourceOptions = [
    { value: '', label: 'Select a resource' },
    { value: 'lab-a', label: 'Lab Room A' },
    { value: 'lab-b', label: 'Lab Room B' },
    { value: 'classroom-101', label: 'Classroom 101' },
    { value: 'classroom-102', label: 'Classroom 102' },
    { value: 'auditorium', label: 'Main Auditorium' },
    { value: 'library', label: 'Library' },
    { value: 'projector-1', label: 'Projector 1' },
    { value: 'ac-unit-1', label: 'AC Unit 1' }
  ];

  const categoryOptions = [
    { value: '', label: 'Select category' },
    { value: 'MAINTENANCE', label: 'MAINTENANCE' },
    { value: 'INCIDENT', label: 'INCIDENT' },
    { value: 'REPAIR', label: 'REPAIR' },
    { value: 'CLEANING', label: 'CLEANING' },
    { value: 'OTHER', label: 'OTHER' }
  ];

  const priorityOptions = [
    { value: '', label: 'Select priority' },
    { value: 'LOW', label: 'LOW' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HIGH', label: 'HIGH' },
    { value: 'URGENT', label: 'URGENT' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      setErrors(prev => ({ ...prev, attachments: 'Maximum 3 attachments allowed' }));
      return;
    }
    setFormData(prev => ({ ...prev, attachments: files }));
    setErrors(prev => ({ ...prev, attachments: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.priority) newErrors.priority = 'Priority is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log('Form submitted:', formData);
    alert('Ticket created successfully! (Console log)');
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resource <span className="text-gray-400">(Optional)</span>
          </label>
          <select
            name="resource"
            value={formData.resource}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          >
            {resourceOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white ${
              errors.category ? 'border-red-500' : 'border-gray-200'
            }`}
          >
            {categoryOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority <span className="text-red-500">*</span>
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white ${
              errors.priority ? 'border-red-500' : 'border-gray-200'
            }`}
          >
            {priorityOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {errors.priority && <p className="text-red-500 text-sm mt-1">{errors.priority}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Building A, Floor 2"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          placeholder="Describe the issue in detail..."
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none ${
            errors.description ? 'border-red-500' : 'border-gray-200'
          }`}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      <div className="border-t border-gray-200 pt-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Contact Name
            </label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Contact Email
            </label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Contact Phone
            </label>
            <input
              type="tel"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              placeholder="+1 234 567 8900"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Attachments</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
          <input
            type="file"
            name="attachments"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="text-3xl mb-2">📎</div>
            <p className="text-sm text-gray-600 mb-1">
              <span className="text-primary-600 font-medium">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-400">PNG, JPG up to 5MB (Max 3 files)</p>
          </label>
          {formData.attachments.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {formData.attachments.map((file, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                  {file.name}
                </span>
              ))}
            </div>
          )}
          {errors.attachments && <p className="text-red-500 text-sm mt-2">{errors.attachments}</p>}
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={handleCancel}
          className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          Submit Ticket
        </button>
      </div>
    </form>
  );
};

export default TicketCreateForm;
