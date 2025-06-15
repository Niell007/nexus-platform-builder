
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Service {
  id: string;
  name: string;
  description?: string;
  category: string;
  price_range?: string;
  features?: string[];
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('name');

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: "Error",
        description: "Failed to load services",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const searchServices = async (query: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .rpc('search_services', { search_query: query });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error searching services:', error);
      toast({
        title: "Error",
        description: "Failed to search services",
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return {
    services,
    loading,
    fetchServices,
    searchServices
  };
};
