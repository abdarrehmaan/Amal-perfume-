import type { Metadata } from 'next';
import { ShieldCheck, Video, MessageSquare, CheckCircle2, Sparkles, RefreshCw, PackageCheck, AlertCircle } from 'lucide-react';
import BackButton from '@/components/storefront/BackButton';

export const metadata: Metadata = {
  title: 'Return & Flacon Policy — AMAL PERFUME',
  description: 'Simple, transparent return & refund guidelines, sample-first policy, and unboxing requirements.',
};

export default function ReturnPolicyPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen text-stone-800">
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

      <div className="container-plt py-10 md:py-14 px-4 max-w-4xl mx-auto space-y-8">
        {/* 4 Key Points Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col items-center text-center">
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-3">
              <Sparkles size={20} />
            </div>
            <h3 className="font-bold text-stone-900 text-sm mb-1">1. Sample First</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Test the free 2ml sample vial included before opening the main flacon.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col items-center text-center">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3">
              <PackageCheck size={20} />
            </div>
            <h3 className="font-bold text-stone-900 text-sm mb-1">2. Intact Seal</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Main bottle box and cellophane wrap must remain unopened & sealed.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col items-center text-center">
            <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center mb-3">
              <AlertCircle size={20} />
            </div>
            <h3 className="font-bold text-stone-900 text-sm mb-1">3. Hygiene Standard</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Opened or unsealed perfume bottles cannot be returned or refunded.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col items-center text-center">
            <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-800 flex items-center justify-center mb-3">
              <Video size={20} />
            </div>
            <h3 className="font-bold text-stone-900 text-sm mb-1">4. Unboxing Video</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Continuous 360° unboxing video is required for transit damage claims.
            </p>
          </div>
        </div>

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

        {/* Customer Support Card */}
        <div className="bg-[#1C1917] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-400 flex items-center justify-center shrink-0">
              <MessageSquare size={24} />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white mb-0.5">Need help with an order or return?</h3>
              <p className="text-xs sm:text-sm text-stone-300">
                Reach out to our customer care team via Call or WhatsApp. We respond within 24 hours.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/916392006081"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-all text-center shadow-xs whitespace-nowrap"
          >
            WhatsApp: +91 63920 06081
          </a>
        </div>
      </div>
    </div>
  );
}
