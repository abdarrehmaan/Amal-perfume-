import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

interface Collection {
  id: string;
  name: string;
  slug: string;
  description?: string;
  bannerImage?: string;
}

export default function CollectionsBanner({ collections }: { collections: Collection[] }) {
  const displayCols = collections;

  return (
    <section id="collections" className="py-12 md:py-20 bg-[#FAF8F5] relative overflow-hidden">
      <div className="container-plt relative z-10">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-amber-700 text-xs font-bold uppercase tracking-[0.2em] mb-3">
              <Sparkles size={14} /> Lookbook
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-stone-900 leading-[1.15]">
              The Edit: <br />
              <span className="text-stone-500 italic font-light">Curated Collections</span>
            </h2>
          </div>
          <Link href="/collections" className="group inline-flex items-center gap-2 text-xs sm:text-sm uppercase font-bold tracking-widest text-amber-800 hover:text-amber-950 transition-colors pb-1 border-b-2 border-amber-300 hover:border-amber-800 w-fit">
            View All Collections <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {displayCols.map((col) => {
            return (
              <Link
                key={col.id}
                href={`/collections/${col.slug}`}
                id={`collection-${col.slug}`}
                className="relative rounded-2xl overflow-hidden group block h-[380px] sm:h-[420px] md:h-[470px] shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <Image
                  src={col.bannerImage || `/products/saddle-leather.jpg`}
                  alt={col.name}
                  fill
                  className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Deep Gradient Overlay ensuring 100% text contrast across entire lower half */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
                
                {/* Content Overlay with generous padding from edges */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 md:p-8 pb-7 sm:pb-8 flex flex-col justify-end">
                  <div className="mb-2">
                    <h3 className="font-display font-bold text-white text-2xl sm:text-3xl leading-snug drop-shadow-md">
                      {col.name}
                    </h3>
                  </div>
                  
                  {col.description && (
                    <p className="text-stone-200 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-5 font-normal drop-shadow-sm opacity-95">
                      {col.description}
                    </p>
                  )}

                  <div>
                    <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-white bg-white/20 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/30 group-hover:bg-white group-hover:text-stone-900 transition-all duration-300 shadow-sm">
                      Explore Collection <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
