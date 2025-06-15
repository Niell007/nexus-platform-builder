
"use client";

import React, { useState } from 'react';
import { BookingModal } from './BookingModal';
import { Button } from '@/components/ui/button';

interface ServiceBookingProps {
  serviceTitle?: string;
  onClose?: () => void;
  trigger?: React.ReactNode;
}

const ServiceBooking: React.FC<ServiceBookingProps> = ({ 
  serviceTitle, 
  onClose,
  trigger 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (onClose) onClose();
  };

  return (
    <>
      {trigger ? (
        <div onClick={handleOpenModal}>
          {trigger}
        </div>
      ) : (
        <Button onClick={handleOpenModal}>
          Book Service
        </Button>
      )}
      
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        preselectedService={serviceTitle}
      />
    </>
  );
};

export default ServiceBooking;
