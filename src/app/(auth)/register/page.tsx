'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import { useAuthStore } from '@/features/auth/store';
import { useCartStore } from '@/features/cart/store';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const register = useAuthStore((state) => state.register);

  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });

  const isButtonDisabled = !form.name || !form.email || !form.password || loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isButtonDisabled) return;

    setLoading(true);
    const result = await register(form.name, form.email, form.phone, form.password);
    setLoading(false);

    if (result.success) {
      useCartStore.getState().clearCart();
      if (result.needsConfirmation) {
        toast.success('Account created! Please check your email inbox to confirm your account before logging in.', { duration: 6000 });
      } else {
        toast.success('Account created successfully! Please log in.');
      }
      router.push('/login');
    } else {
      toast.error(result.error || 'Registration failed. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

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
            Join the Maison
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm mb-8">
            Create your concierge profile to explore rare extraits and private reserves.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-stone-600 uppercase tracking-wide block mb-1.5">
                Full Name *
              </label>
              <input
                id="reg-name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Tariq Al-Mansoor"
                className="w-full px-4 py-3 text-sm bg-white border border-stone-300 rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#B88E3E] focus:ring-1 focus:ring-[#B88E3E] transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-600 uppercase tracking-wide block mb-1.5">
                Email Address *
              </label>
              <input
                id="reg-email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="tariq@example.com"
                className="w-full px-4 py-3 text-sm bg-white border border-stone-300 rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#B88E3E] focus:ring-1 focus:ring-[#B88E3E] transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-600 uppercase tracking-wide block mb-1.5">
                Phone Number
              </label>
              <input
                id="reg-phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                className="w-full px-4 py-3 text-sm bg-white border border-stone-300 rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#B88E3E] focus:ring-1 focus:ring-[#B88E3E] transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-600 uppercase tracking-wide block mb-1.5">
                Password *
              </label>
              <div className="relative">
                <input
                  id="reg-password"
                  name="password"
                  type={showPw ? 'text' : 'password'}
                  required
                  minLength={8}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
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
              id="register-submit"
              type="submit"
              disabled={isButtonDisabled}
              className={`w-full py-3.5 flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs rounded-full transition-all duration-300 focus:outline-none ${
                isButtonDisabled
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed border border-stone-300'
                  : 'bg-[#B88E3E] hover:bg-[#9E782E] text-white shadow-md hover:shadow-lg cursor-pointer'
              }`}
            >
              {loading ? 'Creating account...' : 'Create Account'} {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <p className="text-xs text-stone-500 text-center mt-4">
            By signing up, you agree to our{' '}
            <Link href="/terms" className="underline font-medium text-stone-700 hover:text-[#B88E3E]">
              Terms
            </Link>{' '}
            and{' '}
            <Link href="/privacy-policy" className="underline font-medium text-stone-700 hover:text-[#B88E3E]">
              Privacy Policy
            </Link>.
          </p>

          <p className="text-xs sm:text-sm text-center text-stone-500 mt-4">
            Already have an account?{' '}
            <Link href="/login" className="text-[#B88E3E] font-bold hover:underline">
              Sign in
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
          <p className="text-sm font-serif italic text-amber-900/90 tracking-wider mb-4">
            &ldquo;More Than A Fragrance — It&apos;s An Emotion&rdquo;
          </p>
          <p className="text-stone-600 font-light text-sm leading-relaxed">
            Welcome to our private sanctuary of rare botanical extraits, aged Cambodian agarwoods, and eternal scents.
          </p>
        </div>
      </div>
    </div>
  );
}
