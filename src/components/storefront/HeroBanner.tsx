'use client';

import React, { useCallback, useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ChevronDown, ArrowRight, Sparkles, Star } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Slide {
  id: number;
  image: string;
  tag: string;
  title: string;
  subtitle: string;
  cta: string;
  ctaHref: string;
  align: 'left' | 'right';
  isGraphic?: boolean;
}

const slides: Slide[] = [
  {
    id: 2,
    image: '/products/saddle-leather.jpg',
    tag: 'Extrait de Parfum',
    title: 'Saddle Leather',
    subtitle: 'Some fragrances disappear into the air. Others remain long after the moment has passed. Pure extrait concentration.',
    cta: 'Shop Saddle Leather',
    ctaHref: '/products/saddle-leather-extrait-de-parfum',
    align: 'left',
  },
  {
    id: 3,
    image: '/products/enigma.jpg',
    tag: 'Extrait de Parfum',
    title: 'Enigma Extrait',
    subtitle: 'Where every note becomes a statement. Soft, diffused lighting and clean, contemporary luxury.',
    cta: 'Explore Enigma',
    ctaHref: '/products/enigma-extrait-de-parfum',
    align: 'right',
  },
  {
    id: 4,
    image: '/products/amal-collection.jpg',
    tag: 'The Flacon Wardrobe',
    title: 'Architectural Collection',
    subtitle: 'Every detail has a purpose, every frame tells a story, because luxury is always in the way it is presented.',
    cta: 'Order Flacon Set',
    ctaHref: '/products/master-perfumers-discovery-coffret',
    align: 'right',
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const containerRef = useRef<HTMLElement>(null);

  // Parallax for the images
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const parallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig);
  const parallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section
      id="hero-banner"
      ref={containerRef}
      className="relative w-full md:min-h-screen overflow-hidden bg-[#FAF8F5] flex flex-col md:flex-row md:items-center pt-16 md:pt-20"
      aria-label="Hero banner"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
    >
      {/* Immersive Background Images with Parallax */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:absolute md:inset-[-5%] md:w-auto md:h-auto z-0 shrink-0 overflow-hidden">
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={slide.id}
            className="absolute inset-0 md:inset-[-5%]"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ x: parallaxX, y: parallaxY }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
              unoptimized={slide.image.startsWith('/')}
            />
            {/* Soft Ambient Light Gradient Overlays for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/30 to-transparent z-10 md:hidden" />
            <div
              className={`hidden md:block absolute inset-0 z-10 ${
                slide.align === 'left'
                  ? 'bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/90 to-transparent'
                  : 'bg-gradient-to-l from-[#FAF8F5] via-[#FAF8F5]/90 to-transparent'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5]/80 via-transparent to-[#FAF8F5]/30 z-10 hidden md:block" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className={`relative z-20 container-plt w-full pt-6 pb-20 md:py-20 flex ${slide.align === 'left' ? 'justify-start' : 'justify-end'} bg-[#FAF8F5] md:bg-transparent`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className={`max-w-2xl ${slide.align === 'left' ? 'text-left md:text-left' : 'text-left md:text-right'} w-full`}
          >
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 sm:mb-6 rounded-full bg-amber-500/10 backdrop-blur-md border border-amber-500/25 text-amber-900 text-xs font-bold uppercase tracking-[0.2em]"
            >
              <Sparkles size={12} className="text-amber-600" />
              {slide.tag}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-stone-900 leading-[1.15] sm:leading-[1.05] mb-3 sm:mb-6 tracking-tight"
            >
              {slide.title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`text-stone-600 text-sm sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-10 max-w-lg ${slide.align === 'left' ? 'mr-auto' : 'md:ml-auto'} font-normal`}
            >
              {slide.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`flex flex-col sm:flex-row gap-3 sm:gap-5 items-center ${slide.align === 'left' ? 'justify-start' : 'md:justify-end'}`}
            >
              <Link
                href={slide.ctaHref}
                id={`hero-cta-${slide.id}`}
                className="w-full sm:w-auto text-center btn-gold text-xs sm:text-sm md:text-base px-6 py-3.5 sm:px-10 sm:py-4 uppercase tracking-widest font-bold shadow-md hover:shadow-lg transition-all"
              >
                {slide.cta}
              </Link>
              <Link
                href="/collections"
                className="w-full sm:w-auto text-center border-2 border-stone-800 text-stone-900 hover:bg-stone-900 hover:text-white text-xs sm:text-sm md:text-base px-6 py-3.5 sm:px-10 sm:py-4 uppercase tracking-widest font-bold backdrop-blur-sm transition-all rounded-lg"
              >
                Explore Collections
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className={`mt-8 sm:mt-12 flex items-center gap-4 border-t border-stone-200/80 pt-6 max-w-md ${slide.align === 'left' ? 'mr-auto' : 'md:ml-auto'}`}
            >
               <div className="flex -space-x-2">
                 {[1, 2, 3, 4].map((i) => (
                   <div key={i} className="w-8 h-8 rounded-full border border-white bg-stone-200 overflow-hidden shrink-0 shadow-sm">
                     <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Customer" className="w-full h-full object-cover" />
                   </div>
                 ))}
               </div>
               <div className="flex flex-col text-left">
                 <div className="flex items-center gap-1 text-amber-500">
                   {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                 </div>
                 <span className="text-stone-800 text-xs font-semibold mt-0.5">Trusted by 10,000+ connoisseurs</span>
               </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls & Pagination Overlay */}
      <div className="absolute w-full px-6 flex justify-between bottom-6 md:w-auto md:px-0 md:bottom-10 md:right-10 z-30 md:flex md:items-center gap-8">
        {/* Dots */}
        <div className="flex gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-500 rounded-full ${
                i === current ? 'w-10 h-1.5 bg-stone-900' : 'w-2 h-1.5 bg-stone-300 hover:bg-stone-500'
              }`}
            />
          ))}
        </div>
        
        {/* Arrows */}
        <div className="flex gap-2">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md text-stone-800 hover:bg-stone-900 hover:text-white transition-all flex items-center justify-center border border-stone-200 shadow-sm"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md text-stone-800 hover:bg-stone-900 hover:text-white transition-all flex items-center justify-center border border-stone-200 shadow-sm"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Explore Collection Link Anchor */}
      <a
        href="#all-products"
        className="hidden md:flex absolute bottom-7 left-1/2 -translate-x-1/2 z-30 items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-stone-700 hover:text-stone-900 transition-colors bg-white/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-stone-200 shadow-sm"
      >
        <span>Explore Collection</span>
        <ChevronDown size={14} className="animate-bounce text-amber-600" />
      </a>
    </section>
  );
}
