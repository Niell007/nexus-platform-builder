
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Music, Mic, Settings, Users, Calendar, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceCards = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    {
      id: 'wedding',
      icon: <Heart className="h-12 w-12 text-red-400" />,
      title: 'Wedding Services',
      description: 'Make your special day perfect with our premium wedding packages',
      features: [
        'Professional DJ with MC services',
        'Premium sound system setup',
        'Romantic lighting design',
        'First dance coordination',
        'Reception music planning',
        'Backup equipment included'
      ],
      price: 'From R2,500',
      duration: '6-8 hours',
      included: 'Sound system, DJ, lighting, setup/breakdown'
    },
    {
      id: 'party',
      icon: <Music className="h-12 w-12 text-purple-400" />,
      title: 'Party Entertainment',
      description: 'Turn up the energy with our complete party packages',
      features: [
        'High-energy DJ mixing',
        'Dance floor lighting effects',
        'Interactive music requests',
        'Crowd engagement activities',
        'Social media integration',
        'Photo booth setup'
      ],
      price: 'From R1,800',
      duration: '4-6 hours',
      included: 'DJ, sound system, lighting, requests system'
    },
    {
      id: 'karaoke',
      icon: <Mic className="h-12 w-12 text-blue-400" />,
      title: 'Karaoke Nights',
      description: 'Professional karaoke setup with extensive song libraries',
      features: [
        'Latest hit songs database',
        'Multiple wireless microphones',
        'Big screen lyric display',
        'Scoring system available',
        'Duet capabilities',
        'Custom song requests'
      ],
      price: 'From R1,200',
      duration: '3-5 hours',
      included: 'Karaoke system, microphones, screen, song library'
    },
    {
      id: 'corporate',
      icon: <Settings className="h-12 w-12 text-green-400" />,
      title: 'Corporate Events',
      description: 'Professional audio solutions for business functions',
      features: [
        'Conference sound systems',
        'Presentation support',
        'Wireless microphone setups',
        'Background music curation',
        'Technical support staff',
        'Multi-room coverage'
      ],
      price: 'From R2,000',
      duration: 'Full day packages',
      included: 'Sound system, microphones, technical support'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Choose Your Perfect Package
          </h2>
          <p className="text-xl text-gray-400">
            Interactive service cards - click to explore each package in detail
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Card 
              key={service.id}
              className={`bg-gray-900 border-gray-700 transition-all duration-300 cursor-pointer hover:scale-105 ${
                selectedService === service.id ? 'border-purple-500 shadow-lg shadow-purple-500/20' : 'hover:border-purple-400'
              }`}
              onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {service.icon}
                    <div>
                      <CardTitle className="text-white text-2xl">{service.title}</CardTitle>
                      <CardDescription className="text-gray-400 text-lg">
                        {service.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-400">{service.price}</p>
                    <p className="text-sm text-gray-400">{service.duration}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {selectedService === service.id && (
                    <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-purple-500/30">
                      <h4 className="text-white font-semibold mb-2 flex items-center">
                        <Headphones className="h-4 w-4 mr-2 text-purple-400" />
                        Package Includes:
                      </h4>
                      <p className="text-gray-300 text-sm mb-4">{service.included}</p>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link to="/auth" className="flex-1">
                          <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                            Book This Service
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                        >
                          Get Quote
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">Need a custom package? We create tailored solutions for unique events.</p>
          <Link to="/auth">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Contact Us for Custom Quote
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
