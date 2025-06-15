
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import UserDashboard from '@/components/user/UserDashboard';
import MusicSearch from '@/components/user/MusicSearch';
import PlaylistManager from '@/components/user/PlaylistManager';
import RequestSystem from '@/components/user/RequestSystem';

const UserPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="py-8">
        <UserDashboard />
        <MusicSearch />
        <PlaylistManager />
        <RequestSystem />
      </div>
      <Footer />
    </div>
  );
};

export default UserPage;
