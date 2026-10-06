import type { Metadata } from 'next';
import ProductGrid from '@/components/storefront/ProductGrid';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import BackButton from '@/components/storefront/BackButton';

const defaultMeta: Record<string, { name: string; description: string; image: string }> = {
  'extrait-de-parfum': {
    name: 'Extrait de Parfum',
    description: 'Ultra-concentrated pure parfums (30%+ oil) for exceptional 24-hour intimacy and sillage.',
    image: '/products/saddle-leather.jpg',
  },
  'eau-de-parfum': {
    name: 'Eau de Parfum',
    description: 'Signature artisanal scents crafted for daily luxury and prestigious evening allure.',
    image: '/products/enigma.jpg',
  },
  'oud-oriental': {
    name: 'Oud & Oriental',
    description: 'Smoked Cambodian agarwood, royal ambergris, Taif rose, and precious saffron.',
    image: '/products/saddle-leather.jpg',
  },
  'floral-gourmand': {
    name: 'Floral & Gourmand',
    description: 'Velvet Damask roses, Madagascan bourbon vanilla, praline, and night-blooming jasmine.',
    image: '/products/enigma.jpg',
  },
  'fresh-citrus': {
    name: 'Fresh & Citrus',
    description: 'Calabrian bergamot, Mediterranean sea salt, sparkling neroli, and coastal driftwoods.',
    image: '/products/enigma.jpg',
  },
  'discovery-coffrets': {
    name: 'Discovery Sets & Coffrets',
    description: 'Curated miniature discovery sets and collector coffrets in bespoke presentation cases.',
    image: '/products/amal-collection.jpg',
  },
};

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  try {
    const categories = await prisma.category.findMany({
      select: { slug: true },
    });
    return categories.map((c) => ({ slug: c.slug }));
  } catch (error) {
    console.warn('Failed to generateStaticParams for categories:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const category = await prisma.category.findUnique({
      where: { slug: decodedSlug },
    });
    if (!category) return {};
    return {
      title: `${category.name} Collection`,
      description: category.description || 'Premium ethnic fashion',
    };
  } catch (error) {
    return {};
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  
  let category: any = null;
  let products: any[] = [];

  try {
    category = await prisma.category.findUnique({
      where: { slug: decodedSlug },
    });

    if (category) {
      products = await prisma.product.findMany({
        where: {
          categoryId: category.id,
          isActive: true,
        },
        include: {
          images: true,
          category: { select: { name: true } },
          variants: true,
        },
      });
    }
  } catch (error) {
    console.warn('CategoryPage DB query warning:', error);
  }

  if (!category) {
    // Check fallback default meta for rendering gracefully if category slug matches defaultMeta
    if (defaultMeta[slug] || defaultMeta[decodedSlug]) {
      const meta = defaultMeta[slug] || defaultMeta[decodedSlug];
      category = {
        name: meta.name,
        description: meta.description,
        image: meta.image,
      };
    } else {
      return notFound();
    }
  }

  if (products.length === 0) {
    const { mockProducts } = await import('@/lib/mock-data');
    products = mockProducts.filter((p) => p.category.slug === decodedSlug || p.categoryId === category?.id);
    if (products.length === 0) {
      products = mockProducts.slice(0, 4);
    }
  }

  const formattedProducts = products.map((p) => ({
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
  }));

  const bannerImage = category.image || defaultMeta[slug]?.image || '/products/saddle-leather.jpg';
  const description = category.description || defaultMeta[slug]?.description || 'Artisanal collection of luxury pure extraits.';

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-stone-800">
      {/* Banner */}
      <div className="py-10 md:py-14 border-b border-stone-200 bg-[#F4F0E6]">
        <div className="container-plt px-4 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto flex justify-start">
            <BackButton fallbackHref="/categories" label="All Families" />
          </div>
          <div className="text-center sm:text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-900 text-[11px] font-semibold uppercase tracking-wider mb-1.5">
              <span>AMAL PERFUME Collection</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-1">
              {category.name}
            </h1>
            <p className="text-stone-600 text-xs md:text-sm max-w-lg leading-relaxed">{description}</p>
          </div>
        </div>
      </div>

      <div className="container-plt py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-gray-500">{formattedProducts.length} products found</p>
        </div>
        <ProductGrid products={formattedProducts} columns={4} />
      </div>
    </div>
  );
}
