
"use client";

import { useState, useEffect, useCallback } from 'react';
import { LegacyDashboardData } from './useLegacyDashboardData';

/**
 * Real-time Dashboard Hook
 * Provides live data updates with WebSocket simulation
 */
export const useRealtimeDashboard = () => {
  const [data, setData] = useState<LegacyDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'reconnecting'>('connected');

  // Generate dynamic booking trends
  const generateRealtimeData = useCallback((): LegacyDashboardData => {
    const now = new Date();
    const bookingTrends = [];
    
    // Generate last 30 days with some randomization for real-time feel
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const baseBookings = Math.floor(Math.random() * 15) + 5;
      const realtimeVariation = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
      const bookings = Math.max(1, baseBookings + realtimeVariation);
      
      bookingTrends.push({
        date: date.toISOString().split('T')[0],
        bookings,
        label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      });
    }

    const totalBookings = bookingTrends.reduce((sum, day) => sum + day.bookings, 0);
    const previousTotal = Math.floor(totalBookings * 0.85); // Simulate previous period
    const growthRate = ((totalBookings - previousTotal) / previousTotal * 100);

    return {
      kpis: [
        {
          id: 'total-bookings',
          title: 'Total Bookings',
          value: totalBookings,
          description: 'Last 30 days',
          icon: 'calendar',
          trend: { value: Math.abs(growthRate), isPositive: growthRate > 0 },
          color: 'text-blue-500'
        },
        {
          id: 'active-services',
          title: 'Active Services',
          value: Math.floor(Math.random() * 5) + 2, // 2-6 active services
          description: 'Currently in progress',
          icon: 'activity',
          trend: { value: Math.floor(Math.random() * 30) + 10, isPositive: true },
          color: 'text-green-500'
        },
        {
          id: 'completed-services',
          title: 'Completed',
          value: Math.floor(totalBookings * 0.85),
          description: 'Successfully finished',
          icon: 'check-circle',
          trend: { value: Math.floor(Math.random() * 15) + 5, isPositive: true },
          color: 'text-purple-500'
        },
        {
          id: 'avg-daily-bookings',
          title: 'Daily Average',
          value: Math.round(totalBookings / 30),
          description: 'Bookings per day',
          icon: 'trending-up',
          trend: { value: Math.floor(Math.random() * 20) + 5, isPositive: Math.random() > 0.3 },
          color: 'text-yellow-500'
        }
      ],
      bookingTrends,
      recentBookings: [
        {
          id: 1,
          service: 'Home Cleaning',
          date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: Math.random() > 0.7 ? 'Completed' : Math.random() > 0.4 ? 'In Progress' : 'Scheduled',
          provider: 'Sarah Johnson'
        },
        {
          id: 2,
          service: 'Plumbing Repair',
          date: new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: Math.random() > 0.6 ? 'Completed' : 'In Progress',
          provider: 'Mike Wilson'
        },
        {
          id: 3,
          service: 'Electrical Work',
          date: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: 'Scheduled',
          provider: 'Alex Chen'
        }
      ],
      lastUpdated: new Date().toISOString()
    };
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      setConnectionStatus('connected');
      
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200));
      
      const newData = generateRealtimeData();
      setData(newData);
      setLastUpdated(new Date().toISOString());
    } catch (err) {
      setError('Failed to fetch dashboard data');
      setConnectionStatus('disconnected');
      console.error('Dashboard data fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [generateRealtimeData]);

  // Initial data load
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Real-time updates every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (connectionStatus === 'connected') {
        fetchData();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchData, connectionStatus]);

  // Simulate connection issues occasionally
  useEffect(() => {
    const connectionCheck = setInterval(() => {
      if (Math.random() < 0.05) { // 5% chance of temporary disconnect
        setConnectionStatus('reconnecting');
        setTimeout(() => {
          setConnectionStatus('connected');
          fetchData();
        }, 2000);
      }
    }, 60000); // Check every minute

    return () => clearInterval(connectionCheck);
  }, [fetchData]);

  const refetch = useCallback(() => {
    setLoading(true);
    fetchData();
  }, [fetchData]);

  return { 
    data, 
    loading, 
    error, 
    refetch, 
    lastUpdated, 
    connectionStatus 
  };
};
