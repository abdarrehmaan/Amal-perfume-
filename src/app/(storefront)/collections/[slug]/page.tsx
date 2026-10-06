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
    <div className="bg-white min-h-screen">
      {/* Banner */}
      <div className="relative h-56 md:h-72 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bannerImage}
          alt={collection.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]" />

        <div className="absolute top-4 left-4 sm:top-6 sm:left-8 z-10">
          <BackButton variant="glass" fallbackHref="/collections" label="All Collections" />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-6">
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-amber-400 block mb-1">AMAL PERFUME Series</span>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-2">
            {collection.name}
          </h1>
          <p className="text-stone-200 text-xs md:text-sm max-w-lg leading-relaxed">{description}</p>
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
