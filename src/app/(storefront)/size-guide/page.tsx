import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, CheckCircle2, ArrowRight, Droplets, Clock, Flame } from 'lucide-react';
import BackButton from '@/components/storefront/BackButton';

export const metadata: Metadata = {
  title: 'Flacon & Sillage Guide — AMAL PERFUME',
  description: 'Understand perfume concentrations, bottle volumes, and sillage mastery with AMAL PERFUME.',
};

const volumeCharts = [
  {
    category: 'Flacon Sizes & Spray Endurance',
    rows: [
      { volume: '100ml Full Presentation', sprays: '750–850 Sprays', dailyUse: '6–9 Months', recommendation: 'Signature scent, daily luxury & evening events' },
      { volume: '50ml Signature Flacon', sprays: '375–420 Sprays', dailyUse: '3–5 Months', recommendation: 'Ideal travel & personal fragrance wardrobe' },
      { volume: '10ml Travel Atomizer', sprays: '80–100 Sprays', dailyUse: '1 Month', recommendation: 'Bespoke clutch, carry-on & scent testing' },
    ],
  },
  {
    category: 'Concentration & Olfactory Longevity',
    rows: [
      { concentration: 'Extrait de Parfum', oilPercentage: '30% – 35%', longevity: '18 – 24 Hours', sillage: 'Intense, Regal & Enveloping' },
      { concentration: 'Eau de Parfum (EDP)', oilPercentage: '18% – 22%', longevity: '10 – 14 Hours', sillage: 'Radiant, Elegant & Noticeable' },
      { concentration: 'Eau de Toilette (Industry standard)', oilPercentage: '8% – 12%', longevity: '4 – 6 Hours', sillage: 'Light & Fleeting' },
    ],
  },
];

const applicationTips = [
  {
    title: 'Pulse Points Only',
    desc: 'Apply directly onto pulse points where natural body heat radiates: sides of the neck, clavicles, inside wrists, and inner elbows.',
  },
  {
    title: 'Never Rub Your Wrists',
    desc: 'Do not create friction by rubbing wrists together. Allow the delicate top notes to dry down naturally for pure chord progression.',
  },
  {
    title: 'Hydrated Skin Fixation',
    desc: 'Fragrance molecules anchor to moisture. Apply right after a warm shower or on moisturized skin for 40% longer sillage.',
  },
  {
    title: 'Clothing & Scarf Layering',
    desc: 'Mist lightly on cashmere scarves, suit lapels, or outerwear. Extrait oils can project delicately for days on natural textiles.',
  },
];

export default function SizeGuidePage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-16 text-stone-800">
      {/* Header Banner */}
      <div className="py-10 md:py-14 border-b border-stone-200 bg-[#F4F0E6]">
        <div className="container-plt px-4 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto flex justify-start">
            <BackButton label="Back to Store" />
          </div>
          <div className="text-center sm:text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-900 text-[11px] font-semibold uppercase tracking-wider mb-1.5">
              <Droplets size={13} className="text-amber-700" />
              <span>Haute Parfumerie Guide</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-1">
              Flacon & Sillage Guide
            </h1>
            <p className="text-stone-600 max-w-md text-xs sm:text-sm">
              Select your ideal bottle volume and master the art of long-lasting fragrance application.
            </p>
          </div>
        </div>
      </div>

      <div className="container-plt py-12 md:py-20">
        {/* Sample First Guarantee */}
        <div className="max-w-4xl mx-auto mb-16 p-6 rounded-2xl bg-brand-50/50 border border-brand-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-600 text-white flex items-center justify-center flex-shrink-0">
              <Sparkles size={22} />
            </div>
            <div>
              <h3 className="font-display font-bold text-gray-900 text-lg mb-1">Complimentary 2ml Tester With Every Flacon</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Test the 2ml sample before opening your full presentation flacon. If it is not your signature scent, return the unsealed full box for an exchange.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="whitespace-nowrap px-6 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-black transition-colors flex items-center gap-2"
          >
            Scent Consultation <ArrowRight size={16} />
          </Link>
        </div>

        {/* Tables */}
        <div className="max-w-4xl mx-auto space-y-12 mb-20">
          {volumeCharts.map((chart) => (
            <div key={chart.category} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-gray-900 text-white px-6 py-4">
                <h2 className="font-display font-semibold text-lg">{chart.category}</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 font-semibold border-b border-gray-100">
                      {Object.keys(chart.rows[0]).map((key) => (
                        <th key={key} className="py-4 px-6 capitalize">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {chart.rows.map((row: any, idx) => (
                      <tr key={idx} className="hover:bg-brand-50/30 transition-colors">
                        {Object.values(row).map((val: any, vIdx) => (
                          <td
                            key={vIdx}
                            className={`py-4 px-6 ${
                              vIdx === 0 ? 'font-bold text-gray-900 bg-gray-50/50' : 'text-gray-700 font-medium'
                            }`}
                          >
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* How to Master Sillage */}
        <div className="max-w-4xl mx-auto bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
            How to Master 24-Hour Sillage
          </h2>
          <p className="text-gray-500 text-center text-sm mb-10 max-w-md mx-auto">
            Professional guidelines to prolong scent longevity and projection on the body.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {applicationTips.map((tip, idx) => (
              <div key={tip.title} className="flex gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-xs">
                <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 font-bold text-sm flex items-center justify-center flex-shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base mb-1">{tip.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
