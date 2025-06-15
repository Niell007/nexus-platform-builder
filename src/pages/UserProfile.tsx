
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/layout/Navbar';
import SEOHead from '@/components/SEO/SEOHead';
import { User, Mail, Calendar, Shield, Star, Award, MapPin, Phone, Camera } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const UserProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    phone: user?.user_metadata?.phone || '',
    address: user?.user_metadata?.address || '',
    bio: user?.user_metadata?.bio || ''
  });

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleSave = () => {
    // TODO: Implement profile update functionality with Supabase
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const profileCompletion = () => {
    const fields = [formData.fullName, formData.email, formData.phone, formData.address];
    const completed = fields.filter(field => field && field.trim() !== '').length;
    return (completed / fields.length) * 100;
  };

  const userStats = [
    { label: "Services Booked", value: "12", icon: Calendar },
    { label: "Total Spent", value: "$2,340", icon: Award },
    { label: "Reviews Given", value: "8", icon: Star },
    { label: "Member Since", value: new Date(user.created_at).getFullYear().toString(), icon: Shield }
  ];

  const recentBookings = [
    { service: "Home Cleaning", date: "2024-03-15", status: "Completed", rating: 5 },
    { service: "Plumbing Repair", date: "2024-03-10", status: "Completed", rating: 4 },
    { service: "Electrical Work", date: "2024-03-05", status: "In Progress", rating: null }
  ];

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Profile", url: "/profile" }
  ];

  return (
    <>
      <SEOHead
        title="My Profile - ServiceMaster Pro"
        description="Manage your profile settings and personal information"
        canonical="/profile"
        breadcrumbs={breadcrumbs}
      />
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight mb-2">My Profile</h1>
              <p className="text-muted-foreground">
                Manage your personal information and account preferences
              </p>
            </div>

            {/* Profile Completion Card */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Profile Completion
                  <Badge variant={profileCompletion() === 100 ? "default" : "secondary"}>
                    {Math.round(profileCompletion())}%
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={profileCompletion()} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  Complete your profile to get better service recommendations
                </p>
              </CardContent>
            </Card>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <div className="grid gap-6">
                  {/* Profile Information Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Profile Information
                      </CardTitle>
                      <CardDescription>
                        Manage your personal information and account settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Avatar Section */}
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <Avatar className="h-24 w-24">
                            <AvatarImage src={user.user_metadata?.avatar_url} />
                            <AvatarFallback className="text-xl">
                              {user.user_metadata?.full_name ? getInitials(user.user_metadata.full_name) : user.email?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                          >
                            <Camera className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg">
                            {user.user_metadata?.full_name || 'Complete your profile'}
                          </h3>
                          <p className="text-muted-foreground">{user.email}</p>
                          <Badge variant="outline" className="w-fit">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified User
                          </Badge>
                        </div>
                      </div>

                      {/* Form Fields */}
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input
                            id="fullName"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            disabled={!isEditing}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            value={formData.email}
                            disabled
                            className="bg-muted"
                          />
                          <p className="text-xs text-muted-foreground">
                            Email cannot be changed. Contact support if needed.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            disabled={!isEditing}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            disabled={!isEditing}
                            placeholder="123 Main St, City, State"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Input
                          id="bio"
                          value={formData.bio}
                          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                          disabled={!isEditing}
                          placeholder="Tell us a bit about yourself..."
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {isEditing ? (
                          <>
                            <Button onClick={handleSave}>Save Changes</Button>
                            <Button variant="outline" onClick={() => setIsEditing(false)}>
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {userStats.map((stat, index) => (
                      <Card key={index}>
                        <CardContent className="p-4 text-center">
                          <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                          <div className="text-2xl font-bold">{stat.value}</div>
                          <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Bookings Tab */}
              <TabsContent value="bookings">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                    <CardDescription>
                      View and manage your service bookings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentBookings.map((booking, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div>
                              <h4 className="font-medium">{booking.service}</h4>
                              <p className="text-sm text-muted-foreground">{booking.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={booking.status === 'Completed' ? 'default' : 'secondary'}>
                              {booking.status}
                            </Badge>
                            {booking.rating && (
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                <span className="text-sm">{booking.rating}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>My Reviews</CardTitle>
                    <CardDescription>
                      Reviews you've left for service providers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="font-medium mb-2">No Reviews Yet</h3>
                      <p className="text-muted-foreground">
                        Start booking services to leave reviews
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preferences Tab */}
              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Preferences</CardTitle>
                    <CardDescription>
                      Manage your account preferences and settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-4">Notifications</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Email Notifications</p>
                              <p className="text-sm text-muted-foreground">
                                Receive updates about your bookings
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              Enabled
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">SMS Notifications</p>
                              <p className="text-sm text-muted-foreground">
                                Get text updates for booking confirmations
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              Disabled
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-4">Privacy</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Profile Visibility</p>
                              <p className="text-sm text-muted-foreground">
                                Control who can see your profile
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              Private
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
};

export default UserProfile;
