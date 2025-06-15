
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, User, Mail, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useServices } from '@/hooks/useServices';

const QuickBookingForm = () => {
  const { toast } = useToast();
  const { createServiceRequest } = useServices();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    urgency: '',
    message: '',
    preferredDate: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createServiceRequest({
        title: `Quick Booking: ${formData.service}`,
        description: `Contact: ${formData.name} (${formData.email}, ${formData.phone})\nPreferred Date: ${formData.preferredDate}\nMessage: ${formData.message}`,
        priority: formData.urgency,
        requested_date: formData.preferredDate
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        urgency: '',
        message: '',
        preferredDate: ''
      });

      toast({
        title: "Booking Request Submitted",
        description: "We'll contact you within 24 hours to confirm your appointment."
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
          <Calendar className="h-6 w-6 text-blue-400" />
          Quick Booking & Inquiry
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="Your full name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email *
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone
              </label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="(555) 123-4567"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Service Needed</label>
              <Select value={formData.service} onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="business-consulting">Business Consulting</SelectItem>
                  <SelectItem value="web-development">Web Development</SelectItem>
                  <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                  <SelectItem value="financial-planning">Financial Planning</SelectItem>
                  <SelectItem value="design-services">Design Services</SelectItem>
                  <SelectItem value="legal-advisory">Legal Advisory</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Preferred Date
              </label>
              <Input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData(prev => ({ ...prev, preferredDate: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Urgency
              </label>
              <Select value={formData.urgency} onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select urgency" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="low">Low - Within 2 weeks</SelectItem>
                  <SelectItem value="medium">Medium - Within 1 week</SelectItem>
                  <SelectItem value="high">High - Within 3 days</SelectItem>
                  <SelectItem value="urgent">Urgent - ASAP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Additional Details</label>
            <Textarea
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              className="bg-gray-700 border-gray-600 text-white min-h-[100px]"
              placeholder="Tell us more about your project requirements, timeline, budget, or any specific needs..."
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuickBookingForm;
