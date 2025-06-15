
"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, MapPin, User, Phone, Mail } from "lucide-react";

interface ServiceBookingProps {
  serviceTitle?: string;
  onClose?: () => void;
}

const ServiceBooking: React.FC<ServiceBookingProps> = ({ serviceTitle, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: serviceTitle || '',
    date: '',
    time: '',
    address: '',
    description: ''
  });

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
    '4:00 PM', '5:00 PM', '6:00 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking submitted:', formData);
    alert('Booking request submitted! We will contact you shortly.');
    if (onClose) onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="max-w-2xl mx-auto bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center">
          <Calendar className="mr-2 h-6 w-6 text-blue-400" />
          Book Your Service
        </CardTitle>
        <CardDescription className="text-gray-300">
          Fill out the form below and we'll connect you with a verified professional
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-600 text-white"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Phone className="inline w-4 h-4 mr-1" />
                Phone Number
              </label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Service Type
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
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
          </div>

          {/* Scheduling */}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <MapPin className="inline w-4 h-4 mr-1" />
              Service Address
            </label>
            <Input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter your full address"
              className="bg-gray-800 border-gray-600 text-white"
              required
            />
          </div>

          {/* Additional Details */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Additional Details (Optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Please describe your specific needs, any special requirements, or additional information..."
              className="w-full bg-gray-800 border border-gray-600 text-white rounded-md px-3 py-2 resize-none"
            />
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              type="submit" 
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              Submit Booking Request
            </Button>
            {onClose && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ServiceBooking;
