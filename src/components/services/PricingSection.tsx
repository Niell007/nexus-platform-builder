
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';

const PricingSection = () => {
  const packages = [
    {
      name: 'Basic Package',
      price: 'R1,200',
      duration: '3 hours',
      description: 'Perfect for small gatherings and intimate events',
      features: [
        'Basic sound system',
        '1 wireless microphone',
        'Music playlist setup',
        'Basic lighting',
        'Setup and breakdown'
      ],
      popular: false
    },
    {
      name: 'Premium Package',
      price: 'R2,500',
      duration: '6 hours',
      description: 'Our most popular choice for weddings and parties',
      features: [
        'Professional sound system',
        'DJ with MC services',
        '2 wireless microphones',
        'Dance floor lighting',
        'Music requests system',
        'Backup equipment',
        'Photo opportunities'
      ],
      popular: true
    },
    {
      name: 'Platinum Package',
      price: 'R4,000',
      duration: '8 hours',
      description: 'Complete entertainment solution for large events',
      features: [
        'Premium sound system',
        'Professional DJ & MC',
        '4 wireless microphones',
        'Full lighting design',
        'Karaoke system included',
        'Social media integration',
        'Dedicated event coordinator',
        'Custom playlist creation'
      ],
      popular: false
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Transparent Pricing
          </h2>
          <p className="text-xl text-gray-400">
            Choose the package that fits your event and budget
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <Card 
              key={index}
              className={`relative bg-gray-800 border-gray-700 ${
                pkg.popular ? 'border-purple-500 shadow-lg shadow-purple-500/20' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-white text-2xl">{pkg.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-purple-400">{pkg.price}</span>
                  <span className="text-gray-400 ml-2">/ {pkg.duration}</span>
                </div>
                <CardDescription className="text-gray-400 mt-2">
                  {pkg.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <Check className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    pkg.popular 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  Select {pkg.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            All packages include professional setup, breakdown, and technical support throughout your event.
          </p>
          <p className="text-sm text-gray-500">
            Prices may vary based on location, event duration, and specific requirements. Contact us for a detailed quote.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
