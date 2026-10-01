import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BrandStory() {
  return (
    <section className="bg-[#F5F2EB] py-20 md:py-28 overflow-hidden relative border-t border-stone-200">
      <div className="container-plt">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Images Composition Container */}
          <div className="relative pb-10 pr-6 md:pr-10">
            {/* Main Image */}
            <div className="relative aspect-[4/5] w-[80%] rounded-xl overflow-hidden shadow-2xl border border-stone-300/80">
              <Image 
                src="/products/saddle-leather.jpg" 
                alt="AMAL Saddle Leather Extrait Flacon"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
            </div>
            
            {/* Overlapping Secondary Image */}
            <div className="absolute bottom-0 right-0 w-[52%] aspect-[4/5] rounded-xl overflow-hidden shadow-2xl border-4 md:border-8 border-[#F5F2EB] z-10">
              <Image 
                src="/products/enigma.jpg" 
                alt="AMAL Enigma Extrait Flacon"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            
            {/* Subtle Gold Ambient Glow Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
          </div>

          {/* Text Content */}
          <div className="max-w-xl">
            <h4 className="text-amber-800 font-bold uppercase tracking-[0.25em] text-sm mb-4">The Maison's Heritage</h4>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 leading-[1.1] mb-8">
              The Alchemy of <br />
              <span className="italic font-serif text-amber-700">Pure Emotion.</span>
            </h2>
            
            <div className="space-y-6 text-stone-600 font-normal leading-relaxed text-lg">
              <p>
                <strong className="text-stone-900 font-semibold">AMAL PERFUME</strong> was founded on the philosophy that scent is <em className="text-amber-900 italic font-medium">more than a fragrance — it's an emotion</em>. We seek out the rarest raw botanicals on Earth — from aged Cambodian agarwood and wild frankincense to hand-harvested Centifolia roses of Grasse.
              </p>
              <p>
                Every formulation is compounded by master noses and aged for a minimum of six months before bottling. At high extrait concentrations of up to 35% pure oil, each flacon delivers an unforgettable olfactory sillage and profound emotional resonance.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-8 border-t border-stone-300/80 pt-8">
              <div className="flex flex-col">
                <span className="font-display text-4xl font-bold text-amber-700">30%+</span>
                <span className="text-xs uppercase tracking-widest text-stone-600 font-bold mt-1">Pure Oil Concentration</span>
              </div>
              <div className="w-px h-12 bg-stone-300" />
              <div className="flex flex-col">
                <span className="font-display text-4xl font-bold text-amber-700">20+ Hrs</span>
                <span className="text-xs uppercase tracking-widest text-stone-600 font-bold mt-1">Sillage & Longevity</span>
              </div>
            </div>

            <div className="mt-10">
              <Link href="/about" className="group inline-flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-stone-900 border-b-2 border-amber-600 pb-2 hover:text-amber-800 hover:border-amber-800 transition-colors">
                Explore The Maison 
                <span className="w-8 h-[1px] bg-current group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
