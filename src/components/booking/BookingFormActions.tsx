
import React from 'react';
import { Button } from "@/components/ui/button";

interface BookingFormActionsProps {
  onClose?: () => void;
}

const BookingFormActions: React.FC<BookingFormActionsProps> = ({ onClose }) => {
  return (
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
  );
};

export default BookingFormActions;
