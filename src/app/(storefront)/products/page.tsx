import type { Metadata } from 'next';
import ProductGrid from '@/components/storefront/ProductGrid';
import ProductFilterToolbar from '@/components/storefront/ProductFilterToolbar';
import { prisma } from '@/lib/prisma';
import { Search } from 'lucide-react';
import Link from 'next/link';
import BackButton from '@/components/storefront/BackButton';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Artisanal Fragrance Catalog — AMAL PERFUME',
  description: 'Browse our complete collection of artisanal extraits de parfum, royal Cambodian ouds, and signature fragrances.',
};

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Top Rated' },
];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    sort?: string;
    search?: string;
    page?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}) {
  const resolvedSearchParams = await searchParams;
  const rawSearch = resolvedSearchParams.search || '';
  const search = rawSearch.trim();
  const sort = resolvedSearchParams.sort || 'newest';
  const categorySlug = resolvedSearchParams.category || '';
  const minPrice = resolvedSearchParams.minPrice ? Number(resolvedSearchParams.minPrice) : null;
  const maxPrice = resolvedSearchParams.maxPrice ? Number(resolvedSearchParams.maxPrice) : null;
  const page = Math.max(1, Number(resolvedSearchParams.page) || 1);
  const pageSize = 8;

  // Fetch categories for filter bar
  let categories: any[] = [];
  try {
    categories = await prisma.category.findMany({
      where: { isActive: true },
      select: { id: true, name: true, slug: true },
    });
  } catch (err) {
    console.error('Failed to fetch categories:', err);
  }

  const where: any = {
    isDeleted: false,
    isActive: true,
  };

  if (categorySlug) {
    where.category = { slug: categorySlug };
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { category: { name: { contains: search, mode: 'insensitive' } } },
    ];
  }

  let orderBy: any = { createdAt: 'desc' };
  if (sort === 'price-asc') {
    orderBy = { price: 'asc' };
  } else if (sort === 'price-desc') {
    orderBy = { price: 'desc' };
  } else if (sort === 'popular') {
    orderBy = { isBestSeller: 'desc' };
  } else if (sort === 'rating') {
    orderBy = { isFeatured: 'desc' };
  }

  let totalProducts = 0;
  let products: any[] = [];

  try {
    totalProducts = await prisma.product.count({ where });

    // Fallback if no products with isActive
    if (totalProducts === 0 && !search && !categorySlug) {
      const fallbackCount = await prisma.product.count({ where: { isDeleted: false } });
      if (fallbackCount > 0) {
        delete where.isActive;
        totalProducts = fallbackCount;
      }
    }

    const calculatedTotalPages = Math.ceil(totalProducts / pageSize) || 1;
    const clampedPage = page > calculatedTotalPages ? 1 : page;
    const skip = (clampedPage - 1) * pageSize;

    const dbProducts = await prisma.product.findMany({
      where,
      orderBy,
      take: pageSize,
      skip,
      include: {
        category: { select: { name: true, slug: true } },
        images: { orderBy: { sortOrder: 'asc' } },
        variants: true,
      },
    });

    products = dbProducts.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: Number(p.price),
      comparePrice: p.comparePrice ? Number(p.comparePrice) : undefined,
      totalStock: p.totalStock,
      isNewArrival: p.isNewArrival,
      isBestSeller: p.isBestSeller,
      isTrending: p.isTrending,
      category: { name: p.category?.name || 'Haute Parfumerie' },
      images: p.images.map((img) => ({ url: img.url, alt: img.alt || '' })),
      variants: p.variants.map((v) => ({
        id: v.id,
        size: v.size,
        color: v.color,
        colorHex: v.colorHex || undefined,
        stock: v.stock,
      })),
      avgRating: 4.9,
    }));

    // In-memory filter for price ranges if specified
    if (minPrice !== null || maxPrice !== null) {
      products = products.filter((p) => {
        if (minPrice !== null && p.price < minPrice) return false;
        if (maxPrice !== null && p.price > maxPrice) return false;
        return true;
      });
      totalProducts = products.length;
    }
  } catch (error) {
    console.error('ProductsPage DB query error:', error);
  }

  // Only fallback to mock if the database is genuinely unseeded AND no filter is applied
  if (products.length === 0 && !search && !categorySlug && minPrice === null && maxPrice === null) {
    const { mockProducts } = await import('@/lib/mock-data');
    totalProducts = mockProducts.length;
    products = mockProducts.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: Number(p.price),
      comparePrice: p.comparePrice ? Number(p.comparePrice) : undefined,
      totalStock: p.totalStock,
      isNewArrival: p.isNewArrival,
      isBestSeller: p.isBestSeller,
      isTrending: p.isTrending,
      category: { name: p.category?.name || 'Haute Parfumerie' },
      images: p.images.map((img) => ({ url: img.url, alt: img.alt || '' })),
      variants: p.variants.map((v) => ({
        id: v.id,
        size: v.size,
        color: v.color,
        colorHex: v.colorHex || undefined,
        stock: v.stock,
      })),
      avgRating: 4.9,
    }));
  }

  const totalPages = Math.ceil(totalProducts / pageSize) || 1;

  // Helper to build pagination links
  const buildPageUrl = (targetPage: number) => {
    const params = new URLSearchParams();
    if (targetPage > 1) params.set('page', String(targetPage));
    if (categorySlug) params.set('category', categorySlug);
    if (sort && sort !== 'newest') params.set('sort', sort);
    if (search) params.set('search', search);
    if (minPrice) params.set('minPrice', String(minPrice));
    if (maxPrice) params.set('maxPrice', String(maxPrice));
    const str = params.toString();
    return `/products${str ? `?${str}` : ''}`;
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-stone-800">
      {/* Luxury Editorial Header */}
      <div className="py-10 md:py-14 border-b border-stone-200 bg-[#F4F0E6]">
        <div className="container-plt px-4 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto flex justify-start">
            <BackButton label="Back to Home" />
          </div>
          <div className="text-center sm:text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-900 text-[11px] font-semibold uppercase tracking-wider mb-1.5">
              <span>Haute Parfumerie Catalog</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-1">
              Artisanal Fragrance Wardrobe
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm max-w-xl leading-relaxed">
              Macerated extraits, aged Cambodian agarwoods, and rare botanical distillates formulated at 30%+ pure oil concentrations.
            </p>
          </div>
        </div>
      </div>

      <div className="container-plt py-10">
        {/* Interactive Filter & Search Toolbar */}
        <ProductFilterToolbar
          categories={categories}
          sortOptions={sortOptions}
          currentCategory={categorySlug}
          currentSort={sort}
          currentSearch={search}
          currentMinPrice={minPrice ? String(minPrice) : ''}
          currentMaxPrice={maxPrice ? String(maxPrice) : ''}
          totalCount={totalProducts}
        />

        {/* Product Grid or Polished Empty State */}
        {products.length > 0 ? (
          <ProductGrid products={products} columns={4} />
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8 max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <Search size={24} />
            </div>
            <h3 className="font-display text-xl font-bold text-stone-900 mb-2">
              No Fragrances Found
            </h3>
            <p className="text-stone-600 text-sm mb-6 leading-relaxed">
              {search
                ? `We couldn't find any creations matching "${search}". Try searching for notes like "oud", "rose", "leather", or reset your search.`
                : 'No creations found matching the selected filter criteria.'}
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-black transition-colors"
            >
              Clear All Filters
            </Link>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-14 gap-2">
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;
              return (
                <Link
                  key={pageNum}
                  href={buildPageUrl(pageNum)}
                  className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all flex items-center justify-center ${
                    pageNum === page
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'border border-stone-200 text-stone-700 bg-white hover:bg-stone-100'
                  }`}
                >
                  {pageNum}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
