import React from 'react';
import { ShieldCheck, Leaf, Sparkles, RefreshCcw, HeartHandshake, PackageCheck } from 'lucide-react';

export default function PremiumTrust() {
  const trustFeatures = [
    {
      icon: Sparkles,
      title: "Master Formulations",
      desc: "Compounded by master perfumers and aged for 6 months.",
    },
    {
      icon: Leaf,
      title: "Rare Pure Botanicals",
      desc: "Ethically harvested Cambodian oud, Grasse roses, and raw extracts.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Checkout",
      desc: "100% encrypted, tamper-proof global transactions.",
    },
    {
      icon: RefreshCcw,
      title: "Tamper-Evident Flacons",
      desc: "Sealed flacons inspected for chemical purity before dispatch.",
    },
    {
      icon: PackageCheck,
      title: "Climate-Safe Delivery",
      desc: "Complimentary temperature-controlled express shipping over ₹1,499.",
    },
    {
      icon: HeartHandshake,
      title: "Eternal Sillage",
      desc: "Formulated with up to 35% pure oil for unforgettable 20+ hour projection.",
    },
  ];

  return (
    <section className="py-20 bg-white border-y border-stone-200">
      <div className="container-plt">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-800 font-bold mb-3">Pure Artisanal Excellence</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900 mb-4">The AMAL PERFUME Promise</h2>
          <p className="text-stone-600 font-normal text-base">More Than A Fragrance — It's An Emotion. Experience pristine olfactory elegance and eternal longevity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {trustFeatures.map(({ icon: Icon, title, desc }, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group p-6 rounded-xl bg-[#FAF8F5] border border-stone-200/80 hover:border-amber-400/60 hover:shadow-md transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center mb-5 group-hover:bg-amber-500/20 group-hover:scale-105 transition-all duration-500">
                <Icon size={26} className="text-amber-700 stroke-[1.5]" />
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-2 uppercase tracking-wider">{title}</h3>
              <p className="text-stone-600 font-normal text-sm leading-relaxed max-w-xs">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
