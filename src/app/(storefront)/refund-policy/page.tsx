import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Ban, MessageSquare, Video, ShieldCheck } from 'lucide-react';
import BackButton from '@/components/storefront/BackButton';

export const metadata: Metadata = {
  title: 'Refund & Sealed Flacon Policy — AMAL PERFUME',
  description: 'AMAL PERFUME official policy regarding cosmetic hygiene, sealed extrait flacons, and sample testing.',
};

export default function RefundPolicyPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-16">
      <div
        className="py-12 md:py-16 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #12100E 0%, #1A1713 50%, #2A241C 100%)' }}
      >
        <div className="container-plt max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto flex justify-start">
            <BackButton variant="glass" label="Back to Store" />
          </div>
          <div className="text-center sm:text-right">
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-amber-400 block mb-1">
              Haute Parfumerie Standards
            </span>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 tracking-wide">
              Refund & Flacon Policy
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm max-w-md">
              Cosmetic hygiene, unboxing verification, and sealed presentation flacons
            </p>
          </div>
        </div>
      </div>

      <div className="container-plt py-12 max-w-3xl">
        <Link
          href="/return-policy"
          className="inline-flex items-center gap-2 text-stone-700 hover:text-stone-950 font-semibold mb-8 text-sm transition-colors"
        >
          <ArrowLeft size={18} /> View Detailed Return Policy
        </Link>

        {/* Policy Box */}
        <div className="bg-white border-2 border-stone-200 rounded-3xl p-8 mb-10 text-center shadow-xs">
          <Ban size={36} className="text-amber-800 mx-auto mb-3" />
          <h2 className="font-display font-extrabold text-2xl text-stone-900 mb-2">
            NO RETURNS · NO REFUNDS · NO EXCHANGES
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed max-w-lg mx-auto">
            Due to strict cosmetic safety and hygiene regulations, once a flacon&apos;s cellophane seal or tamper-evident ribbon has been opened or unsealed, all sales are strictly final.
          </p>
        </div>

        {/* Sample First Guarantee */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 mb-10 flex gap-4 items-start">
          <ShieldCheck size={28} className="text-amber-800 shrink-0 mt-1" />
          <div>
            <h3 className="font-display font-bold text-stone-900 text-base mb-1">
              The AMAL Perfume Promise: Sample-First Experience
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              Every presentation flacon arrives with a complimentary matching 2ml tester vial. Please test the sample first on your skin. If you are not satisfied, you may return the full presentation flacon provided its factory cellophane seal remains 100% intact.
            </p>
          </div>
        </div>

        {/* Mandatory Support & Verification Notice */}
        <div className="bg-white border border-stone-200 rounded-3xl p-8 mb-10 space-y-6 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-800 text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <MessageSquare size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-stone-900 text-base mb-1">Fragrance Concierge Support</h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                For any shipping inquiries or transit damages, please reach out to our Client Concierge on WhatsApp at{' '}
                <strong className="text-stone-900 font-bold">+91 63920 06081</strong> or via email at{' '}
                <strong className="text-stone-900 font-bold">concierge@amalperfume.com</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 pt-6 border-t border-stone-100">
            <div className="w-10 h-10 rounded-2xl bg-stone-900 text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <Video size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-stone-900 text-base mb-1">Mandatory 360-Degree Unboxing Video</h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                In the rare case of transit damage, leakage, or defective atomizer seals, a continuous 360-degree unboxing video from package opening to flacon inspection is mandatory to initiate an immediate flacon replacement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
