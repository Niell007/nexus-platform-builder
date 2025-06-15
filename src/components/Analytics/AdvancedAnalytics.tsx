
"use client";

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    hj: {
      (...args: any[]): void;
      q?: any[];
    };
    _hjSettings: { hjid: number; hjsv: number };
    gtag: (...args: any[]) => void;
  }
}

interface AdvancedAnalyticsProps {
  hotjarId?: string;
  enableHeatmaps?: boolean;
}

export const AdvancedAnalytics: React.FC<AdvancedAnalyticsProps> = ({ 
  hotjarId = "YOUR_HOTJAR_ID", 
  enableHeatmaps = true 
}) => {
  const location = useLocation();

  useEffect(() => {
    if (enableHeatmaps && hotjarId !== "YOUR_HOTJAR_ID") {
      // Initialize Hotjar
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(...args: any[]){(h.hj.q=h.hj.q||[]).push(args)};
        h._hjSettings={hjid:parseInt(hotjarId),hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=true;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    }
  }, [hotjarId, enableHeatmaps]);

  useEffect(() => {
    // Track page views in Hotjar
    if (typeof window.hj !== 'undefined') {
      window.hj('stateChange', location.pathname);
    }
  }, [location]);

  return null;
};

// Custom hook for advanced event tracking
export const useAdvancedAnalytics = () => {
  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    // Google Analytics
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', eventName, properties);
    }

    // Hotjar
    if (typeof window.hj !== 'undefined') {
      window.hj('event', eventName);
    }

    // Console log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', eventName, properties);
    }
  };

  const trackUserAction = (action: string, element: string, value?: string) => {
    trackEvent('user_action', {
      action,
      element,
      value,
      timestamp: new Date().toISOString(),
      page: window.location.pathname
    });
  };

  const trackFormSubmission = (formName: string, success: boolean) => {
    trackEvent('form_submission', {
      form_name: formName,
      success,
      timestamp: new Date().toISOString()
    });
  };

  const trackServiceBooking = (serviceName: string, value?: number) => {
    trackEvent('service_booking', {
      service_name: serviceName,
      value,
      currency: 'USD',
      timestamp: new Date().toISOString()
    });
  };

  return {
    trackEvent,
    trackUserAction,
    trackFormSubmission,
    trackServiceBooking
  };
};
