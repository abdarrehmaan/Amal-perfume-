import type { Metadata } from 'next';
import ProductGrid from '@/components/storefront/ProductGrid';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import BackButton from '@/components/storefront/BackButton';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  try {
    const collections = await prisma.collection.findMany({
      select: { slug: true },
    });
    return collections.map((c) => ({ slug: c.slug }));
  } catch (error) {
    console.warn('Failed to generateStaticParams for collections:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const collection = await prisma.collection.findUnique({
      where: { slug: decodedSlug },
    });
    if (!collection) return {};
    return {
      title: `${collection.name} Collection`,
      description: collection.description || 'Artisanal luxury fragrance collection',
    };
  } catch (error) {
    return {};
  }
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  
  let collection: any = null;

  try {
    collection = await prisma.collection.findUnique({
      where: { slug: decodedSlug },
      include: {
        products: {
          orderBy: {
            sortOrder: 'asc',
          },
          include: {
            product: {
              include: {
                images: true,
                category: { select: { name: true } },
                variants: true,
              },
            },
          },
        },
      },
    });
  } catch (error) {
    console.warn('CollectionPage DB query warning:', error);
  }

  if (!collection) {
    const { mockCollections, mockProducts } = await import('@/lib/mock-data');
    const mockCol = mockCollections.find((c) => c.slug === decodedSlug);
    if (mockCol) {
      collection = {
        ...mockCol,
        products: mockProducts.slice(0, 4).map((p, idx) => ({
          product: p,
          sortOrder: idx,
        })),
      };
    }
  }

  if (!collection) {
    return notFound();
  }

  // Filter out any inactive products
  const formattedProducts = (collection.products || [])
    .filter((cp: any) => cp.product.isActive)
    .map((cp: any) => {
      const p = cp.product;
      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        sku: p.sku,
        price: Number(p.price),
        comparePrice: p.comparePrice ? Number(p.comparePrice) : undefined,
        totalStock: p.totalStock,
        isNewArrival: p.isNewArrival,
        isBestSeller: p.isBestSeller,
        category: { name: p.category.name },
        images: p.images.map((img: any) => ({ url: img.url, alt: img.alt || '' })),
        variants: p.variants.map((v: any) => ({
          id: v.id,
          size: v.size,
          color: v.color,
          colorHex: v.colorHex || undefined,
          stock: v.stock,
        })),
      };
    });

  const bannerImage = collection.bannerImage || '/products/amal-collection.jpg';
  const description = collection.description || 'Artisanal collection of luxury fragrances.';

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-stone-800">
      {/* Banner */}
      <div className="py-10 md:py-14 border-b border-stone-200 bg-[#F4F0E6]">
        <div className="container-plt px-4 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto flex justify-start">
            <BackButton fallbackHref="/collections" label="All Collections" />
          </div>
          <div className="text-center sm:text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-900 text-[11px] font-semibold uppercase tracking-wider mb-1.5">
              <span>AMAL PERFUME Series</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-1">
              {collection.name}
            </h1>
            <p className="text-stone-600 text-xs md:text-sm max-w-lg leading-relaxed">{description}</p>
          </div>
        </div>
      </div>

      <div className="container-plt py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-gray-500">{formattedProducts.length} fragrances in this collection</p>
        </div>
        <ProductGrid products={formattedProducts} columns={4} />
      </div>
    </div>
  );
}
