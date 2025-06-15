
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ServiceCards from '@/components/services/ServiceCards';
import ServiceHero from '@/components/services/ServiceHero';
import PricingSection from '@/components/services/PricingSection';

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <ServiceHero />
      <ServiceCards />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Services;
