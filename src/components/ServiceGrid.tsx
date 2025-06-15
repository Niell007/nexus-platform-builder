
"use client";

import React, { useState } from 'react';
import { ServiceCard } from './ServiceCard';
import { useServices } from '@/hooks/useServices';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

interface ServiceGridProps {
  onBookService: (serviceName: string) => void;
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({ onBookService }) => {
  const { services, loading } = useServices();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = ['all', ...new Set(services.map(service => service.category))];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-12 flex-1 rounded-lg" />
          <Skeleton className="h-12 w-48 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="overflow-hidden animate-pulse">
              <Skeleton className="aspect-video" />
              <div className="p-6 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 p-6 bg-muted/30 rounded-xl">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Search services, categories, or descriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 text-base rounded-lg border-2 focus:border-primary transition-colors"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-56 h-12 border-2 rounded-lg">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent className="rounded-lg">
            {categories.map(category => (
              <SelectItem key={category} value={category} className="capitalize">
                {category === 'all' ? 'All Categories' : category.replace('_', ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Enhanced Results Info */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <p className="text-muted-foreground font-medium">
            {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
          </p>
          {(searchQuery || categoryFilter !== 'all') && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
              }}
              className="text-primary hover:text-primary/80"
            >
              Clear filters
            </Button>
          )}
        </div>
      </div>

      {/* Enhanced Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service, index) => (
          <div 
            key={service.id} 
            className={`animate-fade-in animate-delay-${Math.min(index * 100, 400)}`}
          >
            <ServiceCard
              service={service}
              onBookNow={onBookService}
            />
          </div>
        ))}
      </div>

      {/* Enhanced Empty State */}
      {filteredServices.length === 0 && (
        <div className="text-center py-16 animate-fade-in">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3">No services found</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We couldn't find any services matching your criteria. Try adjusting your search or browse all available services.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('all');
                }}
                className="hover-lift"
              >
                <Filter className="mr-2 h-4 w-4" />
                Clear All Filters
              </Button>
              <Button className="hover-glow">
                Browse All Services
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
