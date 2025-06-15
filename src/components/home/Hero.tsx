
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Professional Services
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Discover expert solutions tailored to your business needs with our AI-powered service discovery platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/services">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Explore Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                Get Started
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-600/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered Search</h3>
              <p className="text-gray-400">Find the perfect service using our intelligent search engine</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Platform</h3>
              <p className="text-gray-400">Your data and requests are protected with enterprise-grade security</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Providers</h3>
              <p className="text-gray-400">Connect with verified professionals and industry experts</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
