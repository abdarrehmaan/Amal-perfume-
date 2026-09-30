import type { Metadata } from 'next';
import ProductGrid from '@/components/storefront/ProductGrid';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Best Sellers — AMAL PERFUME',
  description: "Shop AMAL PERFUME's most celebrated artisanal extraits and signature fragrances.",
};

export default async function BestSellersPage() {
  let dbProducts: any[] = [];
  try {
    dbProducts = await prisma.product.findMany({
      where: {
        isBestSeller: true,
        isActive: true,
      },
      include: {
        category: { select: { name: true } },
        images: { orderBy: { sortOrder: 'asc' } },
        variants: true,
      },
    });
  } catch (error) {
    console.warn('BestSellersPage DB query warning:', error);
  }

  if (dbProducts.length === 0) {
    const { mockProducts } = await import('@/lib/mock-data');
    dbProducts = mockProducts.filter((p) => p.isBestSeller);
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
        <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-2">⭐ Connoisseur Favorites</p>
        <h1 className="font-display text-4xl font-bold text-white mb-2">Best Sellers</h1>
        <p className="text-white/80">Our most celebrated perfumes and extraits loved by fragrance collectors</p>
      </div>
      <div className="container-plt py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-gray-500">{products.length} best selling fragrances</p>
          <select className="px-4 py-2 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none">
            <option>Most Popular</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Highest Rated</option>
          </select>
        </div>
        <ProductGrid products={products} columns={4} />
      </div>
    </div>
  );
}
