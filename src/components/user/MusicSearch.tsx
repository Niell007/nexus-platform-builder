
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Music, Heart, Plus } from 'lucide-react';

const MusicSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // Simulate AI-powered search
    setTimeout(() => {
      setSearchResults([
        { 
          id: 1, 
          title: 'Perfect Wedding Song', 
          artist: 'Romantic Artist', 
          album: 'Love Collection',
          duration: '3:45',
          genre: 'Pop/Romance',
          bpm: 120,
          mood: 'Romantic'
        },
        { 
          id: 2, 
          title: 'Dance Floor Anthem', 
          artist: 'Party Band', 
          album: 'Greatest Hits',
          duration: '4:12',
          genre: 'Dance/Pop',
          bpm: 128,
          mood: 'Energetic'
        },
        { 
          id: 3, 
          title: 'Acoustic Love Ballad', 
          artist: 'Indie Singer', 
          album: 'Unplugged Sessions',
          duration: '3:28',
          genre: 'Acoustic/Folk',
          bpm: 95,
          mood: 'Intimate'
        }
      ]);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 mb-12">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Search className="h-6 w-6 text-purple-400" />
              AI-Powered Music Discovery
            </CardTitle>
            <CardDescription className="text-gray-400">
              Search by song, artist, mood, BPM, or describe what you're looking for
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <Input
                placeholder="Try: 'upbeat songs for wedding reception' or 'slow romantic ballads'"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button 
                onClick={handleSearch}
                disabled={isSearching}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isSearching ? 'Searching...' : 'Search'}
              </Button>
            </div>

            {searchResults.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Search Results:</h3>
                <div className="grid gap-4">
                  {searchResults.map((song) => (
                    <div 
                      key={song.id} 
                      className="p-4 bg-gray-700 rounded-lg border border-gray-600 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <Music className="h-10 w-10 text-purple-400 bg-gray-600 p-2 rounded" />
                        <div>
                          <h4 className="text-white font-medium">{song.title}</h4>
                          <p className="text-gray-400 text-sm">{song.artist} • {song.album}</p>
                          <div className="flex gap-4 text-xs text-gray-500 mt-1">
                            <span>{song.duration}</span>
                            <span>{song.genre}</span>
                            <span>{song.bpm} BPM</span>
                            <span className="text-purple-400">{song.mood}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <Plus className="h-4 w-4 mr-1" />
                          Add to Playlist
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default MusicSearch;
