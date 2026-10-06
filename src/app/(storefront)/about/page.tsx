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
    <div className="bg-[#FAF8F5] min-h-screen text-stone-800">
      {/* Hero */}
      <div className="py-10 md:py-14 border-b border-stone-200 bg-[#F4F0E6]">
        <div className="container-plt px-4 max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto flex justify-start">
            <BackButton label="Back to Store" />
          </div>
          <div className="text-center sm:text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-900 text-[11px] font-semibold uppercase tracking-wider mb-1.5">
              <Sparkles size={13} className="text-amber-700" />
              <span>Haute Parfumerie</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-1">
              The Maison
            </h1>
            <p className="text-stone-600 font-serif italic text-xs md:text-sm">
              &ldquo;More Than A Fragrance — It&apos;s An Emotion&rdquo;
            </p>
          </div>
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
