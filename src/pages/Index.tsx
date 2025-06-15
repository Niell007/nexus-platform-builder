
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Shield, Clock, Users, ArrowRight, CheckCircle, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { BookingModal } from '@/components/BookingModal';
import { SearchWidget } from '@/components/SearchWidget';
import LazyImage from '@/components/Performance/LazyImage';

const Index = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');

  const handleSearchSelect = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsBookingModalOpen(true);
  };

  const handleQuickBook = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsBookingModalOpen(true);
  };

  const features = [
    {
      icon: Shield,
      title: "Verified Professionals",
      description: "All service providers are background-checked and insured for your peace of mind"
    },
    {
      icon: Clock,
      title: "Same-Day Service",
      description: "Get help when you need it with our rapid response team available 24/7"
    },
    {
      icon: Star,
      title: "Quality Guaranteed",
      description: "100% satisfaction guarantee on all services with 5-star average rating"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Round-the-clock customer support and dedicated account management"
    }
  ];

  const popularServices = [
    {
      name: "Home Cleaning",
      description: "Professional deep cleaning for your home with eco-friendly products",
      price: "$89-149",
      rating: "4.9",
      bookings: "2,500+",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop&auto=format&q=80"
    },
    {
      name: "Plumbing Repair",
      description: "Emergency plumbing services available 24/7 by licensed professionals",
      price: "$95-250",
      rating: "4.8",
      bookings: "1,800+",
      image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop&auto=format&q=80"
    },
    {
      name: "Electrical Work",
      description: "Licensed electricians for all your electrical needs and safety inspections",
      price: "$85-200",
      rating: "4.9",
      bookings: "1,200+",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop&auto=format&q=80"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      content: "Exceptional service! The cleaning team was professional, thorough, and my house has never looked better.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&auto=format&q=80"
    },
    {
      name: "Mike Chen",
      role: "Business Owner",
      content: "Quick response time and fair pricing. Our plumbing emergency was resolved within hours.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format&q=80"
    },
    {
      name: "Emily Rodriguez",
      role: "Property Manager",
      content: "ServiceMaster Pro has been our go-to for all maintenance needs. Reliable and professional every time.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format&q=80"
    }
  ];

  return (
    <>
      <Helmet>
        <title>ServiceMaster Pro - Professional Home & Business Services | Trusted Local Experts</title>
        <meta name="description" content="Connect with verified professionals for cleaning, plumbing, electrical work, and more. Quality guaranteed, same-day service available. 4.9★ rated with 10,000+ satisfied customers." />
        <meta name="keywords" content="home services, professional services, cleaning, plumbing, electrical, handyman, same day service, verified professionals, home maintenance, business services" />
        <meta property="og:title" content="ServiceMaster Pro - Professional Home & Business Services" />
        <meta property="og:description" content="Connect with verified professionals for cleaning, plumbing, electrical work, and more. Quality guaranteed, same-day service available." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=630&fit=crop&auto=format&q=80" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="/" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        {/* Enhanced Hero Section */}
        <section className="relative py-20 sm:py-32 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 gradient-bg-subtle opacity-50"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center max-w-5xl mx-auto">
              <div className="animate-fade-in">
                <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
                  🏆 #1 Rated Service Platform - 10,000+ Happy Customers
                </Badge>
              </div>
              
              <h1 className="animate-fade-in animate-delay-100 text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                Professional Services
                <br />
                <span className="gradient-text">When You Need Them</span>
              </h1>
              
              <p className="animate-fade-in animate-delay-200 text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Connect with verified professionals for cleaning, repairs, and maintenance. 
                Quality guaranteed, same-day service available nationwide.
              </p>

              <div className="animate-fade-in animate-delay-300 flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <div className="w-full max-w-md">
                  <SearchWidget onServiceSelect={handleSearchSelect} />
                </div>
                <div className="flex gap-3">
                  <Button size="lg" className="hover-glow px-8 py-4 text-lg" asChild>
                    <Link to="/services">
                      Browse Services
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="px-8 py-4 text-lg hover-lift"
                    onClick={() => setIsBookingModalOpen(true)}
                  >
                    Book Now
                  </Button>
                </div>
              </div>

              <div className="animate-fade-in animate-delay-400 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Instant Booking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Verified Professionals</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Satisfaction Guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Why Choose ServiceMaster Pro?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We connect you with the best professionals in your area with unmatched quality and reliability
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className={`card-professional text-center animate-fade-in animate-delay-${index * 100 + 100}`}>
                  <CardHeader>
                    <div className="mx-auto mb-4 w-16 h-16 gradient-bg rounded-full flex items-center justify-center">
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Popular Services Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Most Popular Services
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Top-rated services trusted by thousands of customers nationwide
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {popularServices.map((service, index) => (
                <Card key={index} className={`card-professional overflow-hidden animate-fade-in animate-delay-${index * 100 + 200}`}>
                  <div className="aspect-video overflow-hidden">
                    <LazyImage
                      src={service.image}
                      alt={`${service.name} service`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl">{service.name}</CardTitle>
                      <Badge variant="secondary" className="text-lg font-semibold">{service.price}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{service.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{service.bookings} bookings</span>
                      </div>
                    </div>
                    <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full hover-glow"
                      onClick={() => handleQuickBook(service.name)}
                    >
                      Book {service.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button size="lg" variant="outline" className="hover-lift px-8 py-4" asChild>
                <Link to="/services">
                  View All Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* New Testimonials Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                What Our Customers Say
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust ServiceMaster Pro
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className={`card-professional animate-fade-in animate-delay-${index * 100 + 300}`}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-base leading-relaxed mb-4">
                      "{testimonial.content}"
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <LazyImage
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-20 gradient-bg text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust ServiceMaster Pro for their service needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg" 
                variant="secondary"
                className="px-8 py-4 text-lg hover-lift"
                onClick={() => setIsBookingModalOpen(true)}
              >
                Book a Service Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-4 text-lg border-white/30 text-white hover:bg-white/10 hover-lift" 
                asChild
              >
                <Link to="/auth">Join as Professional</Link>
              </Button>
            </div>
            
            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-8 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>hello@servicemasterpro.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Serving 50+ Cities Nationwide</span>
              </div>
            </div>
          </div>
        </section>

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

export default Index;
