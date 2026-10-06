import type { Metadata } from 'next';
import ProductGrid from '@/components/storefront/ProductGrid';
import { prisma } from '@/lib/prisma';
import BackButton from '@/components/storefront/BackButton';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'New Releases — AMAL PERFUME',
  description: 'Shop the newest additions in haute parfumerie, rare extraits, and limited-edition flacons at AMAL PERFUME.',
};

export default async function NewArrivalsPage() {
  let dbProducts: any[] = [];
  try {
    dbProducts = await prisma.product.findMany({
      where: {
        isNewArrival: true,
        isActive: true,
      },
      include: {
        category: { select: { name: true } },
        images: { orderBy: { sortOrder: 'asc' } },
        variants: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (error) {
    console.warn('NewArrivalsPage DB query warning:', error);
  }

  if (dbProducts.length === 0) {
    const { mockProducts } = await import('@/lib/mock-data');
    dbProducts = mockProducts.filter((p) => p.isNewArrival);
    if (dbProducts.length === 0) dbProducts = mockProducts.slice(0, 4);
  }

  const products = dbProducts.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: Number(p.price),
    comparePrice: p.comparePrice ? Number(p.comparePrice) : undefined,
    totalStock: p.totalStock,
    isNewArrival: p.isNewArrival,
    isBestSeller: p.isBestSeller,
    category: { name: p.category.name },
    images: (p.images || []).map((img: any) => ({ url: img.url, alt: img.alt || '' })),
    variants: (p.variants || []).map((v: any) => ({
      id: v.id,
      size: v.size,
      color: v.color,
      colorHex: v.colorHex || undefined,
      stock: v.stock,
    })),
    avgRating: 4.9,
  }));

  return (
    <div className="bg-ivory-100 min-h-screen pb-16">
      <div className="py-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #12100E 0%, #1A1713 50%, #2A241C 100%)' }}>
        <div className="container-plt flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto flex justify-start">
            <BackButton variant="glass" label="Back to Shop" />
          </div>
          <div className="text-center sm:text-right">
            <p className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-1">✨ Fresh Distillations</p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-1">New Releases</h1>
            <p className="text-stone-300 text-xs sm:text-sm max-w-md">The latest olfactory creations formulated by our master noses</p>
          </div>
        </div>
      </div>
      <div className="container-plt py-10">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-gray-500">{products.length} new creations</p>
          <select className="px-4 py-2 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none">
            <option>Newest First</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
        <ProductGrid products={products} columns={4} />
      </div>
    </div>
  );
}
