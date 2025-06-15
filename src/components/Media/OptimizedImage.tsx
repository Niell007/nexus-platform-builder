
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  onLoad?: () => void;
  onError?: () => void;
  sizes?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  placeholder = 'blur',
  onLoad,
  onError,
  sizes = '100vw'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate responsive image URLs
  const generateSrcSet = (baseSrc: string) => {
    if (!baseSrc.includes('unsplash.com')) return '';
    
    const baseUrl = baseSrc.split('?')[0];
    const widths = [320, 640, 768, 1024, 1280, 1920];
    
    return widths
      .map(w => `${baseUrl}?w=${w}&auto=format&fit=crop&q=75 ${w}w`)
      .join(', ');
  };

  // Generate WebP version if supported
  const getOptimizedSrc = (baseSrc: string, targetWidth?: number) => {
    if (!baseSrc.includes('unsplash.com')) return baseSrc;
    
    const baseUrl = baseSrc.split('?')[0];
    const w = targetWidth || width || 800;
    return `${baseUrl}?w=${w}&auto=format&fit=crop&q=75&fm=webp`;
  };

  useEffect(() => {
    if (!priority) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1, rootMargin: '50px' }
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => observer.disconnect();
    }
  }, [priority]);

  useEffect(() => {
    if (isInView && src) {
      setCurrentSrc(getOptimizedSrc(src, width));
    }
  }, [isInView, src, width]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    // Fallback to original src without optimization
    setCurrentSrc(src);
    onError?.();
  };

  const blurDataURL = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Cfilter id='blur'%3E%3CfeGaussianBlur stdDeviation='2'/%3E%3C/filter%3E%3Crect width='400' height='300' fill='%23e5e7eb' filter='url(%23blur)'/%3E%3C/svg%3E";

  return (
    <div 
      ref={imgRef}
      className={cn("relative overflow-hidden bg-gray-200 dark:bg-gray-800", className)}
      style={{ width, height }}
    >
      {/* Blur placeholder */}
      {!isLoaded && placeholder === 'blur' && (
        <img
          src={blurDataURL}
          alt=""
          className="w-full h-full object-cover absolute inset-0"
        />
      )}

      {/* Main image */}
      {isInView && currentSrc && !hasError && (
        <picture>
          {/* WebP version for modern browsers */}
          <source 
            srcSet={generateSrcSet(currentSrc)} 
            sizes={sizes}
            type="image/webp" 
          />
          
          {/* Fallback image */}
          <img
            src={currentSrc}
            srcSet={generateSrcSet(src)}
            sizes={sizes}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
          />
        </picture>
      )}

      {/* Error state */}
      {hasError && (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <span className="text-gray-400 text-sm">Image unavailable</span>
        </div>
      )}

      {/* Loading indicator */}
      {isInView && !isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
