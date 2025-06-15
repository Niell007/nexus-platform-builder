
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendChart as TrendChartType } from '@/types/dashboard';
import { Link } from 'react-router-dom';

interface TrendChartProps {
  chart: TrendChartType;
}

/**
 * Accessible Trend Chart Component
 * Displays time-series data with proper ARIA labels and keyboard navigation
 */
export const TrendChart: React.FC<TrendChartProps> = ({ chart }) => {
  // Create accessible data summary for screen readers
  const dataSummary = `Chart showing ${chart.title.toLowerCase()}. 
    Values range from ${Math.min(...chart.data.map(d => d.value))} to ${Math.max(...chart.data.map(d => d.value))} 
    over ${chart.data.length} data points from ${chart.data[0]?.date} to ${chart.data[chart.data.length - 1]?.date}.`;

  return (
    <Card 
      className="hover:shadow-lg transition-shadow duration-200"
      role="img"
      aria-labelledby={`chart-title-${chart.id}`}
      aria-describedby={`chart-description-${chart.id}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle 
          id={`chart-title-${chart.id}`}
          className="text-lg font-semibold"
        >
          {chart.title}
        </CardTitle>
        {chart.drillDownPath && (
          <Button 
            variant="outline" 
            size="sm"
            asChild
          >
            <Link 
              to={chart.drillDownPath}
              aria-label={`View detailed analytics for ${chart.title.toLowerCase()}`}
            >
              View Analytics
            </Link>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {/* Screen reader description */}
        <div 
          id={`chart-description-${chart.id}`}
          className="sr-only"
          aria-live="polite"
        >
          {dataSummary}
        </div>

        {/* Chart Container */}
        <div className="h-64 w-full" role="presentation">
          <ResponsiveContainer width="100%" height="100%">
            {chart.type === 'bar' ? (
              <BarChart 
                data={chart.data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="date" 
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
                    value: chart.yAxisLabel, 
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
                <Bar dataKey="value" fill={chart.color} />
              </BarChart>
            ) : (
              <LineChart 
                data={chart.data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="date" 
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
                    value: chart.yAxisLabel, 
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
                  dataKey="value"
                  stroke={chart.color}
                  strokeWidth={2}
                  dot={{ fill: chart.color, strokeWidth: 2 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Data Table for Accessibility */}
        <details className="mt-4">
          <summary className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">
            View data table
          </summary>
          <table className="mt-2 w-full text-sm" role="table">
            <caption className="sr-only">
              Data table for {chart.title}
            </caption>
            <thead>
              <tr>
                <th scope="col" className="text-left p-1 border-b">Date</th>
                <th scope="col" className="text-left p-1 border-b">{chart.yAxisLabel}</th>
              </tr>
            </thead>
            <tbody>
              {chart.data.map((point, index) => (
                <tr key={index}>
                  <td className="p-1 border-b">{point.date}</td>
                  <td className="p-1 border-b">{point.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </CardContent>
    </Card>
  );
};
