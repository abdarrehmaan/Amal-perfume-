import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Video, MessageSquare, ArrowRight, Ban, RefreshCw } from 'lucide-react';
import BackButton from '@/components/storefront/BackButton';

export const metadata: Metadata = {
  title: 'Refund Policy — AMAL PERFUME',
  description: 'Official AMAL PERFUME refund guidelines, cosmetic hygiene standards, and sample testing policy.',
};

export default function RefundPolicyPage() {
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
              <span>Standards & Guarantee</span>
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-stone-900 mb-1">
              Refund & Cancellation Policy
            </h1>
            <p className="text-stone-600 text-xs md:text-sm">
              Cosmetic hygiene standards, sample testing, and refund terms
            </p>
          </div>
        </div>
      </div>

      <div className="container-plt py-10 md:py-14 px-4 max-w-3xl mx-auto space-y-8">
        <Link
          href="/return-policy"
          className="inline-flex items-center gap-2 text-stone-700 hover:text-stone-950 font-semibold text-sm transition-colors group"
        >
          <span>View Detailed Return & Flacon Policy</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* Core Policy Points */}
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
              <Ban size={22} />
            </div>
            <div>
              <h2 className="font-bold text-stone-900 text-base sm:text-lg">
                Key Refund Guidelines
              </h2>
              <p className="text-xs text-stone-500">Summary of our refund criteria in simple points</p>
            </div>
          </div>

          <ul className="space-y-3.5 text-xs sm:text-sm text-stone-700">
            <li className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0 mt-2" />
              <div>
                <strong className="text-stone-900">Unopened Bottles Only:</strong> Full refunds are issued for bottles returned in their original packaging with unbroken cellophane seals within 7 days of delivery.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0 mt-2" />
              <div>
                <strong className="text-stone-900">Sample-First Guarantee:</strong> You can test the complimentary 2ml sample vial first. Keep the sample even if you choose to return the unopened main bottle.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0 mt-2" />
              <div>
                <strong className="text-stone-900">Hygiene & Safety Final Sale:</strong> Opened, sprayed, or unsealed perfume bottles cannot be returned or refunded due to cosmetic safety standards.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0 mt-2" />
              <div>
                <strong className="text-stone-900">Refund Method & Timeline:</strong> Once the returned item is inspected at our facility, the refund is credited to your original payment method or wallet within 3–5 business days.
              </div>
            </li>
          </ul>
        </div>

        {/* Damaged & Support Section */}
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center shrink-0">
              <Video size={20} />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base mb-1">Damaged or Leaking Parcels</h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                A continuous 360° unboxing video starting from the sealed outer package is required to claim an immediate free replacement or full refund for transit damages.
              </p>
            </div>
          </div>

          <hr className="border-stone-100" />

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <MessageSquare size={20} />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base mb-1">Customer Support & Concierge</h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                For questions regarding refunds or orders, WhatsApp us at{' '}
                <a href="https://wa.me/916392006081" target="_blank" rel="noopener noreferrer" className="text-amber-800 font-bold hover:underline">
                  +91 63920 06081
                </a>{' '}
                or email{' '}
                <strong className="text-stone-900 font-semibold">concierge@amalperfume.com</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
