
import React, { useState } from 'react';
import SEOHead from '@/components/SEO/SEOHead';
import Navbar from '@/components/layout/Navbar';
import { ServiceGrid } from '@/components/ServiceGrid';
import { BookingModal } from '@/components/BookingModal';
import { SearchWidget } from '@/components/SearchWidget';
import { BlogSection } from '@/components/Content/BlogSection';
import { TestimonialsSection } from '@/components/Content/TestimonialsSection';
import { EnhancedBookingForm } from '@/components/Forms/EnhancedBookingForm';
import OptimizedImage from '@/components/Media/OptimizedImage';

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

  const services = [
    {
      name: "Home Cleaning",
      description: "Professional residential cleaning services including deep cleaning, regular maintenance, and move-in/move-out cleaning",
      price: "$80-200"
    },
    {
      name: "Plumbing Services", 
      description: "Licensed plumbing repair and installation including leak repairs, pipe installation, and emergency services",
      price: "$100-500"
    },
    {
      name: "Electrical Work",
      description: "Certified electrical services including wiring, outlet installation, and electrical repairs",
      price: "$150-400"
    },
    {
      name: "Landscaping",
      description: "Complete lawn care and landscaping services including mowing, trimming, and garden design",
      price: "$75-300"
    },
    {
      name: "Handyman Services",
      description: "General home repairs and maintenance including furniture assembly, painting, and minor repairs",
      price: "$60-250"
    },
    {
      name: "HVAC Services",
      description: "Heating and cooling system maintenance, repair, and installation services",
      price: "$120-600"
    }
  ];

  const breadcrumbs = [
    { name: "Home", url: "/" }
  ];

  const reviews = [
    {
      rating: 5,
      author: "Sarah Johnson",
      text: "Excellent service! The cleaning team was professional and thorough. Highly recommend ServiceMaster Pro.",
      date: "2024-03-15"
    },
    {
      rating: 5,
      author: "Mike Chen",
      text: "Quick response for emergency plumbing. The technician was knowledgeable and fixed the issue fast.",
      date: "2024-03-10"
    },
    {
      rating: 4,
      author: "Emily Rodriguez",
      text: "Great platform for finding reliable service providers. Easy booking process and quality results.",
      date: "2024-03-08"
    }
  ];

  return (
    <>
      <SEOHead
        title="ServiceMaster Pro | Trusted Professional Services"
        description="Connect with verified professionals for cleaning, plumbing, electrical, and more. Book trusted services with ServiceMaster Pro - rated 4.8/5 by 10,000+ customers."
        keywords="professional services, home services, cleaning, plumbing, electrical, verified professionals, home maintenance, service booking"
        canonical="/"
        schemaType="LocalBusiness"
        breadcrumbs={breadcrumbs}
        services={services}
        reviews={reviews}
      />

      <div className="min-h-screen bg-background">
        <Navbar />
        
        {/* Hero Section with Optimized Background */}
        <section className="relative py-20 sm:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <OptimizedImage
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop"
              alt="Professional home services background"
              className="w-full h-full object-cover"
              priority={true}
              placeholder="blur"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-fade-in">
                <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 text-white">
                  Your Home, Our Expertise
                  <br />
                  <span className="gradient-text">Trusted Professional Services</span>
                </h1>
                
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
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
