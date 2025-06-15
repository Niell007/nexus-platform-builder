
"use client";

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Activity, 
  Calendar, 
  CheckCircle,
  RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ServiceBooking from '@/components/ServiceBooking';
import { KPIStatCard } from './KPIStatCard';
import { BookingChart } from './BookingChart';
import { useLegacyDashboardData } from '@/hooks/useLegacyDashboardData';
import { DashboardHeader } from './DashboardHeader';
import { WelcomeSection } from './WelcomeSection';
import { QuickActions } from './QuickActions';
import { useServiceBookingModal } from '@/hooks/useServiceBookingModal';

/**
 * Main Dashboard Component
 * WCAG 2.1 AA compliant with full keyboard navigation and screen reader support
 */
const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { showBookingModal, openBookingModal, closeBookingModal } = useServiceBookingModal();
  const { data, loading, error, refetch } = useLegacyDashboardData();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Icon mapping for KPI cards
  const iconMap = {
    calendar: Calendar,
    activity: Activity,
    'check-circle': CheckCircle,
    'trending-up': Activity,
  };

  // Get user display name
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0];

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
        <button onClick={refetch} className="flex items-center gap-2 px-4 py-2 border rounded">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <DashboardHeader 
        onBookService={openBookingModal}
        onSignOut={handleSignOut}
      />
      
      <main 
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
        role="main"
        data-testid="dashboard-main"
      >
        {/* Welcome Section */}
        <WelcomeSection 
          userName={userName}
          lastUpdated={data?.lastUpdated}
          onRefresh={refetch}
        />

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
            <QuickActions onBookService={openBookingModal} />
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
            <ServiceBooking onClose={closeBookingModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
