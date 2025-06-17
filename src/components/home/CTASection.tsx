
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';

interface CTASectionProps {
  onBookNow: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onBookNow }) => {
  return (
    <section className="py-20 gradient-bg text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-white rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to Experience the Difference?
        </h2>
        <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied customers who trust ServiceMaster Pro for their service needs across South Africa.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            variant="secondary"
            className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl shadow-xl"
            onClick={onBookNow}
          >
            Start Booking Now
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-xl"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};
