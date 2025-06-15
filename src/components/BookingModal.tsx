
"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useBookings, BookingFormData } from '@/hooks/useBookings';
import { useAuth } from '@/contexts/AuthContext';
import PersonalInfoForm from './booking/PersonalInfoForm';
import ServiceSelectionForm from './booking/ServiceSelectionForm';
import SchedulingForm from './booking/SchedulingForm';
import AddressForm from './booking/AddressForm';
import AdditionalDetailsForm from './booking/AdditionalDetailsForm';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({ 
  isOpen, 
  onClose, 
  preselectedService 
}) => {
  const { user } = useAuth();
  const { createBooking, loading } = useBookings();
  const [formData, setFormData] = useState<BookingFormData>({
    name: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    phone: '',
    service: preselectedService || '',
    date: '',
    time: '',
    address: '',
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please log in to book a service');
      return;
    }

    const result = await createBooking(formData);
    if (result.success) {
      onClose();
      setFormData({
        name: user?.user_metadata?.full_name || '',
        email: user?.email || '',
        phone: '',
        service: '',
        date: '',
        time: '',
        address: '',
        description: ''
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Your Service</DialogTitle>
          <DialogDescription>
            Fill out the form below and we'll connect you with a verified professional
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <PersonalInfoForm 
            formData={formData} 
            onInputChange={handleInputChange} 
          />
          
          <ServiceSelectionForm 
            formData={formData} 
            onInputChange={handleInputChange} 
          />

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

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              type="submit" 
              className="flex-1"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Booking Request'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
