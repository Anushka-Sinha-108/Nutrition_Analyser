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
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="sticky top-0 z-30 border-b border-white/70 bg-white/80 px-4 py-3 shadow-sm shadow-emerald-950/5 backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2 text-emerald-700">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
            <Salad className="h-5 w-5" />
          </span>

          <span className="hidden text-xl font-black tracking-tight sm:inline">
            Smart Nutrition
          </span>

          <span className="hidden rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800 md:inline">
            Student
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 sm:flex">
            <div className="rounded-full bg-emerald-100 p-1.5 text-emerald-700">
              <UserIcon className="h-4 w-4" />
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
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800 sm:px-4"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}