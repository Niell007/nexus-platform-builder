
import React, { useState } from 'react';
import SEOHead from '@/components/SEO/SEOHead';
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
    },
    {
      name: "Pest Control",
      description: "Professional pest control and extermination services for residential and commercial properties",
      price: "$90-350"
    },
    {
      name: "Appliance Repair",
      description: "Expert repair services for washers, dryers, refrigerators, and other home appliances",
      price: "$100-400"
    }
  ];

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" }
  ];

  const faqs = [
    {
      question: "Are all service providers background checked?",
      answer: "Yes, all our service providers undergo thorough background checks, verification, and insurance validation before joining our platform."
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer: "We offer a 100% satisfaction guarantee. If you're not happy with the service, we'll work to make it right or provide a full refund."
    },
    {
      question: "How quickly can I book a service?",
      answer: "Many services can be booked for same-day or next-day appointments, depending on availability in your area."
    },
    {
      question: "Do you provide services in my area?",
      answer: "We currently serve 50+ cities nationwide. Enter your zip code during booking to check availability in your area."
    }
  ];

  return (
    <>
      <SEOHead
        title="Professional Services - ServiceMaster Pro | Home Services Directory"
        description="Browse our comprehensive range of professional services including cleaning, plumbing, electrical work, landscaping, and more. Book verified professionals with competitive pricing."
        keywords="professional services, home services, cleaning services, plumbing, electrical, landscaping, handyman, HVAC, pest control, appliance repair"
        canonical="/services"
        schemaType="Service"
        breadcrumbs={breadcrumbs}
        services={services}
        faqs={faqs}
      />

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
