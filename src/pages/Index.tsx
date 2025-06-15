"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Shield, Zap, Users, Globe, Search, Calendar, Phone, Mail, Star, Play, ChevronDown, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import AISearchWidget from "@/components/AISearchWidget";
import MediaGallery from "@/components/MediaGallery";
import ServiceBooking from "@/components/ServiceBooking";
import LiveChatWidget from "@/components/LiveChatWidget";

const Index = () => {
  const [email, setEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const heroSlides = [
    {
      title: "Professional Services On Demand",
      subtitle: "Book trusted experts in seconds. Seamless scheduling, guaranteed quality.",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      cta: "Get Started Today"
    },
    {
      title: "AI-Powered Service Matching",
      subtitle: "Our intelligent system connects you with the perfect professional for your needs.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80",
      cta: "Discover AI Features"
    },
    {
      title: "24/7 Customer Support",
      subtitle: "Round-the-clock assistance ensuring your satisfaction every step of the way.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
      cta: "Contact Support"
    }
  ];

  const services = [
    {
      title: "Home Cleaning",
      description: "Professional cleaning services with eco-friendly products and certified staff",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "From $89",
      rating: 4.9,
      category: "Home Services"
    },
    {
      title: "Plumbing Services",
      description: "Fast, reliable plumbing repairs and installations by licensed professionals",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "From $120",
      rating: 4.8,
      category: "Repairs"
    },
    {
      title: "Electrical Work",
      description: "Safe electrical installations and repairs by certified electricians",
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "From $150",
      rating: 4.9,
      category: "Repairs"
    },
    {
      title: "Landscaping",
      description: "Transform your outdoor space with professional landscaping services",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "From $200",
      rating: 4.7,
      category: "Outdoor"
    },
    {
      title: "Interior Design",
      description: "Professional interior design consultation and implementation",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "From $300",
      rating: 4.9,
      category: "Design"
    },
    {
      title: "HVAC Services",
      description: "Heating, ventilation, and air conditioning installation and maintenance",
      image: "https://images.unsplash.com/photo-1621905252472-e8de8f82c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "From $180",
      rating: 4.8,
      category: "HVAC"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      content: "Absolutely fantastic service! The AI matching system found me the perfect cleaner within minutes. Professional, reliable, and exceeded expectations.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Michael Chen",
      role: "Business Owner",
      content: "The booking system is incredibly smooth. I've used this platform for multiple services and each time the quality has been outstanding.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Emily Rodriguez",
      role: "Property Manager",
      content: "Game-changer for our property management company. The real-time tracking and professional network has streamlined all our maintenance needs.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Verified Professionals",
      description: "All service providers are background-checked, licensed, and insured for your peace of mind"
    },
    {
      icon: Zap,
      title: "Instant Booking",
      description: "Book services in under 60 seconds with our streamlined AI-powered matching system"
    },
    {
      icon: Users,
      title: "24/7 Support",
      description: "Round-the-clock customer support and real-time service tracking"
    },
    {
      icon: Globe,
      title: "Nationwide Coverage",
      description: "Available in over 100 cities with expanding coverage nationwide"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking submitted:", { email });
    setShowBookingModal(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Enhanced Navigation */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ServicePro
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
              <a href="#services" className="hover:text-blue-400 transition-colors">Services</a>
              <a href="#testimonials" className="hover:text-blue-400 transition-colors">Reviews</a>
              <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              <Button 
                onClick={() => setShowBookingModal(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800">
              <nav className="flex flex-col space-y-4">
                <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
                <a href="#services" className="hover:text-blue-400 transition-colors">Services</a>
                <a href="#testimonials" className="hover:text-blue-400 transition-colors">Reviews</a>
                <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
                <Button 
                  onClick={() => setShowBookingModal(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 w-full"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Now
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Enhanced Hero Section with Carousel */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
          style={{ backgroundImage: `url('${heroSlides[currentSlide].image}')` }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            {heroSlides[currentSlide].subtitle}
          </p>
          
          {/* AI Search Widget Integration */}
          <div className="mb-8 max-w-2xl mx-auto">
            <AISearchWidget />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => setShowBookingModal(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8"
            >
              {heroSlides[currentSlide].cta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 border-white/30 text-white hover:bg-white/10">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Why Choose ServicePro?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of service booking with our AI-powered platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center">
                  <feature.icon className="h-12 w-12 mx-auto text-blue-400 mb-4" />
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Services Grid */}
      <section id="services" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Popular Services
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Browse our most requested professional services
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-gray-900 border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-sm">
                    {service.category}
                  </div>
                  <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center">
                    <Star className="w-3 h-3 mr-1 text-yellow-400" />
                    {service.rating}
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-white">{service.title}</CardTitle>
                    <span className="text-blue-400 font-semibold">{service.price}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 mb-4">
                    {service.description}
                  </CardDescription>
                  <Button 
                    onClick={() => setShowBookingModal(true)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Media Gallery Section */}
      <MediaGallery items={[]} />

      {/* Enhanced Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-300">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <CardTitle className="text-white text-lg">{testimonial.name}</CardTitle>
                      <CardDescription className="text-gray-400">{testimonial.role}</CardDescription>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Booking Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Book your first service today and experience the difference
            </p>
            
            <form onSubmit={handleBookingSubmit} className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <Input
                  type="text"
                  placeholder="Full Name"
                  className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                  required
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                  required
                />
                <select className="bg-gray-700/50 border border-gray-600 text-white rounded-md px-3 py-2">
                  <option value="">Select Service</option>
                  {services.map((service, index) => (
                    <option key={index} value={service.title}>{service.title}</option>
                  ))}
                </select>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg py-3"
              >
                Book Service Now
                <Calendar className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ServicePro
                </h3>
              </div>
              <p className="text-gray-400">
                The future of professional services, powered by AI and delivered with excellence.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Home Cleaning</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Plumbing</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Electrical</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">HVAC</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/auth" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Press</a></li>
                <li><Link to="/admin" className="hover:text-blue-400 transition-colors">Admin</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>1-800-SERVICE</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>hello@servicepro.com</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ServicePro. Built with cutting-edge technology and powered by AI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <ServiceBooking onClose={() => setShowBookingModal(false)} />
          </div>
        </div>
      )}

      {/* Live Chat Widget */}
      <LiveChatWidget />
    </div>
  );
};

export default Index;
