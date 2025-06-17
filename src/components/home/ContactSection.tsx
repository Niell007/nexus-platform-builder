
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions? Our customer support team is here to help you 24/7.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="card-professional text-center">
            <CardHeader>
              <Phone className="w-8 h-8 mx-auto mb-4 text-primary" />
              <CardTitle>Call Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">011 123 4567</p>
              <p className="text-muted-foreground">24/7 Support Available</p>
            </CardContent>
          </Card>

          <Card className="card-professional text-center">
            <CardHeader>
              <Mail className="w-8 h-8 mx-auto mb-4 text-primary" />
              <CardTitle>Email Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">support@servicemasterpro.co.za</p>
              <p className="text-muted-foreground">Response within 2 hours</p>
            </CardContent>
          </Card>

          <Card className="card-professional text-center">
            <CardHeader>
              <MapPin className="w-8 h-8 mx-auto mb-4 text-primary" />
              <CardTitle>Visit Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">123 Service Street</p>
              <p className="text-muted-foreground">Sandton, Johannesburg 2196</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
