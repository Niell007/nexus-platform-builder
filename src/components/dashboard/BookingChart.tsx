
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BookingData {
  date: string;
  bookings: number;
  label: string;
}

interface BookingChartProps {
  data: BookingData[];
  title?: string;
}

/**
 * Booking Trends Chart Component
 * Accessible chart with screen reader support and keyboard navigation
 */
export const BookingChart: React.FC<BookingChartProps> = ({ 
  data, 
  title = "Booking Trends (Last 30 Days)" 
}) => {
  // Create accessible summary for screen readers
  const totalBookings = data.reduce((sum, item) => sum + item.bookings, 0);
  const avgBookings = Math.round(totalBookings / data.length);
  const maxBookings = Math.max(...data.map(d => d.bookings));
  const minBookings = Math.min(...data.map(d => d.bookings));
  
  const chartSummary = `Chart showing ${title.toLowerCase()}. 
    Total bookings: ${totalBookings}. Average daily bookings: ${avgBookings}. 
    Peak day had ${maxBookings} bookings, lowest day had ${minBookings} bookings.`;

  return (
    <Card 
      className="hover:shadow-lg transition-shadow duration-200"
      role="img"
      aria-labelledby="booking-chart-title"
      aria-describedby="booking-chart-description"
      data-testid="booking-chart"
    >
      <CardHeader>
        <CardTitle 
          id="booking-chart-title"
          className="text-lg font-semibold"
        >
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Screen reader description */}
        <div 
          id="booking-chart-description"
          className="sr-only"
          aria-live="polite"
        >
          {chartSummary}
        </div>

        {/* Chart Container */}
        <div 
          className="h-64 w-full" 
          role="presentation"
          data-testid="booking-chart-container"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="label" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: 'currentColor' }}
              />
              <YAxis 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: 'currentColor' }}
                label={{ 
                  value: 'Bookings', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' }
                }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  color: 'hsl(var(--foreground))'
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Data Table for Accessibility */}
        <details className="mt-4" data-testid="booking-chart-data-table">
          <summary className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">
            View data table
          </summary>
          <table className="mt-2 w-full text-sm" role="table">
            <caption className="sr-only">
              Booking data for the last 30 days
            </caption>
            <thead>
              <tr>
                <th scope="col" className="text-left p-1 border-b">Date</th>
                <th scope="col" className="text-left p-1 border-b">Bookings</th>
              </tr>
            </thead>
            <tbody>
              {data.map((point, index) => (
                <tr key={index}>
                  <td className="p-1 border-b">{point.label}</td>
                  <td className="p-1 border-b">{point.bookings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </CardContent>
    </Card>
  );
};
