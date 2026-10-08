import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Heart, Leaf, Sparkles } from 'lucide-react';
import BackButton from '@/components/storefront/BackButton';

export const metadata: Metadata = {
  title: 'About us — AMAL PERFUME',
  description:
    'Learn about AMAL PERFUME — our origins, master noses, and dedication to rare extraits de parfum and oriental ouds.',
};

export default function AboutPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen text-stone-800">
      {/* Hero Header */}
      <div className="py-10 md:py-14 border-b border-stone-200 bg-[#F4F0E6] relative">
        <div className="container-plt px-4 max-w-5xl mx-auto flex flex-col items-center justify-center text-center relative">
          <div className="w-full flex justify-start mb-4 sm:mb-0 sm:absolute sm:left-4 sm:top-1/2 sm:-translate-y-1/2">
            <BackButton label="Back to Store" />
          </div>
          
          <div className="flex flex-col items-center text-center max-w-md mx-auto">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-amber-800 mb-2">
              Haute Parfumerie
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-stone-900 tracking-tight mb-2">
              About us
            </h1>
            <p className="text-stone-600 font-serif italic text-xs sm:text-sm md:text-base">
              &ldquo;More Than A Fragrance — It&apos;s An Emotion&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-plt max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-tag justify-start">Our Philosophy</div>
              <h2 className="section-title text-left text-2xl md:text-3xl">Sculpting Liquid Emotion</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Founded with an unyielding devotion to rare essences, <strong className="text-gray-900">AMAL PERFUME</strong> exists in the realm where ancient alchemy meets contemporary French perfumery. We believe that true luxury perfume should not merely be a scent, but an ethereal signature aura that lingers long after you have departed.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                We source wild-harvested agarwood from sustainable reserves in Cambodia, centifolia roses gathered at dawn in Grasse, and cured Bourbon vanilla pods from Madagascar.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Every blend is macerated in dark cellars for over six months, allowing pure botanical oils to harmonize before being individually hand-filled and sealed into crystal flacons.
              </p>
            </div>
            
            {/* Elegant Dual Overlapping Image Composition */}
            <div className="relative pb-10 pr-6 md:pr-10">
              <div className="relative aspect-[4/5] w-[80%] rounded-2xl overflow-hidden shadow-2xl border border-stone-300/80">
                <Image
                  src="/products/saddle-leather.jpg"
                  alt="AMAL Saddle Leather Extrait Flacon"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 80vw, 40vw"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-[52%] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#FAF8F5] z-10">
                <Image
                  src="/products/enigma.jpg"
                  alt="AMAL Enigma Extrait Flacon"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-[#F4F0E6]">
        <div className="container-plt">
          <div className="section-header">
            <div className="section-tag">Guiding Principles</div>
            <h2 className="section-title">Our Standards</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: 'High Concentration', desc: 'Formulated between 25% and 35% pure fragrance oils for legendary 18+ hour sillage.' },
              { icon: Sparkles, title: 'Artisanal Aging', desc: 'Each small batch undergoes a mandatory 6-month dark-cellar maceration process.' },
              { icon: Leaf, title: 'Ethical Sourcing', desc: 'We only partner with certified, sustainable harvesters of rare agarwood and botanicals.' },
              { icon: Heart, title: 'Sample-First Guarantee', desc: 'Every full-size flacon comes with a matching 2ml tester vial to sample before unsealing.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white p-6 rounded-2xl shadow-card text-center border border-stone-200/80">
                <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4 border border-amber-200/60">
                  <Icon size={24} className="text-[#B88E3E]" />
                </div>
                <h3 className="font-semibold text-stone-900 mb-2">{title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding text-center">
        <div className="container-plt">
          <h2 className="font-display text-3xl font-bold text-stone-900 mb-4">Discover Your Signature Aura</h2>
          <p className="text-stone-500 mb-8">Explore our private reserve extraits and discovery coffrets.</p>
          <Link href="/all-products" className="btn-primary">Explore The Catalog</Link>
        </div>
      </section>
    </div>
  );
}
