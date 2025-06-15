
"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';
import LazyImage from '@/components/Performance/LazyImage';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  service: string;
  rating: number;
  review: string;
  image: string;
  verified: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Jennifer Martinez',
    location: 'Austin, TX',
    service: 'House Cleaning',
    rating: 5,
    review: 'Absolutely exceptional service! The cleaning team was professional, thorough, and went above and beyond. My home has never looked better. I\'ll definitely be booking again.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&auto=format&q=80',
    verified: true
  },
  {
    id: '2',
    name: 'Robert Thompson',
    location: 'Denver, CO',
    service: 'Plumbing',
    rating: 5,
    review: 'Called for an emergency plumbing issue and they responded within 2 hours. The plumber was knowledgeable, fixed the problem quickly, and explained everything clearly. Outstanding service!',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format&q=80',
    verified: true
  },
  {
    id: '3',
    name: 'Lisa Chen',
    location: 'Seattle, WA',
    service: 'Landscaping',
    rating: 5,
    review: 'The landscaping team transformed our backyard into a beautiful oasis. Their attention to detail and creative design exceeded our expectations. Highly recommend!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format&q=80',
    verified: true
  },
  {
    id: '4',
    name: 'Mark Wilson',
    location: 'Phoenix, AZ',
    service: 'Electrical Work',
    rating: 5,
    review: 'Professional electrician arrived on time, diagnosed the issue quickly, and completed the work efficiently. Fair pricing and excellent communication throughout the process.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format&q=80',
    verified: true
  },
  {
    id: '5',
    name: 'Amanda Foster',
    location: 'Miami, FL',
    service: 'HVAC Service',
    rating: 5,
    review: 'Our AC broke down in the middle of summer. ServiceMaster Pro got a technician out the same day who fixed it perfectly. Saved us from a miserable weekend!',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&auto=format&q=80',
    verified: true
  },
  {
    id: '6',
    name: 'David Lee',
    location: 'Portland, OR',
    service: 'Painting',
    rating: 5,
    review: 'The painting crew was meticulous and professional. They protected all our furniture, completed the job on schedule, and the quality is fantastic. Worth every penny!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format&q=80',
    verified: true
  }
];

export const TestimonialsSection: React.FC = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            Customer Reviews
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust ServiceMaster Pro for their professional service needs.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              className={`relative overflow-hidden hover-lift animate-fade-in animate-delay-${index * 100 + 100}`}
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-primary/20">
                  <Quote className="h-8 w-8" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                  {testimonial.verified && (
                    <Badge variant="outline" className="ml-2 text-xs bg-green-50 text-green-700 border-green-200">
                      Verified
                    </Badge>
                  )}
                </div>

                {/* Review Text */}
                <blockquote className="text-muted-foreground leading-relaxed mb-6">
                  "{testimonial.review}"
                </blockquote>

                {/* Customer Info */}
                <div className="flex items-center gap-3">
                  <LazyImage
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                  />
                  <div>
                    <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {testimonial.service}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">4.9★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">10K+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">99%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
