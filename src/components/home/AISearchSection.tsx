
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Music, User, FileText } from 'lucide-react';

const AISearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // TODO: Implement AI-powered search with Supabase integration
    // This will be connected to the music database
    setTimeout(() => {
      setSearchResults([
        { id: 1, type: 'song', title: 'Sample Song', artist: 'Sample Artist', genre: 'Pop' },
        { id: 2, type: 'artist', name: 'Sample Artist', songs: 150, genre: 'Various' },
      ]);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">
            AI-Powered Music Discovery
          </h2>
          <p className="text-xl text-gray-400">
            Search songs, artists, or lyrics with our intelligent music database
          </p>
        </div>

        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Search className="h-6 w-6" />
              Smart Music Search
            </CardTitle>
            <CardDescription className="text-gray-400">
              Find any song, artist, or lyrics using natural language
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Try: 'upbeat wedding songs' or 'romantic ballads from the 90s'"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white flex-1"
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
              <div className="mt-6 space-y-3">
                <h3 className="text-lg font-semibold text-white">Search Results:</h3>
                {searchResults.map((result) => (
                  <div 
                    key={result.id} 
                    className="p-4 bg-gray-800 rounded-lg border border-gray-600 flex items-center gap-3"
                  >
                    {result.type === 'song' ? (
                      <>
                        <Music className="h-5 w-5 text-purple-400" />
                        <div>
                          <p className="text-white font-medium">{result.title}</p>
                          <p className="text-gray-400 text-sm">{result.artist} • {result.genre}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <User className="h-5 w-5 text-blue-400" />
                        <div>
                          <p className="text-white font-medium">{result.name}</p>
                          <p className="text-gray-400 text-sm">{result.songs} songs • {result.genre}</p>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AISearchSection;
