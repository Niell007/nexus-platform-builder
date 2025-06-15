
import { useState, useEffect } from 'react';

export interface DashboardKPI {
  id: string;
  title: string;
  value: string | number;
  description: string;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
}

export interface BookingTrendData {
  date: string;
  bookings: number;
  label: string;
}

export interface RecentBooking {
  id: number;
  service: string;
  date: string;
  status: 'Completed' | 'In Progress' | 'Scheduled';
  provider: string;
}

export interface DashboardData {
  kpis: DashboardKPI[];
  bookingTrends: BookingTrendData[];
  recentBookings: RecentBooking[];
  lastUpdated: string;
}

/**
 * Dashboard Data Hook
 * Simulates live API data pull with real-time updates
 */
export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Generate mock booking trends for last 30 days
  const generateBookingTrends = (): BookingTrendData[] => {
    const trends: BookingTrendData[] = [];
    const now = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const bookings = Math.floor(Math.random() * 15) + 5; // 5-20 bookings per day
      
      trends.push({
        date: date.toISOString().split('T')[0],
        bookings,
        label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      });
    }
    
    return trends;
  };

  // Generate mock dashboard data
  const generateMockData = (): DashboardData => {
    const bookingTrends = generateBookingTrends();
    const totalBookings = bookingTrends.reduce((sum, day) => sum + day.bookings, 0);
    const avgBookings = Math.round(totalBookings / bookingTrends.length);
    
    return {
      kpis: [
        {
          id: 'total-bookings',
          title: 'Total Bookings',
          value: totalBookings,
          description: 'Last 30 days',
          icon: 'calendar',
          trend: { value: 12.5, isPositive: true },
          color: 'text-blue-500'
        },
        {
          id: 'active-services',
          title: 'Active Services',
          value: 3,
          description: 'Currently in progress',
          icon: 'activity',
          trend: { value: 25.0, isPositive: true },
          color: 'text-green-500'
        },
        {
          id: 'completed-services',
          title: 'Completed',
          value: Math.floor(totalBookings * 0.85),
          description: 'Successfully finished',
          icon: 'check-circle',
          trend: { value: 8.3, isPositive: true },
          color: 'text-purple-500'
        },
        {
          id: 'avg-daily-bookings',
          title: 'Daily Average',
          value: avgBookings,
          description: 'Bookings per day',
          icon: 'trending-up',
          trend: { value: 15.2, isPositive: true },
          color: 'text-yellow-500'
        }
      ],
      bookingTrends,
      recentBookings: [
        {
          id: 1,
          service: 'Home Cleaning',
          date: '2024-06-20',
          status: 'Completed',
          provider: 'Sarah Johnson'
        },
        {
          id: 2,
          service: 'Plumbing Repair',
          date: '2024-06-18',
          status: 'In Progress',
          provider: 'Mike Wilson'
        },
        {
          id: 3,
          service: 'Electrical Work',
          date: '2024-06-15',
          status: 'Scheduled',
          provider: 'Alex Chen'
        }
      ],
      lastUpdated: new Date().toISOString()
    };
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, this would be an actual API call
      const mockData = generateMockData();
      setData(mockData);
    } catch (err) {
      setError('Failed to fetch dashboard data');
      console.error('Dashboard data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Set up real-time updates (every 30 seconds)
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
};
