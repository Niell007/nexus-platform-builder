
export interface KPIMetric {
  id: string;
  title: string;
  value: number | string;
  previousValue?: number;
  change?: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  unit?: string;
  icon: string;
  color: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  drillDownPath?: string;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface TrendChart {
  id: string;
  title: string;
  data: ChartDataPoint[];
  type: 'line' | 'bar' | 'area';
  color: string;
  yAxisLabel: string;
  drillDownPath?: string;
}

export interface UserInsight {
  id: string;
  title: string;
  description: string;
  type: 'recommendation' | 'alert' | 'info';
  priority: 'high' | 'medium' | 'low';
  actionText?: string;
  actionPath?: string;
  timestamp: string;
}

export interface DashboardData {
  kpis: KPIMetric[];
  charts: TrendChart[];
  insights: UserInsight[];
  lastUpdated: string;
}
