
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface AdminLog {
  id: string;
  admin_id: string;
  action: string;
  target_user_id: string | null;
  details: any;
  created_at: string;
}

export interface SystemSetting {
  id: string;
  key: string;
  value: any;
  description: string;
  updated_by: string | null;
  updated_at: string;
}

export const useAdmin = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminStatus();
  }, [user]);

  const checkAdminStatus = async () => {
    if (!user) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      setIsAdmin(profile?.role === 'admin');
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  const verifyPatriotPassphrase = async (passphrase: string): Promise<boolean> => {
    try {
      const { data } = await supabase
        .from('system_settings')
        .select('value')
        .eq('key', 'patriot_passphrase')
        .single();

      return data?.value === passphrase;
    } catch (error) {
      console.error('Error verifying passphrase:', error);
      return false;
    }
  };

  const promoteToAdmin = async (passphrase: string): Promise<boolean> => {
    if (!user) return false;

    const isValidPassphrase = await verifyPatriotPassphrase(passphrase);
    if (!isValidPassphrase) {
      toast({
        title: "Access Denied",
        description: "Invalid passphrase",
        variant: "destructive"
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', user.id);

      if (error) throw error;

      await logAdminAction('Self-promoted to admin via Patriot Mode');
      setIsAdmin(true);
      
      toast({
        title: "Welcome, Admin",
        description: "You now have administrative privileges"
      });
      
      return true;
    } catch (error) {
      console.error('Error promoting to admin:', error);
      toast({
        title: "Error",
        description: "Failed to promote to admin",
        variant: "destructive"
      });
      return false;
    }
  };

  const logAdminAction = async (action: string, targetUserId?: string, details?: any) => {
    if (!isAdmin) return;

    try {
      await supabase.rpc('log_admin_action', {
        action_text: action,
        target_user: targetUserId || null,
        action_details: details || null
      });
    } catch (error) {
      console.error('Error logging admin action:', error);
    }
  };

  const getAllUsers = async (): Promise<AdminUser[]> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;

      await logAdminAction(`Changed user role to ${newRole}`, userId, { newRole });
      
      toast({
        title: "Success",
        description: "User role updated successfully"
      });
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive"
      });
    }
  };

  const getAdminLogs = async (): Promise<AdminLog[]> => {
    try {
      const { data, error } = await supabase
        .from('admin_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching admin logs:', error);
      return [];
    }
  };

  const getSystemSettings = async (): Promise<SystemSetting[]> => {
    try {
      const { data, error } = await supabase
        .from('system_settings')
        .select('*')
        .order('key');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching system settings:', error);
      return [];
    }
  };

  const updateSystemSetting = async (key: string, value: any) => {
    try {
      const { error } = await supabase
        .from('system_settings')
        .update({ 
          value: value,
          updated_by: user?.id,
          updated_at: new Date().toISOString()
        })
        .eq('key', key);

      if (error) throw error;

      await logAdminAction(`Updated system setting: ${key}`, undefined, { key, value });
      
      toast({
        title: "Success",
        description: "System setting updated successfully"
      });
    } catch (error) {
      console.error('Error updating system setting:', error);
      toast({
        title: "Error",
        description: "Failed to update system setting",
        variant: "destructive"
      });
    }
  };

  return {
    isAdmin,
    loading,
    promoteToAdmin,
    logAdminAction,
    getAllUsers,
    updateUserRole,
    getAdminLogs,
    getSystemSettings,
    updateSystemSetting
  };
};
