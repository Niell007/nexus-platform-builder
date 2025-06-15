
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Booking {
  id: string;
  user_id: string;
  service_id?: string;
  title: string;
  description?: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  requested_date?: string;
  created_at: string;
  updated_at: string;
  // Extended fields for display
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  service_address?: string;
  preferred_time?: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  address: string;
  description: string;
}

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('service_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({
        title: "Error",
        description: "Failed to load bookings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async (formData: BookingFormData) => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const bookingData = {
        user_id: user.id,
        title: `${formData.service} - ${formData.name}`,
        description: `
Service: ${formData.service}
Customer: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address}
Preferred Date: ${formData.date}
Preferred Time: ${formData.time}
Additional Details: ${formData.description || 'None'}
        `.trim(),
        status: 'pending' as const,
        priority: 'medium' as const,
        requested_date: formData.date
      };

      const { data, error } = await supabase
        .from('service_requests')
        .insert([bookingData])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your booking request has been submitted successfully.",
      });

      await fetchBookings();
      return { success: true, data };
    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: "Error",
        description: "Failed to submit booking request",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: Booking['status']) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('service_requests')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', bookingId);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Booking status updated successfully.",
      });

      await fetchBookings();
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast({
        title: "Error",
        description: "Failed to update booking status",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return {
    bookings,
    loading,
    createBooking,
    updateBookingStatus,
    fetchBookings
  };
};
