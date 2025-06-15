
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Navbar from '@/components/layout/Navbar';
import SEOHead from '@/components/SEO/SEOHead';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useLocalization } from '@/hooks/useLocalization';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Smartphone,
  Mail,
  MapPin,
  CreditCard,
  Download,
  Trash2,
  AlertTriangle,
  Moon,
  Sun,
  Monitor
} from 'lucide-react';
import { Navigate } from 'react-router-dom';

const Settings = () => {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const { locale, setLocale, formatCurrency } = useLocalization();
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'private',
    dataCollection: true,
    analytics: true
  });

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key: string, value: any) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  };

  const handleExportData = () => {
    // Simulate data export
    console.log('Exporting user data...');
  };

  const handleDeleteAccount = () => {
    // Handle account deletion
    console.log('Account deletion requested...');
  };

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Settings", url: "/settings" }
  ];

  return (
    <>
      <SEOHead
        title="Settings - ServiceMaster Pro"
        description="Manage your account settings, preferences, and privacy options"
        canonical="/settings"
        breadcrumbs={breadcrumbs}
      />
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Settings Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
                <SettingsIcon className="h-8 w-8" />
                Settings
              </h1>
              <p className="text-muted-foreground">
                Manage your account preferences and privacy settings
              </p>
            </div>

            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
              </TabsList>

              {/* General Settings */}
              <TabsContent value="general">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5" />
                        Regional Settings
                      </CardTitle>
                      <CardDescription>
                        Configure your language, timezone, and regional preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="language">Language</Label>
                          <Select value={locale.language} onValueChange={(value) => setLocale({...locale, language: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Español</SelectItem>
                              <SelectItem value="fr">Français</SelectItem>
                              <SelectItem value="de">Deutsch</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="timezone">Timezone</Label>
                          <Select value={locale.timezone} onValueChange={(value) => setLocale({...locale, timezone: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="America/New_York">Eastern Time</SelectItem>
                              <SelectItem value="America/Chicago">Central Time</SelectItem>
                              <SelectItem value="America/Denver">Mountain Time</SelectItem>
                              <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="currency">Currency</Label>
                          <Select value={locale.currency} onValueChange={(value) => setLocale({...locale, currency: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">USD ($)</SelectItem>
                              <SelectItem value="EUR">EUR (€)</SelectItem>
                              <SelectItem value="GBP">GBP (£)</SelectItem>
                              <SelectItem value="CAD">CAD (C$)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="units">Measurement Units</Label>
                          <Select value={locale.units} onValueChange={(value) => setLocale({...locale, units: value as 'metric' | 'imperial'})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="imperial">Imperial</SelectItem>
                              <SelectItem value="metric">Metric</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="pt-4">
                        <p className="text-sm text-muted-foreground">
                          Example: Prices will be shown as {formatCurrency(99.99)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Location Settings
                      </CardTitle>
                      <CardDescription>
                        Manage your default location for service searches
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="default-address">Default Address</Label>
                        <Input
                          id="default-address"
                          placeholder="123 Main St, City, State, ZIP"
                          value={user.user_metadata?.address || ''}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="search-radius">Search Radius</Label>
                        <Select defaultValue="25">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10">10 miles</SelectItem>
                            <SelectItem value="25">25 miles</SelectItem>
                            <SelectItem value="50">50 miles</SelectItem>
                            <SelectItem value="100">100 miles</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Notifications Settings */}
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>
                      Choose how you want to be notified about updates and activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            <Label htmlFor="email-notifications">Email Notifications</Label>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Receive booking confirmations and updates via email
                          </p>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={notifications.email}
                          onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <Smartphone className="h-4 w-4" />
                            <Label htmlFor="sms-notifications">SMS Notifications</Label>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Get text messages for urgent updates and reminders
                          </p>
                        </div>
                        <Switch
                          id="sms-notifications"
                          checked={notifications.sms}
                          onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <Bell className="h-4 w-4" />
                            <Label htmlFor="push-notifications">Push Notifications</Label>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Browser notifications for real-time updates
                          </p>
                        </div>
                        <Switch
                          id="push-notifications"
                          checked={notifications.push}
                          onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="marketing-notifications">Marketing Communications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive promotional offers and service updates
                          </p>
                        </div>
                        <Switch
                          id="marketing-notifications"
                          checked={notifications.marketing}
                          onCheckedChange={(checked) => handleNotificationChange('marketing', checked)}
                        />
                      </div>
                    </div>

                    <Alert>
                      <Bell className="h-4 w-4" />
                      <AlertDescription>
                        You'll always receive critical notifications about your bookings regardless of these settings.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Privacy Settings */}
              <TabsContent value="privacy">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Privacy & Data
                      </CardTitle>
                      <CardDescription>
                        Control your privacy settings and data usage preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Profile Visibility</Label>
                            <p className="text-sm text-muted-foreground">
                              Control who can see your profile information
                            </p>
                          </div>
                          <Select 
                            value={privacy.profileVisibility} 
                            onValueChange={(value) => handlePrivacyChange('profileVisibility', value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="public">Public</SelectItem>
                              <SelectItem value="private">Private</SelectItem>
                              <SelectItem value="providers">Providers Only</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="data-collection">Data Collection</Label>
                            <p className="text-sm text-muted-foreground">
                              Allow us to collect usage data to improve our services
                            </p>
                          </div>
                          <Switch
                            id="data-collection"
                            checked={privacy.dataCollection}
                            onCheckedChange={(checked) => handlePrivacyChange('dataCollection', checked)}
                          />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="analytics">Analytics</Label>
                            <p className="text-sm text-muted-foreground">
                              Help us understand how you use our platform
                            </p>
                          </div>
                          <Switch
                            id="analytics"
                            checked={privacy.analytics}
                            onCheckedChange={(checked) => handlePrivacyChange('analytics', checked)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Data Management</CardTitle>
                      <CardDescription>
                        Download or delete your personal data
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" onClick={handleExportData} className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Export My Data
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        Download a copy of all your data in JSON format
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Appearance Settings */}
              <TabsContent value="appearance">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5" />
                      Appearance
                    </CardTitle>
                    <CardDescription>
                      Customize how the application looks and feels
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-base font-medium">Theme</Label>
                        <p className="text-sm text-muted-foreground mb-4">
                          Choose your preferred color scheme
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                          <Card 
                            className={`cursor-pointer border-2 ${theme === 'light' ? 'border-primary' : 'border-muted'}`}
                            onClick={() => setTheme('light')}
                          >
                            <CardContent className="p-4 text-center">
                              <Sun className="h-6 w-6 mx-auto mb-2" />
                              <p className="text-sm font-medium">Light</p>
                            </CardContent>
                          </Card>
                          <Card 
                            className={`cursor-pointer border-2 ${theme === 'dark' ? 'border-primary' : 'border-muted'}`}
                            onClick={() => setTheme('dark')}
                          >
                            <CardContent className="p-4 text-center">
                              <Moon className="h-6 w-6 mx-auto mb-2" />
                              <p className="text-sm font-medium">Dark</p>
                            </CardContent>
                          </Card>
                          <Card 
                            className={`cursor-pointer border-2 ${theme === 'system' ? 'border-primary' : 'border-muted'}`}
                            onClick={() => setTheme('system')}
                          >
                            <CardContent className="p-4 text-center">
                              <Monitor className="h-6 w-6 mx-auto mb-2" />
                              <p className="text-sm font-medium">System</p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <Label className="text-base font-medium">Display Options</Label>
                        <div className="space-y-3 mt-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Compact Mode</p>
                              <p className="text-sm text-muted-foreground">
                                Show more content in less space
                              </p>
                            </div>
                            <Switch />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Reduced Motion</p>
                              <p className="text-sm text-muted-foreground">
                                Minimize animations and transitions
                              </p>
                            </div>
                            <Switch />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Account Settings */}
              <TabsContent value="account">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Billing & Payments
                      </CardTitle>
                      <CardDescription>
                        Manage your payment methods and billing information
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-6">
                        <CreditCard className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="font-medium mb-2">No Payment Methods</h3>
                        <p className="text-muted-foreground mb-4">
                          Add a payment method to streamline your bookings
                        </p>
                        <Button>Add Payment Method</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Security</CardTitle>
                      <CardDescription>
                        Manage your account security settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline">Change Password</Button>
                      <Button variant="outline">Enable Two-Factor Authentication</Button>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Last login: {new Date().toLocaleDateString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-destructive">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-destructive">
                        <AlertTriangle className="h-5 w-5" />
                        Danger Zone
                      </CardTitle>
                      <CardDescription>
                        Irreversible actions that will permanently affect your account
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          Account deletion is permanent and cannot be undone. All your data will be lost.
                        </AlertDescription>
                      </Alert>
                      <Button 
                        variant="destructive" 
                        onClick={handleDeleteAccount}
                        className="flex items-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete Account
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
};

export default Settings;
