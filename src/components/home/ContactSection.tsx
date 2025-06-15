
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactSection = () => {
  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to get started? Contact us today to discuss your project requirements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Card className="bg-gray-700 border-gray-600">
              <CardHeader>
                <CardTitle className="text-white">Send us a message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    placeholder="Your Name" 
                    className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                  />
                  <Input 
                    placeholder="Your Email" 
                    type="email"
                    className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                  />
                </div>
                <Input 
                  placeholder="Subject" 
                  className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                />
                <Textarea 
                  placeholder="Your Message" 
                  rows={5}
                  className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                />
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 rounded-lg p-3">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Email Us</h3>
                <p className="text-gray-400">contact@professionalservices.com</p>
                <p className="text-gray-400">support@professionalservices.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-green-600 rounded-lg p-3">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Call Us</h3>
                <p className="text-gray-400">+1 (555) 123-4567</p>
                <p className="text-gray-400">+1 (555) 987-6543</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-purple-600 rounded-lg p-3">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Visit Us</h3>
                <p className="text-gray-400">123 Business Avenue</p>
                <p className="text-gray-400">Professional District, PD 12345</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-orange-600 rounded-lg p-3">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Business Hours</h3>
                <p className="text-gray-400">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-400">Saturday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
