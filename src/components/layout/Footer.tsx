
import React from 'react';
import { Music, Headphones, Mic } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Music className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">SOUNDMASTER</span>
            </div>
            <p className="text-gray-400 mb-4">
              Professional sound services in Tzaneen & Limpopo. Creating unforgettable audio experiences for weddings, parties, and special events.
            </p>
            <div className="flex space-x-4">
              <Headphones className="h-6 w-6 text-purple-400" />
              <Mic className="h-6 w-6 text-blue-400" />
              <Music className="h-6 w-6 text-purple-400" />
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Wedding DJ Services</li>
              <li>Party Entertainment</li>
              <li>Karaoke Nights</li>
              <li>Corporate Events</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Tzaneen, Limpopo</li>
              <li>South Africa</li>
              <li>info@soundmaster.co.za</li>
              <li>+27 123 456 789</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Soundmaster. All rights reserved. Professional sound services in Tzaneen & Limpopo.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
