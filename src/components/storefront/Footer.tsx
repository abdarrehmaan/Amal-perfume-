"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="relative w-full bg-[#FAF9F5] text-stone-600 font-sans border-t border-stone-200/80 clear-both block">
      {/* Gold Separator Bar before Logo (separating Connoisseurs & Footer) */}
      <div className="w-full py-5 border-b border-stone-200/70 bg-[#F4F0E6]/50 flex items-center justify-center">
        <div className="section-tag justify-center mb-0 text-xs sm:text-sm font-bold tracking-[0.25em] text-[#B88E3E]">
          THE MASTERPIECES
        </div>
      </div>

      {/* Main Footer Container */}
      <div className="container-plt py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Column 1: Brand & Address (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col justify-start">
            <Link href="/" className="inline-block group mb-4">
              <div className="flex items-center gap-3">
                <img
                  src="/amal-logo.jpg"
                  alt="AMAL PERFUME"
                  className="h-12 w-auto object-contain rounded-md border border-stone-200 shadow-2xs"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="flex flex-col">
                  <span className="font-serif text-2xl font-bold tracking-[0.18em] text-stone-900 uppercase leading-none">
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
              </div>
            </Link>

            <div className="text-xs text-stone-600 leading-relaxed space-y-0.5 mb-3">
              <p>Mumbai, Maharashtra,</p>
              <p>India</p>
            </div>

            <div className="text-xs text-stone-600 space-y-0.5">
              <p>
                <a
                  href="mailto:concierge@amalperfume.com"
                  className="hover:text-[#B88E3E] transition-colors"
                >
                  concierge@amalperfume.com
                </a>
              </p>
              <p>
                <a
                  href="https://wa.me/916392006081"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#B88E3E] transition-colors"
                >
                  +91 63920 06081
                </a>
              </p>
            </div>
          </div>

          {/* Column 2: Socials & Policies Links (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col justify-start">
            {/* Social Icons row (height h-6 mb-4 to match spacing) */}
            <div className="h-6 flex items-center gap-4 text-stone-700 mb-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-stone-700 hover:text-[#B88E3E] transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="mailto:concierge@amalperfume.com"
                aria-label="Email Concierge"
                className="text-stone-700 hover:text-[#B88E3E] transition-colors"
              >
                <Mail size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-stone-700 hover:text-[#B88E3E] transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>

            {/* Links list */}
            <ul className="space-y-2.5 text-xs text-stone-600">
              <li>
                <Link href="/shipping-policy" className="hover:text-[#B88E3E] transition-colors inline-block">
                  Delivery Information
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-[#B88E3E] transition-colors inline-block">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="hover:text-[#B88E3E] transition-colors inline-block">
                  Returns &amp; Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Service & Best Sellers (lg:col-span-2) */}
          <div className="lg:col-span-2 flex flex-col justify-start">
            {/* Top alignment spacer matching Col 2 social row */}
            <div className="h-6 mb-4 hidden sm:block"></div>

            {/* Links list matching baseline of Col 2 */}
            <ul className="space-y-2.5 text-xs text-stone-600">
              <li>
                <Link href="/contact" className="hover:text-[#B88E3E] transition-colors text-stone-700 inline-block">
                  Customer Service
                </Link>
              </li>
              <li>
                <Link href="/best-sellers" className="text-[#B88E3E] hover:underline font-medium inline-block">
                  Best Seller
                </Link>
              </li>
              <li>
                <Link href="/all-products" className="hover:text-[#B88E3E] transition-colors text-stone-700 inline-block">
                  Luxury Fragrances
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter, Hours Schedule, Payment Methods (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col justify-start space-y-4">
            {/* Newsletter Input + Subscribe Button in unified inline bar */}
            <form onSubmit={handleSubscribe} className="flex w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email here"
                required
                className="h-9 px-3 text-xs bg-white border border-stone-300 border-r-0 focus:outline-none focus:border-[#B88E3E] flex-1 text-stone-800 placeholder-stone-400"
              />
              <button
                type="submit"
                className="h-9 px-5 bg-[#B88E3E] hover:bg-[#9E782E] text-white text-xs font-bold uppercase tracking-wider shrink-0 flex items-center justify-center transition-colors"
              >
                {subscribed ? (
                  <span className="flex items-center gap-1">
                    <Check size={13} /> Sent
                  </span>
                ) : (
                  'SUBSCRIBE'
                )}
              </button>
            </form>

            {/* Hours Schedule Table */}
            <div className="text-xs text-stone-600 border-t border-stone-200/80">
              <div className="flex justify-between items-center py-1.5 border-b border-stone-200/60">
                <span>Monday - Friday</span>
                <span className="font-mono text-stone-700">08:00 - 20:00</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-stone-200/60">
                <span>Saturday</span>
                <span className="font-mono text-stone-700">09:00 - 21:00</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span>Sunday</span>
                <span className="font-mono text-stone-700">13:00 - 22:00</span>
              </div>
            </div>

            {/* Payment Method Badges */}
            <div className="flex items-center gap-2 pt-0.5">
              {/* Visa Badge */}
              <div className="h-5 px-1.5 bg-white border border-stone-200 rounded flex items-center justify-center shadow-2xs">
                <span className="font-black italic text-blue-900 text-[9px] tracking-tighter">VISA</span>
              </div>
              {/* Mastercard Badge */}
              <div className="h-5 px-1.5 bg-white border border-stone-200 rounded flex items-center justify-center gap-0.5 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-red-500 opacity-90 inline-block -mr-1"></span>
                <span className="w-2 h-2 rounded-full bg-amber-400 opacity-90 inline-block"></span>
              </div>
              {/* Discover Badge */}
              <div className="h-5 px-1.5 bg-white border border-stone-200 rounded flex items-center justify-center shadow-2xs">
                <span className="font-bold text-[8px] text-orange-600 tracking-tight uppercase">DISCOVER</span>
              </div>
              {/* PayPal Badge */}
              <div className="h-5 px-1.5 bg-white border border-stone-200 rounded flex items-center justify-center shadow-2xs">
                <span className="font-black italic text-sky-700 text-[9px] tracking-tight">Pay<span className="text-blue-500">Pal</span></span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Sub-Footer Bottom Bar */}
      <div className="border-t border-stone-200/80 bg-[#FAF9F5]">
        <div className="container-plt py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} AMAL PERFUME. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-stone-800 transition-colors">
              Terms and Conditions
            </Link>
            <Link href="/privacy-policy" className="hover:text-stone-800 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
