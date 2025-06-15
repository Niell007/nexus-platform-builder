
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { DashboardErrorBoundary } from '@/components/dashboard/DashboardErrorBoundary';
import { ServiceWorkerProvider } from '@/components/PWA/ServiceWorkerProvider';
import { GoogleAnalytics } from '@/components/Analytics/GoogleAnalytics';
import { AdvancedAnalytics } from '@/components/Analytics/AdvancedAnalytics';
import LiveChatWidget from '@/components/LiveChatWidget';
import PerformanceMonitor from '@/components/Performance/PerformanceMonitor';

// Lazy load components for better performance
const Index = lazy(() => import('@/pages/Index'));
const About = lazy(() => import('@/pages/About'));
const Services = lazy(() => import('@/pages/Services'));
const Contact = lazy(() => import('@/pages/Contact'));
const UserDashboardPage = lazy(() => import('@/pages/UserDashboardPage'));
const AuthPage = lazy(() => import('@/components/auth/AuthPage'));
const Admin = lazy(() => import('@/pages/Admin'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <ServiceWorkerProvider>
              <Router>
                <div className="min-h-screen bg-background font-sans antialiased">
                  <Suspense fallback={
                    <div className="flex items-center justify-center min-h-screen">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  }>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/auth" element={<AuthPage />} />
                      <Route 
                        path="/dashboard" 
                        element={
                          <DashboardErrorBoundary>
                            <UserDashboardPage />
                          </DashboardErrorBoundary>
                        } 
                      />
                      <Route path="/admin" element={<Admin />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                  
                  {/* Global Components */}
                  <Toaster />
                  <LiveChatWidget />
                  <PerformanceMonitor />
                  
                  {/* Analytics */}
                  <GoogleAnalytics gaId="GA_TRACKING_ID" />
                  <AdvancedAnalytics hotjarId="YOUR_HOTJAR_ID" enableHeatmaps={true} />
                </div>
              </Router>
            </ServiceWorkerProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
