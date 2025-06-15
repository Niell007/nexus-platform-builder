
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Music, Send, Clock, Check } from 'lucide-react';

const RequestSystem = () => {
  const [newRequest, setNewRequest] = useState('');
  const [requests, setRequests] = useState([
    {
      id: 1,
      song: 'Can\'t Stop the Feeling',
      artist: 'Justin Timberlake',
      requestedBy: 'You',
      status: 'pending',
      timestamp: '2 minutes ago'
    },
    {
      id: 2,
      song: 'Perfect',
      artist: 'Ed Sheeran',
      requestedBy: 'Sarah M.',
      status: 'played',
      timestamp: '15 minutes ago'
    },
    {
      id: 3,
      song: 'Uptown Funk',
      artist: 'Bruno Mars',
      requestedBy: 'Mike R.',
      status: 'queued',
      timestamp: '8 minutes ago'
    }
  ]);

  const submitRequest = () => {
    if (!newRequest.trim()) return;
    
    const request = {
      id: requests.length + 1,
      song: newRequest,
      artist: 'Unknown Artist',
      requestedBy: 'You',
      status: 'pending',
      timestamp: 'Just now'
    };
    
    setRequests([request, ...requests]);
    setNewRequest('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400';
      case 'queued': return 'text-blue-400';
      case 'played': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'queued': return <Music className="h-4 w-4" />;
      case 'played': return <Check className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 mb-12">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Send className="h-6 w-6 text-green-400" />
              Music Requests
            </CardTitle>
            <CardDescription className="text-gray-400">
              Request songs for live events and see the queue status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex gap-3">
                <Input
                  placeholder="Request a song... (e.g., 'Sweet Caroline by Neil Diamond')"
                  value={newRequest}
                  onChange={(e) => setNewRequest(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && submitRequest()}
                />
                <Button 
                  onClick={submitRequest}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Send className="h-4 w-4 mr-1" />
                  Request
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Tip: Be specific with song title and artist for faster processing
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-medium">Recent Requests</h4>
              {requests.map((request) => (
                <div 
                  key={request.id} 
                  className="p-4 bg-gray-700 rounded-lg border border-gray-600 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <Music className="h-8 w-8 text-purple-400 bg-gray-600 p-2 rounded" />
                    <div>
                      <h5 className="text-white font-medium">{request.song}</h5>
                      <p className="text-gray-400 text-sm">{request.artist}</p>
                      <p className="text-xs text-gray-500">
                        Requested by {request.requestedBy} • {request.timestamp}
                      </p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 ${getStatusColor(request.status)}`}>
                    {getStatusIcon(request.status)}
                    <span className="text-sm font-medium capitalize">{request.status}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gray-700 rounded-lg border border-gray-600">
              <h5 className="text-white font-medium mb-2">Request Status Guide</h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-400" />
                  <span className="text-gray-300">Pending - Under review</span>
                </div>
                <div className="flex items-center gap-2">
                  <Music className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-300">Queued - Ready to play</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-gray-300">Played - Already aired</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RequestSystem;
