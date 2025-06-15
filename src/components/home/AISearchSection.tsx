
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SearchResult {
  id: string;
  name: string;
  description: string;
  category: string;
  price_range: string;
  features: string[];
  relevance_score: number;
}

const AISearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const { data, error } = await supabase.rpc('search_services', {
        search_query: searchQuery
      });

      if (error) throw error;

      setSearchResults(data || []);
      
      if (!data || data.length === 0) {
        toast({
          title: "No Results",
          description: "No services found matching your search criteria.",
        });
      }
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search Error",
        description: "Failed to search services. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-yellow-400 mr-2" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">AI-Powered Service Discovery</h2>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Use natural language to find exactly what you need. Our AI understands context and matches you with the perfect services.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="e.g., 'I need help with digital marketing for my startup'"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
              />
            </div>
            <Button 
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </div>

        {searchResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((service) => (
              <Card key={service.id} className="bg-gray-700 border-gray-600 hover:border-blue-500 transition-colors">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                    <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                      {Math.round(service.relevance_score * 100)}% match
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{service.description}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-blue-400 font-medium">{service.category}</span>
                    <span className="text-green-400 font-semibold">{service.price_range}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AISearchSection;
