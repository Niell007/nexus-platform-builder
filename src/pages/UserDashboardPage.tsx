
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { UserDashboard } from '@/components/dashboard/UserDashboard';

/**
 * User Dashboard Page
 * Full-page wrapper for the dashboard with SEO and metadata
 */
const UserDashboardPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard - ServicePro</title>
        <meta name="description" content="View your performance metrics, analytics, and insights on your personalized dashboard." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <UserDashboard />
      </div>
    </>
  );
};

export default UserDashboardPage;
