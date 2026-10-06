'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface BackButtonProps {
  label?: string;
  fallbackHref?: string;
  className?: string;
  variant?: 'light' | 'dark' | 'glass';
}

export default function BackButton({
  label = 'Back',
  fallbackHref,
  className = '',
  variant = 'light',
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = (e: React.MouseEvent) => {
    if (fallbackHref) {
      // If specific fallback link provided, allow normal link navigation
      return;
    }
    e.preventDefault();
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const variantStyles = {
    light: 'bg-white text-stone-800 border-stone-200/80 hover:bg-stone-100 hover:text-stone-950 shadow-xs',
    dark: 'bg-stone-900/80 text-stone-200 border-stone-700/70 hover:bg-stone-800 hover:text-white backdrop-blur-sm',
    glass: 'bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-md',
  }[variant];

  const content = (
    <span className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl border transition-all active:scale-95 ${variantStyles} ${className}`}>
      <ArrowLeft size={16} strokeWidth={2.2} />
      {label && <span>{label}</span>}
    </span>
  );

  if (fallbackHref) {
    return (
      <Link href={fallbackHref} className="inline-block focus:outline-hidden">
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className="inline-block focus:outline-hidden cursor-pointer"
      aria-label={label || 'Go back to previous page'}
    >
      {content}
    </button>
  );
}
