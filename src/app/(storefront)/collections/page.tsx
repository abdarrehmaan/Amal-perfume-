import type { Metadata } from 'next';
import CollectionsBanner from '@/components/storefront/CollectionsBanner';
import { prisma } from '@/lib/prisma';

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
    <div className="bg-white min-h-screen">
      <div className="py-14 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #12100E 0%, #1A1713 50%, #2A241C 100%)' }}>
        <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">Exclusive Series</p>
        <h1 className="font-display text-4xl font-bold text-white mb-2">Private Collections</h1>
        <p className="text-stone-300 text-sm max-w-lg mx-auto">Artisanal fragrance series distilled for every moment and mood</p>
      </div>
      <div className="py-12">
        <CollectionsBanner collections={collections} />
      </div>
    </div>
  );
}
