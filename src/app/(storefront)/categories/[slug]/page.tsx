import type { Metadata } from 'next';
import ProductGrid from '@/components/storefront/ProductGrid';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

const defaultMeta: Record<string, { name: string; description: string; image: string }> = {
  'extrait-de-parfum': {
    name: 'Extrait de Parfum',
    description: 'Ultra-concentrated pure parfums (30%+ oil) for exceptional 24-hour intimacy and sillage.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1600&auto=format&fit=crop&q=80',
  },
  'eau-de-parfum': {
    name: 'Eau de Parfum',
    description: 'Signature artisanal scents crafted for daily luxury and prestigious evening allure.',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=1600&auto=format&fit=crop&q=80',
  },
  'oud-oriental': {
    name: 'Oud & Oriental',
    description: 'Smoked Cambodian agarwood, royal ambergris, Taif rose, and precious saffron.',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1600&auto=format&fit=crop&q=80',
  },
  'floral-gourmand': {
    name: 'Floral & Gourmand',
    description: 'Velvet Damask roses, Madagascan bourbon vanilla, praline, and night-blooming jasmine.',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=1600&auto=format&fit=crop&q=80',
  },
  'fresh-citrus': {
    name: 'Fresh & Citrus',
    description: 'Calabrian bergamot, Mediterranean sea salt, sparkling neroli, and coastal driftwoods.',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1600&auto=format&fit=crop&q=80',
  },
  'discovery-coffrets': {
    name: 'Discovery Sets & Coffrets',
    description: 'Curated miniature discovery sets and collector coffrets in bespoke presentation cases.',
    image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=1600&auto=format&fit=crop&q=80',
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

  const bannerImage = category.image || defaultMeta[slug]?.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&q=80';
  const description = category.description || defaultMeta[slug]?.description || 'Premium collection of women ethnic wear.';

  return (
    <div className="bg-white min-h-screen">
      {/* Banner */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bannerImage}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-900/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
            {category.name}
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-lg">{description}</p>
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
