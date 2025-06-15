
"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Activity, 
  TrendingUp, 
  Settings
} from 'lucide-react';

interface QuickActionsProps {
  onBookService: () => void;
}

/**
 * Quick Actions Component
 * Provides shortcuts to common dashboard actions
 */
export const QuickActions: React.FC<QuickActionsProps> = ({
  onBookService
}) => {
  return (
    <Card data-testid="quick-actions-card">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Manage your services and account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Button 
            onClick={onBookService}
            className="h-16 sm:h-20 flex-col space-y-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Book a new service"
            data-testid="quick-book-service"
          >
            <Calendar className="h-6 w-6" aria-hidden="true" />
            <span>Book New Service</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-16 sm:h-20 flex-col space-y-2 focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="View your active bookings"
            data-testid="quick-active-bookings"
          >
            <Activity className="h-6 w-6" aria-hidden="true" />
            <span>Active Bookings</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-16 sm:h-20 flex-col space-y-2 focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="View your service history"
            data-testid="quick-service-history"
          >
            <TrendingUp className="h-6 w-6" aria-hidden="true" />
            <span>Service History</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-16 sm:h-20 flex-col space-y-2 focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Open account settings"
            data-testid="quick-account-settings"
          >
            <Settings className="h-6 w-6" aria-hidden="true" />
            <span>Account Settings</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
