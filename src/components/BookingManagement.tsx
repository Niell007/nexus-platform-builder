
"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useBookings } from '@/hooks/useBookings';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, Phone, Mail, User, FileText } from 'lucide-react';

export const BookingManagement: React.FC = () => {
  const { bookings, loading, updateBookingStatus } = useBookings();
  const { user } = useAuth();

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'secondary' as const,
      confirmed: 'default' as const,
      in_progress: 'secondary' as const,
      completed: 'default' as const,
      cancelled: 'destructive' as const,
    };
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  const parseBookingDetails = (description: string) => {
    const lines = description.split('\n');
    const details: any = {};
    
    lines.forEach(line => {
      if (line.includes('Customer:')) details.customerName = line.split('Customer:')[1]?.trim();
      if (line.includes('Email:')) details.customerEmail = line.split('Email:')[1]?.trim();
      if (line.includes('Phone:')) details.customerPhone = line.split('Phone:')[1]?.trim();
      if (line.includes('Address:')) details.serviceAddress = line.split('Address:')[1]?.trim();
      if (line.includes('Preferred Date:')) details.preferredDate = line.split('Preferred Date:')[1]?.trim();
      if (line.includes('Preferred Time:')) details.preferredTime = line.split('Preferred Time:')[1]?.trim();
      if (line.includes('Additional Details:')) details.additionalDetails = line.split('Additional Details:')[1]?.trim();
    });
    
    return details;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Bookings</CardTitle>
          <CardDescription>Loading your service bookings...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (bookings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Bookings</CardTitle>
          <CardDescription>You haven't made any service bookings yet.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">No bookings found</p>
            <p className="text-muted-foreground mb-4">
              Book your first service to get started
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Bookings</CardTitle>
        <CardDescription>
          Manage and track your service bookings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {bookings.map((booking) => {
            const details = parseBookingDetails(booking.description || '');
            
            return (
              <div key={booking.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{booking.title}</h3>
                    {getStatusBadge(booking.status)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Created {format(new Date(booking.created_at), 'MMM dd, yyyy')}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    {details.customerName && (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{details.customerName}</span>
                      </div>
                    )}
                    {details.customerEmail && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{details.customerEmail}</span>
                      </div>
                    )}
                    {details.customerPhone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{details.customerPhone}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    {details.preferredDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{details.preferredDate}</span>
                      </div>
                    )}
                    {details.preferredTime && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{details.preferredTime}</span>
                      </div>
                    )}
                    {details.serviceAddress && (
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span className="break-words">{details.serviceAddress}</span>
                      </div>
                    )}
                  </div>
                </div>

                {details.additionalDetails && details.additionalDetails !== 'None' && (
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-sm">
                      <FileText className="inline h-4 w-4 mr-1" />
                      <strong>Additional Details:</strong> {details.additionalDetails}
                    </p>
                  </div>
                )}

                {booking.status === 'pending' && (
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                    >
                      Cancel Booking
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
