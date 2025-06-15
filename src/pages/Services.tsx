
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import { ServiceGrid } from '@/components/ServiceGrid';
import { BookingModal } from '@/components/BookingModal';
import { SearchWidget } from '@/components/SearchWidget';

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBookService = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsBookingModalOpen(true);
  };

  const handleSearchSelect = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsBookingModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Services - ServiceMaster Pro</title>
        <meta name="description" content="Browse our comprehensive range of professional services including cleaning, plumbing, electrical work, and more." />
        <meta name="keywords" content="professional services, home services, cleaning, plumbing, electrical, landscaping" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Professional Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Connect with verified professionals for all your home and business needs. 
              Quality service, trusted providers, competitive pricing.
            </p>
            
            {/* Search Widget */}
            <div className="max-w-md mx-auto mb-8">
              <SearchWidget onServiceSelect={handleSearchSelect} />
            </div>
          </div>

          {/* Services Grid */}
          <ServiceGrid onBookService={handleBookService} />
        </main>

        {/* Booking Modal */}
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          preselectedService={selectedService}
        />
      </div>
    </>
  );
};

export default Services;
