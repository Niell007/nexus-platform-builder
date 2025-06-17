
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, User, Mail, Phone, MapPin, Wrench } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EnhancedBookingFormProps {
  preselectedService?: string;
}

export const EnhancedBookingForm: React.FC<EnhancedBookingFormProps> = ({ 
  preselectedService 
}) => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    service: preselectedService || '',
    name: '',
    email: '',
    phone: '',
    address: '',
    date: '',
    time: '',
    description: ''
  });

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Booking Request Submitted",
        description: "We'll contact you within 24 hours to confirm your service booking.",
      });
      
      // Reset form
      setFormData({
        service: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        date: '',
        time: '',
        description: ''
      });
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error submitting your booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  const services = [
    'Home Cleaning',
    'Plumbing Services',
    'Electrical Work',
    'Landscaping',
    'Handyman Services',
    'HVAC Services',
    'Interior Design',
    'Pest Control'
  ];

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
    '4:00 PM', '5:00 PM', '6:00 PM'
  ];

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wrench className="h-6 w-6 text-primary" />
          Book Your Service
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              Service Type
            </label>
            <Select value={formData.service} onValueChange={handleSelectChange('service')}>
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map(service => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Number
            </label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Service Address */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Service Address
            </label>
            <Input
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter your full address"
              required
            />
          </div>

          {/* Scheduling */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Preferred Date
              </label>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                min={tomorrow.toISOString().split('T')[0]}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Preferred Time
              </label>
              <Select value={formData.time} onValueChange={handleSelectChange('time')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map(time => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Additional Details (Optional)
            </label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Please describe your specific needs, any special requirements, or additional information..."
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" size="lg">
            Submit Booking Request
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
