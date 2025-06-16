
"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Service } from '@/hooks/useServices';
import { useLocalization } from '@/hooks/useLocalization';
import { Star, MapPin, Clock } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  onBookNow: (serviceName: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBookNow }) => {
  const { convertToZAR } = useLocalization();

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {service.image_url && (
        <div className="aspect-video overflow-hidden">
          <img
            src={service.image_url}
            alt={service.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}
      
      <CardHeader className="flex-none">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold line-clamp-2">
              {service.name}
            </CardTitle>
            <CardDescription className="mt-1 line-clamp-2">
              {service.description}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="ml-2 shrink-0">
            {service.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1">
          {service.price_range && (
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-bold text-primary">
                {convertToZAR(service.price_range)}
              </span>
              <span className="text-sm text-muted-foreground">per service</span>
            </div>
          )}

          {service.features && service.features.length > 0 && (
            <div className="space-y-2 mb-4">
              <h4 className="text-sm font-medium">Features included:</h4>
              <div className="flex flex-wrap gap-1">
                {service.features.slice(0, 4).map((feature, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
                {service.features.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{service.features.length - 4} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>4.8 (124 reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Same day</span>
            </div>
          </div>
        </div>

        <Button 
          onClick={() => onBookNow(service.name)}
          className="w-full mt-auto"
          size="lg"
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
};
