import type { Metadata } from 'next';
import HeroBanner from '@/components/storefront/HeroBanner';
import FeaturedCategories from '@/components/storefront/FeaturedCategories';
import ProductGrid from '@/components/storefront/ProductGrid';

export const dynamic = 'force-dynamic';
import SectionHeader from '@/components/storefront/SectionHeader';
import PremiumTrust from '@/components/storefront/PremiumTrust';
import BrandStory from '@/components/storefront/BrandStory';
import { ReviewCard } from '@/components/storefront/ReviewCard';
import { mockReviews } from '@/lib/mock-data';
import CollectionsBanner from '@/components/storefront/CollectionsBanner';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: "AMAL PERFUME — More Than A Fragrance, It's An Emotion",
  description:
    "Discover AMAL PERFUME's artisanal collection of pure extraits, royal Cambodian ouds, and signature fragrances. More than a fragrance — it's an emotion.",
};

export default async function HomePage() {
  let formattedProducts: any[] = [];
  let collections: any[] = [];
  let categories: any[] = [];

  try {
    const dbProducts = await prisma.product.findMany({
      where: { isActive: true },
      include: {
        category: { select: { name: true } },
        images: { orderBy: { sortOrder: 'asc' } },
        variants: true,
      },
    });

    formattedProducts = dbProducts.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description || undefined,
      price: Number(p.price),
      comparePrice: p.comparePrice ? Number(p.comparePrice) : undefined,
      totalStock: p.totalStock,
      isNewArrival: p.isNewArrival,
      isBestSeller: p.isBestSeller,
      isTrending: p.isTrending,
      category: { name: p.category.name },
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
  } catch (error) {
    console.warn('HomePage products query warning:', error);
  }

  try {
    const collectionsDb = await prisma.collection.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });

    collections = collectionsDb.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description || '',
      bannerImage: c.bannerImage || '/products/amal-collection.jpg',
    }));
  } catch (error) {
    console.warn('HomePage collections query warning:', error);
  }

  try {
    const categoriesDb = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    const localCategoryImages: Record<string, string> = {
      'extrait-de-parfum': '/products/saddle-leather.jpg',
      'eau-de-parfum': '/products/enigma.jpg',
      'oud-oriental': '/products/saddle-leather.jpg',
      'floral-gourmand': '/products/enigma.jpg',
      'fresh-citrus': '/products/enigma.jpg',
      'discovery-coffrets': '/products/amal-collection.jpg',
    };

    categories = categoriesDb.map((c) => ({
      name: c.name,
      slug: c.slug,
      image: c.image || localCategoryImages[c.slug] || '/products/saddle-leather.jpg',
      count: `${c._count.products} Fragrances`,
    }));
  } catch (error) {
    console.warn('HomePage categories query warning:', error);
  }

  if (formattedProducts.length === 0) {
    const { mockProducts } = await import('@/lib/mock-data');
    formattedProducts = mockProducts.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description || undefined,
      price: Number(p.price),
      comparePrice: p.comparePrice ? Number(p.comparePrice) : undefined,
      totalStock: p.totalStock,
      isNewArrival: p.isNewArrival,
      isBestSeller: p.isBestSeller,
      isTrending: p.isTrending,
      category: { name: p.category.name },
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

  if (collections.length === 0) {
    const { mockCollections } = await import('@/lib/mock-data');
    collections = mockCollections.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description || '',
      bannerImage: c.bannerImage,
    }));
  }

  if (categories.length === 0) {
    const { mockCategories } = await import('@/lib/mock-data');
    categories = mockCategories.map((c) => ({
      name: c.name,
      slug: c.slug,
      image: c.image,
      count: c.count,
    }));
  }

  const featuredAllProducts = formattedProducts.slice(0, 8);
  const newArrivals = formattedProducts.filter((p) => p.isNewArrival).slice(0, 4);
  const trending = formattedProducts.filter((p) => p.isTrending).slice(0, 4);
  const bestSellers = formattedProducts.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <HeroBanner />

      {/* All Products Section (Featured Preview) */}
      <section id="all-products" className="py-12 md:py-20 bg-transparent relative border-b border-stone-200">
        <div className="container-plt">
          <SectionHeader
            tag="Featured Showcase"
            title="Signature Fragrances"
            subtitle="Explore our artisanal collection of pure extraits and fine perfumes."
            viewAllHref="/all-products"
            viewAllLabel="View Entire Catalog"
          />
          <ProductGrid products={featuredAllProducts} columns={4} />
          
          <div className="mt-10 text-center">
            <a
              href="/all-products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-stone-900 text-white font-semibold text-sm shadow-md hover:bg-black hover:scale-105 transition-all duration-300"
            >
              Explore All Fragrances ({formattedProducts.length}) →
            </a>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <BrandStory />

      {/* New Arrivals (Editorial Layout) */}
      <section id="new-arrivals" className="py-12 md:py-24 bg-transparent relative">
        <div className="container-plt">
          <SectionHeader
            tag="Latest Releases"
            title="New Fragrances"
            subtitle="The newest olfactory creations formulated by our master noses."
            viewAllHref="/new-arrivals"
            viewAllLabel="Shop New Arrivals"
          />
          <ProductGrid products={newArrivals} columns={4} />
        </div>
      </section>

      {/* Collections Lookbook */}
      <CollectionsBanner collections={collections} />

      {/* Featured Categories */}
      <FeaturedCategories categories={categories} />

      {/* Trending & Best Sellers */}
      <section id="trending" className="py-12 md:py-24 bg-transparent border-t border-stone-200">
        <div className="container-plt">
          <SectionHeader
            tag="Curated For You"
            title="Trending Blends"
            subtitle="Intoxicating scents our connoisseurs are wearing right now."
            viewAllHref="/all-products"
          />
          <ProductGrid products={trending} columns={4} />
          
          <div className="mt-24">
            <SectionHeader
              tag="The Masterpieces"
              title="Best Sellers"
              subtitle="Timeless extraits and parfums that define the maison."
              viewAllHref="/best-sellers"
            />
            <ProductGrid products={bestSellers} columns={4} />
          </div>
        </div>
      </section>

      {/* Reviews Gallery */}
      <section id="reviews" className="py-10 md:py-24 bg-transparent">
        <div className="container-plt">
          <SectionHeader
            tag="Connoisseur Impressions"
            title="AMAL PERFUME Connoisseurs"
            subtitle="Real experiences from our fragrance collectors worldwide."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {mockReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-10 sm:mt-16 pt-8 sm:pt-12 border-t border-stone-200">
            {[
              { value: '2,500+', label: 'Connoisseurs Worldwide' },
              { value: '4.9/5', label: 'Average Review Score' },
              { value: '30%+', label: 'Pure Oil Concentration' },
              { value: '100%', label: 'Cruelty-Free & IFRA Safe' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center group">
                <p className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-stone-900 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-500 ease-apple">{value}</p>
                <p className="text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-stone-600 font-bold">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <PremiumTrust />
    </>
  );
}
