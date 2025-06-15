
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface KPIStatCardProps {
  id: string;
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
}

/**
 * KPI Statistics Card Component
 * WCAG 2.1 AA compliant with keyboard navigation and screen reader support
 */
export const KPIStatCard: React.FC<KPIStatCardProps> = ({
  id,
  title,
  value,
  description,
  icon: Icon,
  trend,
  color = 'text-blue-500'
}) => {
  return (
    <Card 
      className="hover:shadow-lg transition-shadow duration-200 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
      role="article"
      aria-labelledby={`kpi-title-${id}`}
      aria-describedby={`kpi-description-${id}`}
      data-testid={`kpi-card-${id}`}
      tabIndex={0}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle 
          id={`kpi-title-${id}`}
          className="text-sm font-medium text-muted-foreground"
        >
          {title}
        </CardTitle>
        <Icon 
          className={`h-4 w-4 ${color}`}
          aria-hidden="true"
        />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {/* Main Value */}
          <div 
            className="text-2xl font-bold"
            aria-label={`Current ${title.toLowerCase()}: ${value}`}
            data-testid={`kpi-value-${id}`}
          >
            {value}
          </div>

          {/* Description and Trend */}
          <div 
            className="flex items-center justify-between"
            id={`kpi-description-${id}`}
          >
            <p className="text-xs text-muted-foreground flex-1">
              {description}
            </p>
            
            {trend && (
              <div 
                className={`flex items-center text-xs ml-2 ${
                  trend.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
                aria-label={`Trend: ${trend.isPositive ? 'increased' : 'decreased'} by ${Math.abs(trend.value)}%`}
                data-testid={`kpi-trend-${id}`}
              >
                {trend.isPositive ? (
                  <ArrowUpIcon className="mr-1 h-3 w-3" aria-hidden="true" />
                ) : (
                  <ArrowDownIcon className="mr-1 h-3 w-3" aria-hidden="true" />
                )}
                <span>{Math.abs(trend.value)}%</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
