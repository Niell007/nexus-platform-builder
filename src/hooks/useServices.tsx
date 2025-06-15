import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price_range: string;
  features: string[];
  image_url?: string;
  created_at: string;
  updated_at: string;
}

interface SearchResult {
  id: string;
  name: string;
  description: string;
  category: string;
  price_range: string;
  features: string[];
  relevance_score: number;
}

export interface ServiceRequest {
  id: string;
  user_id: string;
  service_id?: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  requested_date?: string;
  created_at: string;
  updated_at: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  file_path: string;
  file_type?: string;
  file_size?: number;
  uploaded_by?: string;
  metadata?: any;
  created_at: string;
}

export const useServices = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const searchServices = async (query: string): Promise<Service[]> => {
    try {
      if (!query.trim()) {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('name');
        
        if (error) throw error;
        return data || [];
      }

      const { data, error } = await supabase.rpc('search_services', {
        search_query: query
      }) as { data: SearchResult[] | null, error: any };

      if (error) throw error;
      
      // Convert search results to Service format by adding missing fields
      const services: Service[] = (data || []).map(result => ({
        ...result,
        image_url: undefined,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));
      
      return services;
    } catch (error) {
      console.error('Search services error:', error);
      toast({
        title: "Search Error",
        description: "Failed to search services",
        variant: "destructive"
      });
      return [];
    }
  };

  const getAllServices = async (): Promise<Service[]> => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('name');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Get services error:', error);
      toast({
        title: "Error",
        description: "Failed to load services",
        variant: "destructive"
      });
      return [];
    }
  };

  const addToFavorites = async (serviceId: string): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save favorites",
        variant: "destructive"
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('user_favorites')
        .insert({ user_id: user.id, service_id: serviceId });

      if (error) throw error;
      
      toast({
        title: "Added to favorites",
        description: "Service added to your favorites"
      });
      return true;
    } catch (error) {
      console.error('Add to favorites error:', error);
      toast({
        title: "Error",
        description: "Failed to add to favorites",
        variant: "destructive"
      });
      return false;
    }
  };

  const removeFromFavorites = async (serviceId: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('service_id', serviceId);

      if (error) throw error;
      
      toast({
        title: "Removed from favorites",
        description: "Service removed from your favorites"
      });
      return true;
    } catch (error) {
      console.error('Remove from favorites error:', error);
      return false;
    }
  };

  const createServiceRequest = async (request: {
    service_id?: string;
    title: string;
    description: string;
    priority: string;
    requested_date?: string;
  }): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create requests",
        variant: "destructive"
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('service_requests')
        .insert({
          user_id: user.id,
          ...request
        });

      if (error) throw error;
      
      toast({
        title: "Request Created",
        description: "Your service request has been submitted"
      });
      return true;
    } catch (error) {
      console.error('Create request error:', error);
      toast({
        title: "Error",
        description: "Failed to create request",
        variant: "destructive"
      });
      return false;
    }
  };

  const uploadFile = async (file: File, metadata?: any): Promise<UploadedFile | null> => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to upload files",
        variant: "destructive"
      });
      return null;
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: fileRecord, error: recordError } = await supabase
        .from('files')
        .insert({
          name: file.name,
          file_path: fileName,
          file_type: file.type,
          file_size: file.size,
          uploaded_by: user.id,
          metadata: metadata || {}
        })
        .select()
        .single();

      if (recordError) throw recordError;

      toast({
        title: "File Uploaded",
        description: "File uploaded successfully"
      });

      return fileRecord;
    } catch (error) {
      console.error('Upload file error:', error);
      toast({
        title: "Upload Error",
        description: "Failed to upload file",
        variant: "destructive"
      });
      return null;
    }
  };

  return {
    searchServices,
    getAllServices,
    addToFavorites,
    removeFromFavorites,
    createServiceRequest,
    uploadFile
  };
};
