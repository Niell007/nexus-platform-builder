
import React from 'react';

interface AdditionalDetailsFormProps {
  formData: {
    description: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const AdditionalDetailsForm: React.FC<AdditionalDetailsFormProps> = ({ formData, onInputChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Additional Details (Optional)
      </label>
      <textarea
        name="description"
        value={formData.description}
        onChange={onInputChange}
        rows={4}
        placeholder="Please describe your specific needs, any special requirements, or additional information..."
        className="w-full bg-gray-800 border border-gray-600 text-white rounded-md px-3 py-2 resize-none"
      />
    </div>
  );
};

export default AdditionalDetailsForm;
