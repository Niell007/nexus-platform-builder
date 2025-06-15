
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import AISearchSection from '@/components/home/AISearchSection';
import FeaturedServices from '@/components/home/FeaturedServices';
import ContactSection from '@/components/home/ContactSection';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main>
        <Hero />
        <AISearchSection />
        <FeaturedServices />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
