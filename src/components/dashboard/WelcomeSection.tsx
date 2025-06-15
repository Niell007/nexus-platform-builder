
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface WelcomeSectionProps {
  userName?: string;
  lastUpdated?: string;
  onRefresh: () => void;
}

/**
 * Dashboard Welcome Section Component
 * Displays welcome message and refresh controls
 */
export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  userName,
  lastUpdated,
  onRefresh
}) => {
  return (
    <section className="mb-8" aria-labelledby="welcome-heading">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 
            id="welcome-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight"
            data-testid="welcome-heading"
          >
            Welcome back, {userName}!
          </h1>
          <p className="text-muted-foreground">
            Manage your services and track your bookings from your personal dashboard.
          </p>
        </div>
        
        {lastUpdated && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Last updated: {new Date(lastUpdated).toLocaleTimeString()}
            </span>
            <Button 
              onClick={onRefresh} 
              variant="outline" 
              size="sm"
              aria-label="Refresh dashboard data"
              data-testid="refresh-button"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="sr-only">Refresh</span>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
