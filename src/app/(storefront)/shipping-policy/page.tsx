import type { Metadata } from 'next';
import { Truck, Clock, ShieldCheck, MessageSquare, Video, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy — AMAL PERFUME',
  description: 'Complimentary shipping across India on orders above ₹1499. Insured 3-5 business days delivery.',
};

export default function ShippingPolicyPage() {
  const highlights = [
    {
      icon: Truck,
      title: 'Free Shipping',
      desc: 'Complimentary on orders above ₹1499 (Flat ₹99 below ₹1499)',
    },
    {
      icon: Clock,
      title: '3–5 Day Delivery',
      desc: 'Express dispatch for metro cities; 5–7 days across India',
    },
    {
      icon: ShieldCheck,
      title: '100% Insured Delivery',
      desc: 'Secure flacon packaging via Blue Dart, Delhivery & Ecom Express',
    },
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-stone-800">
      {/* Header Banner */}
      <div className="py-12 md:py-16 text-center border-b border-stone-200 bg-[#F4F0E6]">
        <div className="container-plt px-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <Truck size={14} className="text-amber-700" />
            <span>Maison Logistics</span>
          </div>
          <h1 className="font-display text-2xl md:text-4xl font-bold text-stone-900 mb-2">
            Shipping & Delivery Policy
          </h1>
          <p className="text-stone-600 text-sm md:text-base">
            Carefully compounded, sealed, and delivered across India.
          </p>
        </div>
      </div>

      <div className="container-plt py-10 px-4 max-w-3xl mx-auto space-y-6">
        {/* Quick Summary Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-stone-200/80 rounded-xl p-5 text-center shadow-xs flex flex-col items-center justify-center"
              >
                <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
                  <Icon size={18} />
                </div>
                <h3 className="font-semibold text-stone-900 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-stone-500 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Support & Notice Footer Card */}
        <div className="bg-amber-50/60 border border-amber-200/70 rounded-2xl p-5 md:p-6 space-y-3.5">
          <div className="flex items-start gap-3">
            <MessageSquare size={18} className="text-amber-800 mt-0.5 shrink-0" />
            <div className="text-xs md:text-sm text-stone-800">
              <span className="font-semibold text-stone-900">Need delivery assistance? </span>
              Contact our concierge on WhatsApp at{' '}
              <a
                href="https://wa.me/916392006081"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-amber-900 hover:underline inline-flex items-center gap-1"
              >
                +91 63920 06081
                <ArrowRight size={12} />
              </a>
              . We reply within 24 hours.
            </div>
          </div>
          <div className="flex items-start gap-3 pt-3 border-t border-amber-200/50">
            <Video size={18} className="text-stone-700 mt-0.5 shrink-0" />
            <p className="text-xs text-stone-600 leading-relaxed">
              <strong className="text-stone-900">Unboxing Notice:</strong> For transit claim verification, please record an unbroken 360° video while opening your parcel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
