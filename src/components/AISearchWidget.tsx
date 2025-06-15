
"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Bot, Sparkles, ArrowRight } from "lucide-react";

interface AISearchWidgetProps {
  onSearchResult?: (results: any[]) => void;
}

const AISearchWidget: React.FC<AISearchWidgetProps> = ({ onSearchResult }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const searchSuggestions = [
    "I need someone to clean my 3-bedroom house weekly",
    "Fix a leaky faucet in my kitchen",
    "Install new light fixtures in living room",
    "Landscape design for small backyard",
    "Emergency plumbing repair needed",
    "Regular maintenance for HVAC system"
  ];

  const handleSearch = async (searchQuery: string = query) => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockResults = [
        {
          service: "Home Cleaning",
          match: 95,
          description: "Professional house cleaning service",
          price: "From $89",
          availability: "Today"
        },
        {
          service: "Deep Cleaning",
          match: 87,
          description: "Comprehensive deep cleaning service",
          price: "From $149",
          availability: "Tomorrow"
        }
      ];
      
      setSuggestions([]);
      setIsSearching(false);
      if (onSearchResult) {
        onSearchResult(mockResults);
      }
      console.log('AI Search Results:', mockResults);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Show suggestions when typing
    if (value.length > 2) {
      const filteredSuggestions = searchSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions.slice(0, 3));
    } else {
      setSuggestions([]);
    }
  };

  return (
    <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Bot className="mr-2 h-6 w-6 text-blue-400" />
          AI-Powered Service Search
          <Sparkles className="ml-2 h-5 w-5 text-yellow-400" />
        </CardTitle>
        <CardDescription className="text-gray-300">
          Describe what you need in natural language, and our AI will find the perfect service for you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Describe your service needs... (e.g., 'I need my house cleaned twice a week')"
              value={query}
              onChange={handleInputChange}
              className="pl-10 py-3 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          
          {suggestions.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Suggestions:</p>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setQuery(suggestion);
                    handleSearch(suggestion);
                  }}
                  className="block w-full text-left p-2 bg-gray-800/30 hover:bg-gray-700/50 rounded text-gray-300 text-sm transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          
          <Button 
            type="submit" 
            disabled={isSearching || !query.trim()}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50"
          >
            {isSearching ? (
              <>
                <Bot className="mr-2 h-4 w-4 animate-spin" />
                AI is analyzing your request...
              </>
            ) : (
              <>
                Search with AI
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
        
        <div className="text-xs text-gray-400 bg-gray-800/30 p-3 rounded">
          <p className="flex items-center">
            <Sparkles className="mr-1 h-3 w-3 text-yellow-400" />
            Our AI understands natural language and finds the best matches based on your specific needs, location, and preferences.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AISearchWidget;
