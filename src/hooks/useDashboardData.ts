
import { useState, useEffect } from 'react';
import { DashboardData } from '@/types/dashboard';

// Mock data generator for demonstration
const generateMockData = (): DashboardData => {
  const now = new Date();
  const chartData = Array.from({ length: 7 }, (_, i) => ({
    date: new Date(now.getTime() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    value: Math.floor(Math.random() * 100) + 50,
  }));

  return {
    kpis: [
      {
        id: 'total-bookings',
        title: 'Total Bookings',
        value: 142,
        previousValue: 128,
        change: 10.9,
        changeType: 'increase',
        icon: 'calendar',
        color: 'blue',
        drillDownPath: '/dashboard/bookings'
      },
      {
        id: 'revenue',
        title: 'Monthly Revenue',
        value: 15420,
        previousValue: 13800,
        change: 11.7,
        changeType: 'increase',
        unit: '$',
        icon: 'trending-up',
        color: 'green',
        drillDownPath: '/dashboard/revenue'
      },
      {
        id: 'completion-rate',
        title: 'Completion Rate',
        value: '94.2%',
        previousValue: 91.5,
        change: 2.7,
        changeType: 'increase',
        icon: 'check-circle',
        color: 'purple',
        drillDownPath: '/dashboard/performance'
      },
      {
        id: 'active-services',
        title: 'Active Services',
        value: 8,
        previousValue: 12,
        change: -33.3,
        changeType: 'decrease',
        icon: 'activity',
        color: 'yellow',
        drillDownPath: '/dashboard/services'
      }
    ],
    charts: [
      {
        id: 'bookings-trend',
        title: 'Booking Trends (Last 7 Days)',
        data: chartData,
        type: 'line',
        color: '#3b82f6',
        yAxisLabel: 'Bookings',
        drillDownPath: '/dashboard/analytics/bookings'
      },
      {
        id: 'revenue-trend',
        title: 'Revenue Trends (Last 7 Days)',
        data: chartData.map(d => ({ ...d, value: d.value * 45 })),
        type: 'bar',
        color: '#10b981',
        yAxisLabel: 'Revenue ($)',
        drillDownPath: '/dashboard/analytics/revenue'
      }
    ],
    insights: [
      {
        id: 'insight-1',
        title: 'Peak Booking Hours',
        description: 'Most bookings occur between 2-4 PM. Consider adjusting staff schedules.',
        type: 'recommendation',
        priority: 'high',
        actionText: 'View Schedule',
        actionPath: '/dashboard/scheduling',
        timestamp: new Date().toISOString()
      },
      {
        id: 'insight-2',
        title: 'Service Completion Alert',
        description: 'Home cleaning services have a 15% higher completion rate this month.',
        type: 'info',
        priority: 'medium',
        timestamp: new Date().toISOString()
      }
    ],
    lastUpdated: new Date().toISOString()
  };
};

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call with delay
    const fetchData = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockData = generateMockData();
        setData(mockData);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up real-time updates (every 30 seconds)
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error, refetch: () => setData(generateMockData()) };
};
