
"use client";

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Activity, 
  TrendingUp, 
  Shield, 
  Calendar, 
  Settings, 
  Home, 
  LogOut,
  CheckCircle,
  RefreshCw
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ServiceBooking from '@/components/ServiceBooking';
import { KPIStatCard } from './KPIStatCard';
import { BookingChart } from './BookingChart';
import { useDashboardData } from '@/hooks/useDashboardData';

/**
 * Main Dashboard Component
 * WCAG 2.1 AA compliant with full keyboard navigation and screen reader support
 */
const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const { data, loading, error, refetch } = useDashboardData();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Icon mapping for KPI cards
  const iconMap = {
    calendar: Calendar,
    activity: Activity,
    'check-circle': CheckCircle,
    'trending-up': TrendingUp,
  };

  if (loading) {
    return (
      <div 
        className="min-h-screen bg-background flex items-center justify-center"
        role="status"
        aria-live="polite"
        data-testid="dashboard-loading"
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="sr-only">Loading dashboard...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="min-h-screen bg-background flex flex-col items-center justify-center"
        role="alert"
        aria-live="assertive"
        data-testid="dashboard-error"
      >
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={refetch} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
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
                onClick={() => setShowBookingModal(true)}
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
                onClick={handleSignOut}
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
      
      <main 
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
        role="main"
        data-testid="dashboard-main"
      >
        {/* Welcome Section */}
        <section className="mb-8" aria-labelledby="welcome-heading">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 
                id="welcome-heading"
                className="text-2xl sm:text-3xl font-bold tracking-tight"
                data-testid="welcome-heading"
              >
                Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0]}!
              </h1>
              <p className="text-muted-foreground">
                Manage your services and track your bookings from your personal dashboard.
              </p>
            </div>
            
            {data && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Last updated: {new Date(data.lastUpdated).toLocaleTimeString()}
                </span>
                <Button 
                  onClick={refetch} 
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

        {/* KPI Stats Grid */}
        <section 
          className="mb-8" 
          aria-labelledby="kpi-section-heading"
          data-testid="kpi-section"
        >
          <h2 id="kpi-section-heading" className="sr-only">
            Key Performance Indicators
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {data?.kpis.map((kpi) => {
              const IconComponent = iconMap[kpi.icon as keyof typeof iconMap] || Activity;
              return (
                <KPIStatCard
                  key={kpi.id}
                  id={kpi.id}
                  title={kpi.title}
                  value={kpi.value}
                  description={kpi.description}
                  icon={IconComponent}
                  trend={kpi.trend}
                  color={kpi.color}
                />
              );
            })}
          </div>
        </section>

        {/* Dashboard Content Grid */}
        <div className="grid gap-6 lg:grid-cols-7">
          {/* Charts Section */}
          <section 
            className="lg:col-span-4 space-y-6"
            aria-labelledby="charts-section-heading"
            data-testid="charts-section"
          >
            <h2 id="charts-section-heading" className="sr-only">
              Analytics and Trends
            </h2>
            
            {data?.bookingTrends && (
              <BookingChart 
                data={data.bookingTrends}
                title="Booking Trends (Last 30 Days)"
              />
            )}

            {/* Quick Actions */}
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
                    onClick={() => setShowBookingModal(true)}
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
          </section>
          
          {/* Recent Bookings */}
          <section 
            className="lg:col-span-3"
            aria-labelledby="recent-bookings-heading"
            data-testid="recent-bookings-section"
          >
            <Card>
              <CardHeader>
                <CardTitle id="recent-bookings-heading">Recent Bookings</CardTitle>
                <CardDescription>Your latest service requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4" role="list" aria-label="Recent bookings">
                  {data?.recentBookings.map((booking) => (
                    <div 
                      key={booking.id} 
                      className="flex items-center justify-between p-3 border rounded-lg focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                      role="listitem"
                      data-testid={`recent-booking-${booking.id}`}
                      tabIndex={0}
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{booking.service}</p>
                        <p className="text-xs text-muted-foreground">{booking.provider}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(booking.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div 
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          booking.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          booking.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}
                        aria-label={`Status: ${booking.status}`}
                      >
                        {booking.status}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      {/* Service Booking Modal */}
      {showBookingModal && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
          data-testid="booking-modal"
        >
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <ServiceBooking onClose={() => setShowBookingModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
