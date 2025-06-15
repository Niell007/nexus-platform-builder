
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, User } from 'lucide-react';

const ContactSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-400">
            Ready to make your event unforgettable? Let's discuss your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin className="h-6 w-6 text-purple-400" />
                Service Areas
              </CardTitle>
              <CardDescription className="text-gray-400">
                We proudly serve the Limpopo region
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gray-800 rounded-lg">
                <h4 className="text-white font-semibold">Tzaneen & Surrounding Areas</h4>
                <p className="text-gray-400 text-sm">Our home base with full service coverage</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <h4 className="text-white font-semibold">Greater Limpopo Province</h4>
                <p className="text-gray-400 text-sm">Extended coverage for special events</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="h-6 w-6 text-blue-400" />
                Quick Contact
              </CardTitle>
              <CardDescription className="text-gray-400">
                Send us a message and we'll get back to you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input 
                placeholder="Your Name" 
                className="bg-gray-800 border-gray-600 text-white"
              />
              <Input 
                placeholder="Your Email" 
                type="email"
                className="bg-gray-800 border-gray-600 text-white"
              />
              <Input 
                placeholder="Event Type & Date" 
                className="bg-gray-800 border-gray-600 text-white"
              />
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Send Message
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
