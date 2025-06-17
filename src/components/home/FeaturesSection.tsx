
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Star, Zap, Globe } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: "Verified Professionals",
      description: "All service providers undergo thorough background checks and insurance verification",
      color: "text-blue-500"
    },
    {
      icon: Star,
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee on all services with money-back promise",
      color: "text-yellow-500"
    },
    {
      icon: Zap,
      title: "Same-Day Service",
      description: "Emergency and same-day booking available for urgent service needs",
      color: "text-green-500"
    },
    {
      icon: Globe,
      title: "Nationwide Coverage",
      description: "Professional services available across all 9 provinces in South Africa",
      color: "text-purple-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why Choose ServiceMaster Pro?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the difference with our premium service platform designed for South African homeowners.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="card-professional hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className={`inline-flex p-3 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 mb-4 mx-auto`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
