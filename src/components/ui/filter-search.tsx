
"use client";

import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Search, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterOption {
  id: string;
  label: string;
  value: string;
}

interface FilterGroup {
  id: string;
  label: string;
  type: 'checkbox' | 'select' | 'range';
  options?: FilterOption[];
  min?: number;
  max?: number;
}

interface FilterSearchProps {
  data: any[];
  searchFields: string[];
  filterGroups: FilterGroup[];
  onResults: (results: any[]) => void;
  placeholder?: string;
  className?: string;
}

export const FilterSearch: React.FC<FilterSearchProps> = ({
  data,
  searchFields,
  filterGroups,
  onResults,
  placeholder = "Search...",
  className
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [showFilters, setShowFilters] = useState(false);

  const filteredResults = useMemo(() => {
    let results = data;

    // Apply search
    if (searchTerm) {
      results = results.filter(item =>
        searchFields.some(field =>
          item[field]?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([groupId, filterValue]) => {
      const group = filterGroups.find(g => g.id === groupId);
      if (!group || !filterValue) return;

      if (group.type === 'checkbox' && Array.isArray(filterValue) && filterValue.length > 0) {
        results = results.filter(item => filterValue.includes(item[groupId]));
      } else if (group.type === 'select' && filterValue) {
        results = results.filter(item => item[groupId] === filterValue);
      } else if (group.type === 'range' && filterValue.min !== undefined && filterValue.max !== undefined) {
        results = results.filter(item => 
          item[groupId] >= filterValue.min && item[groupId] <= filterValue.max
        );
      }
    });

    return results;
  }, [data, searchTerm, filters, searchFields, filterGroups]);

  React.useEffect(() => {
    onResults(filteredResults);
  }, [filteredResults, onResults]);

  const updateFilter = (groupId: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [groupId]: value
    }));
  };

  const clearFilter = (groupId: string) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[groupId];
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  const activeFiltersCount = Object.keys(filters).length + (searchTerm ? 1 : 0);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchTerm('')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>

        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear all
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: {searchTerm}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => setSearchTerm('')}
              />
            </Badge>
          )}
          {Object.entries(filters).map(([groupId, value]) => {
            const group = filterGroups.find(g => g.id === groupId);
            if (!group || !value) return null;

            return (
              <Badge key={groupId} variant="secondary" className="flex items-center gap-1">
                {group.label}: {Array.isArray(value) ? value.join(', ') : value}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => clearFilter(groupId)}
                />
              </Badge>
            );
          })}
        </div>
      )}

      {/* Filter Groups */}
      {showFilters && (
        <div className="grid gap-4 p-4 border rounded-lg bg-muted/50">
          {filterGroups.map(group => (
            <div key={group.id} className="space-y-2">
              <Label className="font-medium">{group.label}</Label>
              
              {group.type === 'checkbox' && group.options && (
                <div className="space-y-2">
                  {group.options.map(option => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={option.id}
                        checked={filters[group.id]?.includes(option.value) || false}
                        onCheckedChange={(checked) => {
                          const currentValues = filters[group.id] || [];
                          if (checked) {
                            updateFilter(group.id, [...currentValues, option.value]);
                          } else {
                            updateFilter(group.id, currentValues.filter((v: string) => v !== option.value));
                          }
                        }}
                      />
                      <Label htmlFor={option.id}>{option.label}</Label>
                    </div>
                  ))}
                </div>
              )}

              {group.type === 'select' && group.options && (
                <Select
                  value={filters[group.id] || ''}
                  onValueChange={(value) => updateFilter(group.id, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={`Select ${group.label}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {group.options.map(option => (
                      <SelectItem key={option.id} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {group.type === 'range' && (
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    min={group.min}
                    max={group.max}
                    value={filters[group.id]?.min || ''}
                    onChange={(e) => updateFilter(group.id, {
                      ...filters[group.id],
                      min: parseInt(e.target.value) || group.min
                    })}
                  />
                  <span>-</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    min={group.min}
                    max={group.max}
                    value={filters[group.id]?.max || ''}
                    onChange={(e) => updateFilter(group.id, {
                      ...filters[group.id],
                      max: parseInt(e.target.value) || group.max
                    })}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} found
      </div>
    </div>
  );
};
