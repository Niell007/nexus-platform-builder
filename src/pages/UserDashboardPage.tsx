
import React from 'react';
import SEOHead from '@/components/SEO/SEOHead';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookingManagement } from '@/components/BookingManagement';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import { User, Calendar, Star, TrendingUp } from 'lucide-react';

/**
 * User Dashboard Page
 * Personal dashboard for users to manage their bookings and profile
 */
const UserDashboardPage: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: "Total Bookings",
      value: "12",
      description: "Services booked",
      icon: Calendar,
      trend: "+2 this month"
    },
    {
      title: "Completed",
      value: "8",
      description: "Services completed",
      icon: Star,
      trend: "67% completion rate"
    },
    {
      title: "Saved",
      value: "$340",
      description: "Through our platform",
      icon: TrendingUp,
      trend: "vs market rates"
    }
  ];

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Dashboard", url: "/dashboard" }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>Please log in to view your dashboard</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="My Dashboard - ServiceMaster Pro | Manage Your Bookings"
        description="Manage your service bookings, view your history, and track your account on your personal dashboard. Access your ServiceMaster Pro account securely."
        canonical="/dashboard"
        schemaType="WebPage"
        breadcrumbs={breadcrumbs}
      />
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Welcome back, {user.user_metadata?.full_name || user.email?.split('@')[0]}!
            </h1>
            <p className="text-muted-foreground">
              Manage your service bookings and account settings from your personal dashboard.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                  <p className="text-xs text-green-600 mt-1">{stat.trend}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Profile Card */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm font-medium">Name</p>
                  <p className="text-sm text-muted-foreground">
                    {user.user_metadata?.full_name || 'Not set'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Member Since</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <button className="p-4 text-left border rounded-lg hover:bg-muted transition-colors">
                      <h3 className="font-medium">Book a Service</h3>
                      <p className="text-sm text-muted-foreground">Find and book professional services</p>
                    </button>
                    <button className="p-4 text-left border rounded-lg hover:bg-muted transition-colors">
                      <h3 className="font-medium">Browse Services</h3>
                      <p className="text-sm text-muted-foreground">Explore all available services</p>
                    </button>
                    <button className="p-4 text-left border rounded-lg hover:bg-muted transition-colors">
                      <h3 className="font-medium">Contact Support</h3>
                      <p className="text-sm text-muted-foreground">Get help with your bookings</p>
                    </button>
                    <button className="p-4 text-left border rounded-lg hover:bg-muted transition-colors">
                      <h3 className="font-medium">Account Settings</h3>
                      <p className="text-sm text-muted-foreground">Update your profile and preferences</p>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Booking Management */}
          <BookingManagement />
        </main>
      </div>
    </>
  );
};

export default UserDashboardPage;
