import type { Metadata } from 'next';
import Link from 'next/link';
import { Scroll, ShieldAlert, Sparkles, AlertTriangle, Truck, Ban, Award, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service — AMAL PERFUME',
  description: 'Official Terms & Conditions governing AMAL PERFUME orders, sealed flacon purchases, formulation purity, and maison boutique services.',
};

export default function TermsPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen text-stone-800">
      {/* Header Banner */}
      <div className="py-16 md:py-24 text-center border-b border-stone-200 bg-[#F4F0E6]">
        <div className="container-plt">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-600/30 text-amber-800 text-xs font-bold uppercase tracking-widest mb-4">
            <Scroll size={14} className="text-amber-700" />
            <span>Maison Agreement & Purchase Standards</span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-stone-900 mb-3">
            Terms of Service
          </h1>
          <p className="text-stone-600 max-w-xl mx-auto text-sm md:text-base font-normal">
            Standards of excellence, formulation purity, sealed flacon policies, and client agreements.
          </p>
          <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold mt-4">
            Last Updated: October 2026 • Official Maison Document
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-plt py-12 md:py-20 max-w-4xl">
        <div className="bg-white border border-stone-200 rounded-xl p-8 md:p-12 shadow-sm space-y-10">

          {/* Section 1 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-800 shrink-0">
                <Sparkles size={20} />
              </div>
              <h2 className="font-display text-xl md:text-2xl font-bold text-stone-900">
                1. Acceptance of Terms
              </h2>
            </div>
            <p className="text-stone-600 leading-relaxed text-sm md:text-base">
              By accessing the <strong className="text-stone-900 font-semibold">AMAL PERFUME</strong> digital boutique, consulting our concierge, or commissioning a purchase of our flacons, discovery sets, or bespoke extraits, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please refrain from using our boutique.
            </p>
          </div>

          {/* Section 2 */}
          <div className="border-t border-stone-100 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-800 shrink-0">
                <Award size={20} />
              </div>
              <h2 className="font-display text-xl md:text-2xl font-bold text-stone-900">
                2. Artisanal Formulations & Extrait Nature
              </h2>
            </div>
            <p className="text-stone-600 leading-relaxed text-sm md:text-base mb-4">
              AMAL PERFUME formulations represent haute parfumerie compounded with up to 35% pure fragrance oil concentration:
            </p>
            <ul className="space-y-3 text-stone-600 text-sm md:text-base list-disc list-inside">
              <li>
                <strong className="text-stone-900 font-semibold">Natural Botanical Variations:</strong> Our master distillations incorporate authentic botanicals, rare Cambodian agarwood, wild ambergris accords, and hand-harvested florals. Subtle shade and olfactory nuances between distillation harvests are natural indicators of genuine pure extracts.
              </li>
              <li>
                <strong className="text-stone-900 font-semibold">Sillage & Longevity:</strong> Olfactory projection and longevity vary naturally depending on individual dermal chemistry, hydration levels, skin temperature, and climate conditions.
              </li>
              <li>
                <strong className="text-stone-900 font-semibold">Flacon Maturation:</strong> Extraits are aged for a minimum of 6 months. Exposure to direct sunlight or extreme heat after delivery can degrade volatile top notes; flacons must be stored in cool, shaded spaces.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="border-t border-stone-100 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-800 shrink-0">
                <AlertTriangle size={20} />
              </div>
              <h2 className="font-display text-xl md:text-2xl font-bold text-stone-900">
                3. Topical Application & Sensitivity Precautions
              </h2>
            </div>
            <p className="text-stone-600 leading-relaxed text-sm md:text-base mb-4">
              All AMAL PERFUME products adhere strictly to international IFRA safety guidelines:
            </p>
            <div className="p-5 rounded-lg bg-amber-50/60 border border-amber-200/80 text-sm text-stone-700 space-y-2">
              <p>• <strong>External Use Only:</strong> Formulations are strictly intended for external application to skin or clothing. Never ingest or apply near eyes or mucous membranes.</p>
              <p>• <strong>Skin Patch Testing:</strong> If you have hypersensitive skin or known botanical allergies, we recommend testing our complimentary 2ml sample vial on a small patch of skin (e.g. inner forearm) prior to unsealing the master flacon.</p>
              <p>• <strong>Flammable Liquid:</strong> Keep flacons away from open flames, sparks, and high temperatures.</p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="border-t border-stone-100 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-800 shrink-0">
                <Ban size={20} />
              </div>
              <h2 className="font-display text-xl md:text-2xl font-bold text-stone-900">
                4. Sealed Flacon Policy & Hygiene Exclusions
              </h2>
            </div>
            <p className="text-stone-600 leading-relaxed text-sm md:text-base mb-4">
              To guarantee absolute chemical purity, tamper-evident security, and strict cosmetic hygiene for every client:
            </p>
            <ul className="space-y-3 text-stone-600 text-sm md:text-base list-disc list-inside">
              <li>
                <strong className="text-stone-900 font-semibold">Intact Cellophane Seal Mandatory:</strong> Full-sized flacons whose protective cellophane wrapping, tamper-evident neck band, or atomizer cap has been opened or unsealed cannot be returned, exchanged, or refunded under any circumstance.
              </li>
              <li>
                <strong className="text-stone-900 font-semibold">Sample First Guarantee:</strong> Test your complimentary 2ml sample vial included with every flacon before unsealing the master presentation box.
              </li>
              <li>
                <strong className="text-stone-900 font-semibold">Mandatory Unboxing Video:</strong> For claims regarding transit leakage or flacon breakage, a continuous 360-degree unboxing video starting from the sealed external shipping box is required within 48 hours of recorded delivery.
              </li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="border-t border-stone-100 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-800 shrink-0">
                <Truck size={20} />
              </div>
              <h2 className="font-display text-xl md:text-2xl font-bold text-stone-900">
                5. Pricing, Orders & Climate-Safe Delivery
              </h2>
            </div>
            <p className="text-stone-600 leading-relaxed text-sm md:text-base mb-4">
              All prices are listed in Indian Rupees (INR) and are inclusive of applicable GST. We reserve the right to revise private reserve pricing based on raw botanical harvest yields.
            </p>
            <p className="text-stone-600 leading-relaxed text-sm md:text-base">
              Orders are packaged in shock-absorbing, climate-safe presentation cartons and shipped via insured express couriers. Complimentary shipping applies to domestic orders exceeding ₹1,499.
            </p>
          </div>

          {/* Section 6 */}
          <div className="border-t border-stone-100 pt-8">
            <h2 className="font-display text-xl md:text-2xl font-bold text-stone-900 mb-4">
              6. Intellectual Property
            </h2>
            <p className="text-stone-600 leading-relaxed text-sm md:text-base">
              All trademarks, bottle shapes, cap engravings, fragrance names (including <em>AMAL PERFUME</em>, <em>Saddle Leather</em>, <em>Enigma</em>), graphics, photographic compositions, and editorial lookbook content are the sole intellectual property of AMAL PERFUME. Any reproduction, cloning, or commercial use without prior written authorization is strictly prohibited.
            </p>
          </div>

          {/* Section 7 */}
          <div className="border-t border-stone-100 pt-8">
            <h2 className="font-display text-xl md:text-2xl font-bold text-stone-900 mb-4">
              7. Governing Law & Jurisdiction
            </h2>
            <p className="text-stone-600 leading-relaxed text-sm md:text-base">
              These Terms of Service are governed by the laws of India. Any disputes arising in connection with orders or boutique services shall be subject to the exclusive jurisdiction of the competent courts in Prayagraj, Uttar Pradesh, India.
            </p>
          </div>

          {/* Section 8: Concierge Support */}
          <div className="border-t border-stone-100 pt-8 bg-[#FAF8F5] p-6 rounded-xl border border-stone-200">
            <h3 className="font-display text-lg font-bold text-stone-900 mb-2">
              Boutique Inquiries & Concierge Assistance
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mb-4">
              For consultation, order verifications, or corporate orders:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
              <p>• <strong>Email:</strong> <a href="mailto:concierge@amalperfume.com" className="font-semibold text-amber-800 underline">concierge@amalperfume.com</a></p>
              <p>• <strong>Direct Hotline:</strong> <span className="font-semibold">+91 63920 06081</span> (Mon–Sat, 10am–7pm IST)</p>
              <p>• <strong>Flagship:</strong> Civil Lines, Prayagraj, Uttar Pradesh 211001</p>
              <p>• <strong>Motto:</strong> <em className="text-amber-800">"More Than A Fragrance — It's An Emotion"</em></p>
            </div>
          </div>

        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-sm font-bold uppercase tracking-wider text-amber-800 hover:text-amber-950 transition-colors">
            ← Return to AMAL PERFUME Maison
          </Link>
        </div>
      </div>
    </div>
  );
}
