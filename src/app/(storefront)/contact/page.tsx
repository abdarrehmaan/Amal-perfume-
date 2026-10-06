import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock, MessageSquare, Sparkles, ShieldCheck } from 'lucide-react';
import ContactForm from '@/components/storefront/ContactForm';
import BackButton from '@/components/storefront/BackButton';

export const metadata: Metadata = {
  title: 'Client Concierge & Contact — AMAL PERFUME',
  description: 'Connect with AMAL PERFUME Haute Parfumerie Maison — bespoke scent consultations, private orders, and client concierge.',
};

export default function ContactPage() {
  const contactInfo = [
    {
      Icon: Phone,
      label: 'Phone & WhatsApp',
      value: '+91 63920 06081',
      sub: 'Mon–Sat, 10am–7pm IST (Response within 24h)',
      href: 'https://wa.me/916392006081',
      action: 'Chat on WhatsApp',
    },
    {
      Icon: Mail,
      label: 'Concierge Email',
      value: 'concierge@amalperfume.com',
      sub: '24/7 client inquiries & support',
      href: 'mailto:concierge@amalperfume.com',
      action: 'Send Email',
    },
    {
      Icon: MapPin,
      label: 'Flagship Maison',
      value: 'AMAL PERFUME Flagship Store',
      sub: 'Mumbai, Maharashtra, India',
    },
    {
      Icon: Clock,
      label: 'Boutique Hours',
      value: 'Monday – Saturday',
      sub: '10:00 AM – 7:00 PM IST (Sunday Closed)',
    },
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-stone-800 pb-16">
      {/* Consistent Warm Header Banner */}
      <div className="py-10 md:py-14 border-b border-stone-200 bg-[#F4F0E6]">
        <div className="container-plt px-4 max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto flex justify-start">
            <BackButton label="Back to Store" />
          </div>
          <div className="text-center sm:text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-900 text-[11px] font-semibold uppercase tracking-wider mb-1.5">
              <Sparkles size={13} className="text-amber-700" />
              <span>Client Concierge</span>
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-stone-900 mb-1">
              Contact Our Maison
            </h1>
            <p className="text-stone-600 font-serif italic text-xs md:text-sm">
              &ldquo;More Than A Fragrance — It&apos;s An Emotion&rdquo;
            </p>
          </div>
        </div>
      </div>

      <div className="container-plt py-10 md:py-14 px-4 max-w-5xl mx-auto space-y-10">
        {/* Private Consultation & Flacon Notice Box */}
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
              <MessageSquare size={24} />
            </div>
            <div className="space-y-3 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-bold text-stone-900 text-base sm:text-lg">
                    Private Fragrance Consultation & Support
                  </h2>
                  <p className="text-stone-600 text-xs sm:text-sm mt-0.5">
                    For private orders, custom formulations, or order assistance, our scent team responds within 24 hours.
                  </p>
                </div>
                <a
                  href="https://wa.me/916392006081"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition-all shadow-xs whitespace-nowrap"
                >
                  WhatsApp: +91 63920 06081
                </a>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center gap-2 text-xs text-stone-500">
                <ShieldCheck size={16} className="text-amber-700 shrink-0" />
                <span>
                  Flacon Authenticity: All parcels are insured and dispatched in tamper-evident sealed packaging.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Coordinates & Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Contact Coordinates */}
          <div className="space-y-4">
            <h2 className="font-bold text-stone-900 text-lg sm:text-xl mb-4">
              Maison Coordinates
            </h2>
            <div className="space-y-3.5">
              {contactInfo.map(({ Icon, label, value, sub, href, action }) => (
                <div
                  key={label}
                  className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs flex items-start gap-4 transition-all hover:border-stone-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-amber-800 uppercase tracking-wider mb-0.5">
                      {label}
                    </p>
                    <p className="font-bold text-stone-900 text-sm sm:text-base break-words">
                      {value}
                    </p>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {sub}
                    </p>
                    {href && action && (
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="inline-block text-xs font-bold text-amber-800 hover:text-amber-950 underline mt-2"
                      >
                        {action} &rarr;
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
