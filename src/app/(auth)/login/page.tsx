'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Sparkles, ShieldCheck } from 'lucide-react';
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
    <div className="min-h-screen flex bg-[#FAF8F5]">
      {/* Left Column: Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 py-12 bg-[#FAF8F5] text-stone-800">
        <div className="max-w-md w-full mx-auto">
          {/* Brand Header */}
          <Link href="/" className="inline-flex items-center gap-3.5 mb-6 group">
            <div className="p-1 bg-stone-900 rounded-xl border border-amber-600/40 shadow-sm">
              <img
                src="/amal-logo.jpg"
                alt="AMAL PERFUME"
                className="h-12 w-auto object-contain rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold tracking-[0.18em] text-stone-900 uppercase leading-none">
                AMAL
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="h-[1px] w-3 bg-[#B88E3E]"></span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#B88E3E] font-bold">
                  PERFUME
                </span>
                <span className="h-[1px] w-3 bg-[#B88E3E]"></span>
              </div>
            </div>
          </Link>

          <p className="text-[10px] tracking-[0.22em] uppercase text-amber-800 font-bold mb-8 flex items-center gap-1.5">
            <Sparkles size={12} className="text-[#B88E3E]" />
            <span>More Than A Fragrance — It&apos;s An Emotion</span>
          </p>

          <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 mb-1">
            Maison Concierge Sign-In
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm mb-8">
            Access your private reserve coffret, orders &amp; bespoke consultations.
          </p>

          {unconfirmedEmail && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-300/80 rounded-2xl text-amber-900 text-xs leading-relaxed space-y-2 shadow-xs">
              <p className="font-bold flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-amber-700" />
                <span>Email Confirmation Required</span>
              </p>
              <p>
                Your email <strong>{unconfirmedEmail}</strong> has not been confirmed yet. Please check your inbox for the confirmation link.
              </p>
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="font-bold text-amber-950 underline hover:text-[#B88E3E] focus:outline-none"
              >
                {resending ? 'Sending link...' : 'Resend confirmation email'}
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-stone-600 uppercase tracking-wide block mb-1.5">
                Mobile Number or Email
              </label>
              <input
                id="login-email"
                type="text"
                required
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                placeholder="priya@example.com or 6392006081"
                className="w-full px-4 py-3 text-sm bg-white border border-stone-300 rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#B88E3E] focus:ring-1 focus:ring-[#B88E3E] transition-all"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-stone-600 uppercase tracking-wide">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-[#B88E3E] font-medium hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPw ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 text-sm bg-white border border-stone-300 rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#B88E3E] focus:ring-1 focus:ring-[#B88E3E] transition-all pr-12"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 focus:outline-none"
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
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed border border-stone-300'
                  : 'bg-[#B88E3E] hover:bg-[#9E782E] text-white shadow-md hover:shadow-lg cursor-pointer'
              }`}
            >
              {loading ? 'Entering Maison...' : 'Sign In'}
            </button>
          </form>

          <p className="text-xs sm:text-sm text-center text-stone-500 mt-6">
            New to the Maison?{' '}
            <Link href="/register" className="text-[#B88E3E] font-bold hover:underline">
              Create an Account
            </Link>
          </p>
        </div>
      </div>

      {/* Right Column: Light Theme Brand Showcase */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12 bg-[#F4F0E6] border-l border-stone-200/80 relative">
        <div className="text-center text-stone-800 max-w-md">
          <div className="inline-block bg-stone-900 p-4 rounded-2xl border border-amber-600/30 shadow-xl mb-6">
            <img
              src="/amal-logo.jpg"
              alt="AMAL PERFUME"
              className="h-24 w-auto object-contain rounded-xl"
            />
          </div>
          <h2 className="font-display text-3xl font-bold text-stone-900 mb-2 tracking-widest uppercase">
            AMAL PERFUME
          </h2>
          <p className="text-sm font-serif italic text-amber-900/90 tracking-wider mb-8">
            &ldquo;More Than A Fragrance — It&apos;s An Emotion&rdquo;
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              ['35% Extrait', 'Pure Oil Concentration'],
              ['6 Months', 'Barrel-Aged Maceration'],
              ['20+ Hours', 'Eternal Sillage'],
              ['100% Rare', 'Artisanal Botanicals'],
            ].map(([v, l]) => (
              <div
                key={l}
                className="bg-white border border-stone-200/90 rounded-2xl p-4 shadow-xs text-center"
              >
                <p className="font-bold text-base sm:text-lg text-[#B88E3E]">{v}</p>
                <p className="text-stone-500 text-xs mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
