
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/layout/Navbar';
import SEOHead from '@/components/SEO/SEOHead';
import { Settings as SettingsIcon, Bell, Shield, Moon, Globe } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';

const Settings = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false
  });
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    activityVisible: false
  });

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <>
      <SEOHead
        title="Settings - ServiceMaster Pro"
        description="Manage your account settings, notifications, and preferences"
        canonical="/settings"
      />
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Settings</h1>
            
            <div className="space-y-6">
              {/* Appearance Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Moon className="h-5 w-5" />
                    Appearance
                  </CardTitle>
                  <CardDescription>
                    Customize how the application looks and feels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="theme">Theme</Label>
                      <p className="text-sm text-muted-foreground">
                        Choose your preferred color scheme
                      </p>
                    </div>
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications
                  </CardTitle>
                  <CardDescription>
                    Control how you receive notifications and updates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive booking updates and promotions via email
                      </p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notifications.email}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, email: checked })
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Get instant updates on your device
                      </p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={notifications.push}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, push: checked })
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms-notifications">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive important updates via text message
                      </p>
                    </div>
                    <Switch
                      id="sms-notifications"
                      checked={notifications.sms}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, sms: checked })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Privacy Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Privacy
                  </CardTitle>
                  <CardDescription>
                    Manage your privacy and data sharing preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="profile-visible">Public Profile</Label>
                      <p className="text-sm text-muted-foreground">
                        Make your profile visible to other users
                      </p>
                    </div>
                    <Switch
                      id="profile-visible"
                      checked={privacy.profileVisible}
                      onCheckedChange={(checked) => 
                        setPrivacy({ ...privacy, profileVisible: checked })
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="activity-visible">Activity Status</Label>
                      <p className="text-sm text-muted-foreground">
                        Show when you're active on the platform
                      </p>
                    </div>
                    <Switch
                      id="activity-visible"
                      checked={privacy.activityVisible}
                      onCheckedChange={(checked) => 
                        setPrivacy({ ...privacy, activityVisible: checked })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Language & Region */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Language & Region
                  </CardTitle>
                  <CardDescription>
                    Set your language and regional preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue="en">
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
                    
                    <div>
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="utc">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc">UTC</SelectItem>
                          <SelectItem value="est">Eastern Time</SelectItem>
                          <SelectItem value="pst">Pacific Time</SelectItem>
                          <SelectItem value="cst">Central Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button size="lg">Save All Settings</Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Settings;
