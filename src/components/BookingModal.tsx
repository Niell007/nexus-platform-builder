
"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { EnhancedBookingForm } from '@/components/Forms/EnhancedBookingForm';

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

  if (!user) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              Please log in to book a service
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Your Service</DialogTitle>
          <DialogDescription>
            Fill out the form below and we'll connect you with a verified professional
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <EnhancedBookingForm preselectedService={preselectedService} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
