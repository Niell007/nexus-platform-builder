
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Search, Filter, MapPin, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import LiveChatWidget from '@/components/LiveChatWidget';
import SEOHead from '@/components/SEO/SEOHead';

const Services = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [filteredServices, setFilteredServices] = useState([]);

  const services = [
    {
      id: 1,
      name: "Premium Home Cleaning",
      description: "Professional deep cleaning service for your home with eco-friendly products and experienced staff",
      category: "Cleaning",
      price: "$89-149",
      rating: 4.9,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
      features: ["Deep Clean", "Eco-Friendly", "Insured", "Same Day"],
      duration: "2-4 hours",
      availability: "Available Today"
    },
    {
      id: 2,
      name: "Expert Plumbing Repair",
      description: "Licensed plumbers available 24/7 for emergency repairs, installations, and maintenance",
      category: "Plumbing",
      price: "$95-250",
      rating: 4.8,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop",
      features: ["24/7 Service", "Licensed", "Emergency", "Warranty"],
      duration: "1-3 hours",
      availability: "24/7 Available"
    },
    {
      id: 3,
      name: "Professional Lawn Care",
      description: "Complete lawn maintenance including mowing, trimming, landscaping, and seasonal care",
      category: "Landscaping",
      price: "$65-120",
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
      features: ["Weekly Service", "Equipment Included", "Seasonal", "Organic Options"],
      duration: "1-2 hours",
      availability: "Next Available: Tomorrow"
    },
    {
      id: 4,
      name: "Electrical Services",
      description: "Licensed electricians for installations, repairs, and upgrades with safety guaranteed",
      category: "Electrical",
      price: "$120-300",
      rating: 4.9,
      reviews: 73,
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop",
      features: ["Licensed", "Safety Certified", "Warranty", "Emergency"],
      duration: "1-4 hours",
      availability: "Available Today"
    },
    {
      id: 5,
      name: "Handyman Services",
      description: "General repairs, assembly, mounting, and small home improvement projects",
      category: "Handyman",
      price: "$75-180",
      rating: 4.6,
      reviews: 214,
      image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop",
      features: ["Multi-Skilled", "Tools Included", "Same Day", "Affordable"],
      duration: "1-3 hours",
      availability: "Available Today"
    },
    {
      id: 6,
      name: "HVAC Maintenance",
      description: "Heating, ventilation, and air conditioning installation, repair, and maintenance",
      category: "HVAC",
      price: "$150-400",
      rating: 4.8,
      reviews: 92,
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop",
      features: ["Certified Technicians", "Energy Efficient", "Warranty", "Emergency"],
      duration: "2-6 hours",
      availability: "Next Available: Today"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Services' },
    { value: 'Cleaning', label: 'Cleaning' },
    { value: 'Plumbing', label: 'Plumbing' },
    { value: 'Landscaping', label: 'Landscaping' },
    { value: 'Electrical', label: 'Electrical' },
    { value: 'Handyman', label: 'Handyman' },
    { value: 'HVAC', label: 'HVAC' }
  ];

  useEffect(() => {
    let filtered = services;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    // Sort services
    if (sortBy === 'popular') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price-low') {
      filtered.sort((a, b) => parseInt(a.price.split('-')[0].replace('$', '')) - parseInt(b.price.split('-')[0].replace('$', '')));
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => parseInt(b.price.split('-')[0].replace('$', '')) - parseInt(a.price.split('-')[0].replace('$', '')));
    }

    setFilteredServices(filtered);
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <>
      <SEOHead 
        title="Professional Services Directory - ServiceMaster Pro"
        description="Browse our comprehensive directory of professional services including cleaning, plumbing, landscaping, electrical, and more. Book verified professionals today."
        keywords="professional services, home services, cleaning services, plumbing, landscaping, electrical, handyman"
        canonical="/services"
      />
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        {/* Header */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Professional Services</h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Find and book trusted professionals for all your home and business needs
              </p>
            </div>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex gap-4 items-center">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">
                {filteredServices.length} Services Found
              </h2>
              <p className="text-muted-foreground">
                Professional, verified, and ready to serve you
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={service.image} 
                      alt={service.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-blue-600">
                      {service.category}
                    </Badge>
                    <div className="absolute top-4 right-4 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {service.availability}
                    </div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                        {service.name}
                      </CardTitle>
                      <div className="text-lg font-bold text-green-600">
                        {service.price}
                      </div>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {service.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Rating and Reviews */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 font-medium">{service.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({service.reviews} reviews)
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {service.duration}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    {/* Book Button */}
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600">
                      Book Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground text-lg mb-4">
                  No services found matching your criteria
                </div>
                <Button variant="outline" onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        <LiveChatWidget />
      </div>
    </>
  );
};

export default Services;
