import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock, MessageSquare, Video, AlertCircle } from 'lucide-react';
import ContactForm from '@/components/storefront/ContactForm';

export const metadata: Metadata = {
  title: 'Client Concierge — AMAL PERFUME',
  description: 'Connect with AMAL PERFUME Haute Parfumerie Maison — bespoke scent consultations, private orders, and client concierge.',
};

export default function ContactPage() {
  return (
    <div className="bg-[#08080a] min-h-screen text-stone-200">
      <div className="py-20 text-center relative border-b border-gold-500/20" style={{ background: 'radial-gradient(ellipse at center, #1b160c 0%, #0c0b08 60%, #050505 100%)' }}>
        <p className="text-xs uppercase tracking-[0.4em] text-gold-400 font-bold mb-3">AMAL PERFUME</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-gradient-gold mb-3">Client Concierge</h1>
        <p className="text-stone-300 font-serif italic text-sm tracking-wide">"More Than A Fragrance — It's An Emotion"</p>
      </div>

      <div className="container-plt py-12 md:py-20">
        {/* Support & Unboxing Notice Banner */}
        <div className="max-w-4xl mx-auto mb-12 p-6 md:p-8 rounded-3xl bg-black/60 border border-gold-500/30 shadow-lg">
          <div className="flex flex-col md:flex-row items-start gap-5">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/20 border border-gold-500/40 text-gold-400 flex items-center justify-center flex-shrink-0 shadow-md">
              <MessageSquare size={24} />
            </div>
            <div className="space-y-3">
              <div>
                <h3 className="font-display font-bold text-white text-lg flex items-center gap-2">
                  Private Fragrance Consultation & Concierge
                </h3>
                <p className="text-sm text-stone-300 leading-relaxed font-medium mt-1">
                  For private orders, custom formulations, or order concierge, please speak with our scent specialists on WhatsApp at{' '}
                  <a href="https://wa.me/916392006081" target="_blank" rel="noopener noreferrer" className="font-bold text-gold-400 underline">
                    +91 63920 06081
                  </a>
                  . Our fragrance team responds within 24 hours.
                </p>
              </div>

              <div className="pt-3 border-t border-gold-500/20 flex items-start gap-2.5 text-xs text-stone-400 font-medium">
                <Video size={16} className="text-gold-400 flex-shrink-0 mt-0.5" />
                <span>
                  Flacon Integrity: To ensure tamper-free delivery of our sealed crystal flacons, a 360-degree video upon unboxing is required for any return or transit claims.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact info */}
          <div>
            <h2 className="font-display text-2xl font-bold text-white mb-6">Maison Coordinates</h2>
            <div className="space-y-6">
              {[
                { Icon: Phone, label: 'Phone & WhatsApp', value: '+91 63920 06081', sub: 'Mon–Sat, 10am–7pm IST (Response within 24h)' },
                { Icon: Mail, label: 'Concierge Email', value: 'concierge@amalperfume.com', sub: '24/7 client assistance' },
                { Icon: MapPin, label: 'Flagship Maison', value: 'AMAL PERFUME Flagship Store, Prayagraj', sub: 'Civil Lines, Uttar Pradesh 211001, India' },
                { Icon: Clock, label: 'Boutique Hours', value: 'Monday – Saturday', sub: '10:00 AM – 7:00 PM IST' },
              ].map(({ Icon, label, value, sub }) => (
                <div key={label} className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-gold-500/10">
                  <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-gold-400" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gold-400 uppercase tracking-wider mb-0.5">{label}</p>
                    <p className="font-semibold text-white">{value}</p>
                    <p className="text-sm text-stone-400">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
