'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, MessageCircle, Phone, Mail, ArrowRight } from 'lucide-react';
import BackButton from '@/components/storefront/BackButton';

const faqCategories = [
  {
    category: 'Orders & Climate-Controlled Shipping',
    items: [
      {
        q: 'How long does shipping take?',
        a: 'Orders are prepared within 24 hours in our climate-controlled vault. Standard domestic delivery takes 2–4 business days across India via insured courier. Express shipping is also available at checkout.',
      },
      {
        q: 'Is shipping free?',
        a: 'Yes, we offer complimentary insured nationwide shipping on all orders above ₹1,499. For orders below ₹1,499, a flat shipping charge of ₹99 applies.',
      },
      {
        q: 'Do you offer Cash on Delivery (COD)?',
        a: 'Yes, Cash on Delivery is available across most serviceable pincodes in India for orders up to ₹10,000.',
      },
    ],
  },
  {
    category: 'Fragrance Concentrations & Longevity',
    items: [
      {
        q: 'What is the difference between Extrait de Parfum and Eau de Parfum?',
        a: 'Extrait de Parfum is the highest concentration of fragrance available, containing 25% to 35% pure fragrance oil. It offers intense intimacy, rich depth, and 18–24 hours of longevity. Eau de Parfum contains 15% to 20% oil concentration, offering radiant projection and 10–14 hours of wear.',
      },
      {
        q: 'How long do AMAL PERFUME fragrances last on skin and clothing?',
        a: 'Due to our high oil concentrations and natural botanical fixatives, our extraits project prominently for 8–12 hours and remain as an intimate skin scent for up to 24 hours. On fabric and outerwear, the scent can easily persist for several days.',
      },
      {
        q: 'Are your fragrances safe for sensitive skin?',
        a: 'Yes. All our creations comply strictly with the International Fragrance Association (IFRA) standards. We formulate without parabens, phthalates, or harsh fixatives, using pharmaceutical-grade organic cane alcohol and skin-nourishing essential oils.',
      },
    ],
  },
  {
    category: 'Sample-First Policy & Flacon Care',
    items: [
      {
        q: 'Can I test the fragrance before opening the full-size bottle?',
        a: 'Yes! Every 50ml or 100ml flacon includes a complimentary matching 2ml tester vial. We encourage you to test the 2ml vial first. If you decide the fragrance is not for you, you can return the full-size bottle as long as its cellophane seal remains completely intact.',
      },
      {
        q: 'How should I properly store my luxury perfume flacon?',
        a: 'Keep your flacon away from direct sunlight, extreme heat, and bathroom humidity. Storing your perfume in its presentation box at room temperature preserves the delicate top notes and enables optimal maturation for years to come.',
      },
      {
        q: 'What is the best way to apply perfume for maximum sillage?',
        a: 'Spray onto warm pulse points: the sides of your neck, inner wrists, and collarbones. Avoid rubbing your wrists together, as friction crushes the delicate top note molecules and alters the fragrance development.',
      },
    ],
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>('0-0');

  const toggle = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-16 text-stone-800">
      {/* Header */}
      <div className="py-10 md:py-14 border-b border-stone-200 bg-[#F4F0E6]">
        <div className="container-plt px-4 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto flex justify-start">
            <BackButton label="Back to Store" />
          </div>
          <div className="text-center sm:text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-900 text-[11px] font-semibold uppercase tracking-wider mb-1.5">
              <HelpCircle size={13} className="text-amber-700" />
              <span>Knowledge Base</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-1">
              Frequently Asked Questions
            </h1>
            <p className="text-stone-600 max-w-md text-xs sm:text-sm">
              Answers regarding orders, flacons, longevity, delivery, and care.
            </p>
          </div>
        </div>
      </div>

      <div className="container-plt py-12 md:py-20">
        <div className="max-w-3xl mx-auto space-y-12">
          {faqCategories.map((cat, catIdx) => (
            <div key={cat.category}>
              <h2 className="font-display text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">
                {cat.category}
              </h2>
              <div className="space-y-4">
                {cat.items.map((item, itemIdx) => {
                  const id = `${catIdx}-${itemIdx}`;
                  const isOpen = openIndex === id;

                  return (
                    <div
                      key={item.q}
                      className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-brand-200"
                    >
                      <button
                        onClick={() => toggle(id)}
                        className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-gray-900 text-base bg-white hover:bg-brand-50/40 transition-colors"
                      >
                        <span>{item.q}</span>
                        <ChevronDown
                          size={18}
                          className={`text-brand-600 flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="p-5 pt-0 text-sm text-gray-600 leading-relaxed bg-white border-t border-gray-50">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Contact Concierge Banner */}
          <div className="mt-16 bg-gradient-to-r from-gray-900 to-brand-950 text-white rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <h3 className="font-display text-xl md:text-2xl font-bold mb-2">Still Have Questions?</h3>
              <p className="text-white/70 text-sm max-w-md">
                Our Client Care team is available Monday to Saturday to assist you with styling and order queries.
              </p>
            </div>
            <Link
              href="/contact"
              className="whitespace-nowrap px-8 py-3.5 rounded-full bg-white text-gray-900 font-bold text-sm hover:bg-brand-100 transition-colors flex items-center gap-2"
            >
              Contact Concierge <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
