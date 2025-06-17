
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Service {
  id: string;
  name: string;
  description?: string;
  category: string;
  price_range?: string;
  image_url?: string;
  features?: string[];
}

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fallback data for when Supabase is not available or empty
  const fallbackServices: Service[] = [
    {
      id: '1',
      name: 'Home Cleaning',
      description: 'Professional residential cleaning services including deep cleaning, regular maintenance, and move-in/move-out cleaning',
      category: 'Cleaning',
      price_range: 'R1,480-R3,700',
      image_url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
      features: ['Eco-friendly products', 'Insured professionals', 'Same-day availability']
    },
    {
      id: '2',
      name: 'Plumbing Services',
      description: 'Licensed plumbing repair and installation including leak repairs, pipe installation, and emergency services',
      category: 'Maintenance',
      price_range: 'R1,850-R9,250',
      image_url: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop',
      features: ['24/7 emergency service', 'Licensed professionals', 'Parts warranty']
    },
    {
      id: '3',
      name: 'Electrical Work',
      description: 'Certified electrical services including wiring, outlet installation, and electrical repairs',
      category: 'Maintenance',
      price_range: 'R2,775-R7,400',
      image_url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
      features: ['Safety certified', 'Code compliant', 'Emergency service']
    },
    {
      id: '4',
      name: 'Landscaping',
      description: 'Complete lawn care and landscaping services including mowing, trimming, and garden design',
      category: 'Outdoor',
      price_range: 'R1,390-R5,550',
      image_url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
      features: ['Seasonal maintenance', 'Design consultation', 'Plant warranty']
    },
    {
      id: '5',
      name: 'Handyman Services',
      description: 'General home repairs and maintenance including furniture assembly, painting, and minor repairs',
      category: 'Maintenance',
      price_range: 'R1,110-R4,625',
      image_url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop',
      features: ['Multi-skill professionals', 'Own tools', 'Quick turnaround']
    },
    {
      id: '6',
      name: 'HVAC Services',
      description: 'Heating and cooling system maintenance, repair, and installation services',
      category: 'Maintenance',
      price_range: 'R2,220-R11,100',
      image_url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
      features: ['Energy efficiency', 'Maintenance plans', 'Emergency repair']
    }
  ];

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
        .from('services')
        .select('*')
        .order('name');

      if (supabaseError) {
        console.warn('Supabase error, using fallback data:', supabaseError);
        setServices(fallbackServices);
      } else if (data && data.length > 0) {
        setServices(data);
      } else {
        // Use fallback data if no services in database
        setServices(fallbackServices);
      }
    } catch (err) {
      console.warn('Error fetching services, using fallback data:', err);
      setServices(fallbackServices);
      setError('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  }, []);

  const searchServices = useCallback(async (query: string) => {
    if (!query.trim()) return [];

    try {
      const { data, error: supabaseError } = await supabase
        .from('services')
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
        .limit(10);

      if (supabaseError || !data) {
        // Fallback search on local data
        return fallbackServices.filter(service =>
          service.name.toLowerCase().includes(query.toLowerCase()) ||
          service.description?.toLowerCase().includes(query.toLowerCase()) ||
          service.category.toLowerCase().includes(query.toLowerCase())
        );
      }

      return data;
    } catch (err) {
      console.warn('Search error, using fallback:', err);
      return fallbackServices.filter(service =>
        service.name.toLowerCase().includes(query.toLowerCase()) ||
        service.description?.toLowerCase().includes(query.toLowerCase()) ||
        service.category.toLowerCase().includes(query.toLowerCase())
      );
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return {
    services,
    loading,
    error,
    refetch: fetchServices,
    searchServices
  };
};
