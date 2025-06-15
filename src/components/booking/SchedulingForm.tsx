
import React from 'react';
import { Input } from "@/components/ui/input";
import { Calendar, Clock } from "lucide-react";

interface SchedulingFormProps {
  formData: {
    date: string;
    time: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const SchedulingForm: React.FC<SchedulingFormProps> = ({ formData, onInputChange }) => {
  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
    '4:00 PM', '5:00 PM', '6:00 PM'
  ];

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          <Calendar className="inline w-4 h-4 mr-1" />
          Preferred Date
        </label>
        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={onInputChange}
          className="bg-gray-800 border-gray-600 text-white"
          min={new Date().toISOString().split('T')[0]}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          <Clock className="inline w-4 h-4 mr-1" />
          Preferred Time
        </label>
        <select
          name="time"
          value={formData.time}
          onChange={onInputChange}
          className="w-full bg-gray-800 border border-gray-600 text-white rounded-md px-3 py-2"
          required
        >
          <option value="">Select time</option>
          {timeSlots.map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SchedulingForm;
