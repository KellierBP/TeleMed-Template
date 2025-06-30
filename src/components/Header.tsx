import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Menu, X, Bell, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
    setShowUserMenu(false);
  };

  const handleRehabilitationClick = () => {
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
    }
    
    // Scroll to rehabilitation section after a short delay to ensure page loads
    setTimeout(() => {
      const rehabilitationSection = document.getElementById('rehabilitation');
      if (rehabilitationSection) {
        rehabilitationSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">TeleCare</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                isActive('/') 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/booking" 
              className={`font-medium transition-colors ${
                isActive('/booking') 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Book Appointments
            </Link>
            <Link 
              to="/doctors" 
              className={`font-medium transition-colors ${
                isActive('/doctors') 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Find Doctors
            </Link>
            <button 
              onClick={handleRehabilitationClick}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Rehabilitation
            </button>
            <Link 
              to="/medical-records" 
              className={`font-medium transition-colors ${
                isActive('/medical-records') 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Medical Records
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            
            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 bg-gray-50 rounded-full py-1 px-3 hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{user?.name || 'User'}</span>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-gray-600"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-3 space-y-3">
            <Link 
              to="/" 
              className={`block font-medium transition-colors ${
                isActive('/') 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/booking" 
              className={`block font-medium transition-colors ${
                isActive('/booking') 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Book Appointments
            </Link>
            <Link 
              to="/doctors" 
              className={`block font-medium transition-colors ${
                isActive('/doctors') 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Find Doctors
            </Link>
            <button 
              onClick={() => {
                handleRehabilitationClick();
                setIsMenuOpen(false);
              }}
              className="block text-gray-700 hover:text-blue-600 font-medium"
            >
              Rehabilitation
            </button>
            <Link 
              to="/medical-records" 
              className={`block font-medium transition-colors ${
                isActive('/medical-records') 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Medical Records
            </Link>
            
            {/* Mobile User Info */}
            <div className="pt-3 border-t border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-sm text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;