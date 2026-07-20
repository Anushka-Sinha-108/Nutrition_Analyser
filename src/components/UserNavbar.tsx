import React from 'react';
import { useAuth } from '../context/AuthContext';
import { logout } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import { Salad, LogOut, User as UserIcon } from 'lucide-react';

export default function UserNavbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login'); // Redirect to login after signing out
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-slate-100 px-6 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo Section */}
        <Link to="/dashboard" className="flex items-center gap-2 text-emerald-700">
          <Salad className="w-8 h-8" />
          <span className="text-2xl font-bold">MessMate AI</span>
          <span className="text-xs bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded-full ml-1">Student</span>
        </Link>

        {/* Right Section: User Info & Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-1.5 rounded-full">
            <div className="bg-emerald-100 text-emerald-700 rounded-full p-1.5">
              <UserIcon className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-800">
                {user?.displayName || 'Student'}
              </span>
              <span className="text-xs text-slate-500">{user?.email}</span>
            </div>
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