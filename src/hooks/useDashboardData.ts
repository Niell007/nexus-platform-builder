
import { useState, useEffect } from 'react';
import { DashboardData, KPIMetric, TrendChart, UserInsight } from '@/types/dashboard';

/**
 * Dashboard Data Hook
 * Provides real-time dashboard data with KPIs, charts, and insights
 */
export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Generate mock booking trends for last 30 days
  const generateBookingTrends = (): TrendChart => {
    const chartData: Array<{ date: string; value: number; label?: string }> = [];
    const now = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const bookings = Math.floor(Math.random() * 15) + 5; // 5-20 bookings per day
      
      chartData.push({
        date: date.toISOString().split('T')[0],
        value: bookings,
        label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      });
    }

    return {
      id: 'booking-trends',
      title: 'Booking Trends (Last 30 Days)',
      data: chartData,
      type: 'line',
      color: '#3b82f6',
      yAxisLabel: 'Bookings'
    };
  };

  // Generate mock insights
  const generateInsights = (): UserInsight[] => {
    return [
      {
        id: 'insight-1',
        title: 'Peak Booking Time',
        description: 'Your busiest booking day is typically Tuesday. Consider offering promotions on slower days.',
        type: 'recommendation',
        priority: 'medium',
        actionText: 'View Analytics',
        actionPath: '/analytics',
        timestamp: new Date().toISOString()
      },
      {
        id: 'insight-2',
        title: 'Service Growth',
        description: 'Home cleaning services have increased by 25% this month.',
        type: 'info',
        priority: 'low',
        timestamp: new Date().toISOString()
      },
      {
        id: 'insight-3',
        title: 'Customer Retention',
        description: 'Customer satisfaction is high. 90% of clients book repeat services.',
        type: 'info',
        priority: 'high',
        timestamp: new Date().toISOString()
      }
    ];
  };

  // Generate mock dashboard data
  const generateMockData = (): DashboardData => {
    const bookingChart = generateBookingTrends();
    const totalBookings = bookingChart.data.reduce((sum, day) => sum + day.value, 0);
    const avgBookings = Math.round(totalBookings / bookingChart.data.length);
    
    const kpis: KPIMetric[] = [
      {
        id: 'total-bookings',
        title: 'Total Bookings',
        value: totalBookings,
        description: 'Last 30 days',
        icon: 'calendar',
        changeType: 'increase',
        change: 12.5,
        color: 'blue',
        trend: { value: 12.5, isPositive: true }
      },
      {
        id: 'active-services',
        title: 'Active Services',
        value: 3,
        description: 'Currently in progress',
        icon: 'activity',
        changeType: 'increase',
        change: 25.0,
        color: 'green',
        trend: { value: 25.0, isPositive: true }
      },
      {
        id: 'completed-services',
        title: 'Completed',
        value: Math.floor(totalBookings * 0.85),
        description: 'Successfully finished',
        icon: 'check-circle',
        changeType: 'increase',
        change: 8.3,
        color: 'purple',
        trend: { value: 8.3, isPositive: true }
      },
      {
        id: 'avg-daily-bookings',
        title: 'Daily Average',
        value: avgBookings,
        description: 'Bookings per day',
        icon: 'trending-up',
        changeType: 'increase',
        change: 15.2,
        color: 'yellow',
        trend: { value: 15.2, isPositive: true }
      }
    ];

    return {
      kpis,
      charts: [bookingChart],
      insights: generateInsights(),
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
