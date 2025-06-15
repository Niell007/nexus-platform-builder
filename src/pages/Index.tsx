
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
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { usePerformance } from '@/hooks/usePerformance';
import { useLocalization } from '@/hooks/useLocalization';
import { Star, Users, Award, Shield, Zap, Globe, Phone, Mail, MapPin } from 'lucide-react';

const Index = () => {
  const [selectedService, setSelectedService] = useState<string>('');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const metrics = usePerformance();
  const { formatCurrency, formatDate } = useLocalization();

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
      price: "$80-200",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      rating: 4.9,
      bookings: 1250
    },
    {
      name: "Plumbing Services", 
      description: "Licensed plumbing repair and installation including leak repairs, pipe installation, and emergency services",
      price: "$100-500",
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop",
      rating: 4.8,
      bookings: 890
    },
    {
      name: "Electrical Work",
      description: "Certified electrical services including wiring, outlet installation, and electrical repairs",
      price: "$150-400",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop",
      rating: 4.9,
      bookings: 670
    },
    {
      name: "Landscaping",
      description: "Complete lawn care and landscaping services including mowing, trimming, and garden design",
      price: "$75-300",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
      rating: 4.7,
      bookings: 540
    },
    {
      name: "Handyman Services",
      description: "General home repairs and maintenance including furniture assembly, painting, and minor repairs",
      price: "$60-250",
      image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop",
      rating: 4.8,
      bookings: 920
    },
    {
      name: "HVAC Services",
      description: "Heating and cooling system maintenance, repair, and installation services",
      price: "$120-600",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      rating: 4.9,
      bookings: 450
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Verified Professionals",
      description: "All service providers undergo thorough background checks and insurance verification",
      color: "text-blue-500"
    },
    {
      icon: Star,
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee on all services with money-back promise",
      color: "text-yellow-500"
    },
    {
      icon: Zap,
      title: "Same-Day Service",
      description: "Emergency and same-day booking available for urgent service needs",
      color: "text-green-500"
    },
    {
      icon: Globe,
      title: "Nationwide Coverage",
      description: "Professional services available in 50+ cities across the country",
      color: "text-purple-500"
    }
  ];

  const stats = [
    { number: "50,000+", label: "Happy Customers", icon: Users },
    { number: "10,000+", label: "Services Completed", icon: Award },
    { number: "500+", label: "Verified Professionals", icon: Shield },
    { number: "4.8/5", label: "Average Rating", icon: Star }
  ];

  const breadcrumbs = [
    { name: "Home", url: "/" }
  ];

  const reviews = [
    {
      rating: 5,
      author: "Sarah Johnson",
      text: "Excellent service! The cleaning team was professional and thorough. Highly recommend ServiceMaster Pro.",
      date: "2024-03-15",
      service: "Home Cleaning",
      location: "New York, NY"
    },
    {
      rating: 5,
      author: "Mike Chen",
      text: "Quick response for emergency plumbing. The technician was knowledgeable and fixed the issue fast.",
      date: "2024-03-10",
      service: "Plumbing Services",
      location: "Los Angeles, CA"
    },
    {
      rating: 4,
      author: "Emily Rodriguez",
      text: "Great platform for finding reliable service providers. Easy booking process and quality results.",
      date: "2024-03-08",
      service: "Electrical Work",
      location: "Chicago, IL"
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
        
        {/* Hero Section with Enhanced Design */}
        <section className="relative py-20 sm:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <OptimizedImage
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop"
              alt="Professional home services background"
              className="w-full h-full object-cover"
              priority={true}
              placeholder="blur"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30"></div>
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-fade-in">
                <Badge variant="secondary" className="mb-4 bg-white/10 text-white border-white/20">
                  <Award className="w-4 h-4 mr-1" />
                  Rated #1 Service Platform
                </Badge>
                
                <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 text-white">
                  Your Home, Our Expertise
                  <br />
                  <span className="gradient-text bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Trusted Professional Services
                  </span>
                </h1>
                
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Connecting you with verified professionals for all your home service needs. 
                  Quality service, trusted providers, competitive pricing.
                </p>

                {/* Enhanced Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center border border-white/20">
                      <stat.icon className="w-5 h-5 text-white/80 mx-auto mb-1" />
                      <div className="text-lg font-bold text-white">{stat.number}</div>
                      <div className="text-xs text-white/70">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Enhanced Search Widget */}
                <div className="max-w-md mx-auto mb-8">
                  <SearchWidget onServiceSelect={handleSearchSelect} />
                </div>

                {/* Enhanced CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1"
                    onClick={() => setIsBookingModalOpen(true)}
                  >
                    Book Service Now
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-xl"
                  >
                    Browse Services
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements Animation */}
          <div className="absolute top-20 left-10 animate-float">
            <div className="w-3 h-3 bg-white/20 rounded-full"></div>
          </div>
          <div className="absolute top-40 right-16 animate-float" style={{ animationDelay: '1s' }}>
            <div className="w-2 h-2 bg-blue-400/30 rounded-full"></div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Why Choose ServiceMaster Pro?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Experience the difference with our premium service platform designed for modern homeowners.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="card-professional hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <div className={`inline-flex p-3 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 mb-4 mx-auto`}>
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Services Carousel */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Popular Services
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover our most requested professional services with verified providers.
              </p>
            </div>

            <Carousel className="w-full max-w-6xl mx-auto">
              <CarouselContent>
                {services.map((service, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
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
                        <CardTitle className="flex justify-between items-center">
                          {service.name}
                          <span className="text-lg font-bold text-primary">{service.price}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{service.description}</p>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-sm text-muted-foreground">{service.bookings} bookings</span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-1" />
                            <span className="text-sm font-medium">{service.rating}</span>
                          </div>
                        </div>
                        <Button 
                          className="w-full" 
                          onClick={() => handleBookService(service.name)}
                        >
                          Book Now
                        </Button>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        {/* Services Overview */}
        <ServiceGrid onBookService={handleBookService} />

        {/* Enhanced Booking Section */}
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

        {/* Enhanced Testimonials */}
        <TestimonialsSection />

        {/* Blog Section */}
        <BlogSection />

        {/* Contact Information Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Get in Touch
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Have questions? Our customer support team is here to help you 24/7.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="card-professional text-center">
                <CardHeader>
                  <Phone className="w-8 h-8 mx-auto mb-4 text-primary" />
                  <CardTitle>Call Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">(555) 123-4567</p>
                  <p className="text-muted-foreground">24/7 Support Available</p>
                </CardContent>
              </Card>

              <Card className="card-professional text-center">
                <CardHeader>
                  <Mail className="w-8 h-8 mx-auto mb-4 text-primary" />
                  <CardTitle>Email Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">support@servicemasterpro.com</p>
                  <p className="text-muted-foreground">Response within 2 hours</p>
                </CardContent>
              </Card>

              <Card className="card-professional text-center">
                <CardHeader>
                  <MapPin className="w-8 h-8 mx-auto mb-4 text-primary" />
                  <CardTitle>Visit Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">123 Service Street</p>
                  <p className="text-muted-foreground">Your City, State 12345</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-20 gradient-bg text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-20 h-20 bg-white rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Experience the Difference?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust ServiceMaster Pro for their service needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl shadow-xl"
                onClick={() => setIsBookingModalOpen(true)}
              >
                Start Booking Now
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-xl"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Theme Toggle - Fixed Position */}
        <div className="fixed bottom-4 left-4 z-40">
          <ThemeToggle />
        </div>

        {/* Performance Debug Info (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed top-4 left-4 z-50 text-xs bg-black/80 text-white p-2 rounded">
            <div>FCP: {metrics.fcp ? `${metrics.fcp.toFixed(0)}ms` : 'N/A'}</div>
            <div>LCP: {metrics.lcp ? `${metrics.lcp.toFixed(0)}ms` : 'N/A'}</div>
            <div>TTFB: {metrics.ttfb ? `${metrics.ttfb.toFixed(0)}ms` : 'N/A'}</div>
          </div>
        )}
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
