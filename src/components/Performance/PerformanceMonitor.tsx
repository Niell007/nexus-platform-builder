
"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Zap, Clock, Eye } from "lucide-react";

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const measurePerformance = () => {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paint = performance.getEntriesByType('paint');
        
        const fcp = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
        const ttfb = navigation.responseStart - navigation.requestStart;

        // Use Performance Observer for LCP and FID
        if ('PerformanceObserver' in window) {
          // LCP Observer
          const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1] as any;
            
            setMetrics(prev => prev ? { ...prev, lcp: lastEntry.startTime } : null);
          });
          
          try {
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
          } catch (e) {
            console.warn('LCP observer not supported');
          }

          // FID Observer
          const fidObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1] as any;
            
            setMetrics(prev => prev ? { ...prev, fid: lastEntry.processingStart - lastEntry.startTime } : null);
          });
          
          try {
            fidObserver.observe({ entryTypes: ['first-input'] });
          } catch (e) {
            console.warn('FID observer not supported');
          }

          // CLS Observer
          const clsObserver = new PerformanceObserver((entryList) => {
            let clsValue = 0;
            for (const entry of entryList.getEntries()) {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value;
              }
            }
            
            setMetrics(prev => prev ? { ...prev, cls: clsValue } : null);
          });
          
          try {
            clsObserver.observe({ entryTypes: ['layout-shift'] });
          } catch (e) {
            console.warn('CLS observer not supported');
          }
        }

        setMetrics({
          fcp,
          lcp: 0, // Will be updated by observer
          fid: 0, // Will be updated by observer
          cls: 0, // Will be updated by observer
          ttfb
        });
      }
    };

    measurePerformance();

    // Show performance monitor for development
    const isDev = process.env.NODE_ENV === 'development';
    setIsVisible(isDev);
  }, []);

  const getScoreColor = (metric: string, value: number) => {
    const thresholds = {
      fcp: { good: 1800, poor: 3000 },
      lcp: { good: 2500, poor: 4000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      ttfb: { good: 800, poor: 1800 }
    };

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (value <= threshold.good) return 'bg-green-500';
    if (value <= threshold.poor) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const formatMetric = (metric: string, value: number) => {
    if (metric === 'cls') {
      return value.toFixed(3);
    }
    return `${Math.round(value)}ms`;
  };

  if (!isVisible || !metrics) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm">
      <Card className="bg-gray-900/95 backdrop-blur border-gray-700 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center">
            <Zap className="w-4 h-4 mr-2" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                <Eye className="w-3 h-3 mr-1" />
                FCP
              </span>
              <Badge className={`${getScoreColor('fcp', metrics.fcp)} text-white text-xs`}>
                {formatMetric('fcp', metrics.fcp)}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                LCP
              </span>
              <Badge className={`${getScoreColor('lcp', metrics.lcp)} text-white text-xs`}>
                {formatMetric('lcp', metrics.lcp)}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                FID
              </span>
              <Badge className={`${getScoreColor('fid', metrics.fid)} text-white text-xs`}>
                {formatMetric('fid', metrics.fid)}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                <TrendingDown className="w-3 h-3 mr-1" />
                CLS
              </span>
              <Badge className={`${getScoreColor('cls', metrics.cls)} text-white text-xs`}>
                {formatMetric('cls', metrics.cls)}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between col-span-2">
              <span className="flex items-center">
                <Zap className="w-3 h-3 mr-1" />
                TTFB
              </span>
              <Badge className={`${getScoreColor('ttfb', metrics.ttfb)} text-white text-xs`}>
                {formatMetric('ttfb', metrics.ttfb)}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMonitor;
