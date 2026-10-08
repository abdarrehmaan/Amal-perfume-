'use client';

import React from 'react';

interface ProductGridSkeletonProps {
  count?: number;
  columns?: number;
  title?: string;
  subtitle?: string;
}

export default function ProductGridSkeleton({
  count = 8,
  columns = 4,
  title = 'AMAL PERFUME',
  subtitle = 'Distilling Rare Extraits...',
}: ProductGridSkeletonProps) {
  const colClass =
    columns === 4
      ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
      : columns === 3
      ? 'grid-cols-2 sm:grid-cols-3'
      : 'grid-cols-2';

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-stone-900">
      {/* AMAL PERFUME Animated Light Header */}
      <div
        className="py-14 text-center relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-amber-50/70 via-[#FAF8F5] to-[#FAF8F5] border-b border-stone-200/80"
      >
        {/* Glowing Logo Container with Spinning Ring */}
        <div className="relative mb-4 group">
          {/* Spinning Amber Accent Ring */}
          <div className="absolute -inset-2 rounded-full border-2 border-dashed border-amber-600/50 animate-spin" style={{ animationDuration: '8s' }} />
          
          {/* Logo Circle */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white backdrop-blur-md border-2 border-amber-600/40 p-2.5 flex items-center justify-center shadow-lg animate-pulse">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/amal-logo.jpg"
              alt="AMAL PERFUME Logo"
              className="w-full h-full object-contain rounded-full drop-shadow-xs"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Brand Text Header */}
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[0.2em] text-stone-950 uppercase mb-1 drop-shadow-2xs">
          {title}
        </h2>
        <div className="flex items-center gap-2 mt-0.5 mb-3">
          <span className="h-[1px] w-6 bg-amber-700/60"></span>
          <span className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-amber-800 font-bold">PERFUME</span>
          <span className="h-[1px] w-6 bg-amber-700/60"></span>
        </div>

        <div className="flex items-center gap-2 text-stone-700 text-xs font-semibold bg-white px-4 py-1.5 rounded-full border border-stone-200/90 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
          <span>{subtitle}</span>
        </div>
      </div>

      <div className="container-plt py-8">
        {/* Toolbar Skeleton */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-stone-200/60 animate-pulse">
          <div className="h-10 w-full max-w-xs bg-stone-200/70 rounded-xl" />
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="h-10 w-28 bg-stone-200/70 rounded-xl" />
            <div className="h-10 w-36 bg-stone-200/70 rounded-xl" />
          </div>
        </div>

        {/* Product Grid Skeleton Cards */}
        <div className={`grid ${colClass} gap-4 sm:gap-6`}>
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="flex flex-col animate-pulse">
              {/* Image Aspect Box Skeleton */}
              <div className="relative w-full aspect-[3/4] bg-stone-200/70 rounded-2xl mb-4 overflow-hidden border border-stone-200/50">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
              </div>
              {/* Rating Skeleton */}
              <div className="h-3 w-16 bg-stone-200/80 rounded mb-2" />
              {/* Title Skeleton */}
              <div className="h-4 w-3/4 bg-stone-200/80 rounded mb-1.5" />
              {/* Category Skeleton */}
              <div className="h-3 w-1/2 bg-stone-200/60 rounded mb-2" />
              {/* Price Skeleton */}
              <div className="h-5 w-24 bg-stone-200/80 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
