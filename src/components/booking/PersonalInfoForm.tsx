
import React from 'react';
import { Input } from "@/components/ui/input";
import { User, Mail, Phone } from "lucide-react";

interface PersonalInfoFormProps {
  formData: {
    name: string;
    email: string;
    phone: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ formData, onInputChange }) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          <User className="inline w-4 h-4 mr-1" />
          Full Name
        </label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={onInputChange}
          className="bg-gray-800 border-gray-600 text-white"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          <Mail className="inline w-4 h-4 mr-1" />
          Email
        </label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={onInputChange}
          className="bg-gray-800 border-gray-600 text-white"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          <Phone className="inline w-4 h-4 mr-1" />
          Phone Number
        </label>
        <Input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={onInputChange}
          className="bg-gray-800 border-gray-600 text-white"
          required
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;
