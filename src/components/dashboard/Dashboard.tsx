
"use client";

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Activity, 
  Calendar, 
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ServiceBooking from '@/components/ServiceBooking';
import { KPIStatCard } from './KPIStatCard';
import { BookingChart } from './BookingChart';
import { RecentBookings } from './RecentBookings';
import { DashboardHeader } from './DashboardHeader';
import { WelcomeSection } from './WelcomeSection';
import { QuickActions } from './QuickActions';
import { DashboardSkeleton } from './DashboardSkeleton';
import { DashboardErrorBoundary } from './DashboardErrorBoundary';
import { ConnectionStatus } from './ConnectionStatus';
import { useServiceBookingModal } from '@/hooks/useServiceBookingModal';
import { useRealtimeDashboard } from '@/hooks/useRealtimeDashboard';

/**
 * Main Dashboard Component
 * WCAG 2.1 AA compliant with real-time updates and global standards
 */
const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { showBookingModal, openBookingModal, closeBookingModal } = useServiceBookingModal();
  const { data, loading, error, refetch, lastUpdated, connectionStatus } = useRealtimeDashboard();

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
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <DashboardErrorBoundary onRetry={refetch}>
        <div />
      </DashboardErrorBoundary>
    );
  }

  return (
    <DashboardErrorBoundary onRetry={refetch}>
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
          {/* Welcome Section with Connection Status */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <WelcomeSection 
              userName={userName}
              lastUpdated={lastUpdated}
              onRefresh={refetch}
            />
            <ConnectionStatus 
              status={connectionStatus}
              lastUpdated={lastUpdated}
            />
          </div>

          {/* KPI Stats Grid with real-time updates */}
          <section 
            className="mb-8" 
            aria-labelledby="kpi-section-heading"
            data-testid="kpi-section"
            aria-live="polite"
            aria-atomic="false"
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
            
            {/* Recent Bookings with enhanced functionality */}
            <section 
              className="lg:col-span-3"
              aria-labelledby="recent-bookings-heading"
              data-testid="recent-bookings-section"
            >
              {data?.recentBookings && (
                <RecentBookings 
                  bookings={data.recentBookings}
                  onViewDetails={(booking) => {
                    console.log('View details for booking:', booking);
                    // TODO: Navigate to booking details page
                  }}
                  onStatusUpdate={(bookingId, newStatus) => {
                    console.log('Update booking status:', bookingId, newStatus);
                    // TODO: Implement status update API call
                    refetch(); // Refresh data after update
                  }}
                />
              )}
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
    </DashboardErrorBoundary>
  );
};

export default Dashboard;
