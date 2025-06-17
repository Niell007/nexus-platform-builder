
import { useState } from 'react';

export const useBookingModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');

  const openModal = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedService('');
  };

  return {
    isOpen,
    selectedService,
    openModal,
    closeModal
  };
};
