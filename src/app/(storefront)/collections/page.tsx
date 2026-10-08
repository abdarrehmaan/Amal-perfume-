import type { Metadata } from 'next';
import CollectionsBanner from '@/components/storefront/CollectionsBanner';
import { prisma } from '@/lib/prisma';
import BackButton from '@/components/storefront/BackButton';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Private Collections — AMAL PERFUME',
  description: 'Explore our curated fragrance series — Royal Oud, Private Reserve Elixirs, and Midnight Noir.',
};

export default async function CollectionsPage() {
  let collectionsDb: any[] = [];

  try {
    collectionsDb = await prisma.collection.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        sortOrder: 'asc',
      },
    });
  } catch (error) {
    console.warn('CollectionsPage DB query warning:', error);
  }

  if (collectionsDb.length === 0) {
    const { mockCollections } = await import('@/lib/mock-data');
    collectionsDb = mockCollections;
  }

  const collections = collectionsDb.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description || '',
    bannerImage: c.bannerImage || '/products/amal-collection.jpg',
  }));

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-16 text-stone-800">
      <div className="py-10 md:py-14 border-b border-stone-200 bg-[#F4F0E6]">
        <div className="container-plt px-4 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto flex justify-start">
            <BackButton label="Back to Shop" />
          </div>
          <div className="text-center sm:text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-900 text-[11px] font-semibold uppercase tracking-wider mb-1.5">
              <span>Exclusive Series</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-stone-900 mb-1">
              Private Collections
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm max-w-md">
              Artisanal fragrance series distilled for every moment and mood
            </p>
          </div>
        </div>
      </div>
      <div className="py-8">
        <CollectionsBanner collections={collections} />
      </div>
    </div>
  );
}
