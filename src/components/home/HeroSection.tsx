
"use client";

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import OptimizedImage from '@/components/Media/OptimizedImage';
import { ServiceSearch } from '@/components/services/ServiceSearch';
import { Award, Users, Shield, Star } from 'lucide-react';

interface HeroSectionProps {
  onSearchSelect: (serviceName: string) => void;
  onBookNow: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearchSelect,
  onBookNow
}) => {
  const stats = [
    { number: "50,000+", label: "Happy Customers", icon: Users },
    { number: "10,000+", label: "Services Completed", icon: Award },
    { number: "500+", label: "Verified Professionals", icon: Shield },
    { number: "4.8/5", label: "Average Rating", icon: Star }
  ];

  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <OptimizedImage
          src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop"
          alt="Professional home services background"
          className="w-full h-full object-cover"
          priority={true}
          placeholder="blur"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <Badge variant="secondary" className="mb-4 bg-white/10 text-white border-white/20">
              <Award className="w-4 h-4 mr-1" />
              Rated #1 Service Platform in SA
            </Badge>
            
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 text-white">
              Your Home, Our Expertise
              <br />
              <span className="gradient-text bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Trusted Professional Services
              </span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Connecting you with verified professionals for all your home service needs across South Africa. 
              Quality service, trusted providers, competitive pricing.
            </p>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center border border-white/20">
                  <stat.icon className="w-5 h-5 text-white/80 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">{stat.number}</div>
                  <div className="text-xs text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Search Widget */}
            <div className="max-w-md mx-auto mb-8">
              <ServiceSearch onServiceSelect={onSearchSelect} />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1"
                onClick={onBookNow}
              >
                Book Service Now
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-xl"
              >
                Browse Services
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements Animation */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-3 h-3 bg-white/20 rounded-full"></div>
      </div>
      <div className="absolute top-40 right-16 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-2 h-2 bg-blue-400/30 rounded-full"></div>
      </div>
    </section>
  );
};
