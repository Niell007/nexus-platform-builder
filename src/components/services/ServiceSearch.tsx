
"use client";

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useServices } from '@/hooks/useServices';
import { useDebounce } from '@/hooks/useDebounce';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface ServiceSearchProps {
  onServiceSelect: (serviceName: string) => void;
  placeholder?: string;
}

export const ServiceSearch: React.FC<ServiceSearchProps> = ({
  onServiceSelect,
  placeholder = "Search for services..."
}) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { searchServices } = useServices();
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const performSearch = async () => {
      if (debouncedQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const results = await searchServices(debouncedQuery);
        setSearchResults(results);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  }, [debouncedQuery, searchServices]);

  const handleSelect = (serviceName: string) => {
    onServiceSelect(serviceName);
    setQuery('');
    setSearchResults([]);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-4"
        />
        {isSearching && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <LoadingSpinner size="sm" />
          </div>
        )}
      </div>

      {searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {searchResults.map((service, index) => (
            <button
              key={index}
              className="w-full text-left px-4 py-3 hover:bg-muted transition-colors border-b last:border-b-0"
              onClick={() => handleSelect(service.name)}
            >
              <div className="font-medium">{service.name}</div>
              <div className="text-sm text-muted-foreground">{service.category}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
