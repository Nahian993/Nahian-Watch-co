'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Crown, Lock, Loader2, AlertTriangle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/admin';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      router.push(redirect);
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0F19] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 mb-4">
            <Crown className="h-8 w-8 text-[#D4AF37]" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold font-serif text-gold-gradient">CROWN WATCH CO.</h1>
          <p className="text-xs text-[#8B8FA8] mt-1 tracking-widest uppercase">Admin Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#111827] border border-[#1F2937] rounded-xl p-8 space-y-5">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
            <h2 className="text-sm font-bold text-[#F9FAFB] uppercase tracking-wider">Secure Login</h2>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2.5 text-sm text-red-400">
              <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
              {error}
            </div>
          )}

          <div>
            <label htmlFor="username" className="block text-xs font-semibold text-[#8B8FA8] uppercase tracking-wider mb-1.5">Username</label>
            <input
              id="username" type="text" value={username}
              onChange={e => setUsername(e.target.value)} required autoFocus
              autoComplete="username"
              className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] text-[#F9FAFB] rounded-lg px-4 py-2.5 text-sm outline-none transition"
              placeholder="admin"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-[#8B8FA8] uppercase tracking-wider mb-1.5">Password</label>
            <input
              id="password" type="password" value={password}
              onChange={e => setPassword(e.target.value)} required
              autoComplete="current-password"
              className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] text-[#F9FAFB] rounded-lg px-4 py-2.5 text-sm outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full py-3 bg-[#D4AF37] text-[#0B0F19] font-bold rounded-lg hover:bg-[#C5A059] transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Verifying...</> : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-[10px] text-[#4B5563] mt-6">
          Authorized personnel only. All access is logged and monitored.
        </p>
      </div>
    </main>
  );
}
