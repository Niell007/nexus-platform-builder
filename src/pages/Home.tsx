
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import FeaturedServices from '@/components/home/FeaturedServices';
import AISearchSection from '@/components/home/AISearchSection';
import ContactSection from '@/components/home/ContactSection';
import Footer from '@/components/layout/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <Hero />
      <AISearchSection />
      <FeaturedServices />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
