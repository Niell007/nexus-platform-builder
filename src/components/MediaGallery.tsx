
"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, ChevronLeft, ChevronRight, X } from "lucide-react";

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title: string;
  description?: string;
}

interface MediaGalleryProps {
  items: MediaItem[];
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const mediaItems: MediaItem[] = items.length > 0 ? items : [
    {
      id: '1',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Professional Home Cleaning',
      description: 'Before and after shots of our premium cleaning service'
    },
    {
      id: '2',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Plumbing Excellence',
      description: 'Expert plumbing repairs and installations'
    },
    {
      id: '3',
      type: 'video',
      url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Electrical Safety Demo',
      description: 'Watch our certified electricians in action'
    },
    {
      id: '4',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Landscape Transformation',
      description: 'Complete outdoor makeover project'
    },
    {
      id: '5',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Interior Design Portfolio',
      description: 'Modern living space renovation'
    },
    {
      id: '6',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1621905252472-e8de8f82c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'HVAC Installation',
      description: 'Energy-efficient climate control systems'
    }
  ];

  const openLightbox = (item: MediaItem, index: number) => {
    setSelectedItem(item);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedItem(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + mediaItems.length) % mediaItems.length
      : (currentIndex + 1) % mediaItems.length;
    
    setCurrentIndex(newIndex);
    setSelectedItem(mediaItems[newIndex]);
  };

  return (
    <div className="py-20 bg-gray-900/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Our Work Gallery
          </h2>
          <p className="text-xl text-gray-300">
            See the quality and craftsmanship that sets us apart
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mediaItems.map((item, index) => (
            <Card 
              key={item.id}
              className="bg-gray-800/50 border-gray-700 overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer group"
              onClick={() => openLightbox(item, index)}
            >
              <CardContent className="p-0 relative">
                <img
                  src={item.thumbnail || item.url}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:brightness-75 transition-all duration-300"
                />
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/70 rounded-full p-3 group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-sm font-semibold">{item.title}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              {/* Close Button */}
              <Button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
                size="icon"
              >
                <X className="w-4 h-4" />
              </Button>

              {/* Navigation Buttons */}
              <Button
                onClick={() => navigateLightbox('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
                size="icon"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <Button
                onClick={() => navigateLightbox('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
                size="icon"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>

              {/* Media Content */}
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                {selectedItem.type === 'video' ? (
                  <video
                    src={selectedItem.url}
                    controls
                    autoPlay
                    className="w-full max-h-[70vh] object-contain"
                  />
                ) : (
                  <img
                    src={selectedItem.url}
                    alt={selectedItem.title}
                    className="w-full max-h-[70vh] object-contain"
                  />
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{selectedItem.title}</h3>
                  {selectedItem.description && (
                    <p className="text-gray-300">{selectedItem.description}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaGallery;
