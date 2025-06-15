
import React from 'react';
import { Music } from 'lucide-react';

const ServiceHero = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900">
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <Music className="h-16 w-16 text-purple-400 mx-auto mb-6" />
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Our Services
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Professional sound solutions tailored for every occasion. From intimate gatherings to grand celebrations, we deliver exceptional audio experiences.
        </p>
      </div>
    </section>
  );
};

export default ServiceHero;
