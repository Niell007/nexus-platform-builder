
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Activity, TrendingUp, Shield, Calendar, Settings, Home, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ServiceBooking from '@/components/ServiceBooking';
import { useState } from 'react';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const stats = [
    {
      title: 'Total Bookings',
      value: '8',
      description: '+2 from last month',
      icon: Calendar,
      color: 'text-blue-500'
    },
    {
      title: 'Active Services',
      value: '3',
      description: 'Currently in progress',
      icon: Activity,
      color: 'text-green-500'
    },
    {
      title: 'Completed',
      value: '12',
      description: '+20% completion rate',
      icon: TrendingUp,
      color: 'text-purple-500'
    },
    {
      title: 'Profile Score',
      value: '4.8',
      description: 'Based on 12 reviews',
      icon: Shield,
      color: 'text-yellow-500'
    },
  ];

  const recentBookings = [
    {
      id: 1,
      service: 'Home Cleaning',
      date: '2024-06-20',
      status: 'Completed',
      provider: 'Sarah Johnson'
    },
    {
      id: 2,
      service: 'Plumbing Repair',
      date: '2024-06-18',
      status: 'In Progress',
      provider: 'Mike Wilson'
    },
    {
      id: 3,
      service: 'Electrical Work',
      date: '2024-06-15',
      status: 'Scheduled',
      provider: 'Alex Chen'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Home className="h-5 w-5" />
                <span className="font-semibold">ServicePro</span>
              </Link>
              <span className="text-muted-foreground">/ Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setShowBookingModal(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Service
              </Button>
              <Link to="/admin">
                <Button variant="outline" size="sm">
                  <Shield className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0]}!
          </h1>
          <p className="text-muted-foreground">
            Manage your services and track your bookings from your personal dashboard.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Quick Actions */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Manage your services and account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Button 
                  onClick={() => setShowBookingModal(true)}
                  className="h-20 flex-col space-y-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Calendar className="h-6 w-6" />
                  <span>Book New Service</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Activity className="h-6 w-6" />
                  <span>View Active Bookings</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <TrendingUp className="h-6 w-6" />
                  <span>Service History</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Settings className="h-6 w-6" />
                  <span>Account Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Bookings */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Your latest service requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{booking.service}</p>
                      <p className="text-xs text-muted-foreground">{booking.provider}</p>
                      <p className="text-xs text-muted-foreground">{booking.date}</p>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Service Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <ServiceBooking onClose={() => setShowBookingModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
