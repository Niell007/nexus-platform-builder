
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Button } from '@/components/ui/button';
import { TrendingUp, BarChart3 } from 'lucide-react';

interface BookingData {
  date: string;
  bookings: number;
  label: string;
  revenue?: number;
}

interface BookingChartProps {
  data: BookingData[];
  title?: string;
  showRevenue?: boolean;
  onDrillDown?: (dataPoint: BookingData) => void;
}

/**
 * Booking Trends Chart Component
 * Accessible chart with screen reader support, keyboard navigation, and drill-down capability
 */
export const BookingChart: React.FC<BookingChartProps> = ({ 
  data, 
  title = "Booking Trends (Last 30 Days)",
  showRevenue = false,
  onDrillDown
}) => {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // Create accessible summary for screen readers
  const totalBookings = data.reduce((sum, item) => sum + item.bookings, 0);
  const avgBookings = Math.round(totalBookings / data.length);
  const maxBookings = Math.max(...data.map(d => d.bookings));
  const minBookings = Math.min(...data.map(d => d.bookings));
  const totalRevenue = data.reduce((sum, item) => sum + (item.revenue || 0), 0);
  
  const chartSummary = `Chart showing ${title.toLowerCase()}. 
    Total bookings: ${totalBookings}. Average daily bookings: ${avgBookings}. 
    Peak day had ${maxBookings} bookings, lowest day had ${minBookings} bookings.
    ${showRevenue ? `Total revenue: $${totalRevenue.toLocaleString()}.` : ''}`;

  const handleDataPointClick = (dataPoint: any) => {
    if (onDrillDown && dataPoint) {
      onDrillDown(dataPoint);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setFocusedIndex(index);
      if (onDrillDown) {
        onDrillDown(data[index]);
      }
    }
  };

  return (
    <Card 
      className="hover:shadow-lg transition-shadow duration-200"
      role="img"
      aria-labelledby="booking-chart-title"
      aria-describedby="booking-chart-description"
      data-testid="booking-chart"
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle 
          id="booking-chart-title"
          className="text-lg font-semibold"
        >
          {title}
        </CardTitle>
        <div className="flex gap-2">
          <Button
            variant={chartType === 'line' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('line')}
            aria-label="Switch to line chart view"
            data-testid="chart-type-line"
          >
            <TrendingUp className="h-4 w-4" />
          </Button>
          <Button
            variant={chartType === 'bar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('bar')}
            aria-label="Switch to bar chart view"
            data-testid="chart-type-bar"
          >
            <BarChart3 className="h-4 w-4" />
          </Button>
        </div>
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
            {chartType === 'line' ? (
              <LineChart 
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                onClick={handleDataPointClick}
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
                  formatter={(value, name) => [
                    `${value} bookings`,
                    'Bookings'
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                />
                {showRevenue && (
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  />
                )}
              </LineChart>
            ) : (
              <BarChart 
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                onClick={handleDataPointClick}
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
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    color: 'hsl(var(--foreground))'
                  }}
                />
                <Bar
                  dataKey="bookings"
                  fill="#3b82f6"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Interactive Data Points for Keyboard Navigation */}
        <div className="mt-4 sr-only">
          <h3>Data points for keyboard navigation:</h3>
          {data.map((point, index) => (
            <button
              key={index}
              onClick={() => handleDataPointClick(point)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              className="block w-full text-left p-1 hover:bg-muted focus:bg-muted focus:outline-none"
              aria-label={`${point.label}: ${point.bookings} bookings${point.revenue ? `, $${point.revenue} revenue` : ''}`}
            >
              {point.label}: {point.bookings} bookings
            </button>
          ))}
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
                {showRevenue && (
                  <th scope="col" className="text-left p-1 border-b">Revenue</th>
                )}
              </tr>
            </thead>
            <tbody>
              {data.map((point, index) => (
                <tr 
                  key={index}
                  className={focusedIndex === index ? 'bg-muted' : ''}
                >
                  <td className="p-1 border-b">{point.label}</td>
                  <td className="p-1 border-b">{point.bookings}</td>
                  {showRevenue && (
                    <td className="p-1 border-b">${(point.revenue || 0).toLocaleString()}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </CardContent>
    </Card>
  );
};
