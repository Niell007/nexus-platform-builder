
"use client";

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, RotateCcw } from 'lucide-react';

interface ConnectionStatusProps {
  status: 'connected' | 'disconnected' | 'reconnecting';
  lastUpdated?: string;
}

/**
 * Connection Status Indicator
 * Shows real-time connection state
 */
export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  status,
  lastUpdated
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          icon: Wifi,
          text: 'Live',
          variant: 'default' as const,
          className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
        };
      case 'reconnecting':
        return {
          icon: RotateCcw,
          text: 'Reconnecting',
          variant: 'secondary' as const,
          className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
        };
      case 'disconnected':
        return {
          icon: WifiOff,
          text: 'Offline',
          variant: 'destructive' as const,
          className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        };
    }
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <Badge className={config.className}>
        <IconComponent className={`h-3 w-3 mr-1 ${status === 'reconnecting' ? 'animate-spin' : ''}`} />
        {config.text}
      </Badge>
      {lastUpdated && status === 'connected' && (
        <span>
          Updated {new Date(lastUpdated).toLocaleTimeString()}
        </span>
      )}
    </div>
  );
};
