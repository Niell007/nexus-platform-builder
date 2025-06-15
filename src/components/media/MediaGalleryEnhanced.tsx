
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Play, Image, FileText, Download, ExternalLink, ZoomIn } from 'lucide-react';

interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'document';
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  category: string;
  size?: string;
  duration?: string;
}

const MediaGalleryEnhanced = () => {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const mediaItems: MediaItem[] = [
    {
      id: '1',
      type: 'image',
      title: 'Modern Office Design',
      description: 'Professional workspace transformation project',
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
      category: 'Design',
    },
    {
      id: '2',
      type: 'video',
      title: 'Business Strategy Session',
      description: 'Strategic planning workshop highlights',
      url: '#',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
      category: 'Consulting',
      duration: '5:32',
    },
    {
      id: '3',
      type: 'image',
      title: 'Team Collaboration',
      description: 'Cross-functional team working together',
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
      category: 'Team',
    },
    {
      id: '4',
      type: 'document',
      title: 'Digital Marketing Report',
      description: 'Comprehensive analysis and recommendations',
      url: '#',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      category: 'Marketing',
      size: '2.4 MB',
    },
    {
      id: '5',
      type: 'image',
      title: 'Technology Innovation',
      description: 'Cutting-edge solutions implementation',
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400',
      category: 'Technology',
    },
    {
      id: '6',
      type: 'video',
      title: 'Client Success Story',
      description: 'Transformation journey documentary',
      url: '#',
      thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400',
      category: 'Success',
      duration: '8:15',
    },
  ];

  const categories = ['all', ...Array.from(new Set(mediaItems.map(item => item.category)))];
  const filteredItems = filter === 'all' ? mediaItems : mediaItems.filter(item => item.category === filter);

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="h-6 w-6" />;
      case 'document': return <FileText className="h-6 w-6" />;
      default: return <Image className="h-6 w-6" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-600/20 text-red-400';
      case 'document': return 'bg-blue-600/20 text-blue-400';
      default: return 'bg-green-600/20 text-green-400';
    }
  };

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Media Gallery
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore our work, insights, and success stories through our comprehensive media collection
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setFilter(category)}
              variant={filter === category ? "default" : "outline"}
              size="sm"
              className={filter === category ? "bg-blue-600 hover:bg-blue-700" : "border-gray-600 text-gray-300 hover:bg-gray-700"}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>

        {/* Media grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="bg-gray-800 border-gray-700 hover:border-blue-600 transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white flex items-center gap-2">
                    <ZoomIn className="h-5 w-5" />
                    <span>View Details</span>
                  </div>
                </div>
                <div className="absolute top-2 left-2">
                  <Badge className={getTypeColor(item.type)}>
                    <span className="flex items-center gap-1">
                      {getIcon(item.type)}
                      {item.type}
                    </span>
                  </Badge>
                </div>
                {item.duration && (
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {item.duration}
                  </div>
                )}
                {item.size && (
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {item.size}
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                  {item.category}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Media preview dialog */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-4xl bg-gray-800 border-gray-700">
            {selectedItem && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-white flex items-center gap-2">
                    {getIcon(selectedItem.type)}
                    {selectedItem.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {selectedItem.type === 'image' ? (
                    <img
                      src={selectedItem.url}
                      alt={selectedItem.title}
                      className="w-full max-h-96 object-contain rounded-lg"
                    />
                  ) : selectedItem.type === 'video' ? (
                    <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <Play className="h-16 w-16 mx-auto mb-4" />
                        <p>Video player would be embedded here</p>
                        <p className="text-sm">Duration: {selectedItem.duration}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-900 rounded-lg p-8 text-center">
                      <FileText className="h-16 w-16 mx-auto mb-4 text-blue-400" />
                      <p className="text-gray-300 mb-2">Document preview</p>
                      <p className="text-sm text-gray-400">Size: {selectedItem.size}</p>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <p className="text-gray-300">{selectedItem.description}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                        {selectedItem.category}
                      </Badge>
                      <Badge className={getTypeColor(selectedItem.type)}>
                        {selectedItem.type}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open Full View
                    </Button>
                    <Button variant="outline" className="border-gray-600 text-gray-300">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default MediaGalleryEnhanced;
