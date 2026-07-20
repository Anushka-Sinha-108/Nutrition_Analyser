import AdminDataImport from './pages/AdminDataImport';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProfileSetup from './pages/ProfileSetup'; // Import new page
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import UserNavbar from './components/UserNavbar';
import AdminNavbar from './components/AdminNavbar';


// Layout Component for Students
const UserLayout = () => (
  <>
    <UserNavbar />
    <main className="p-6 max-w-7xl mx-auto">
      <Outlet />
    </main>
  </>
);

// Layout Component for Admins
const AdminLayout = () => (
  <>
    <AdminNavbar />
    <main className="p-6 max-w-7xl mx-auto">
      <Outlet />
    </main>
  </>
);

const HomeRedirect = () => {
  const { user, profile } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (profile?.role === 'admin') return <Navigate to="/admin" replace />;
  return <Navigate to={profile?.profileComplete ? '/dashboard' : '/profile-setup'} replace />;
};

const StudentOnly = () => {
  const { user, profile } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (profile?.role === 'admin') return <Navigate to="/admin" replace />;
  if (!profile?.profileComplete) return <Navigate to="/profile-setup" replace />;
  return <UserLayout />;
};

const AdminOnly = () => {
  const { user, profile } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (profile?.role !== 'admin') return <Navigate to="/dashboard" replace />;
  return <AdminLayout />;
};

export default function App() {
  const { user, profile, loading } = useAuth();

  // 1. Show a loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Connecting to MessMate AI...</p>
        </div>
      </div>
    );
  }

  // 2. Main Router Setup
  return (
    <BrowserRouter>
      <Routes>
        {/* Public/Auth Routes */}
        <Route path="/login" element={!user ? <Login /> : <HomeRedirect />} />
        
        {/* After Signup, go here */}
        <Route path="/signup" element={!user ? <Signup /> : <HomeRedirect />} />

        {/* Private Setup Route (no Navbar) */}
        <Route path="/profile-setup" element={user && profile?.role !== 'admin' ? <ProfileSetup /> : <HomeRedirect />} />

        {/* Private Student Routes (Includes UserNavbar) */}
        <Route element={<StudentOnly />}>
          <Route path="/dashboard" element={<UserDashboard />} />
        </Route>

        {/* Private Admin Routes (Includes AdminNavbar) */}
        <Route element={<AdminOnly />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/import" element={<AdminDataImport />} />
        </Route>

        {/* Redirect */}
        <Route path="*" element={<HomeRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}
