import type { Metadata } from 'next';
import ProductGrid from '@/components/storefront/ProductGrid';
import { prisma } from '@/lib/prisma';

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
    <div className="bg-white min-h-screen">
      <div className="py-14 text-center" style={{ background: 'linear-gradient(135deg, #2d000b 0%, #590016 60%, #c9a84c 100%)' }}>
        <p className="text-gold-300 text-xs font-bold uppercase tracking-widest mb-2">✨ Fresh Distillations</p>
        <h1 className="font-display text-4xl font-bold text-white mb-2">New Releases</h1>
        <p className="text-white/70">The latest olfactory creations formulated by our master noses</p>
      </div>
      <div className="container-plt py-12">
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
