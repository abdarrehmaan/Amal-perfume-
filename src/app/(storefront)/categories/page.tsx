import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Fragrance Families — AMAL PERFUME',
  description: 'Explore our curated olfactory families: Extrait de Parfum, Oud & Oriental, Floral & Gourmand, and Discovery Coffrets.',
};

const defaultImages: Record<string, string> = {
  'extrait-de-parfum': 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&auto=format&fit=crop&q=80',
  'eau-de-parfum': 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800&auto=format&fit=crop&q=80',
  'oud-oriental': 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop&q=80',
  'floral-gourmand': 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&auto=format&fit=crop&q=80',
  'fresh-citrus': 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&auto=format&fit=crop&q=80',
  'discovery-coffrets': 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&auto=format&fit=crop&q=80',
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
    <div className="bg-white min-h-screen">
      <div className="py-16 text-center" style={{ background: 'linear-gradient(135deg, #2d000b 0%, #590016 100%)' }}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-widest mb-4">
          <Sparkles size={14} /> Haute Parfumerie
        </div>
        <h1 className="font-display text-4xl font-bold text-white mb-2">Olfactory Families</h1>
        <p className="text-white/70 max-w-xl mx-auto px-4">
          Discover our curated collections of pure extraits and fine fragrances.
        </p>
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
                src={cat.image || defaultImages[cat.slug] || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800'}
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
