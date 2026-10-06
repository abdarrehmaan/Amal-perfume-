import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import BackButton from '@/components/storefront/BackButton';

export const metadata: Metadata = {
  title: 'Fragrance Families — AMAL PERFUME',
  description: 'Explore our curated olfactory families: Extrait de Parfum, Oud & Oriental, Floral & Gourmand, and Discovery Coffrets.',
};

const defaultImages: Record<string, string> = {
  'extrait-de-parfum': '/products/saddle-leather.jpg',
  'eau-de-parfum': '/products/enigma.jpg',
  'oud-oriental': '/products/saddle-leather.jpg',
  'floral-gourmand': '/products/enigma.jpg',
  'fresh-citrus': '/products/enigma.jpg',
  'discovery-coffrets': '/products/amal-collection.jpg',
};

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  let dbCategories: any[] = [];
  try {
    dbCategories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
  } catch (error) {
    console.warn('CategoriesPage DB query warning:', error);
  }

  if (dbCategories.length === 0) {
    const { mockCategories } = await import('@/lib/mock-data');
    dbCategories = mockCategories;
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-16 text-stone-800">
      <div className="py-10 md:py-14 border-b border-stone-200 bg-[#F4F0E6]">
        <div className="container-plt px-4 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto flex justify-start">
            <BackButton label="Back to Shop" />
          </div>
          <div className="text-center sm:text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-900 text-[11px] font-semibold uppercase tracking-wider mb-1.5">
              <Sparkles size={13} className="text-amber-700" />
              <span>Haute Parfumerie</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-1">
              Olfactory Families
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm max-w-md">
              Discover our curated collections of pure extraits and fine fragrances.
            </p>
          </div>
        </div>
      </div>

      <div className="container-plt py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dbCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden block shadow-md hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={cat.image || defaultImages[cat.slug] || '/products/saddle-leather.jpg'}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                <h3 className="font-display text-2xl font-bold mb-1 group-hover:-translate-y-1 transition-transform">{cat.name}</h3>
                <p className="text-white/80 text-sm mb-3 opacity-90 group-hover:opacity-100 group-hover:-translate-y-1 transition-all">
                  {cat.description || 'Artisanal perfume formulation'}
                </p>
                <div className="flex items-center gap-2 text-sm font-semibold text-brand-300">
                  Explore Family <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
