'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';

export default function OfferBanner() {
  return (
    <section className="py-8 md:py-16 bg-transparent relative z-10">
      <div className="container-plt">
        <div className="relative rounded-xl overflow-hidden border border-gold-500/30 shadow-2xl bg-gray-950 group">
          {/* 16:9 Aspect Ratio Image Container — Fits 100% on Mobile & Laptop without cropping */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-black flex items-center justify-center">
            <Image
              src="/amal-banner.jpg"
              alt="AMAL PERFUME — More Than A Fragrance, It's An Emotion"
              fill
              className="object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
              priority
            />

            {/* Subtle Gradient & Floating CTA for Laptop / Tablet */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end justify-between p-4 sm:p-6 md:p-10">
              <div className="hidden sm:flex flex-col gap-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-gold-500/40 text-gold-300 text-xs font-bold uppercase tracking-widest w-fit">
                  <Sparkles size={14} className="animate-pulse text-gold-400" />
                  <span>The Maison's Complimentary Gift</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white max-w-md">
                  Complimentary 10ml Discovery Flacon
                </h3>
                <p className="text-white/70 text-xs md:text-sm max-w-sm">
                  Receive a bespoke travel atomizer of your choice with every order above ₹2,999.
                </p>
              </div>

              <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="/all-products"
                  className="w-full sm:w-auto btn-gold text-xs md:text-sm px-6 md:px-8 py-3 md:py-3.5 uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-gold transition-all duration-300 hover:scale-105"
                >
                  <Sparkles size={16} />
                  <span>Claim Your Scent</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile CTA Bar below image so zero graphic content is blocked */}
          <div className="sm:hidden p-4 bg-gray-900/90 border-t border-white/10 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gold-300 flex items-center gap-1.5">
                <Sparkles size={13} /> Complimentary 10ml Flacon
              </span>
              <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">On Orders &gt; ₹2,999</span>
            </div>
            <Link
              href="/all-products"
              className="w-full btn-gold text-xs py-3 uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-gold"
            >
              <Sparkles size={14} />
              <span>Explore The Catalog</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
