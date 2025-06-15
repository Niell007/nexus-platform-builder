
import React from 'react';
import EnhancedNavbar from '@/components/layout/EnhancedNavbar';
import Footer from '@/components/layout/Footer';
import HeroCarousel from '@/components/home/HeroCarousel';
import AISearchSection from '@/components/home/AISearchSection';
import FeaturedServices from '@/components/home/FeaturedServices';
import QuickBookingForm from '@/components/booking/QuickBookingForm';
import TestimonialSection from '@/components/reviews/TestimonialSection';
import MediaGalleryEnhanced from '@/components/media/MediaGalleryEnhanced';
import ContactSection from '@/components/home/ContactSection';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <EnhancedNavbar />
      <main>
        <HeroCarousel />
        <AISearchSection />
        <FeaturedServices />
        
        {/* Quick Booking Section */}
        <section className="py-16 bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Get Started Today
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Ready to transform your business? Book a consultation or submit an inquiry to get personalized solutions.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <QuickBookingForm />
            </div>
          </div>
        </section>

        <TestimonialSection />
        <MediaGalleryEnhanced />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
