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
    <section className="py-20 bg-[#08080a] border-y border-gold-500/10">
      <div className="container-plt">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-400 font-bold mb-3">Pure Artisanal Excellence</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">The AMAL PERFUME Promise</h2>
          <p className="text-stone-400 font-light text-base">More Than A Fragrance — It's An Emotion. Experience pristine olfactory elegance and eternal longevity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {trustFeatures.map(({ icon: Icon, title, desc }, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group p-6 rounded-2xl bg-white/[0.02] border border-gold-500/10 hover:border-gold-500/30 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mb-6 group-hover:bg-gold-500/20 group-hover:scale-110 transition-all duration-500">
                <Icon size={28} className="text-gold-400 stroke-[1.5]" />
              </div>
              <h3 className="text-base font-bold text-white mb-2 uppercase tracking-wider">{title}</h3>
              <p className="text-stone-400 font-light text-sm leading-relaxed max-w-xs">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
