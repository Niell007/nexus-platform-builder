
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Heart, Search, Plus, Calendar, FileText, Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price_range: string;
}

interface Favorite {
  id: string;
  service: Service;
}

interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  requested_date: string;
  created_at: string;
  service?: Service;
}

const UserDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Service[]>([]);
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    priority: 'medium',
    requested_date: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    await Promise.all([
      fetchFavorites(),
      fetchRequests()
    ]);
    setLoading(false);
  };

  const fetchFavorites = async () => {
    try {
      const { data, error } = await supabase
        .from('user_favorites')
        .select(`
          id,
          service:services(*)
        `)
        .eq('user_id', user?.id);

      if (error) throw error;
      setFavorites(data || []);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('service_requests')
        .select(`
          *,
          service:services(*)
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const { data, error } = await supabase.rpc('search_services', {
        search_query: searchQuery
      });

      if (error) throw error;
      setSearchResults(data || []);
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search Error",
        description: "Failed to search services. Please try again.",
        variant: "destructive"
      });
    }
  };

  const addToFavorites = async (serviceId: string) => {
    try {
      await supabase
        .from('user_favorites')
        .insert({ user_id: user?.id, service_id: serviceId });
      
      await fetchFavorites();
      toast({
        title: "Added to favorites",
        description: "Service added to your favorites"
      });
    } catch (error) {
      console.error('Error adding to favorites:', error);
      toast({
        title: "Error",
        description: "Failed to add to favorites",
        variant: "destructive"
      });
    }
  };

  const removeFavorite = async (favoriteId: string) => {
    try {
      await supabase
        .from('user_favorites')
        .delete()
        .eq('id', favoriteId);
      
      await fetchFavorites();
      toast({
        title: "Removed from favorites",
        description: "Service removed from your favorites"
      });
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const submitRequest = async () => {
    if (!newRequest.title.trim() || !newRequest.description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      await supabase
        .from('service_requests')
        .insert({
          user_id: user?.id,
          title: newRequest.title,
          description: newRequest.description,
          priority: newRequest.priority,
          requested_date: newRequest.requested_date || null
        });

      setNewRequest({
        title: '',
        description: '',
        priority: 'medium',
        requested_date: ''
      });

      await fetchRequests();
      toast({
        title: "Request Submitted",
        description: "Your service request has been submitted successfully"
      });
    } catch (error) {
      console.error('Error submitting request:', error);
      toast({
        title: "Error",
        description: "Failed to submit request",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-600';
      case 'in_progress': return 'bg-blue-600';
      case 'completed': return 'bg-green-600';
      case 'cancelled': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {user?.user_metadata?.full_name || user?.email}!</h1>
            <p className="text-gray-400">Manage your services, favorites, and requests</p>
          </div>

          <Tabs defaultValue="search" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800">
              <TabsTrigger value="search" className="data-[state=active]:bg-blue-600">
                <Search className="h-4 w-4 mr-2" />
                Search
              </TabsTrigger>
              <TabsTrigger value="favorites" className="data-[state=active]:bg-blue-600">
                <Heart className="h-4 w-4 mr-2" />
                Favorites
              </TabsTrigger>
              <TabsTrigger value="requests" className="data-[state=active]:bg-blue-600">
                <FileText className="h-4 w-4 mr-2" />
                Requests
              </TabsTrigger>
              <TabsTrigger value="new-request" className="data-[state=active]:bg-blue-600">
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </TabsTrigger>
            </TabsList>

            <TabsContent value="search">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Search Services</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Search for services..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>

                  {searchResults.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {searchResults.map((service) => (
                        <Card key={service.id} className="bg-gray-700 border-gray-600">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold text-white">{service.name}</h3>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => addToFavorites(service.id)}
                                className="p-1"
                              >
                                <Heart className="h-4 w-4 text-gray-400 hover:text-red-500" />
                              </Button>
                            </div>
                            <p className="text-gray-400 text-sm mb-2">{service.description}</p>
                            <div className="flex justify-between items-center">
                              <Badge variant="secondary" className="bg-blue-600/20 text-blue-300">
                                {service.category}
                              </Badge>
                              <span className="text-green-400 font-semibold">{service.price_range}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="favorites">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Your Favorites ({favorites.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {favorites.length === 0 ? (
                    <div className="text-center py-8">
                      <Heart className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400">No favorites yet. Start by searching for services!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {favorites.map((favorite) => (
                        <Card key={favorite.id} className="bg-gray-700 border-gray-600">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold text-white">{favorite.service.name}</h3>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeFavorite(favorite.id)}
                                className="p-1"
                              >
                                <Heart className="h-4 w-4 text-red-500 fill-current" />
                              </Button>
                            </div>
                            <p className="text-gray-400 text-sm mb-2">{favorite.service.description}</p>
                            <div className="flex justify-between items-center">
                              <Badge variant="secondary" className="bg-blue-600/20 text-blue-300">
                                {favorite.service.category}
                              </Badge>
                              <span className="text-green-400 font-semibold">{favorite.service.price_range}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requests">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Your Requests ({requests.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {requests.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400">No requests yet. Create your first request!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {requests.map((request) => (
                        <Card key={request.id} className="bg-gray-700 border-gray-600">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold text-white">{request.title}</h3>
                              <Badge className={getStatusColor(request.status)}>
                                {request.status.replace('_', ' ')}
                              </Badge>
                            </div>
                            <p className="text-gray-400 text-sm mb-3">{request.description}</p>
                            <div className="flex justify-between items-center text-sm text-gray-500">
                              <span>Priority: {request.priority}</span>
                              <span>Created: {new Date(request.created_at).toLocaleDateString()}</span>
                            </div>
                            {request.requested_date && (
                              <div className="flex items-center mt-2 text-sm text-gray-400">
                                <Calendar className="h-4 w-4 mr-1" />
                                Requested for: {new Date(request.requested_date).toLocaleDateString()}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="new-request">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Create New Request</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
                    <Input
                      placeholder="Brief title for your request"
                      value={newRequest.title}
                      onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                    <Textarea
                      placeholder="Describe what you need in detail..."
                      value={newRequest.description}
                      onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                      <select
                        value={newRequest.priority}
                        onChange={(e) => setNewRequest({...newRequest, priority: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Requested Date</label>
                      <Input
                        type="date"
                        value={newRequest.requested_date}
                        onChange={(e) => setNewRequest({...newRequest, requested_date: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={submitRequest}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Submit Request
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserDashboard;
