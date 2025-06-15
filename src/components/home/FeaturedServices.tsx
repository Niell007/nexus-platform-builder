
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, Mic, Heart, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedServices = () => {
  const services = [
    {
      icon: <Heart className="h-8 w-8 text-red-400" />,
      title: 'Wedding Services',
      description: 'Make your special day unforgettable with premium sound and lighting',
      features: ['Professional DJ services', 'High-quality sound systems', 'Ambient lighting']
    },
    {
      icon: <Music className="h-8 w-8 text-purple-400" />,
      title: 'Party Entertainment',
      description: 'Turn up the energy with our complete party packages',
      features: ['DJ mixing', 'Dance floor lighting', 'Music requests']
    },
    {
      icon: <Mic className="h-8 w-8 text-blue-400" />,
      title: 'Karaoke Nights',
      description: 'Professional karaoke setup with extensive song libraries',
      features: ['Latest hit songs', 'Multiple microphones', 'Big screen displays']
    },
    {
      icon: <Settings className="h-8 w-8 text-green-400" />,
      title: 'Custom Solutions',
      description: 'Tailored audio solutions for corporate events and special occasions',
      features: ['Event planning', 'Custom playlists', 'Technical support']
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Our Services
          </h2>
          <p className="text-xl text-gray-400">
            Professional sound solutions for every occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-colors">
              <CardHeader>
                <div className="mb-4">{service.icon}</div>
                <CardTitle className="text-white">{service.title}</CardTitle>
                <CardDescription className="text-gray-400">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-gray-300 text-sm flex items-center">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/services" 
            className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
