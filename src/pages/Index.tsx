
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import LiveChatWidget from '@/components/LiveChatWidget';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Phone, Clock, CheckCircle, ArrowRight, Search, Zap, Shield, Award } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEO/SEOHead';

const Index = () => {
  const { user } = useAuth();

  const services = [
    {
      id: 1,
      name: "Premium Home Cleaning",
      description: "Professional deep cleaning service for your home with eco-friendly products",
      category: "Cleaning",
      price: "$89-149",
      rating: 4.9,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
      features: ["Deep Clean", "Eco-Friendly", "Insured", "Same Day"]
    },
    {
      id: 2,
      name: "Expert Plumbing Repair",
      description: "Licensed plumbers available 24/7 for emergency repairs and installations",
      category: "Plumbing",
      price: "$95-250",
      rating: 4.8,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop",
      features: ["24/7 Service", "Licensed", "Emergency", "Warranty"]
    },
    {
      id: 3,
      name: "Professional Lawn Care",
      description: "Complete lawn maintenance including mowing, trimming, and landscaping",
      category: "Landscaping",
      price: "$65-120",
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
      features: ["Weekly Service", "Equipment Included", "Seasonal", "Organic Options"]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "Absolutely fantastic service! The team was professional, punctual, and exceeded my expectations.",
      service: "Home Cleaning",
      location: "Downtown"
    },
    {
      name: "Michael Chen",
      rating: 5,
      text: "Quick response time and fair pricing. Fixed my plumbing issue in under an hour!",
      service: "Plumbing Repair",
      location: "Westside"
    },
    {
      name: "Emma Rodriguez",
      rating: 5,
      text: "My lawn has never looked better. Highly recommend their landscaping services.",
      service: "Lawn Care",
      location: "Northside"
    }
  ];

  return (
    <>
      <SEOHead 
        title="ServiceMaster Pro - Premium Professional Services"
        description="Get instant access to trusted professionals for cleaning, plumbing, landscaping, and more. Book same-day service with verified, insured experts."
        keywords="professional services, home cleaning, plumbing, landscaping, handyman, local services"
        canonical="/"
      />
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                Premium Professional
                <span className="block text-yellow-400">Services</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-fade-in">
                Connect with verified, insured professionals for all your home and business needs. 
                Same-day service available.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
                {user ? (
                  <Link to="/dashboard">
                    <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 text-lg">
                      View Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                ) : (
                  <Link to="/auth">
                    <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 text-lg">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                )}
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Browse Services
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose ServiceMaster Pro?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We connect you with the best professionals in your area
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Verified & Insured</h3>
                <p className="text-muted-foreground">All professionals are background-checked, licensed, and fully insured</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Same-Day Service</h3>
                <p className="text-muted-foreground">Book today, get service today with our network of available professionals</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Satisfaction Guaranteed</h3>
                <p className="text-muted-foreground">100% satisfaction guarantee or we'll make it right</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Services</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Professional services for every need
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service) => (
                <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={service.image} 
                      alt={service.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-blue-600">{service.category}</Badge>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{service.name}</CardTitle>
                      <div className="text-lg font-bold text-green-600">{service.price}</div>
                    </div>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium">{service.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({service.reviews} reviews)</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Book Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                View All Services
                <Search className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
              <p className="text-xl text-muted-foreground">
                Join thousands of satisfied customers
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                    <div className="border-t pt-4">
                      <p className="font-semibold">{testimonial.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{testimonial.service}</span>
                        <span>•</span>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Book a professional service today and experience the difference
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link to="/dashboard">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
                    Book Service Now
                  </Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
                    Create Account
                  </Button>
                </Link>
              )}
              <div className="flex items-center gap-2 text-blue-100">
                <Phone className="h-4 w-4" />
                <span>Or call: (555) 123-4567</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">ServiceMaster Pro</h3>
                <p className="text-gray-400 mb-4">
                  Your trusted partner for professional services. Quality, reliability, and satisfaction guaranteed.
                </p>
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>Available 24/7</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Popular Services</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Home Cleaning</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Plumbing</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Landscaping</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Electrical</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                <div className="space-y-2 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>123 Service St, Your City</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 ServiceMaster Pro. All rights reserved.</p>
            </div>
          </div>
        </footer>

        <LiveChatWidget />
      </div>
    </>
  );
};

export default Index;
