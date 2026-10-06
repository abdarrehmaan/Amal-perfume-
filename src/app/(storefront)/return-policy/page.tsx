import type { Metadata } from 'next';
import { ShieldCheck, Video, CheckCircle2, RefreshCw } from 'lucide-react';
import BackButton from '@/components/storefront/BackButton';

export const metadata: Metadata = {
  title: 'Return & Flacon Policy — AMAL PERFUME',
  description: 'Simple, transparent return & refund guidelines, sample-first policy, and unboxing requirements.',
};

export default function ReturnPolicyPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen text-stone-800 pb-16">
      {/* Consistent Warm Header Banner */}
      <div className="py-10 md:py-14 border-b border-stone-200 bg-[#F4F0E6]">
        <div className="container-plt px-4 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto flex justify-start">
            <BackButton label="Back to Store" />
          </div>
          <div className="text-center sm:text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-900 text-[11px] font-semibold uppercase tracking-wider mb-1.5">
              <ShieldCheck size={13} className="text-amber-700" />
              <span>Official Maison Policy</span>
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-stone-900 mb-1">
              Sealed Flacon & Return Policy
            </h1>
            <p className="text-stone-600 text-xs md:text-sm">
              Hygiene standards, sample-first testing, and replacement guidelines
            </p>
          </div>
        </div>
      </div>

      <div className="container-plt py-10 md:py-14 px-4 max-w-4xl mx-auto">
        {/* Detailed Points in Structured Sections */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-10 shadow-xs space-y-8 text-stone-700">
          {/* Section 1: Return Rules */}
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
              <RefreshCw size={20} className="text-amber-700" />
              Return & Exchange Terms
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0 mt-2" />
                <div>
                  <strong className="text-stone-900">7-Day Return Window:</strong> You can initiate a return within 7 calendar days from the date of delivery.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0 mt-2" />
                <div>
                  <strong className="text-stone-900">Original Packaging Required:</strong> The item must be in its original outer box with tamper-evident cellophane wrapping intact.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0 mt-2" />
                <div>
                  <strong className="text-stone-900">Hygiene & Safety Standards:</strong> Opened, sprayed, or unsealed perfume bottles cannot be returned or refunded.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0 mt-2" />
                <div>
                  <strong className="text-stone-900">Keep the 2ml Sample:</strong> You may keep the complimentary 2ml sample vial even if returning the sealed main bottle.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0 mt-2" />
                <div>
                  <strong className="text-stone-900">Quick Refund Processing:</strong> Refunds are processed within 3–5 business days following safe receipt and inspection at our facility.
                </div>
              </li>
            </ul>
          </div>

          <hr className="border-stone-100" />

          {/* Section 2: Damaged / Transit Issues */}
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
              <Video size={20} className="text-rose-700" />
              Transit Damage & Defect Claims
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0 mt-2" />
                <div>
                  <strong className="text-stone-900">Mandatory 360° Unboxing Video:</strong> Please record an uncut video showing the sealed courier package, shipping label, opening, and item condition.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0 mt-2" />
                <div>
                  <strong className="text-stone-900">Report Within 48 Hours:</strong> Share your video along with your Order ID on WhatsApp (+91 63920 06081) within 48 hours.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0 mt-2" />
                <div>
                  <strong className="text-stone-900">Hassle-Free Replacement:</strong> Once verified, we will immediately send a brand-new replacement bottle at no extra charge.
                </div>
              </li>
            </ul>
          </div>

          <hr className="border-stone-100" />

          {/* Section 3: Flacon Assurance */}
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
              <CheckCircle2 size={20} className="text-emerald-700" />
              Quality & Authenticity Assurance
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-2" />
                <div>
                  <strong className="text-stone-900">Laboratory Inspected:</strong> Every flacon is checked for airtight crimping, pristine bottle clarity, and verifiable batch codes before dispatch.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-2" />
                <div>
                  <strong className="text-stone-900">Natural Botanical Nuances:</strong> Subtle variations in hue and scent profile can naturally occur due to authentic pure extracts, resins, and hand-harvested floral distillations.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
