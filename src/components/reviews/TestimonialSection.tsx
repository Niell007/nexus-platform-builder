
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  avatar?: string;
  rating: number;
  content: string;
  service: string;
  date: string;
}

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      company: 'TechStart Inc.',
      role: 'CEO',
      rating: 5,
      content: 'The business consulting service was exceptional. They helped us increase our revenue by 40% in just 6 months. The strategic insights and implementation support were exactly what we needed.',
      service: 'Business Consulting',
      date: '2024-01-15'
    },
    {
      id: '2',
      name: 'Michael Chen',
      company: 'Design Studio Pro',
      role: 'Creative Director',
      rating: 5,
      content: 'Outstanding web development team! They delivered a beautiful, fast, and user-friendly website that perfectly represents our brand. The attention to detail and communication throughout the project was impressive.',
      service: 'Web Development',
      date: '2024-02-20'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      company: 'GreenEarth Solutions',
      role: 'Marketing Manager',
      rating: 5,
      content: 'Their digital marketing strategy transformed our online presence. We saw a 300% increase in qualified leads and significantly improved brand awareness. Highly recommend their services!',
      service: 'Digital Marketing',
      date: '2024-03-10'
    },
    {
      id: '4',
      name: 'David Thompson',
      company: 'Future Finance',
      role: 'Founder',
      rating: 5,
      content: 'The financial planning consultation was incredibly valuable. They helped us optimize our budget allocation and investment strategy, resulting in better cash flow and growth opportunities.',
      service: 'Financial Planning',
      date: '2024-03-25'
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover how we've helped businesses like yours achieve their goals
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card className="bg-gray-800 border-gray-700 shadow-2xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <Quote className="h-12 w-12 text-blue-400 opacity-50" />
                <div className="flex space-x-1">
                  {renderStars(currentTestimonial.rating)}
                </div>
              </div>

              <blockquote className="text-xl text-gray-300 leading-relaxed mb-8 italic">
                "{currentTestimonial.content}"
              </blockquote>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={currentTestimonial.avatar} alt={currentTestimonial.name} />
                    <AvatarFallback className="bg-blue-600 text-white">
                      {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      {currentTestimonial.name}
                    </h4>
                    <p className="text-gray-400">
                      {currentTestimonial.role} at {currentTestimonial.company}
                    </p>
                    <p className="text-sm text-blue-400 mt-1">
                      {currentTestimonial.service}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={prevTestimonial}
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={nextTestimonial}
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonial indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-blue-400 scale-125'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
            <div className="text-gray-400">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">4.9★</div>
            <div className="text-gray-400">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">98%</div>
            <div className="text-gray-400">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">5</div>
            <div className="text-gray-400">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
