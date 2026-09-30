"use client";

import React from 'react';
import Link from 'next/link';
import { Heart, Mail, Phone, MapPin, ShieldCheck, Link2, AtSign, Play, Rss, CreditCard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0f1115] text-gray-400 font-sans mt-20">
      {/* Brand & Security Banner */}
      <div className="border-b border-gold-500/10 bg-black/40">
        <div className="container-plt py-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="group flex items-center gap-3">
              <img src="/amal-logo.jpg" alt="AMAL PERFUME" className="h-14 w-auto object-contain drop-shadow-xl rounded-lg border border-gold-500/30" />
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold text-gradient-gold tracking-widest leading-none">AMAL</span>
                <span className="text-[9px] tracking-[0.35em] uppercase text-gold-300 font-semibold mt-0.5">PERFUME</span>
                <span className="text-[8px] tracking-[0.1em] text-stone-400 font-light mt-0.5">More Than A Fragrance — It's An Emotion</span>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-6 md:gap-12 text-sm font-medium">
            <div className="flex items-center gap-2 text-stone-300">
              <ShieldCheck size={20} className="text-gold-400" />
              <span>100% Authentic Extrait Guarantee</span>
            </div>
            <div className="flex items-center gap-2 text-stone-300">
              <CreditCard size={20} className="text-gold-400" />
              <span>Global Concierge & Insured Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-plt py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Story */}
          <div className="lg:col-span-2">
            <h3 className="text-gold-300 font-semibold mb-6 text-sm uppercase tracking-[0.25em]">The Maison</h3>
            <p className="text-sm leading-relaxed mb-4 max-w-sm text-stone-300">
              <strong className="text-gold-200">AMAL PERFUME</strong> is an independent haute parfumerie maison dedicated to the art of rare extraits and oriental ouds.
            </p>
            <p className="text-xs italic text-gold-400/90 mb-8 tracking-wide font-serif">
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
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-gold-500/20 text-stone-400 hover:bg-gold-500 hover:text-stone-950 hover:scale-110 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-gold-300 font-semibold mb-6 text-sm uppercase tracking-[0.25em]">Fragrance Houses</h3>
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
                  <Link href={href} className="text-sm text-stone-400 hover:text-gold-300 transition-colors hover:translate-x-1 inline-block duration-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-gold-300 font-semibold mb-6 text-sm uppercase tracking-[0.25em]">Client Concierge</h3>
            <ul className="space-y-4">
              {[
                { label: 'Scent Consultation', href: '/contact' },
                { label: 'Shipping & Delivery', href: '/shipping-policy' },
                { label: 'Sealed Flacon Policy', href: '/return-policy' },
                { label: 'Flacon & Sillage Guide', href: '/size-guide' },
                { label: 'Fragrance FAQ', href: '/faq' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-stone-400 hover:text-gold-300 transition-colors hover:translate-x-1 inline-block duration-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold-300 font-semibold mb-6 text-sm uppercase tracking-[0.25em]">Boutique</h3>
            <div className="space-y-5">
              <div className="flex gap-4">
                <Phone size={18} className="text-gold-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">+91 63920 06081</p>
                  <p className="text-xs text-stone-400 uppercase tracking-wider">Mon–Sat, 10am–7pm IST</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail size={18} className="text-gold-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">concierge@amalperfume.com</p>
                  <p className="text-xs text-stone-400 uppercase tracking-wider">24/7 Fragrance Concierge</p>
                </div>
              </div>
              <div className="flex gap-4">
                <MapPin size={18} className="text-gold-400 mt-1 flex-shrink-0" />
                <p className="text-sm leading-relaxed text-stone-400">
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
      <div className="border-t border-gold-500/15 bg-black">
        <div className="container-plt py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-stone-400 text-center md:text-left">
            © {new Date().getFullYear()} AMAL PERFUME. ALL RIGHTS RESERVED.
          </p>
          <p className="text-gray-500 text-center">
            Built by{" "}
            <a
              href="https://abdurrahmanmaqsood.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white underline transition-colors"
            >
              abdarrehmaan
            </a>
          </p>
          <div className="flex gap-6 font-medium uppercase tracking-widest text-gray-400">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
