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
    <div className="bg-ivory-100 min-h-screen pb-16">
      <div className="py-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #12100E 0%, #1A1713 50%, #2A241C 100%)' }}>
        <div className="container-plt flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto flex justify-start">
            <BackButton variant="glass" label="Back to Shop" />
          </div>
          <div className="text-center sm:text-right">
            <p className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-1">Exclusive Series</p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-1">Private Collections</h1>
            <p className="text-stone-300 text-xs sm:text-sm max-w-md">Artisanal fragrance series distilled for every moment and mood</p>
          </div>
        </div>
      </div>
      <div className="py-8">
        <CollectionsBanner collections={collections} />
      </div>
    </div>
  );
}
