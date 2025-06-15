
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Zap, Shield, Award, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    title: "Professional Audio Solutions",
    subtitle: "Transform Your Sound Experience",
    description: "Discover expert audio engineering services tailored to your business needs with our AI-powered service discovery platform",
    cta: "Explore Services",
    ctaLink: "/services",
    background: "from-blue-900 via-purple-900 to-indigo-900",
    features: [
      { icon: Zap, title: "AI-Powered Search", desc: "Find perfect audio solutions instantly" },
      { icon: Shield, title: "Secure Platform", desc: "Enterprise-grade security for your projects" },
      { icon: Award, title: "Expert Engineers", desc: "Connect with verified audio professionals" }
    ]
  },
  {
    id: 2,
    title: "Studio Production Services",
    subtitle: "Bring Your Vision to Life",
    description: "From recording to mastering, our network of professional studios delivers exceptional audio production services for any project size",
    cta: "Book Studio Time",
    ctaLink: "/services",
    background: "from-purple-900 via-pink-900 to-red-900",
    features: [
      { icon: Zap, title: "Real-time Booking", desc: "Schedule studio sessions instantly" },
      { icon: Shield, title: "Quality Guaranteed", desc: "Professional-grade equipment and acoustics" },
      { icon: Award, title: "Expert Producers", desc: "Work with industry-leading professionals" }
    ]
  },
  {
    id: 3,
    title: "Live Sound Engineering",
    subtitle: "Perfect Events, Every Time",
    description: "Professional live sound services for concerts, corporate events, and special occasions with cutting-edge equipment and expertise",
    cta: "Get Quote",
    ctaLink: "/services",
    background: "from-green-900 via-teal-900 to-blue-900",
    features: [
      { icon: Zap, title: "Advanced Equipment", desc: "State-of-the-art PA systems and mixing" },
      { icon: Shield, title: "Reliable Service", desc: "Backup systems and experienced technicians" },
      { icon: Award, title: "Event Specialists", desc: "Experts in all venue types and sizes" }
    ]
  }
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section className={`relative min-h-screen flex items-center justify-center bg-gradient-to-br ${currentSlideData.background} transition-all duration-1000`}>
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Navigation Arrows */}
      <Button
        onClick={prevSlide}
        variant="ghost"
        size="lg"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:bg-white/20 rounded-full p-3"
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>
      
      <Button
        onClick={nextSlide}
        variant="ghost"
        size="lg"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:bg-white/20 rounded-full p-3"
      >
        <ArrowRight className="h-6 w-6" />
      </Button>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Animated Content */}
          <div key={currentSlide} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {currentSlideData.title}
            </h1>
            <h2 className="text-2xl md:text-3xl text-blue-300 font-semibold mb-4">
              {currentSlideData.subtitle}
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              {currentSlideData.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to={currentSlideData.ctaLink}>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all">
                  {currentSlideData.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 shadow-lg">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-8">
            {currentSlideData.features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index} 
                  className="text-center opacity-0 animate-in fade-in slide-in-from-bottom-6 duration-700"
                  style={{ animationDelay: `${(index + 1) * 200}ms`, animationFillMode: 'forwards' }}
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-white/20">
                    <IconComponent className="h-8 w-8 text-blue-300" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white shadow-lg scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-white/70" />
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
        <div 
          className="h-full bg-blue-500 transition-all duration-300 ease-linear"
          style={{ 
            width: isAutoPlaying ? '100%' : '0%',
            transition: isAutoPlaying ? 'width 6s linear' : 'width 0.3s ease'
          }}
        />
      </div>
    </section>
  );
};

export default HeroCarousel;
