"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import PersonalInfoForm from './booking/PersonalInfoForm';
import ServiceSelectionForm from './booking/ServiceSelectionForm';
import SchedulingForm from './booking/SchedulingForm';
import AddressForm from './booking/AddressForm';
import AdditionalDetailsForm from './booking/AdditionalDetailsForm';
import BookingFormActions from './booking/BookingFormActions';

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
          <PersonalInfoForm 
            formData={formData} 
            onInputChange={handleInputChange} 
          />
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-1">
              {/* Phone field is now in PersonalInfoForm, so we need the service selection here */}
            </div>
            <ServiceSelectionForm 
              formData={formData} 
              onInputChange={handleInputChange} 
            />
          </div>

          <SchedulingForm 
            formData={formData} 
            onInputChange={handleInputChange} 
          />

          <AddressForm 
            formData={formData} 
            onInputChange={handleInputChange} 
          />

          <AdditionalDetailsForm 
            formData={formData} 
            onInputChange={handleInputChange} 
          />

          <BookingFormActions onClose={onClose} />
        </form>
      </CardContent>
    </Card>
  );
};

export default ServiceBooking;
