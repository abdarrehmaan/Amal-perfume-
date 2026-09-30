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

  const collections = collectionsDb.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description || '',
    bannerImage: c.bannerImage || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200&auto=format&fit=crop&q=80',
  }));

  return (
    <div className="bg-white min-h-screen">
      <div className="py-14 text-center" style={{ background: 'linear-gradient(135deg, #2d000b 0%, #590016 100%)' }}>
        <h1 className="font-display text-4xl font-bold text-white mb-2">Private Collections</h1>
        <p className="text-white/70">Artisanal fragrance series distilled for every moment and mood</p>
      </div>
      <div className="py-12">
        <CollectionsBanner collections={collections} />
      </div>
    </div>
  );
}
