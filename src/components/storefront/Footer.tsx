"use client";

import React from 'react';
import Link from 'next/link';
import { Heart, Mail, Phone, MapPin, ShieldCheck, Link2, AtSign, Play, Rss, CreditCard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#F8F5EE] text-stone-600 font-sans mt-20 border-t border-stone-200">
      {/* Brand & Security Banner */}
      <div className="border-b border-stone-200 bg-[#EFECE3]">
        <div className="container-plt py-6 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="group flex items-center gap-3">
              <img src="/amal-logo.jpg" alt="AMAL PERFUME" className="h-12 sm:h-14 w-auto object-contain rounded-lg border border-stone-200 shadow-sm" />
              <div className="flex flex-col">
                <span className="font-display text-lg sm:text-xl font-bold text-stone-900 tracking-widest leading-none">AMAL</span>
                <span className="text-[9px] tracking-[0.35em] uppercase text-amber-800 font-bold mt-0.5">PERFUME</span>
                <span className="text-[8px] tracking-[0.1em] text-stone-500 font-medium mt-0.5">More Than A Fragrance — It's An Emotion</span>
              </div>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-6 md:gap-12 text-xs sm:text-sm font-medium text-center sm:text-left">
            <div className="flex items-center gap-2 text-stone-700">
              <ShieldCheck size={18} className="text-amber-700 shrink-0" />
              <span>100% Authentic Extrait Guarantee</span>
            </div>
            <div className="flex items-center gap-2 text-stone-700">
              <CreditCard size={18} className="text-amber-700 shrink-0" />
              <span>Global Concierge & Insured Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-plt py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12">
          {/* Brand Story */}
          <div className="lg:col-span-2">
            <h3 className="text-stone-900 font-bold mb-6 text-sm uppercase tracking-[0.25em]">The Maison</h3>
            <p className="text-sm leading-relaxed mb-4 max-w-sm text-stone-600 font-normal">
              <strong className="text-stone-900 font-semibold">AMAL PERFUME</strong> is an independent haute parfumerie maison dedicated to the art of rare extraits and oriental ouds.
            </p>
            <p className="text-xs italic text-amber-800 mb-8 tracking-wide font-serif">
              "More Than A Fragrance — It's An Emotion"
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Link2, href: '#', label: 'Instagram' },
                { Icon: AtSign, href: '#', label: 'Facebook' },
                { Icon: Play, href: '#', label: 'YouTube' },
                { Icon: Rss, href: '#', label: 'Twitter' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-stone-300 text-stone-700 hover:bg-stone-900 hover:text-white hover:scale-105 transition-all duration-300 shadow-sm"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-stone-900 font-bold mb-6 text-sm uppercase tracking-[0.25em]">Fragrance Houses</h3>
            <ul className="space-y-4">
              {[
                { label: 'Extrait de Parfum', href: '/categories/extrait-de-parfum' },
                { label: 'Eau de Parfum', href: '/categories/eau-de-parfum' },
                { label: 'Royal Oud Series', href: '/collections/royal-oud-collection' },
                { label: 'Private Reserve', href: '/collections/private-reserve' },
                { label: 'Midnight Noir', href: '/collections/midnight-noir' },
                { label: 'Discovery Sets', href: '/categories/discovery-coffrets' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-stone-600 hover:text-amber-800 transition-colors hover:translate-x-1 inline-block duration-300 font-medium">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-stone-900 font-bold mb-6 text-sm uppercase tracking-[0.25em]">Client Concierge</h3>
            <ul className="space-y-4">
              {[
                { label: 'Scent Consultation', href: '/contact' },
                { label: 'Shipping & Delivery', href: '/shipping-policy' },
                { label: 'Sealed Flacon Policy', href: '/return-policy' },
                { label: 'Flacon & Sillage Guide', href: '/size-guide' },
                { label: 'Fragrance FAQ', href: '/faq' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-stone-600 hover:text-amber-800 transition-colors hover:translate-x-1 inline-block duration-300 font-medium">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-stone-900 font-bold mb-6 text-sm uppercase tracking-[0.25em]">Boutique</h3>
            <div className="space-y-5">
              <div className="flex gap-4">
                <Phone size={18} className="text-amber-700 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-stone-900 font-semibold mb-1">+91 63920 06081</p>
                  <p className="text-xs text-stone-500 uppercase tracking-wider">Mon–Sat, 10am–7pm IST</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail size={18} className="text-amber-700 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-stone-900 font-semibold mb-1">concierge@amalperfume.com</p>
                  <p className="text-xs text-stone-500 uppercase tracking-wider">24/7 Fragrance Concierge</p>
                </div>
              </div>
              <div className="flex gap-4">
                <MapPin size={18} className="text-amber-700 mt-1 flex-shrink-0" />
                <p className="text-sm leading-relaxed text-stone-600">
                  AMAL PERFUME Flagship Maison,<br />
                  Civil Lines, Prayagraj,<br />
                  Uttar Pradesh 211001, India
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-200 bg-[#EFECE3]">
        <div className="container-plt py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-stone-600 text-center md:text-left">
            © {new Date().getFullYear()} AMAL PERFUME. ALL RIGHTS RESERVED.
          </p>
          <p className="text-stone-500 text-center">
            Built by{" "}
            <a
              href="https://abdurrahmanmaqsood.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-900 underline transition-colors"
            >
              abdarrehmaan
            </a>
          </p>
          <div className="flex gap-6 font-medium uppercase tracking-widest text-stone-600">
            <Link href="/privacy-policy" className="hover:text-stone-900 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-stone-900 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
