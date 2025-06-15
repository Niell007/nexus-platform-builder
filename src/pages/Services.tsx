
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Heart, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price_range: string;
  features: string[];
  image_url?: string;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  const categories = ['All', 'Consulting', 'Technology', 'Marketing', 'Finance', 'Design', 'Legal'];

  useEffect(() => {
    fetchServices();
    if (user) {
      fetchUserFavorites();
    }
  }, [user]);

  useEffect(() => {
    filterServices();
  }, [services, searchQuery, selectedCategory]);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('name');

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserFavorites = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_favorites')
        .select('service_id')
        .eq('user_id', user.id);

      if (error) throw error;
      setFavorites(data?.map(f => f.service_id) || []);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const toggleFavorite = async (serviceId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save favorites",
        variant: "destructive"
      });
      return;
    }

    const isFavorite = favorites.includes(serviceId);

    try {
      if (isFavorite) {
        await supabase
          .from('user_favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('service_id', serviceId);
        
        setFavorites(favorites.filter(id => id !== serviceId));
        toast({
          title: "Removed from favorites",
          description: "Service removed from your favorites"
        });
      } else {
        await supabase
          .from('user_favorites')
          .insert({ user_id: user.id, service_id: serviceId });
        
        setFavorites([...favorites, serviceId]);
        toast({
          title: "Added to favorites",
          description: "Service added to your favorites"
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: "Error",
        description: "Failed to update favorites",
        variant: "destructive"
      });
    }
  };

  const filterServices = () => {
    let filtered = services;

    if (searchQuery) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.features.some(feature => 
          feature.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    setFilteredServices(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Our Services
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Explore our comprehensive range of professional services designed to help your business succeed
            </p>
          </div>

          {/* Search and Filter */}
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search services, features, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category 
                      ? "bg-blue-600 hover:bg-blue-700" 
                      : "border-gray-600 text-gray-300 hover:bg-gray-700"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <Card key={service.id} className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary" className="bg-blue-600/20 text-blue-300">
                      {service.category}
                    </Badge>
                    {user && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleFavorite(service.id)}
                        className="p-1 hover:bg-gray-700"
                      >
                        <Heart 
                          className={`h-5 w-5 ${
                            favorites.includes(service.id) 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-gray-400'
                          }`} 
                        />
                      </Button>
                    )}
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {service.name}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                    {service.features.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{service.features.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-green-400 font-semibold text-lg">
                      {service.price_range}
                    </span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-gray-400 text-sm ml-1">4.8</span>
                    </div>
                  </div>

                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 group-hover:bg-blue-500 transition-colors">
                    Request Quote
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <Filter className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No services found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
