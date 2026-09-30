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
    <div className="bg-[#08080a] min-h-screen">
      {/* AMAL PERFUME Animated Header */}
      <div
        className="py-14 text-center relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-black via-stone-950 to-[#08080a] border-b border-gold-500/20"
      >
        {/* Glowing Logo Container with Spinning Ring */}
        <div className="relative mb-4 group">
          {/* Spinning Gold Accent Ring */}
          <div className="absolute -inset-2 rounded-full border-2 border-dashed border-gold-400/60 animate-spin" style={{ animationDuration: '8s' }} />
          
          {/* Logo Circle */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-black/80 backdrop-blur-md border-2 border-gold-500/40 p-2 flex items-center justify-center shadow-2xl animate-pulse">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/amal-logo.jpg"
              alt="AMAL PERFUME Logo"
              className="w-full h-full object-contain rounded-full drop-shadow-md"
              onError={(e) => {
                // Fallback text logo if image fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Brand Text Header */}
        <h2 className="font-serif text-2xl sm:text-3xl font-black text-gradient-gold tracking-widest uppercase mb-1 drop-shadow-sm">
          AMAL PERFUME
        </h2>
        <p className="text-gold-300 text-xs uppercase tracking-[0.35em] font-semibold mb-2">
          Haute Parfumerie Maison
        </p>

        <div className="flex items-center gap-2 text-stone-300 text-xs font-medium bg-white/5 px-4 py-1.5 rounded-full border border-gold-500/20">
          <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
          <span>{subtitle}</span>
        </div>
      </div>

      <div className="container-plt py-8">
        {/* Toolbar Skeleton */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-100 animate-pulse">
          <div className="h-10 w-full max-w-xs bg-gray-100 rounded-xl" />
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="h-10 w-28 bg-gray-100 rounded-xl" />
            <div className="h-10 w-36 bg-gray-100 rounded-xl" />
          </div>
        </div>

        {/* Product Grid Skeleton Cards */}
        <div className={`grid ${colClass} gap-4 sm:gap-6`}>
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="flex flex-col animate-pulse">
              {/* Image Aspect Box Skeleton */}
              <div className="relative w-full aspect-[3/4] bg-gray-200/70 rounded-2xl mb-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
              </div>
              {/* Rating Skeleton */}
              <div className="h-3 w-16 bg-gray-200 rounded mb-2" />
              {/* Title Skeleton */}
              <div className="h-4 w-3/4 bg-gray-200 rounded mb-1.5" />
              {/* Category Skeleton */}
              <div className="h-3 w-1/2 bg-gray-150 rounded mb-2" />
              {/* Price Skeleton */}
              <div className="h-5 w-24 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
