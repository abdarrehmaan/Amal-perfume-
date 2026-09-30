'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react';
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
    <div className="min-h-screen flex">
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

          <h1 className="font-display text-2xl font-bold text-white mb-1">Join the Maison</h1>
          <p className="text-stone-400 text-sm mb-8">Create your concierge profile to explore rare extraits</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-stone-400 uppercase tracking-wide block mb-1.5">Full Name *</label>
              <input id="reg-name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="e.g. Tariq Al-Mansoor" className="input-base bg-stone-900 border-gold-500/20 text-white placeholder-stone-500 focus:border-gold-400" />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-400 uppercase tracking-wide block mb-1.5">Email Address *</label>
              <input id="reg-email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="tariq@example.com" className="input-base bg-stone-900 border-gold-500/20 text-white placeholder-stone-500 focus:border-gold-400" />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-400 uppercase tracking-wide block mb-1.5">Phone Number</label>
              <input id="reg-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="10-digit mobile number" className="input-base bg-stone-900 border-gold-500/20 text-white placeholder-stone-500 focus:border-gold-400" />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-400 uppercase tracking-wide block mb-1.5">Password *</label>
              <div className="relative">
                <input id="reg-password" name="password" type={showPw ? 'text' : 'password'} required minLength={8} value={form.password} onChange={handleChange} placeholder="Minimum 8 characters" className="input-base pr-12 bg-stone-900 border-gold-500/20 text-white placeholder-stone-500 focus:border-gold-400" />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 focus:outline-none" onClick={() => setShowPw(!showPw)}>
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              id="register-submit"
              type="submit"
              disabled={isButtonDisabled}
              className={`w-full py-3.5 flex items-center justify-center font-bold uppercase tracking-widest text-xs rounded-full transition-all duration-300 focus:outline-none ${
                isButtonDisabled
                  ? 'bg-stone-800 text-stone-500 cursor-not-allowed border border-white/5'
                  : 'bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 text-stone-950 hover:brightness-110 shadow-gold cursor-pointer'
              }`}
            >
              {loading ? 'Creating account...' : 'Create Account'} {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <p className="text-xs text-stone-500 text-center mt-4">
            By signing up, you agree to our <Link href="/terms" className="underline text-stone-400">Terms</Link> and <Link href="/privacy-policy" className="underline text-stone-400">Privacy Policy</Link>.
          </p>
          <p className="text-sm text-center text-stone-400 mt-4">
            Already have an account?{' '}
            <Link href="/login" className="text-gold-400 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
      <div
        className="hidden lg:flex flex-1 items-center justify-center p-12 border-l border-gold-500/20"
        style={{ background: 'radial-gradient(ellipse at center, #1b160c 0%, #0c0b08 60%, #050505 100%)' }}
      >
        <div className="text-center text-white max-w-md">
          <img src="/amal-logo.jpg" alt="AMAL PERFUME" className="h-28 w-auto mx-auto mb-6 rounded-2xl border border-gold-500/30 shadow-gold-lg" />
          <div className="font-display text-4xl font-bold text-gradient-gold mb-2 tracking-widest">AMAL PERFUME</div>
          <p className="text-sm font-serif italic text-gold-300/90 tracking-wider mb-4">"More Than A Fragrance — It's An Emotion"</p>
          <p className="text-stone-400 font-light text-sm">Welcome to our private sanctuary of rare botanical extraits, aged Cambodian agarwoods, and eternal scents.</p>
        </div>
      </div>
    </div>
  );
}
