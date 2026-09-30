import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BrandStory() {
  return (
    <section className="bg-[#08080a] py-20 md:py-28 overflow-hidden relative border-t border-gold-500/10">
      <div className="container-plt">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Images Composition Container */}
          <div className="relative pb-10 pr-6 md:pr-10">
            {/* Main Image */}
            <div className="relative aspect-[4/5] w-[80%] rounded-[2rem] overflow-hidden shadow-2xl border border-gold-500/20">
              <Image 
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&auto=format&fit=crop&q=80" 
                alt="Artisan Perfume Formulation"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
            </div>
            
            {/* Overlapping Secondary Image */}
            <div className="absolute bottom-0 right-0 w-[52%] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-4 md:border-8 border-[#08080a] z-10">
              <Image 
                src="https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&auto=format&fit=crop&q=80" 
                alt="Hand-poured floral essences"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            
            {/* Subtle Gold Ambient Glow Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
          </div>

          {/* Text Content */}
          <div className="max-w-xl">
            <h4 className="text-gold-400 font-bold uppercase tracking-[0.25em] text-sm mb-4">The Maison's Heritage</h4>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-8">
              The Alchemy of <br />
              <span className="italic font-serif text-gold-300/80">Pure Emotion.</span>
            </h2>
            
            <div className="space-y-6 text-stone-300 font-light leading-relaxed text-lg">
              <p>
                <strong className="text-gold-300 font-medium">AMAL PERFUME</strong> was founded on the philosophy that scent is <em className="text-white italic">more than a fragrance — it's an emotion</em>. We seek out the rarest raw botanicals on Earth — from aged Cambodian agarwood and wild frankincense to hand-harvested Centifolia roses of Grasse.
              </p>
              <p>
                Every formulation is compounded by master noses and aged for a minimum of six months before bottling. At high extrait concentrations of up to 35% pure oil, each flacon delivers an unforgettable olfactory sillage and profound emotional resonance.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-8 border-t border-white/10 pt-8">
              <div className="flex flex-col">
                <span className="font-display text-4xl font-bold text-gold-400">30%+</span>
                <span className="text-xs uppercase tracking-widest text-white/50 font-bold mt-1">Pure Oil Concentration</span>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="flex flex-col">
                <span className="font-display text-4xl font-bold text-gold-400">20+ Hrs</span>
                <span className="text-xs uppercase tracking-widest text-white/50 font-bold mt-1">Sillage & Longevity</span>
              </div>
            </div>

            <div className="mt-10">
              <Link href="/about" className="group inline-flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-gold-400 border-b-2 border-gold-400/40 pb-2 hover:text-gold-300 hover:border-gold-300 transition-colors">
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
