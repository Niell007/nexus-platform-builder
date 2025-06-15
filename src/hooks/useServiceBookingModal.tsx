
"use client";

import { useState } from 'react';

/**
 * Service Booking Modal Hook
 * Manages modal state and provides handlers
 */
export const useServiceBookingModal = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);

  const openBookingModal = () => setShowBookingModal(true);
  const closeBookingModal = () => setShowBookingModal(false);

  return {
    showBookingModal,
    openBookingModal,
    closeBookingModal
  };
};
