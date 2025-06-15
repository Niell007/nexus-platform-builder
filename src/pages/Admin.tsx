
import React, { useState } from 'react';
import { useAdmin } from '@/hooks/useAdmin';
import PatriotModeAccess from '@/components/admin/PatriotModeAccess';
import AdminPanel from '@/components/admin/AdminPanel';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Admin = () => {
  const { user } = useAuth();
  const { isAdmin, loading } = useAdmin();
  const [accessGranted, setAccessGranted] = useState(false);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Checking admin status...</p>
        </div>
      </div>
    );
  }

  if (isAdmin && !accessGranted) {
    setAccessGranted(true);
  }

  if (!isAdmin && !accessGranted) {
    return <PatriotModeAccess onAccessGranted={() => setAccessGranted(true)} />;
  }

  return <AdminPanel onExit={() => setAccessGranted(false)} />;
};

export default Admin;
