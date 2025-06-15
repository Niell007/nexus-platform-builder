
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Calendar, 
  Settings, 
  Home, 
  LogOut
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardHeaderProps {
  onBookService: () => void;
  onSignOut: () => void;
}

/**
 * Dashboard Header Component
 * Contains navigation, branding, and primary action buttons
 */
export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onBookService,
  onSignOut
}) => {
  return (
    <header 
      className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
      data-testid="dashboard-header"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
              aria-label="Go to homepage"
              data-testid="home-link"
            >
              <Home className="h-5 w-5" aria-hidden="true" />
              <span className="font-semibold">ServicePro</span>
            </Link>
            <nav aria-label="Breadcrumb">
              <span className="text-muted-foreground">/ Dashboard</span>
            </nav>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              onClick={onBookService}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Book a new service"
              data-testid="book-service-button"
            >
              <Calendar className="w-4 h-4 mr-2" aria-hidden="true" />
              <span className="hidden sm:inline">Book Service</span>
              <span className="sm:hidden">Book</span>
            </Button>
            
            <Link to="/admin">
              <Button 
                variant="outline" 
                size="sm"
                className="focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Go to admin panel"
                data-testid="admin-link"
              >
                <Shield className="w-4 h-4 mr-2" aria-hidden="true" />
                <span className="hidden sm:inline">Admin</span>
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              size="sm"
              className="focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Open settings"
              data-testid="settings-button"
            >
              <Settings className="w-4 h-4 mr-2" aria-hidden="true" />
              <span className="hidden sm:inline">Settings</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onSignOut}
              className="focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Sign out of your account"
              data-testid="signout-button"
            >
              <LogOut className="w-4 h-4 mr-2" aria-hidden="true" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
