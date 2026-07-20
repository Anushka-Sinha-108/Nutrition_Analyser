import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { firestoreDb } from '../firebase';
import { Salad, User as UserIcon, Hash } from 'lucide-react';
import { logout } from '../services/authService';

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
      // 1. Update the Auth Display Name
      if (displayName !== user.displayName) {
        await updateProfile(user, { displayName });
      }

      // 2. Save the full profile to Firestore in 'users' collection
      await setDoc(doc(firestoreDb, 'users', user.uid), {
        id: user.uid,
        displayName: displayName,
        email: user.email,
        rollNumber: rollNumber,
        role: 'student',
        profileComplete: true,
        updatedAt: serverTimestamp(),
      }, { merge: true });

      // 3. Navigate to the student dashboard
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Failed to save profile:', err);
      setError(err.message || 'Failed to complete profile setup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 border border-slate-100">
        <div className="flex items-center gap-3 text-emerald-700 mb-6 justify-center">
            <Salad className="w-10 h-10" />
            <span className="text-3xl font-bold">MessMate AI</span>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-800 text-center mb-1">Finish Setting Up</h2>
        <p className="text-sm text-slate-500 text-center mb-6">Let's get your basic details to start tracking.</p>

        {error && <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                <UserIcon className='w-4 h-4 text-slate-400'/>
                Full Name
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g., Aryan Sharma"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <div>
             <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                <Hash className='w-4 h-4 text-slate-400'/>
                Roll Number / ID
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g., S2026XXX"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white font-medium py-2.5 rounded-lg hover:bg-emerald-700 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
                <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                </>
            ) : "Complete Setup"}
          </button>
        </form>
        <button
          type="button"
          onClick={handleSignOut}
          className="mt-4 w-full rounded-lg border border-slate-300 bg-white py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
          Sign out and use another account
        </button>
      </div>
    </div>
  );
}
