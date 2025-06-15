
import React from 'react';
import { Button } from '@/components/ui/button';
import { Music, Headphones, Mic } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900">
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <Music className="h-16 w-16 text-purple-400" />
            <Headphones className="h-20 w-20 text-blue-400" />
            <Mic className="h-16 w-16 text-purple-400" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          SOUNDMASTER
        </h1>
        
        <p className="text-xl md:text-2xl mb-4 text-gray-300">
          Professional Sound Services in Tzaneen & Limpopo
        </p>
        
        <p className="text-lg mb-8 text-gray-400 max-w-2xl mx-auto">
          From weddings to corporate events, parties to karaoke nights - we deliver premium audio experiences with cutting-edge technology and AI-powered music discovery.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/services">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg"
            >
              Explore Services
            </Button>
          </Link>
          <Link to="/auth">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 text-lg"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Background animation effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-purple-600/20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-blue-600/20 blur-3xl animate-pulse delay-1000"></div>
      </div>
    </section>
  );
};

export default Hero;
