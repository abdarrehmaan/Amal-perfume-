'use client';

import React from 'react';

export default function LuxuryEffects() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-transparent" suppressHydrationWarning>
      {/* Soft Ambient Gold/Warm Ambience */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full filter blur-[140px] opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-[35%] right-[-10%] w-[45vw] h-[45vw] rounded-full filter blur-[150px] opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)' }}
      />
    </div>
  );
}
