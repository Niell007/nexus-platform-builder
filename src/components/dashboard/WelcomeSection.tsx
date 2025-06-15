
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
    <div className="flex-1">
      <h1 
        className="text-2xl sm:text-3xl font-bold tracking-tight"
        data-testid="welcome-heading"
      >
        Welcome back, {userName}!
      </h1>
      <div className="flex items-center gap-4 mt-2">
        <p className="text-muted-foreground">
          Manage your services and track your bookings from your personal dashboard.
        </p>
        {lastUpdated && (
          <Button 
            onClick={onRefresh} 
            variant="outline" 
            size="sm"
            aria-label="Refresh dashboard data"
            data-testid="refresh-button"
            className="ml-auto"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh</span>
          </Button>
        )}
      </div>
    </div>
  );
};
