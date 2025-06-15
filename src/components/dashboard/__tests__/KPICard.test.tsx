
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { KPICard } from '../KPICard';
import { KPIMetric } from '@/types/dashboard';

// Mock data for testing
const mockKPI: KPIMetric = {
  id: 'test-kpi',
  title: 'Test Metric',
  value: 100,
  previousValue: 90,
  change: 11.1,
  changeType: 'increase',
  unit: '$',
  icon: 'trending-up',
  color: 'green',
  drillDownPath: '/test-path'
};

// Wrapper for router context
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('KPICard', () => {
  it('renders KPI card with correct data', () => {
    render(
      <TestWrapper>
        <KPICard metric={mockKPI} />
      </TestWrapper>
    );

    expect(screen.getByText('Test Metric')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('11.1% from last period')).toBeInTheDocument();
  });

  it('displays drill-down link when provided', () => {
    render(
      <TestWrapper>
        <KPICard metric={mockKPI} />
      </TestWrapper>
    );

    const drillDownLink = screen.getByRole('link', { name: /view detailed test metric information/i });
    expect(drillDownLink).toBeInTheDocument();
    expect(drillDownLink).toHaveAttribute('href', '/test-path');
  });

  it('handles decrease change type correctly', () => {
    const decreaseKPI = { ...mockKPI, changeType: 'decrease' as const, change: -5.5 };
    
    render(
      <TestWrapper>
        <KPICard metric={decreaseKPI} />
      </TestWrapper>
    );

    expect(screen.getByText('5.5% from last period')).toBeInTheDocument();
  });

  it('is accessible with proper ARIA labels', () => {
    render(
      <TestWrapper>
        <KPICard metric={mockKPI} />
      </TestWrapper>
    );

    expect(screen.getByRole('article')).toHaveAttribute('aria-labelledby', 'kpi-title-test-kpi');
    expect(screen.getByRole('article')).toHaveAttribute('aria-describedby', 'kpi-description-test-kpi');
  });

  it('handles missing optional props gracefully', () => {
    const minimalKPI: KPIMetric = {
      id: 'minimal-kpi',
      title: 'Minimal Metric',
      value: 50,
      changeType: 'neutral',
      icon: 'activity',
      color: 'blue'
    };

    render(
      <TestWrapper>
        <KPICard metric={minimalKPI} />
      </TestWrapper>
    );

    expect(screen.getByText('Minimal Metric')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.queryByText('View Details')).not.toBeInTheDocument();
  });
});
