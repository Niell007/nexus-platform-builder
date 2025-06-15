
import React from 'react';

interface ServiceSelectionFormProps {
  formData: {
    service: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ServiceSelectionForm: React.FC<ServiceSelectionFormProps> = ({ formData, onInputChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Service Type
      </label>
      <select
        name="service"
        value={formData.service}
        onChange={onInputChange}
        className="w-full bg-gray-800 border border-gray-600 text-white rounded-md px-3 py-2"
        required
      >
        <option value="">Select a service</option>
        <option value="Home Cleaning">Home Cleaning</option>
        <option value="Plumbing Services">Plumbing Services</option>
        <option value="Electrical Work">Electrical Work</option>
        <option value="Landscaping">Landscaping</option>
        <option value="Interior Design">Interior Design</option>
        <option value="HVAC Services">HVAC Services</option>
      </select>
    </div>
  );
};

export default ServiceSelectionForm;
