import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import { ServiceGrid } from '@/components/ServiceGrid';
import { BookingModal } from '@/components/BookingModal';
import { SearchWidget } from '@/components/SearchWidget';
import { BlogSection } from '@/components/Content/BlogSection';
import { TestimonialsSection } from '@/components/Content/TestimonialsSection';
import { EnhancedBookingForm } from '@/components/Forms/EnhancedBookingForm';

const Index = () => {
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
        <title>ServiceMaster Pro | Trusted Professional Services</title>
        <meta name="description" content="Connect with verified professionals for cleaning, plumbing, electrical, and more. Book trusted services with ServiceMaster Pro." />
        <meta name="keywords" content="professional services, home services, cleaning, plumbing, electrical, verified professionals" />
        <meta property="og:title" content="ServiceMaster Pro - Professional Service Platform" />
        <meta property="og:description" content="Connect with trusted professionals for all your home service needs. Book verified services with ease." />
        <meta property="og:image" content="URL_TO_YOUR_FEATURED_IMAGE" />
        <link rel="canonical" href="/" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative py-20 sm:py-32 overflow-hidden">
          <div className="absolute inset-0 gradient-bg-subtle opacity-50"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-fade-in">
                <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
                  Your Home, Our Expertise
                  <br />
                  <span className="gradient-text">Trusted Professional Services</span>
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                  Connecting you with verified professionals for all your home service needs. 
                  Quality service, trusted providers, competitive pricing.
                </p>

                {/* Search Widget */}
                <div className="max-w-md mx-auto mb-8">
                  <SearchWidget onServiceSelect={handleSearchSelect} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <ServiceGrid onBookService={handleBookService} />

        {/* Enhanced Booking Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Book Your Service Today
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Get started with our streamlined booking process and connect with verified professionals in minutes.
              </p>
            </div>
            <EnhancedBookingForm />
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Blog Section */}
        <BlogSection />

        {/* CTA Section */}
        <section className="py-20 gradient-bg text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Experience the Difference?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust ServiceMaster Pro for their service needs.
            </p>
          </div>
        </section>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preselectedService={selectedService}
      />
    </>
  );
};

export default Index;
