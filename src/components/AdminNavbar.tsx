import React from 'react';
import { useAuth } from '../context/AuthContext';
import { logout } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, LogOut, LayoutGrid, Users } from 'lucide-react';

export default function AdminNavbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-sky-100 px-6 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo Section */}
        <Link to="/admin" className="flex items-center gap-2 text-sky-800">
          <ChefHat className="w-8 h-8" />
          <span className="text-2xl font-bold">MessMate <span className='text-sky-600'>HQ</span></span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-2">
            <Link to="/admin" className="flex items-center gap-2 text-slate-700 hover:text-sky-700 px-4 py-2 rounded-lg font-medium">
                <LayoutGrid className="w-4 h-4"/>
                Dashboard
            </Link>
            <Link to="/admin/import">
                Menu & CSV Import
            </Link>
             <Link to="/admin/students" className="flex items-center gap-2 text-slate-700 hover:text-sky-700 px-4 py-2 rounded-lg font-medium">
                <Users className="w-4 h-4"/>
                Student List
            </Link>
        </div>

        {/* Right Section: Admin Info & Actions */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold text-slate-800">{user?.displayName || 'Admin'}</span>
            <span className="text-xs text-sky-600 font-medium">System Administrator</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white text-slate-700 border border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-50 transition font-medium"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}