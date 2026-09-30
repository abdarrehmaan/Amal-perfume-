'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ChevronDown, Compass, ShieldCheck, Droplets } from 'lucide-react';
import { SCROLL_FRAMES } from '@/lib/scroll-frames';

const STORY_STAGES = [
  {
    range: [0, 0.22],
    tag: '360° Haute Parfumerie',
    title: 'Sculpted in Darkness',
    description: 'Every curve, facet, and reflection is crafted to convey unyielding mystery, desire, and pure luxury.',
    badge: 'Pure Extrait • 30%+',
    highlight: 'Hand-compounded flacon',
  },
  {
    range: [0.24, 0.48],
    tag: 'Architectural Flacon',
    title: 'The Obsidian Silhouette',
    description: 'Heavyweight, hand-polished crystal glass flacon crowned with a multi-faceted onyx cap and 24K gold seal.',
    badge: 'Crafted in Grasse & Paris',
    highlight: '24K Gold Accents',
  },
  {
    range: [0.50, 0.74],
    tag: 'The Olfactory Alchemy',
    title: 'Rare Botanicals & Aged Agarwood',
    description: 'A harmonious collision of 25-year wild harvested Cambodian oud, royal Taif rose, and shimmering golden ambergris.',
    badge: '24-Hour Intoxicating Sillage',
    highlight: 'Rare Cambodian Oud',
  },
  {
    range: [0.76, 1.0],
    tag: 'The AMAL Signature',
    title: 'More Than A Fragrance. An Emotion.',
    description: 'Designed for connoisseurs who seek distinction in every breath. An indelible aura that lingers forever.',
    badge: 'Limited Artisanal Batch',
    highlight: 'Signature Emotion',
    cta: true,
  },
];

export default function PerfumeScrollExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedCountRef = useRef<number>(0);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isInitialReady, setIsInitialReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [rotationDegrees, setRotationDegrees] = useState(0);

  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Touch drag state for mobile direct bottle spinning
  const touchStartXRef = useRef<number | null>(null);
  const touchStartFrameRef = useRef<number>(0);
  const isTouchDraggingRef = useRef<boolean>(false);

  // Draw a frame onto the canvas with mobile-adaptive framing
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Find the requested image or the nearest loaded one
    let img: HTMLImageElement | null = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      let found: HTMLImageElement | null = null;
      for (let offset = 1; offset < SCROLL_FRAMES.length; offset++) {
        const left = frameIdx - offset;
        const right = frameIdx + offset;
        if (left >= 0 && imagesRef.current[left]?.complete && imagesRef.current[left]?.naturalWidth) {
          found = imagesRef.current[left];
          break;
        }
        if (right < SCROLL_FRAMES.length && imagesRef.current[right]?.complete && imagesRef.current[right]?.naturalWidth) {
          found = imagesRef.current[right];
          break;
        }
      }
      img = found;
    }

    if (!img) return;

    const cw = canvas.width;
    const ch = canvas.height;
    ctx.clearRect(0, 0, cw, ch);

    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = cw / ch;

    let drawW: number;
    let drawH: number;
    let offsetX: number;
    let offsetY: number;

    // Mobile Portrait vs Desktop Landscape Adaptive Framing
    if (canvasAspect < 0.9) {
      // Portrait Screen (Phones / Tablets in vertical mode):
      // Zoom into the bottle so it stands prominent and majestic instead of tiny horizontal letterbox
      // Bottle takes up ~62% of screen height and is shifted slightly upwards above the overlay card
      drawH = ch * 0.64;
      drawW = drawH * imgAspect;
      offsetX = (cw - drawW) / 2;
      offsetY = (ch - drawH) * 0.32; // position in upper 60% of screen
    } else {
      // Desktop / Landscape Screen:
      if (canvasAspect > imgAspect) {
        drawH = ch;
        drawW = ch * imgAspect;
        offsetX = (cw - drawW) / 2;
        offsetY = 0;
      } else {
        drawW = cw;
        drawH = cw / imgAspect;
        offsetX = 0;
        offsetY = (ch - drawH) / 2;
      }
    }

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  }, []);

  // Set up high DPI canvas dimensions
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    drawFrame(Math.round(currentFrameRef.current));
  }, [drawFrame]);

  // Preload frame images with Mobile-First Keyframing (Fast 360 spin in seconds)
  useEffect(() => {
    imagesRef.current = new Array(SCROLL_FRAMES.length).fill(null);
    let isCancelled = false;

    // 1. Immediately load frame 0
    const firstImg = new Image();
    firstImg.src = SCROLL_FRAMES[0];
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current[0] = firstImg;
      loadedCountRef.current += 1;
      setIsInitialReady(true);
      drawFrame(0);
    };

    // 2. Load keyframes (every 4th frame) first so mobile gets 360 coverage rapidly
    const keyframeIndices: number[] = [];
    const remainingIndices: number[] = [];

    for (let i = 1; i < SCROLL_FRAMES.length; i++) {
      if (i % 4 === 0) {
        keyframeIndices.push(i);
      } else {
        remainingIndices.push(i);
      }
    }

    function loadBatchList(indices: number[], batchSize: number, onComplete?: () => void) {
      if (isCancelled || indices.length === 0) {
        onComplete?.();
        return;
      }

      let currentPtr = 0;

      function nextStep() {
        if (isCancelled || currentPtr >= indices.length) {
          onComplete?.();
          return;
        }

        const chunk = indices.slice(currentPtr, currentPtr + batchSize);
        currentPtr += batchSize;
        let chunkLoaded = 0;

        chunk.forEach((idx) => {
          const img = new Image();
          img.src = SCROLL_FRAMES[idx];
          const finish = () => {
            if (isCancelled) return;
            imagesRef.current[idx] = img;
            loadedCountRef.current += 1;
            chunkLoaded += 1;

            const pct = Math.round((loadedCountRef.current / SCROLL_FRAMES.length) * 100);
            setLoadingProgress(pct);

            if (chunkLoaded === chunk.length) {
              nextStep();
            }
          };
          img.onload = finish;
          img.onerror = finish;
        });
      }

      nextStep();
    }

    // Start keyframes, then fill in detailed intermediate frames
    const timer = setTimeout(() => {
      loadBatchList(keyframeIndices, 6, () => {
        loadBatchList(remainingIndices, 6);
      });
    }, 150);

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    return () => {
      isCancelled = true;
      clearTimeout(timer);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [drawFrame, resizeCanvas]);

  // Smooth scrubbing animation loop (lerp)
  useEffect(() => {
    let active = true;

    function renderLoop() {
      if (!active) return;

      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        // 0.18 lerp for crisp responsiveness on mobile touch
        currentFrameRef.current += diff * 0.18;
        const frameIndex = Math.min(
          SCROLL_FRAMES.length - 1,
          Math.max(0, Math.round(currentFrameRef.current))
        );
        drawFrame(frameIndex);

        const currentDeg = Math.round((frameIndex / (SCROLL_FRAMES.length - 1)) * 360);
        setRotationDegrees(currentDeg);
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    }

    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      active = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrame]);

  // Scroll listener to update target frame
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isTouchDraggingRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;

      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      setScrollProgress(progress);
      targetFrameRef.current = progress * (SCROLL_FRAMES.length - 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Direct touch drag listeners to spin the bottle on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartFrameRef.current = currentFrameRef.current;
    isTouchDraggingRef.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouchDraggingRef.current || touchStartXRef.current === null) return;
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - touchStartXRef.current;

    // Dragging ~260px rotates through entire 360 bottle
    const frameOffset = (deltaX / 260) * SCROLL_FRAMES.length;
    let newFrame = (touchStartFrameRef.current - frameOffset) % SCROLL_FRAMES.length;
    if (newFrame < 0) newFrame += SCROLL_FRAMES.length;

    targetFrameRef.current = newFrame;
    setScrollProgress(newFrame / (SCROLL_FRAMES.length - 1));
  };

  const handleTouchEnd = () => {
    isTouchDraggingRef.current = false;
    touchStartXRef.current = null;
  };

  // Determine active storytelling stage
  const activeStage = STORY_STAGES.find(
    (s) => scrollProgress >= s.range[0] && scrollProgress <= s.range[1]
  ) || STORY_STAGES[0];

  return (
    <section
      id="scroll-experience"
      ref={containerRef}
      className="relative w-full h-[300vh] md:h-[360vh] bg-black text-white"
      aria-label="Interactive 360 Perfume Scroll Experience"
    >
      {/* Sticky Fullscreen Presentation Viewport (100dvh for mobile address bar stability) */}
      <div
        className="sticky top-0 h-[100dvh] min-h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center bg-[#070707] touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Ambient Glow Effects */}
        <div className="absolute top-1/4 md:top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] md:w-[700px] h-[350px] sm:h-[500px] md:h-[700px] rounded-full bg-amber-500/10 blur-[90px] md:blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full bg-yellow-600/5 blur-[80px] pointer-events-none" />

        {/* Top Floating Badge Bar */}
        <div className="absolute top-16 md:top-24 left-0 right-0 z-20 px-4 md:px-12 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] md:tracking-[0.25em] uppercase text-amber-200/90 font-mono">
              360° STUDIO
            </span>
          </div>

          <div className="flex items-center gap-2.5 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-full font-mono text-[10px] md:text-[11px] text-white/80">
            <Compass size={13} className="text-amber-400" />
            <span><strong className="text-white font-bold">{rotationDegrees}°</strong></span>
            <span className="hidden sm:inline text-white/30">|</span>
            <span className="hidden sm:inline text-white/60">FRAME: <strong className="text-white font-bold">{Math.round(currentFrameRef.current) + 1}</strong>/{SCROLL_FRAMES.length}</span>
          </div>
        </div>

        {/* Central Canvas Scrubbing Surface */}
        <div className="relative w-full h-full flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain pointer-events-none z-10 transition-opacity duration-300"
            style={{ opacity: isInitialReady ? 1 : 0 }}
          />

          {/* Direct Mobile Drag Gesture Cue */}
          <div className="absolute inset-0 z-10 md:hidden flex items-center justify-between px-3 pointer-events-none opacity-40">
            <span className="text-[10px] font-mono text-white/50 bg-black/40 px-2 py-1 rounded">‹ SWIPE ›</span>
          </div>

          {/* Initial Loading Screen */}
          {!isInitialReady && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-[#070707] text-center px-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-amber-400/20 border-t-amber-400 animate-spin mb-4" />
              <p className="text-xs uppercase tracking-[0.3em] font-semibold text-amber-300">
                Initializing 360° Studio
              </p>
              <p className="text-[11px] text-white/40 mt-1">Sculpting flacon frames...</p>
            </div>
          )}
        </div>

        {/* Floating Story Narrative Overlay (Mobile-Optimized Bottom Card) */}
        <div className="absolute left-4 right-4 md:left-14 md:right-auto bottom-16 md:bottom-28 z-20 max-w-none md:max-w-md pointer-events-none transition-all duration-500 ease-out">
          <div className="bg-black/85 backdrop-blur-xl border border-white/15 p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl space-y-2 md:space-y-3.5 pointer-events-auto">
            <div className="flex items-center gap-2 text-amber-400 text-[10px] md:text-xs font-bold tracking-[0.2em] md:tracking-[0.25em] uppercase">
              <Sparkles size={11} className="animate-pulse shrink-0" />
              <span className="truncate">{activeStage.tag}</span>
            </div>

            <h2 className="font-serif text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-tight">
              {activeStage.title}
            </h2>

            <p className="text-[11px] sm:text-xs md:text-sm text-white/70 leading-relaxed font-light line-clamp-2 sm:line-clamp-none">
              {activeStage.description}
            </p>

            <div className="pt-1 md:pt-2 flex flex-wrap items-center gap-1.5 md:gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 md:px-3 md:py-1 rounded-full bg-white/10 text-white/90 text-[10px] md:text-[11px] font-medium border border-white/10">
                <ShieldCheck size={11} className="text-amber-400" />
                {activeStage.badge}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 md:px-3 md:py-1 rounded-full bg-amber-500/10 text-amber-300 text-[10px] md:text-[11px] font-medium border border-amber-500/20">
                <Droplets size={11} className="text-amber-400" />
                {activeStage.highlight}
              </span>
            </div>

            {/* Action Buttons on Final Stage */}
            {activeStage.cta && (
              <div className="pt-2 flex items-center gap-2.5">
                <Link
                  href="/all-products"
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-semibold text-[11px] md:text-xs tracking-wider uppercase transition-all duration-300 shadow-lg text-center flex items-center justify-center gap-1.5"
                >
                  <span>Explore Fragrances</span>
                  <ArrowRight size={13} />
                </Link>
                <Link
                  href="#all-products"
                  className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-[11px] md:text-xs tracking-wider uppercase border border-white/20 transition-all duration-300 text-center"
                >
                  Catalog
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Interactive Progress & Guidance */}
        <div className="absolute bottom-3 md:bottom-6 left-4 right-4 md:left-12 md:right-12 z-20 flex flex-row items-center justify-between gap-3 pointer-events-none">
          {/* Scroll Prompt / Mobile Swipe Indicator */}
          <div
            className={`flex items-center gap-1.5 text-[10px] md:text-[11px] font-medium tracking-[0.15em] uppercase text-white/50 transition-opacity duration-500 ${
              scrollProgress < 0.12 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <ChevronDown size={14} className="animate-bounce text-amber-400 shrink-0" />
            <span className="hidden sm:inline">Scroll or swipe to rotate</span>
            <span className="sm:hidden">Scroll to spin</span>
          </div>

          {/* Interactive Scrub Tracker Bar */}
          <div className="flex-1 sm:flex-initial sm:w-72 md:w-80 flex items-center gap-2.5 bg-black/70 backdrop-blur-md px-3.5 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10 pointer-events-auto">
            <span className="text-[9px] md:text-[10px] font-mono text-white/50 tracking-wider">0°</span>
            <div className="relative flex-1 h-1.5 bg-white/15 rounded-full overflow-hidden">
              <div
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full transition-all duration-75"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-amber-400 font-bold tracking-wider">
              {rotationDegrees}°
            </span>
          </div>

          {/* Background Buffer Status */}
          {loadingProgress < 100 && (
            <div className="hidden lg:flex items-center gap-2 text-[10px] font-mono text-white/30">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400/50" />
              <span>3D Frames: {loadingProgress}%</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
