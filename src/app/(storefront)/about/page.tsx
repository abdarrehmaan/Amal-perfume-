import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Heart, Leaf, Sparkles } from 'lucide-react';
import BackButton from '@/components/storefront/BackButton';

export const metadata: Metadata = {
  title: "The Maison — AMAL PERFUME",
  description: "Learn about AMAL PERFUME — our origins, master noses, and dedication to rare extraits de parfum and oriental ouds.",
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src="/amal-banner.jpg"
          alt="About AMAL PERFUME"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
        
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
          <BackButton variant="glass" label="Back to Store" />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-4">
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-amber-400 block mb-1">Haute Parfumerie</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-2">The Maison</h1>
          <p className="text-gold-300 text-sm md:text-base max-w-2xl font-serif italic">"More Than A Fragrance — It's An Emotion"</p>
        </div>
      </div>

      {/* Story */}
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
            <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl border border-gold-500/20">
              <Image
                src="/amal-banner.jpg"
                alt="AMAL PERFUME artisanal flacon"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-ivory-100">
        <div className="container-plt">
          <div className="section-header">
            <div className="section-tag">Guiding Principles</div>
            <h2 className="section-title">The Maison's Standards</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: 'High Concentration', desc: 'Formulated between 25% and 35% pure fragrance oils for legendary 18+ hour sillage.' },
              { icon: Sparkles, title: 'Artisanal Aging', desc: 'Each small batch undergoes a mandatory 6-month dark-cellar maceration process.' },
              { icon: Leaf, title: 'Ethical Sourcing', desc: 'We only partner with certified, sustainable harvesters of rare agarwood and botanicals.' },
              { icon: Heart, title: 'Sample-First Guarantee', desc: 'Every full-size flacon comes with a matching 2ml tester vial to sample before unsealing.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white p-6 rounded-2xl shadow-card text-center">
                <div className="w-14 h-14 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-brand-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding text-center">
        <div className="container-plt">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">Discover Your Signature Aura</h2>
          <p className="text-gray-500 mb-8">Explore our private reserve extraits and discovery coffrets.</p>
          <Link href="/all-products" className="btn-primary">Explore The Catalog</Link>
        </div>
      </section>
    </div>
  );
}
