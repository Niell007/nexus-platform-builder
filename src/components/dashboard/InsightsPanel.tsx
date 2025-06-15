
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Info, TrendingUp } from 'lucide-react';
import { UserInsight } from '@/types/dashboard';
import { Link } from 'react-router-dom';

interface InsightsPanelProps {
  insights: UserInsight[];
}

const typeIcons = {
  recommendation: TrendingUp,
  alert: AlertCircle,
  info: Info,
};

const typeColors = {
  recommendation: 'text-blue-600 bg-blue-50 dark:bg-blue-950',
  alert: 'text-red-600 bg-red-50 dark:bg-red-950',
  info: 'text-green-600 bg-green-50 dark:bg-green-950',
};

const priorityLabels = {
  high: 'High Priority',
  medium: 'Medium Priority',
  low: 'Low Priority',
};

/**
 * User Insights Panel Component
 * Displays personalized recommendations and alerts with accessibility features
 */
export const InsightsPanel: React.FC<InsightsPanelProps> = ({ insights }) => {
  return (
    <Card 
      className="hover:shadow-lg transition-shadow duration-200"
      role="region"
      aria-labelledby="insights-title"
    >
      <CardHeader>
        <CardTitle id="insights-title" className="flex items-center gap-2">
          <Info className="h-5 w-5" aria-hidden="true" />
          Your Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        {insights.length === 0 ? (
          <div 
            className="text-center py-8 text-muted-foreground"
            role="status"
            aria-live="polite"
          >
            No insights available at the moment.
          </div>
        ) : (
          <div className="space-y-4" role="list">
            {insights.map((insight) => {
              const IconComponent = typeIcons[insight.type];
              const colorClass = typeColors[insight.type];
              
              return (
                <div
                  key={insight.id}
                  className={`p-4 rounded-lg border ${colorClass}`}
                  role="listitem"
                  aria-labelledby={`insight-title-${insight.id}`}
                  aria-describedby={`insight-description-${insight.id}`}
                >
                  <div className="flex items-start gap-3">
                    <IconComponent 
                      className="h-5 w-5 mt-0.5 flex-shrink-0" 
                      aria-hidden="true"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 
                          id={`insight-title-${insight.id}`}
                          className="font-medium text-foreground"
                        >
                          {insight.title}
                        </h3>
                        <span 
                          className="text-xs px-2 py-1 rounded-full bg-background/50"
                          aria-label={`Priority level: ${priorityLabels[insight.priority]}`}
                        >
                          {insight.priority.toUpperCase()}
                        </span>
                      </div>
                      
                      <p 
                        id={`insight-description-${insight.id}`}
                        className="text-sm text-muted-foreground"
                      >
                        {insight.description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-2">
                        <time 
                          className="text-xs text-muted-foreground"
                          dateTime={insight.timestamp}
                          aria-label={`Insight created on ${new Date(insight.timestamp).toLocaleDateString()}`}
                        >
                          {new Date(insight.timestamp).toLocaleDateString()}
                        </time>
                        
                        {insight.actionPath && insight.actionText && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            asChild
                          >
                            <Link 
                              to={insight.actionPath}
                              aria-label={`${insight.actionText} for ${insight.title}`}
                            >
                              {insight.actionText}
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
