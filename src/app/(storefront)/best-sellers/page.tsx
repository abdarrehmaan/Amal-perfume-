import type { Metadata } from 'next';
import ProductGrid from '@/components/storefront/ProductGrid';
import { prisma } from '@/lib/prisma';
import BackButton from '@/components/storefront/BackButton';

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
    <div className="bg-[#FAF8F5] min-h-screen pb-16 text-stone-800">
      <div className="py-10 md:py-14 border-b border-stone-200 bg-[#F4F0E6]">
        <div className="container-plt px-4 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto flex justify-start">
            <BackButton label="Back to Shop" />
          </div>
          <div className="text-center sm:text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-900 text-[11px] font-semibold uppercase tracking-wider mb-1.5">
              <span>⭐ Connoisseur Favorites</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-1">
              Best Sellers
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm max-w-md">
              Our most celebrated perfumes and extraits loved by fragrance collectors
            </p>
          </div>
        </div>
      </div>
      <div className="container-plt py-10">
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
