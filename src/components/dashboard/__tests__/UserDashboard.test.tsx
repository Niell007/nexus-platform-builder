
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UserDashboard } from '../UserDashboard';

// Mock the custom hook
jest.mock('@/hooks/useDashboardData', () => ({
  useDashboardData: jest.fn()
}));

const mockUseDashboardData = require('@/hooks/useDashboardData').useDashboardData;

// Mock recharts to avoid canvas issues in tests
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div data-testid="chart-container">{children}</div>,
  LineChart: ({ children }: any) => <div data-testid="line-chart">{children}</div>,
  BarChart: ({ children }: any) => <div data-testid="bar-chart">{children}</div>,
  Line: () => <div data-testid="line" />,
  Bar: () => <div data-testid="bar" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="grid" />,
  Tooltip: () => <div data-testid="tooltip" />
}));

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

const mockDashboardData = {
  kpis: [
    {
      id: 'test-kpi',
      title: 'Test KPI',
      value: 100,
      changeType: 'increase' as const,
      icon: 'trending-up',
      color: 'blue' as const
    }
  ],
  charts: [
    {
      id: 'test-chart',
      title: 'Test Chart',
      data: [{ date: '2024-01-01', value: 100 }],
      type: 'line' as const,
      color: '#3b82f6',
      yAxisLabel: 'Test Values'
    }
  ],
  insights: [
    {
      id: 'test-insight',
      title: 'Test Insight',
      description: 'Test description',
      type: 'info' as const,
      priority: 'medium' as const,
      timestamp: '2024-01-01T00:00:00Z'
    }
  ],
  lastUpdated: '2024-01-01T00:00:00Z'
};

describe('UserDashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state correctly', () => {
    mockUseDashboardData.mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: jest.fn()
    });

    render(
      <TestWrapper>
        <UserDashboard />
      </TestWrapper>
    );

    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading dashboard data');
    expect(screen.getByText('Loading dashboard data...')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    const mockRefetch = jest.fn();
    mockUseDashboardData.mockReturnValue({
      data: null,
      loading: false,
      error: 'Failed to load data',
      refetch: mockRefetch
    });

    render(
      <TestWrapper>
        <UserDashboard />
      </TestWrapper>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Failed to load data')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('renders dashboard with data correctly', async () => {
    mockUseDashboardData.mockReturnValue({
      data: mockDashboardData,
      loading: false,
      error: null,
      refetch: jest.fn()
    });

    render(
      <TestWrapper>
        <UserDashboard />
      </TestWrapper>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Welcome to your performance overview')).toBeInTheDocument();
    expect(screen.getByText('Test KPI')).toBeInTheDocument();
    expect(screen.getByText('Test Chart')).toBeInTheDocument();
    expect(screen.getByText('Test Insight')).toBeInTheDocument();
  });

  it('is accessible with proper headings and landmarks', () => {
    mockUseDashboardData.mockReturnValue({
      data: mockDashboardData,
      loading: false,
      error: null,
      refetch: jest.fn()
    });

    render(
      <TestWrapper>
        <UserDashboard />
      </TestWrapper>
    );

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText('Key Performance Indicators')).toBeInTheDocument();
    expect(screen.getByText('Trend Charts and Analytics')).toBeInTheDocument();
  });

  it('handles refresh functionality', () => {
    const mockRefetch = jest.fn();
    mockUseDashboardData.mockReturnValue({
      data: mockDashboardData,
      loading: false,
      error: null,
      refetch: mockRefetch
    });

    render(
      <TestWrapper>
        <UserDashboard />
      </TestWrapper>
    );

    const refreshButton = screen.getByRole('button', { name: /refresh dashboard data/i });
    refreshButton.click();
    
    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });
});
