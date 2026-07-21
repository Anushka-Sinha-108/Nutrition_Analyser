import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { firestoreDb } from '../firebase';
import { User as UserIcon, Hash } from 'lucide-react';
import { logout } from '../services/authService';
import AuthShell from '../components/AuthShell';

export default function ProfileSetup() {
  const { user } = useAuth();

  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [rollNumber, setRollNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    setError('');
    setLoading(true);

    try {
      if (displayName !== user.displayName) {
        await updateProfile(user, { displayName });
      }

      await setDoc(
        doc(firestoreDb, 'users', user.uid),
        {
          id: user.uid,
          displayName,
          email: user.email,
          rollNumber,
          role: 'student',
          profileComplete: true,
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      );

      navigate('/dashboard');
    } catch (err: any) {
      console.error('Failed to save profile:', err);
      setError(err.message || 'Failed to complete profile setup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Finish setting up"
      subtitle="A couple of details and your personal nutrition space is ready."
    >
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-7 space-y-4">
        <div>
          <label className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-700">
            <UserIcon className="h-4 w-4 text-slate-400" />
            Full Name
          </label>

          <input
            type="text"
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            placeholder="e.g., Aryan Sharma"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Hash className="h-4 w-4 text-slate-400" />
            Roll Number / ID
          </label>

          <input
            type="text"
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            placeholder="e.g., S2026XXX"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Saving...
            </>
          ) : (
            'Complete Setup'
          )}
        </button>
      </form>

      <button
        type="button"
        onClick={handleSignOut}
        className="mt-5 w-full rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        Sign out and use another account
      </button>
    </AuthShell>
  );
}