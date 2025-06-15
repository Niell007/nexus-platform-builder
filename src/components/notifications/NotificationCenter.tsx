
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, BellOff, Check, X, Clock, User, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

const NotificationCenter = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    // Simulate real-time notifications
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'success',
        title: 'Service Request Approved',
        message: 'Your web development request has been approved and assigned to our team.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        read: false
      },
      {
        id: '2',
        type: 'info',
        title: 'New Service Available',
        message: 'We\'ve added AI consulting services to our portfolio.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        read: false
      },
      {
        id: '3',
        type: 'warning',
        title: 'Consultation Reminder',
        message: 'Your scheduled consultation is tomorrow at 2:00 PM.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
        read: true
      }
    ];

    if (user) {
      setNotifications(mockNotifications);
    }
  }, [user]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
    toast({
      title: "All notifications marked as read",
      description: "Your notification center has been updated."
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const toggleNotifications = () => {
    setIsEnabled(!isEnabled);
    toast({
      title: isEnabled ? "Notifications Disabled" : "Notifications Enabled",
      description: isEnabled ? "You won't receive new notifications" : "You'll now receive notifications"
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success': return <Check className="h-4 w-4 text-green-400" />;
      case 'warning': return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'error': return <X className="h-4 w-4 text-red-400" />;
      default: return <FileText className="h-4 w-4 text-blue-400" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-600/20 text-green-400';
      case 'warning': return 'bg-yellow-600/20 text-yellow-400';
      case 'error': return 'bg-red-600/20 text-red-400';
      default: return 'bg-blue-600/20 text-blue-400';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-white">
            {isEnabled ? (
              <Bell className="h-5 w-5 text-blue-400" />
            ) : (
              <BellOff className="h-5 w-5 text-gray-400" />
            )}
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              onClick={toggleNotifications}
              size="sm"
              variant={isEnabled ? "outline" : "secondary"}
            >
              {isEnabled ? <BellOff className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
            </Button>
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} size="sm" variant="outline">
                Mark All Read
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No notifications yet</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border ${
                notification.read 
                  ? 'bg-gray-700/50 border-gray-600' 
                  : 'bg-gray-700 border-blue-600/50'
              } transition-all duration-200`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-1">
                    {getTypeIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`font-medium ${notification.read ? 'text-gray-300' : 'text-white'}`}>
                        {notification.title}
                      </h4>
                      <Badge className={getTypeColor(notification.type)}>
                        {notification.type}
                      </Badge>
                    </div>
                    <p className={`text-sm ${notification.read ? 'text-gray-400' : 'text-gray-300'}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {notification.timestamp.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 ml-2">
                  {!notification.read && (
                    <Button
                      onClick={() => markAsRead(notification.id)}
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    onClick={() => deleteNotification(notification.id)}
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationCenter;
