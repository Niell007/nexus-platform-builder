
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price_range: string;
  features: string[];
}

const FeaturedServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .limit(6);

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Services</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover our most popular professional services, trusted by businesses worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => (
            <Card key={service.id} className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-blue-400 text-sm font-medium">{service.category}</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-gray-400 text-sm ml-1">4.8</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{service.name}</h3>
                <p className="text-gray-400 mb-4 line-clamp-2">{service.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.features.slice(0, 2).map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-400 font-semibold">{service.price_range}</span>
                  <Button size="sm" variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/services">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
