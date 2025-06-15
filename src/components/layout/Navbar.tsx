
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LogOut, User, Settings, Shield, Heart, FileText } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60 border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
              Professional Services
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition-colors ${
                isActive('/') 
                  ? 'text-blue-400 font-medium' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className={`transition-colors ${
                isActive('/services') 
                  ? 'text-blue-400 font-medium' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Services
            </Link>
            {user && (
              <Link 
                to="/dashboard" 
                className={`transition-colors ${
                  isActive('/dashboard') 
                    ? 'text-blue-400 font-medium' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.full_name} />
                      <AvatarFallback className="bg-blue-600 text-white">
                        {user.user_metadata?.full_name ? getInitials(user.user_metadata.full_name) : user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {user.user_metadata?.full_name && (
                        <p className="font-medium text-white">{user.user_metadata.full_name}</p>
                      )}
                      <p className="w-[200px] truncate text-sm text-gray-400">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem asChild className="text-gray-300 hover:bg-gray-700 hover:text-white">
                    <Link to="/dashboard">
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-300 hover:bg-gray-700 hover:text-white">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="text-gray-300 hover:bg-gray-700 hover:text-white">
                    <Link to="/admin">
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Admin Panel</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem onClick={signOut} className="text-gray-300 hover:bg-gray-700 hover:text-white">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
