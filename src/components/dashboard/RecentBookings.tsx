
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Eye, Calendar, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface RecentBooking {
  id: number;
  service: string;
  date: string;
  status: 'Completed' | 'In Progress' | 'Scheduled' | 'Cancelled';
  provider: string;
  customer?: string;
  amount?: number;
}

interface RecentBookingsProps {
  bookings: RecentBooking[];
  onViewDetails?: (booking: RecentBooking) => void;
  onStatusUpdate?: (bookingId: number, newStatus: RecentBooking['status']) => void;
  maxItems?: number;
}

/**
 * Recent Bookings Component
 * WCAG 2.1 AA compliant with full keyboard navigation and screen reader support
 */
export const RecentBookings: React.FC<RecentBookingsProps> = ({
  bookings,
  onViewDetails,
  onStatusUpdate,
  maxItems = 5
}) => {
  const [expandedBooking, setExpandedBooking] = useState<number | null>(null);

  const displayedBookings = bookings.slice(0, maxItems);

  const getStatusColor = (status: RecentBooking['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Scheduled':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const handleViewDetails = (booking: RecentBooking) => {
    if (onViewDetails) {
      onViewDetails(booking);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent, booking: RecentBooking) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setExpandedBooking(expandedBooking === booking.id ? null : booking.id);
    }
  };

  return (
    <Card 
      className="h-fit"
      role="region"
      aria-labelledby="recent-bookings-title"
      data-testid="recent-bookings-card"
    >
      <CardHeader>
        <CardTitle 
          id="recent-bookings-title"
          className="flex items-center gap-2"
        >
          <Calendar className="h-5 w-5" aria-hidden="true" />
          Recent Bookings
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Latest {displayedBookings.length} service requests
        </p>
      </CardHeader>
      <CardContent>
        <div 
          className="space-y-3" 
          role="list" 
          aria-label="Recent bookings list"
        >
          {displayedBookings.length === 0 ? (
            <div 
              className="text-center py-6 text-muted-foreground"
              role="status"
              aria-live="polite"
            >
              No recent bookings found
            </div>
          ) : (
            displayedBookings.map((booking) => (
              <div 
                key={booking.id} 
                className={`
                  p-3 border rounded-lg transition-all duration-200 
                  hover:shadow-md focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2
                  ${expandedBooking === booking.id ? 'bg-muted/50' : 'hover:bg-muted/30'}
                `}
                role="listitem"
                data-testid={`recent-booking-${booking.id}`}
                tabIndex={0}
                onKeyPress={(e) => handleKeyPress(e, booking)}
                onClick={() => setExpandedBooking(expandedBooking === booking.id ? null : booking.id)}
                aria-expanded={expandedBooking === booking.id}
                aria-describedby={`booking-details-${booking.id}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium">{booking.service}</h3>
                      <Badge 
                        className={`text-xs ${getStatusColor(booking.status)}`}
                        aria-label={`Status: ${booking.status}`}
                      >
                        {booking.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" aria-hidden="true" />
                        <span>{booking.provider}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" aria-hidden="true" />
                        <time dateTime={booking.date}>
                          {new Date(booking.date).toLocaleDateString()}
                        </time>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {booking.amount && (
                      <span className="text-sm font-medium">
                        ${booking.amount.toLocaleString()}
                      </span>
                    )}
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 w-8 p-0"
                          aria-label={`Actions for ${booking.service} booking`}
                          data-testid={`booking-actions-${booking.id}`}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent 
                        align="end"
                        className="w-48"
                      >
                        <DropdownMenuItem 
                          onClick={() => handleViewDetails(booking)}
                          className="flex items-center gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {onStatusUpdate && booking.status !== 'Completed' && (
                          <>
                            <DropdownMenuItem 
                              onClick={() => onStatusUpdate(booking.id, 'In Progress')}
                            >
                              Mark In Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => onStatusUpdate(booking.id, 'Completed')}
                            >
                              Mark Completed
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedBooking === booking.id && (
                  <div 
                    id={`booking-details-${booking.id}`}
                    className="mt-3 pt-3 border-t border-border/50 space-y-2"
                    aria-live="polite"
                  >
                    {booking.customer && (
                      <div className="text-xs">
                        <span className="font-medium">Customer:</span> {booking.customer}
                      </div>
                    )}
                    <div className="text-xs">
                      <span className="font-medium">Booking ID:</span> #{booking.id}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewDetails(booking)}
                        className="text-xs h-7"
                      >
                        View Full Details
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {bookings.length > maxItems && (
          <div className="mt-4 text-center">
            <Button 
              variant="outline" 
              size="sm"
              aria-label={`View all ${bookings.length} bookings`}
            >
              View All ({bookings.length})
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
