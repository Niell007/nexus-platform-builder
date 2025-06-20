
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
  previousValue?: number;
  unit?: string;
  drillDownPath?: string;
  onClick?: () => void;
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
  color = 'text-blue-500',
  previousValue,
  unit = '',
  drillDownPath,
  onClick
}) => {
  // Generate contextual messaging based on data changes
  const getContextualMessage = (): string => {
    if (!trend) return description;
    
    const direction = trend.isPositive ? 'increased' : 'decreased';
    const timeframe = description.toLowerCase().includes('day') ? 'today' : 
                     description.toLowerCase().includes('week') ? 'this week' : 
                     description.toLowerCase().includes('month') ? 'this month' : 
                     'recently';
    
    return `${direction} by ${Math.abs(trend.value)}% ${timeframe}`;
  };

  const contextualMessage = getContextualMessage();
  const isClickable = onClick || drillDownPath;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (drillDownPath) {
      // Handle navigation to drill-down view
      window.location.href = drillDownPath;
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if ((event.key === 'Enter' || event.key === ' ') && isClickable) {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <Card 
      className={`
        hover:shadow-lg transition-all duration-200 
        ${isClickable ? 'cursor-pointer hover:scale-105 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2' : ''}
        border border-border/50 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/80
      `}
      role={isClickable ? "button" : "article"}
      aria-labelledby={`kpi-title-${id}`}
      aria-describedby={`kpi-description-${id}`}
      data-testid={`kpi-card-${id}`}
      tabIndex={isClickable ? 0 : undefined}
      onClick={isClickable ? handleClick : undefined}
      onKeyPress={isClickable ? handleKeyPress : undefined}
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
            aria-label={`Current ${title.toLowerCase()}: ${value}${unit}`}
            data-testid={`kpi-value-${id}`}
          >
            {value}{unit}
          </div>

          {/* Description and Trend */}
          <div 
            className="flex items-center justify-between"
            id={`kpi-description-${id}`}
          >
            <p className="text-xs text-muted-foreground flex-1">
              {contextualMessage}
            </p>
            
            {trend && (
              <div 
                className={`flex items-center text-xs ml-2 ${
                  trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
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

          {/* Previous Value Comparison */}
          {previousValue && (
            <div className="text-xs text-muted-foreground/70">
              Previous: {previousValue}{unit}
            </div>
          )}

          {/* Drill-down indicator */}
          {isClickable && (
            <div className="text-xs text-primary/70 mt-2">
              Click to view details →
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
