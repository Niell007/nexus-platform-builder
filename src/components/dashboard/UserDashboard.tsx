
import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { KPICard } from './KPICard';
import { TrendChart } from './TrendChart';
import { InsightsPanel } from './InsightsPanel';
import { useDashboardData } from '@/hooks/useDashboardData';

/**
 * Main User Dashboard Component
 * WCAG 2.1 AA compliant dashboard with real-time KPIs, charts, and insights
 */
export const UserDashboard: React.FC = () => {
  const { data, loading, error, refetch } = useDashboardData();

  if (loading) {
    return (
      <div 
        className="flex items-center justify-center min-h-[400px]"
        role="status"
        aria-live="polite"
        aria-label="Loading dashboard data"
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="sr-only">Loading dashboard data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="flex flex-col items-center justify-center min-h-[400px] text-center"
        role="alert"
        aria-live="assertive"
      >
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={refetch} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  if (!data) {
    return (
      <div 
        className="flex items-center justify-center min-h-[400px]"
        role="status"
        aria-live="polite"
      >
        <p>No dashboard data available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Dashboard Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your performance overview
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Last updated: {new Date(data.lastUpdated).toLocaleTimeString()}
          </span>
          <Button 
            onClick={refetch} 
            variant="outline" 
            size="sm"
            aria-label="Refresh dashboard data"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh</span>
          </Button>
        </div>
      </header>

      {/* KPI Grid */}
      <section 
        aria-labelledby="kpi-section-title"
        className="space-y-4"
      >
        <h2 id="kpi-section-title" className="sr-only">
          Key Performance Indicators
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {data.kpis.map((kpi) => (
            <KPICard key={kpi.id} metric={kpi} />
          ))}
        </div>
      </section>

      {/* Charts and Insights Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Charts Section */}
        <section 
          className="lg:col-span-2 space-y-6"
          aria-labelledby="charts-section-title"
        >
          <h2 id="charts-section-title" className="sr-only">
            Trend Charts and Analytics
          </h2>
          {data.charts.map((chart) => (
            <TrendChart key={chart.id} chart={chart} />
          ))}
        </section>

        {/* Insights Section */}
        <section 
          className="lg:col-span-1"
          aria-labelledby="insights-section-title"
        >
          <h2 id="insights-section-title" className="sr-only">
            Personalized Insights and Recommendations
          </h2>
          <InsightsPanel insights={data.insights} />
        </section>
      </div>
    </div>
  );
};
