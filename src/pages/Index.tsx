
import React from 'react';
import SEOHead from '@/components/SEO/SEOHead';
import Navbar from '@/components/layout/Navbar';
import { ServiceGrid } from '@/components/ServiceGrid';
import { BookingFormModal } from '@/components/booking/BookingFormModal';
import { BlogSection } from '@/components/Content/BlogSection';
import { TestimonialsSection } from '@/components/Content/TestimonialsSection';
import { EnhancedBookingForm } from '@/components/Forms/EnhancedBookingForm';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { usePerformance } from '@/hooks/usePerformance';
import { useBookingModal } from '@/hooks/useBookingModal';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { ServicesCarousel } from '@/components/home/ServicesCarousel';
import { ContactSection } from '@/components/home/ContactSection';
import { CTASection } from '@/components/home/CTASection';

const Index = () => {
  const metrics = usePerformance();
  const { isOpen, selectedService, openModal, closeModal } = useBookingModal();

  const handleBookService = (serviceName: string) => {
    openModal(serviceName);
  };

  const handleSearchSelect = (serviceName: string) => {
    openModal(serviceName);
  };

  const breadcrumbs = [
    { name: "Home", url: "/" }
  ];

  const services = [
    {
      name: "Home Cleaning",
      description: "Professional residential cleaning services including deep cleaning, regular maintenance, and move-in/move-out cleaning",
      price: "R1,480-R3,700",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      rating: 4.9,
      bookings: 1250
    },
    {
      name: "Plumbing Services", 
      description: "Licensed plumbing repair and installation including leak repairs, pipe installation, and emergency services",
      price: "R1,850-R9,250",
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop",
      rating: 4.8,
      bookings: 890
    },
    {
      name: "Electrical Work",
      description: "Certified electrical services including wiring, outlet installation, and electrical repairs",
      price: "R2,775-R7,400",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop",
      rating: 4.9,
      bookings: 670
    },
    {
      name: "Landscaping",
      description: "Complete lawn care and landscaping services including mowing, trimming, and garden design",
      price: "R1,390-R5,550",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
      rating: 4.7,
      bookings: 540
    },
    {
      name: "Handyman Services",
      description: "General home repairs and maintenance including furniture assembly, painting, and minor repairs",
      price: "R1,110-R4,625",
      image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop",
      rating: 4.8,
      bookings: 920
    },
    {
      name: "HVAC Services",
      description: "Heating and cooling system maintenance, repair, and installation services",
      price: "R2,220-R11,100",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      rating: 4.9,
      bookings: 450
    }
  ];

  const reviews = [
    {
      rating: 5,
      author: "Sarah Mthombeni",
      text: "Excellent service! The cleaning team was professional and thorough. Highly recommend ServiceMaster Pro.",
      date: "2024-03-15",
      service: "Home Cleaning",
      location: "Johannesburg, GP"
    },
    {
      rating: 5,
      author: "Mike van der Merwe",
      text: "Quick response for emergency plumbing. The technician was knowledgeable and fixed the issue fast.",
      date: "2024-03-10",
      service: "Plumbing Services",
      location: "Cape Town, WC"
    },
    {
      rating: 4,
      author: "Thandiwe Dlamini",
      text: "Great platform for finding reliable service providers. Easy booking process and quality results.",
      date: "2024-03-08",
      service: "Electrical Work",
      location: "Durban, KZN"
    }
  ];

  return (
    <>
      <SEOHead
        title="ServiceMaster Pro | Trusted Professional Services in South Africa"
        description="Connect with verified professionals for cleaning, plumbing, electrical, and more across South Africa. Book trusted services with ServiceMaster Pro - rated 4.8/5 by 10,000+ customers."
        keywords="professional services, home services, cleaning, plumbing, electrical, verified professionals, home maintenance, service booking, South Africa"
        canonical="/"
        schemaType="LocalBusiness"
        breadcrumbs={breadcrumbs}
        services={services}
        reviews={reviews}
      />

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <HeroSection 
          onSearchSelect={handleSearchSelect}
          onBookNow={() => openModal()}
        />

        <FeaturesSection />

        <ServicesCarousel onBookService={handleBookService} />

        <ServiceGrid onBookService={handleBookService} />

        <section className="py-20 bg-gradient-to-br from-muted/30 to-muted/10">
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

        <TestimonialsSection />

        <BlogSection />

        <ContactSection />

        <CTASection onBookNow={() => openModal()} />

        <div className="fixed bottom-4 left-4 z-40">
          <ThemeToggle />
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="fixed top-4 left-4 z-50 text-xs bg-black/80 text-white p-2 rounded">
            <div>FCP: {metrics.fcp ? `${metrics.fcp.toFixed(0)}ms` : 'N/A'}</div>
            <div>LCP: {metrics.lcp ? `${metrics.lcp.toFixed(0)}ms` : 'N/A'}</div>
            <div>TTFB: {metrics.ttfb ? `${metrics.ttfb.toFixed(0)}ms` : 'N/A'}</div>
          </div>
        )}
      </div>

      <BookingFormModal
        isOpen={isOpen}
        onClose={closeModal}
        preselectedService={selectedService}
      />
    </>
  );
};

export default Index;
