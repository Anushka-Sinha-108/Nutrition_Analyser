import React, { useState } from 'react';
import { signup } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import AuthShell from '../components/AuthShell';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signup(email, password, displayName);
      navigate('/profile-setup');
    } catch (err: any) {
      setError(err.message || 'Failed to create account.');
    }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start building a healthier routine in a few seconds."
    >
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-7 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Full Name
          </label>

          <input
            type="text"
            required
            placeholder="Your full name"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Email Address
          </label>

          <input
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Password
          </label>

          <input
            type="password"
            required
            placeholder="Choose a password"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-emerald-600 py-3 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-medium text-emerald-600 hover:underline"
        >
          Sign In
        </Link>
      </p>
    </AuthShell>
  );
}