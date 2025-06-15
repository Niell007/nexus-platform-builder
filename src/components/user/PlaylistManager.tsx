
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Playlist, Plus, Music, Heart, Settings } from 'lucide-react';

const PlaylistManager = () => {
  const [playlists, setPlaylists] = useState([
    {
      id: 1,
      name: 'Wedding Reception Mix',
      songCount: 45,
      duration: '3h 12m',
      mood: 'Romantic & Upbeat',
      created: '2 days ago',
      isPublic: true
    },
    {
      id: 2,
      name: 'Party Starters',
      songCount: 32,
      duration: '2h 45m',
      mood: 'High Energy',
      created: '1 week ago',
      isPublic: false
    },
    {
      id: 3,
      name: 'Acoustic Favorites',
      songCount: 28,
      duration: '1h 58m',
      mood: 'Chill & Intimate',
      created: '2 weeks ago',
      isPublic: true
    }
  ]);

  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const createPlaylist = () => {
    if (!newPlaylistName.trim()) return;
    
    const newPlaylist = {
      id: playlists.length + 1,
      name: newPlaylistName,
      songCount: 0,
      duration: '0m',
      mood: 'Custom',
      created: 'Just now',
      isPublic: false
    };
    
    setPlaylists([newPlaylist, ...playlists]);
    setNewPlaylistName('');
    setShowCreateForm(false);
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 mb-12">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center gap-2">
                  <Playlist className="h-6 w-6 text-blue-400" />
                  Your Playlists
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Create, manage, and share your custom playlists
                </CardDescription>
              </div>
              <Button 
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                New Playlist
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {showCreateForm && (
              <div className="mb-6 p-4 bg-gray-700 rounded-lg border border-gray-600">
                <h4 className="text-white font-medium mb-3">Create New Playlist</h4>
                <div className="flex gap-3">
                  <Input
                    placeholder="Playlist name..."
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    className="bg-gray-600 border-gray-500 text-white flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && createPlaylist()}
                  />
                  <Button onClick={createPlaylist} className="bg-blue-600 hover:bg-blue-700">
                    Create
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCreateForm(false)}
                    className="border-gray-500 text-gray-300"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            <div className="grid gap-4">
              {playlists.map((playlist) => (
                <div 
                  key={playlist.id} 
                  className="p-4 bg-gray-700 rounded-lg border border-gray-600 hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Music className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-lg">{playlist.name}</h4>
                        <p className="text-gray-400 text-sm">{playlist.songCount} songs • {playlist.duration}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-blue-400">{playlist.mood}</span>
                          <span className="text-xs text-gray-500">{playlist.created}</span>
                          {playlist.isPublic && (
                            <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">Public</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Open
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PlaylistManager;
