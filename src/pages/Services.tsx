import React, { useState } from 'react';
import SEOHead from '@/components/SEO/SEOHead';
import Navbar from '@/components/layout/Navbar';
import { ServiceGrid } from '@/components/ServiceGrid';
import { BookingFormModal } from '@/components/booking/BookingFormModal';
import { ServiceSearch } from '@/components/services/ServiceSearch';
import { FilterSearch } from '@/components/ui/filter-search';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OptimizedImage from '@/components/Media/OptimizedImage';
import { useLocalization } from '@/hooks/useLocalization';
import { useBookingModal } from '@/hooks/useBookingModal';
import { Star, MapPin, Clock, Shield, Award, Users } from 'lucide-react';

const Services: React.FC = () => {
  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  const { convertToZAR } = useLocalization();
  const { isOpen, selectedService, openModal, closeModal } = useBookingModal();

  const handleBookService = (serviceName: string) => {
    openModal(serviceName);
  };

  const handleSearchSelect = (serviceName: string) => {
    openModal(serviceName);
  };

  const allServices = [
    {
      name: "Home Cleaning",
      description: "Professional residential cleaning services including deep cleaning, regular maintenance, and move-in/move-out cleaning",
      price: "R1,480-R3,700",
      category: "Cleaning",
      duration: "2-4 hours",
      rating: 4.9,
      reviews: 1250,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      features: ["Eco-friendly products", "Insured professionals", "Same-day availability"]
    },
    {
      name: "Plumbing Services", 
      description: "Licensed plumbing repair and installation including leak repairs, pipe installation, and emergency services",
      price: "R1,850-R9,250",
      category: "Maintenance",
      duration: "1-3 hours",
      rating: 4.8,
      reviews: 890,
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop",
      features: ["24/7 emergency service", "Licensed professionals", "Parts warranty"]
    },
    {
      name: "Electrical Work",
      description: "Certified electrical services including wiring, outlet installation, and electrical repairs",
      price: "R2,775-R7,400",
      category: "Maintenance",
      duration: "1-4 hours",
      rating: 4.9,
      reviews: 670,
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop",
      features: ["Safety certified", "Code compliant", "Emergency service"]
    },
    {
      name: "Landscaping",
      description: "Complete lawn care and landscaping services including mowing, trimming, and garden design",
      price: "R1,390-R5,550",
      category: "Outdoor",
      duration: "2-6 hours",
      rating: 4.7,
      reviews: 540,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
      features: ["Seasonal maintenance", "Design consultation", "Plant warranty"]
    },
    {
      name: "Handyman Services",
      description: "General home repairs and maintenance including furniture assembly, painting, and minor repairs",
      price: "R1,110-R4,625",
      category: "Maintenance",
      duration: "1-4 hours",
      rating: 4.8,
      reviews: 920,
      image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop",
      features: ["Multi-skill professionals", "Own tools", "Quick turnaround"]
    },
    {
      name: "HVAC Services",
      description: "Heating and cooling system maintenance, repair, and installation services",
      price: "R2,220-R11,100",
      category: "Maintenance",
      duration: "2-6 hours",
      rating: 4.9,
      reviews: 450,
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      features: ["Energy efficiency", "Maintenance plans", "Emergency repair"]
    },
    {
      name: "Pest Control",
      description: "Professional pest control and extermination services for residential and commercial properties",
      price: "R1,665-R6,475",
      category: "Maintenance",
      duration: "1-3 hours",
      rating: 4.6,
      reviews: 320,
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      features: ["Safe treatments", "Follow-up service", "Prevention plans"]
    },
    {
      name: "Appliance Repair",
      description: "Expert repair services for washers, dryers, refrigerators, and other home appliances",
      price: "R1,850-R7,400",
      category: "Maintenance",
      duration: "1-3 hours",
      rating: 4.7,
      reviews: 280,
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      features: ["All major brands", "Parts guarantee", "Diagnostic service"]
    }
  ];

  const filterGroups = [
    {
      id: "category",
      label: "Category",
      type: "checkbox" as const,
      options: [
        { id: "cleaning", label: "Cleaning", value: "Cleaning" },
        { id: "maintenance", label: "Maintenance", value: "Maintenance" },
        { id: "outdoor", label: "Outdoor", value: "Outdoor" }
      ]
    },
    {
      id: "rating",
      label: "Minimum Rating",
      type: "select" as const,
      options: [
        { id: "4.5", label: "4.5+ Stars", value: "4.5" },
        { id: "4.0", label: "4.0+ Stars", value: "4.0" },
        { id: "3.5", label: "3.5+ Stars", value: "3.5" }
      ]
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
      answer: "We currently serve major cities across South Africa. Enter your area during booking to check availability."
    }
  ];

  const ServiceCard = ({ service }: { service: any }) => (
    <Card className="card-professional hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <div className="relative">
        <OptimizedImage
          src={service.image}
          alt={service.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <Badge className="absolute top-3 right-3 bg-white/90 text-gray-800">
          <Star className="w-3 h-3 mr-1 text-yellow-500" />
          {service.rating}
        </Badge>
      </div>
      
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg">{service.name}</CardTitle>
          <span className="text-lg font-bold text-primary">{service.price}</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {service.duration}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {service.reviews} reviews
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground mb-4">{service.description}</p>
        
        <div className="space-y-2 mb-4">
          <h4 className="font-medium text-sm">Features:</h4>
          <div className="flex flex-wrap gap-1">
            {service.features.map((feature: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            <span className="font-medium">{service.rating}</span>
            <span className="text-muted-foreground text-sm ml-1">({service.reviews})</span>
          </div>
          <Badge variant="outline">{service.category}</Badge>
        </div>
        
        <Button 
          className="w-full" 
          onClick={() => handleBookService(service.name)}
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <>
      <SEOHead
        title="Professional Services - ServiceMaster Pro | Home Services Directory"
        description="Browse our comprehensive range of professional services including cleaning, plumbing, electrical work, landscaping, and more. Book verified professionals with competitive pricing in South Africa."
        keywords="professional services, home services, cleaning services, plumbing, electrical, landscaping, handyman, HVAC, pest control, appliance repair, South Africa"
        canonical="/services"
        schemaType="Service"
        breadcrumbs={breadcrumbs}
        services={allServices}
        faqs={faqs}
      />

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Enhanced Hero Section */}
          <div className="text-center mb-12">
            <div className="max-w-4xl mx-auto">
              <Badge variant="secondary" className="mb-4">
                <Shield className="w-4 h-4 mr-1" />
                Verified Professionals Only
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
                Professional Services
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Connect with verified professionals for all your home and business needs. 
                Quality service, trusted providers, competitive pricing across South Africa.
              </p>
              
              {/* Enhanced Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Professionals</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">10k+</div>
                  <div className="text-sm text-muted-foreground">Completed Jobs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">4.8★</div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">9</div>
                  <div className="text-sm text-muted-foreground">Provinces</div>
                </div>
              </div>
              
              {/* Search Widget */}
              <div className="max-w-md mx-auto mb-8">
                <ServiceSearch onServiceSelect={handleSearchSelect} />
              </div>
            </div>
          </div>

          {/* Enhanced Filter Section */}
          <div className="mb-8">
            <FilterSearch
              data={allServices}
              searchFields={['name', 'description', 'category']}
              filterGroups={filterGroups}
              onResults={setFilteredServices}
              placeholder="Search services..."
            />
          </div>

          {/* Service Categories Tabs */}
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Services</TabsTrigger>
              <TabsTrigger value="cleaning">Cleaning</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              <TabsTrigger value="outdoor">Outdoor</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(filteredServices.length > 0 ? filteredServices : allServices).map((service, index) => (
                  <ServiceCard key={index} service={service} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="cleaning" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allServices
                  .filter(service => service.category === 'Cleaning')
                  .map((service, index) => (
                    <ServiceCard key={index} service={service} />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="maintenance" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allServices
                  .filter(service => service.category === 'Maintenance')
                  .map((service, index) => (
                    <ServiceCard key={index} service={service} />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="outdoor" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allServices
                  .filter(service => service.category === 'Outdoor')
                  .map((service, index) => (
                    <ServiceCard key={index} service={service} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Service Guarantees */}
          <section className="py-16 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl mb-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Our Service Guarantees</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every service comes with our comprehensive protection and satisfaction guarantee.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-flex p-3 rounded-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 mb-4">
                  <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold mb-2">100% Satisfaction</h3>
                <p className="text-sm text-muted-foreground">Money-back guarantee if you're not completely satisfied</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex p-3 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 mb-4">
                  <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold mb-2">Verified Professionals</h3>
                <p className="text-sm text-muted-foreground">Background checked and insurance verified</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex p-3 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 mb-4">
                  <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold mb-2">On-Time Service</h3>
                <p className="text-sm text-muted-foreground">Punctual service or we'll make it right</p>
              </div>
            </div>
          </section>

          {/* Legacy Services Grid */}
          <ServiceGrid onBookService={handleBookService} />
        </main>

        {/* Booking Modal */}
        <BookingFormModal
          isOpen={isOpen}
          onClose={closeModal}
          preselectedService={selectedService}
        />
      </div>
    </>
  );
};

export default Services;
