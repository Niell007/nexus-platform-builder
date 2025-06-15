
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpIcon, ArrowDownIcon, Calendar, TrendingUp, CheckCircle, Activity } from 'lucide-react';
import { KPIMetric } from '@/types/dashboard';
import { Link } from 'react-router-dom';

interface KPICardProps {
  metric: KPIMetric;
}

const iconMap = {
  calendar: Calendar,
  'trending-up': TrendingUp,
  'check-circle': CheckCircle,
  activity: Activity,
};

const colorMap = {
  blue: 'text-blue-600 dark:text-blue-400',
  green: 'text-green-600 dark:text-green-400',
  red: 'text-red-600 dark:text-red-400',
  yellow: 'text-yellow-600 dark:text-yellow-400',
  purple: 'text-purple-600 dark:text-purple-400',
};

/**
 * KPI Card Component
 * Displays key performance indicators with trend information and accessibility features
 */
export const KPICard: React.FC<KPICardProps> = ({ metric }) => {
  const IconComponent = iconMap[metric.icon as keyof typeof iconMap] || Activity;
  const isPositiveChange = metric.changeType === 'increase';
  const changeColor = isPositiveChange ? 'text-green-600' : 'text-red-600';
  const ArrowIcon = isPositiveChange ? ArrowUpIcon : ArrowDownIcon;

  // Format the change percentage for screen readers
  const changeDescription = metric.change 
    ? `${isPositiveChange ? 'increased' : 'decreased'} by ${Math.abs(metric.change)}%`
    : 'no change';

  return (
    <Card 
      className="hover:shadow-lg transition-shadow duration-200"
      role="article"
      aria-labelledby={`kpi-title-${metric.id}`}
      aria-describedby={`kpi-description-${metric.id}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle 
          id={`kpi-title-${metric.id}`}
          className="text-sm font-medium text-muted-foreground"
        >
          {metric.title}
        </CardTitle>
        <IconComponent 
          className={`h-4 w-4 ${colorMap[metric.color]}`}
          aria-hidden="true"
        />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {/* Main Value */}
          <div 
            className="text-2xl font-bold"
            aria-label={`Current value: ${metric.unit || ''}${metric.value}`}
          >
            {metric.unit && metric.unit === '$' && metric.unit}
            {metric.value}
            {metric.unit && metric.unit !== '$' && metric.unit}
          </div>

          {/* Change Indicator */}
          {metric.change !== undefined && (
            <div 
              className="flex items-center text-xs"
              id={`kpi-description-${metric.id}`}
              aria-label={`Performance ${changeDescription} compared to previous period`}
            >
              <ArrowIcon className={`mr-1 h-3 w-3 ${changeColor}`} aria-hidden="true" />
              <span className={changeColor}>
                {Math.abs(metric.change)}% from last period
              </span>
            </div>
          )}

          {/* Drill-down Link */}
          {metric.drillDownPath && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-2 p-0 h-auto text-xs text-muted-foreground hover:text-foreground"
              asChild
            >
              <Link 
                to={metric.drillDownPath}
                aria-label={`View detailed ${metric.title.toLowerCase()} information`}
              >
                View Details →
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
