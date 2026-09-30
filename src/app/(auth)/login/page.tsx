'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '@/features/auth/store';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const isButtonDisabled = !form.email || !form.password || loading;

  const [unconfirmedEmail, setUnconfirmedEmail] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const resendConfirmationEmail = useAuthStore((state) => state.resendConfirmationEmail);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isButtonDisabled) return;

    setUnconfirmedEmail(null);
    setLoading(true);
    const result = await login(form.email, form.password);
    setLoading(false);

    if (result.success) {
      toast.success('Successfully logged in!');
      router.push('/account');
    } else {
      if (result.needsConfirmation) {
        setUnconfirmedEmail(form.email);
      }
      toast.error(result.error || 'Login failed. Please check your credentials.');
    }
  };

  const handleResend = async () => {
    if (!unconfirmedEmail && !form.email) return;
    const targetEmail = unconfirmedEmail || form.email;
    setResending(true);
    const res = await resendConfirmationEmail(targetEmail);
    setResending(false);
    if (res.success) {
      toast.success(`Confirmation link resent to ${targetEmail}`);
    } else {
      toast.error(res.error || 'Failed to resend confirmation email');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Form */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12 bg-[#0d0d11] text-stone-200">
        <div className="max-w-md w-full mx-auto">
          <Link href="/" className="flex items-center gap-3.5 mb-6 group">
            <img src="/amal-logo.jpg" alt="AMAL PERFUME" className="h-14 w-auto object-contain rounded-xl border border-gold-500/40" />
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold text-gradient-gold tracking-widest leading-none">AMAL</span>
              <span className="text-[9px] tracking-[0.4em] uppercase text-gold-300 font-bold mt-1">PERFUME</span>
            </div>
          </Link>
          <p className="text-[10px] tracking-[0.25em] uppercase text-gold-400 font-medium mb-8">More Than A Fragrance — It's An Emotion</p>

          <h1 className="font-display text-2xl font-bold text-white mb-1">Maison Concierge Sign-In</h1>
          <p className="text-stone-400 text-sm mb-8">Access your private reserve and orders</p>

          {unconfirmedEmail && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800 text-xs leading-relaxed space-y-2">
              <p className="font-bold">⚠️ Email Confirmation Required</p>
              <p>Your email <strong>{unconfirmedEmail}</strong> has not been confirmed yet. Please check your email inbox and click the confirmation link.</p>
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="font-bold text-amber-900 underline hover:text-amber-700 focus:outline-none"
              >
                {resending ? 'Sending link...' : 'Resend confirmation email'}
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Mobile Number or Email</label>
              <input
                id="login-email"
                type="text"
                required
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                placeholder="priya@example.com or 6392006081"
                className="input-base bg-blue-50/20 focus:bg-white"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Password</label>
                <Link href="/forgot-password" className="text-xs text-brand-600 hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPw ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                  className="input-base pr-12 bg-blue-50/20 focus:bg-white"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  onClick={() => setShowPw(!showPw)}
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              id="login-submit"
              type="submit"
              disabled={isButtonDisabled}
              className={`w-full py-3.5 flex items-center justify-center font-bold uppercase tracking-widest text-xs rounded-full transition-all duration-300 focus:outline-none ${
                isButtonDisabled
                  ? 'bg-stone-800 text-stone-500 cursor-not-allowed border border-white/5'
                  : 'bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 text-stone-950 hover:brightness-110 shadow-gold cursor-pointer'
              }`}
            >
              {loading ? 'Entering Maison...' : 'Sign In'}
            </button>
          </form>

          <p className="text-sm text-center text-stone-400 mt-6">
            New to the Maison?{' '}
            <Link href="/register" className="text-gold-400 font-semibold hover:underline">Create an Account</Link>
          </p>
        </div>
      </div>


      {/* Right: Brand visual */}
      <div
        className="hidden lg:flex flex-1 items-center justify-center p-12 relative border-l border-gold-500/20"
        style={{ background: 'radial-gradient(ellipse at center, #1b160c 0%, #0c0b08 60%, #050505 100%)' }}
      >
        <div className="text-center text-white max-w-md">
          <img src="/amal-logo.jpg" alt="AMAL PERFUME" className="h-28 w-auto mx-auto mb-6 rounded-2xl border border-gold-500/30 shadow-gold-lg" />
          <div className="font-display text-4xl font-bold text-gradient-gold mb-2 tracking-widest">AMAL PERFUME</div>
          <p className="text-sm font-serif italic text-gold-300/90 tracking-wider mb-8">"More Than A Fragrance — It's An Emotion"</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              ['35% Extrait', 'Pure Oil Concentration'],
              ['6 Months', 'Barrel-Aged Maceration'],
              ['20+ Hours', 'Eternal Sillage'],
              ['100% Rare', 'Artisanal Botanicals'],
            ].map(([v, l]) => (
              <div key={l} className="bg-white/[0.03] border border-gold-500/20 rounded-2xl p-4 backdrop-blur-sm">
                <p className="font-bold text-lg text-gold-300">{v}</p>
                <p className="text-stone-400 text-xs mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
