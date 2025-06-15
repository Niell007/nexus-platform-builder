
import React from 'react';
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

interface AddressFormProps {
  formData: {
    address: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ formData, onInputChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        <MapPin className="inline w-4 h-4 mr-1" />
        Service Address
      </label>
      <Input
        type="text"
        name="address"
        value={formData.address}
        onChange={onInputChange}
        placeholder="Enter your full address"
        className="bg-gray-800 border-gray-600 text-white"
        required
      />
    </div>
  );
};

export default AddressForm;
