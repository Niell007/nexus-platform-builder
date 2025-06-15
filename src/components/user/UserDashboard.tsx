
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, Playlist, Heart, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const UserDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { icon: <Music className="h-8 w-8 text-purple-400" />, title: 'Songs Discovered', value: '1,247', change: '+23 this week' },
    { icon: <Playlist className="h-8 w-8 text-blue-400" />, title: 'Playlists Created', value: '8', change: '2 new this month' },
    { icon: <Heart className="h-8 w-8 text-red-400" />, title: 'Favorites', value: '156', change: '+12 recently' },
    { icon: <Search className="h-8 w-8 text-green-400" />, title: 'Searches', value: '89', change: 'Top user!' }
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-8 mb-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {user?.user_metadata?.full_name || 'Music Lover'}!
          </h1>
          <p className="text-xl text-gray-400">
            Discover, create, and share amazing playlists with our AI-powered music platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
