import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, FileText, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy — AMAL PERFUME',
  description: 'AMAL PERFUME client privacy & data protection policy. How we safeguard your olfactory preferences, order details, and personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen text-stone-800">
      {/* Header Banner */}
      <div className="py-16 md:py-24 text-center border-b border-stone-200 bg-[#F4F0E6]">
        <div className="container-plt">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-600/30 text-amber-800 text-xs font-bold uppercase tracking-widest mb-4">
            <ShieldCheck size={14} className="text-amber-700" />
            <span>Client Discretion & Confidentiality</span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-stone-900 mb-3">
            Privacy Policy
          </h1>
          <p className="text-stone-600 max-w-xl mx-auto text-sm md:text-base font-normal">
            Honoring client discretion, formulation integrity, and the strictest data confidentiality.
          </p>
          <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold mt-4">
            Last Updated: October 2026 • Official Maison Document
          </p>
        </div>
      </div>

      {/* Main Policy Content */}
      <div className="container-plt py-12 md:py-20 max-w-4xl">
        <div className="bg-white border border-stone-200 rounded-xl p-8 md:p-12 shadow-sm space-y-10">

          {/* Section 1 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-800 shrink-0">
                <Sparkles size={20} />
              </div>
              <h2 className="font-display text-xl md:text-2xl font-bold text-stone-900">
                1. The Maison's Commitment to Client Discretion
              </h2>
            </div>
            <p className="text-stone-600 leading-relaxed text-sm md:text-base">
              At <strong className="text-stone-900 font-semibold">AMAL PERFUME</strong>, we hold the privacy of our distinguished clientele in the highest regard. Whether you are consulting our fragrance specialists for a bespoke signature extrait or purchasing a flacon from our royal oud collection, we handle your personal details with the utmost care, transparency, and digital security.
            </p>
          </div>

          {/* Section 2 */}
          <div className="border-t border-stone-100 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-800 shrink-0">
                <Eye size={20} />
              </div>
              <h2 className="font-display text-xl md:text-2xl font-bold text-stone-900">
                2. Information We Collect
              </h2>
            </div>
            <p className="text-stone-600 leading-relaxed text-sm md:text-base mb-4">
              To deliver an unparalleled luxury fragrance experience, we may collect the following categories of information:
            </p>
            <ul className="space-y-3 text-stone-600 text-sm md:text-base list-disc list-inside">
              <li>
                <strong className="text-stone-900 font-semibold">Client Identification & Contact Data:</strong> Name, email address, telephone/WhatsApp number, delivery destination, and billing address.
              </li>
              <li>
                <strong className="text-stone-900 font-semibold">Olfactory Profiles & Scent History:</strong> Notes from personal fragrance consultations, past orders, discovery coffret ratings, and preference for specific fragrance families (Extrait de Parfum, Royal Oud, Gourmand, or Floral).
              </li>
              <li>
                <strong className="text-stone-900 font-semibold">Transactional Data:</strong> Payment confirmations and order invoice history. Credit/debit card numbers and UPI credentials are processed directly via PCI-DSS Level 1 certified gateways and are never stored on our servers.
              </li>
              <li>
                <strong className="text-stone-900 font-semibold">Digital Device & Experience Data:</strong> IP address, device telemetry, and browsing preferences within our digital fragrance lookbook to optimize flacon showcase performance.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="border-t border-stone-100 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-800 shrink-0">
                <FileText size={20} />
              </div>
              <h2 className="font-display text-xl md:text-2xl font-bold text-stone-900">
                3. Purpose of Processing Client Data
              </h2>
            </div>
            <p className="text-stone-600 leading-relaxed text-sm md:text-base mb-4">
              Your data is exclusively utilized to uphold the high standards of the Maison:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200/80">
                <h4 className="font-bold text-stone-900 text-sm mb-1 uppercase tracking-wider">Flacon Fulfillment</h4>
                <p className="text-xs text-stone-600">Compounding, packing tamper-evident flacons, and executing temperature-controlled insured express dispatch.</p>
              </div>
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200/80">
                <h4 className="font-bold text-stone-900 text-sm mb-1 uppercase tracking-wider">Concierge Advisory</h4>
                <p className="text-xs text-stone-600">Providing personalized longevity consultations, sillage guidance, and curated discovery recommendations.</p>
              </div>
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200/80">
                <h4 className="font-bold text-stone-900 text-sm mb-1 uppercase tracking-wider">Private Reserve Access</h4>
                <p className="text-xs text-stone-600">Offering advance private allocations of rare agarwood harvest distillations (optional, easily unsubscribed).</p>
              </div>
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200/80">
                <h4 className="font-bold text-stone-900 text-sm mb-1 uppercase tracking-wider">Authenticity & Safety</h4>
                <p className="text-xs text-stone-600">Preventing fraudulent transactions and verifying serial authentication certificates on sealed flacons.</p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="border-t border-stone-100 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-800 shrink-0">
                <Lock size={20} />
              </div>
              <h2 className="font-display text-xl md:text-2xl font-bold text-stone-900">
                4. Data Protection & Non-Disclosure
              </h2>
            </div>
            <p className="text-stone-600 leading-relaxed text-sm md:text-base">
              <strong className="text-stone-900 font-semibold">AMAL PERFUME never sells, rents, or commercializes your personal records or fragrance preferences to third-party data brokers.</strong> Information is shared solely with trusted service partners under strict confidentiality agreements, including insured air couriers for flacon delivery and certified banking gateways.
            </p>
          </div>

          {/* Section 5 */}
          <div className="border-t border-stone-100 pt-8">
            <h2 className="font-display text-xl md:text-2xl font-bold text-stone-900 mb-4">
              5. Your Rights as a Connoisseur
            </h2>
            <p className="text-stone-600 leading-relaxed text-sm md:text-base mb-4">
              Under applicable Indian and global data privacy frameworks, you have full ownership over your profile:
            </p>
            <ul className="space-y-2 text-stone-600 text-sm md:text-base list-disc list-inside">
              <li>Request an audit copy of all personal records and order histories held by the Maison.</li>
              <li>Amend your contact information, shipping address, or olfactory preferences.</li>
              <li>Request the permanent deletion of your client profile and digital records.</li>
              <li>Opt out of bespoke fragrance announcements with a single click.</li>
            </ul>
          </div>

          {/* Section 6: Contact */}
          <div className="border-t border-stone-100 pt-8 bg-[#FAF8F5] p-6 rounded-xl border border-stone-200">
            <h3 className="font-display text-lg font-bold text-stone-900 mb-2">
              Privacy Officer & Fragrance Concierge
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mb-4">
              For any privacy inquiries or to exercise your data rights, contact our Concierge:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="flex items-center gap-2 text-stone-700">
                <Mail size={16} className="text-amber-700 shrink-0" />
                <span className="font-semibold break-all">concierge@amalperfume.com</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700">
                <Phone size={16} className="text-amber-700 shrink-0" />
                <span className="font-semibold">+91 63920 06081</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700">
                <MapPin size={16} className="text-amber-700 shrink-0" />
                <span>Civil Lines, Prayagraj, UP</span>
              </div>
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
