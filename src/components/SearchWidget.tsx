
"use client";

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useServices } from '@/hooks/useServices';
import { Search, X } from 'lucide-react';
import { ServiceCard } from './ServiceCard';

interface SearchWidgetProps {
  onServiceSelect?: (serviceName: string) => void;
}

export const SearchWidget: React.FC<SearchWidgetProps> = ({ onServiceSelect }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const { searchServices, loading } = useServices();

  useEffect(() => {
    const delayedSearch = setTimeout(async () => {
      if (query.trim()) {
        const searchResults = await searchServices(query);
        setResults(searchResults.slice(0, 5)); // Limit to 5 results
        setIsOpen(true);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [query, searchServices]);

  const handleServiceSelect = (serviceName: string) => {
    setQuery('');
    setIsOpen(false);
    if (onServiceSelect) {
      onServiceSelect(serviceName);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search services..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-muted-foreground">
              Searching...
            </div>
          ) : results.length > 0 ? (
            <div className="p-2 space-y-2">
              {results.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service.name)}
                  className="w-full text-left p-3 hover:bg-muted rounded-md transition-colors"
                >
                  <div className="font-medium">{service.name}</div>
                  <div className="text-sm text-muted-foreground line-clamp-1">
                    {service.description}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {service.category} • {service.price_range}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              No services found for "{query}"
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
