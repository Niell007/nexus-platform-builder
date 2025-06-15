
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Activity, Settings, Shield, ArrowLeft } from 'lucide-react';
import { useAdmin, AdminUser, AdminLog, SystemSetting } from '@/hooks/useAdmin';
import UserManagement from './UserManagement';
import AdminLogs from './AdminLogs';
import SystemSettings from './SystemSettings';
import Navbar from '@/components/layout/Navbar';

interface AdminPanelProps {
  onExit: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onExit }) => {
  const { isAdmin, getAllUsers, getAdminLogs, getSystemSettings } = useAdmin();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [logs, setLogs] = useState<AdminLog[]>([]);
  const [settings, setSettings] = useState<SystemSetting[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    adminUsers: 0,
    recentActions: 0
  });

  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [isAdmin]);

  const loadData = async () => {
    const [usersData, logsData, settingsData] = await Promise.all([
      getAllUsers(),
      getAdminLogs(),
      getSystemSettings()
    ]);

    setUsers(usersData);
    setLogs(logsData);
    setSettings(settingsData);

    setStats({
      totalUsers: usersData.length,
      adminUsers: usersData.filter(u => u.role === 'admin').length,
      recentActions: logsData.filter(l => {
        const logDate = new Date(l.created_at);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return logDate > yesterday;
      }).length
    });
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Access Denied</CardTitle>
            <CardDescription>You do not have administrative privileges</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={onExit}>Return to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Shield className="h-8 w-8 text-red-600" />
              Admin Panel
              <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                🇺🇸 PATRIOT MODE
              </Badge>
            </h1>
            <p className="text-muted-foreground">
              Administrative control center for system management
            </p>
          </div>
          <Button variant="outline" onClick={onExit} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Exit Admin Panel
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                {stats.adminUsers} administrators
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Actions</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.recentActions}</div>
              <p className="text-xs text-muted-foreground">
                Last 24 hours
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Operational</div>
              <p className="text-xs text-muted-foreground">
                All systems normal
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Activity Logs
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              System Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UserManagement users={users} onRefresh={loadData} />
          </TabsContent>

          <TabsContent value="logs">
            <AdminLogs logs={logs} />
          </TabsContent>

          <TabsContent value="settings">
            <SystemSettings settings={settings} onRefresh={loadData} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPanel;
