
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Activity, User, Settings, Shield } from 'lucide-react';
import { AdminLog } from '@/hooks/useAdmin';
import { format } from 'date-fns';

interface AdminLogsProps {
  logs: AdminLog[];
}

const AdminLogs: React.FC<AdminLogsProps> = ({ logs }) => {
  const getActionIcon = (action: string) => {
    if (action.includes('role')) return <User className="h-4 w-4" />;
    if (action.includes('setting')) return <Settings className="h-4 w-4" />;
    if (action.includes('admin')) return <Shield className="h-4 w-4" />;
    return <Activity className="h-4 w-4" />;
  };

  const getActionBadgeVariant = (action: string) => {
    if (action.includes('admin') || action.includes('promote')) return 'destructive' as const;
    if (action.includes('role')) return 'secondary' as const;
    if (action.includes('setting')) return 'outline' as const;
    return 'default' as const;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Logs</CardTitle>
        <CardDescription>
          Track all administrative actions and changes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Admin ID</TableHead>
                <TableHead>Target User</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    No admin actions recorded
                  </TableCell>
                </TableRow>
              ) : (
                logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getActionIcon(log.action)}
                        <Badge variant={getActionBadgeVariant(log.action)}>
                          {log.action}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {log.admin_id.slice(0, 8)}...
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {log.target_user_id ? `${log.target_user_id.slice(0, 8)}...` : '-'}
                    </TableCell>
                    <TableCell>
                      {log.details ? (
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {JSON.stringify(log.details)}
                        </code>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      {format(new Date(log.created_at), 'MMM dd, yyyy HH:mm:ss')}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminLogs;
