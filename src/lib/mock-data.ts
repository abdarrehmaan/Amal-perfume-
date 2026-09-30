// 100% Standalone Mock Data for AMAL PERFUME (Pure Frontend Mode)

export interface MockCategory {
  id: string;
  name: string;
  slug: string;
  image: string;
  count: string;
  description: string;
  sortOrder?: number;
  isActive?: boolean;
}

export interface MockCollection {
  id: string;
  name: string;
  slug: string;
  description: string;
  bannerImage: string;
  sortOrder?: number;
  isActive?: boolean;
}

export interface MockProductVariant {
  id: string;
  size: string;
  color: string;
  colorHex?: string;
  stock: number;
  price?: number;
}

export interface MockProductImage {
  id: string;
  url: string;
  alt: string;
  sortOrder?: number;
}

export interface MockProduct {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  price: number;
  comparePrice?: number;
  totalStock: number;
  isNewArrival: boolean;
  isBestSeller: boolean;
  isTrending: boolean;
  isFeatured: boolean;
  isActive: boolean;
  isDeleted: boolean;
  categoryId: string;
  category: { id: string; name: string; slug: string };
  images: MockProductImage[];
  variants: MockProductVariant[];
  avgRating: number;
  ratingCount: number;
  createdAt?: string;
}

export const mockCategories: MockCategory[] = [
  {
    id: 'cat-extrait',
    name: 'Extrait de Parfum',
    slug: 'extrait-de-parfum',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&auto=format&fit=crop&q=80',
    count: '4 Fragrances',
    description: '30%+ Pure oil concentration with lasting sillage',
    sortOrder: 1,
    isActive: true,
  },
  {
    id: 'cat-edp',
    name: 'Eau de Parfum',
    slug: 'eau-de-parfum',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800&auto=format&fit=crop&q=80',
    count: '3 Fragrances',
    description: 'Signature daily luxury',
    sortOrder: 2,
    isActive: true,
  },
  {
    id: 'cat-oud',
    name: 'Oud & Oriental',
    slug: 'oud-oriental',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop&q=80',
    count: '3 Fragrances',
    description: 'Rare agarwood & royal amber',
    sortOrder: 3,
    isActive: true,
  },
  {
    id: 'cat-floral',
    name: 'Floral & Gourmand',
    slug: 'floral-gourmand',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&auto=format&fit=crop&q=80',
    count: '2 Fragrances',
    description: 'Velvet rose & Bourbon vanilla',
    sortOrder: 4,
    isActive: true,
  },
  {
    id: 'cat-citrus',
    name: 'Fresh & Citrus',
    slug: 'fresh-citrus',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&auto=format&fit=crop&q=80',
    count: '2 Fragrances',
    description: 'Calabrian bergamot & sea spray',
    sortOrder: 5,
    isActive: true,
  },
  {
    id: 'cat-discovery',
    name: 'Discovery Sets',
    slug: 'discovery-coffrets',
    image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&auto=format&fit=crop&q=80',
    count: '1 Coffret',
    description: 'Curated miniature flacons with redemption voucher',
    sortOrder: 6,
    isActive: true,
  },
];

export const mockCollections: MockCollection[] = [
  {
    id: 'col-royal-oud',
    name: 'Royal Oud Series',
    slug: 'royal-oud-series',
    description: 'Hand-crafted extraits featuring 25-year aged agarwoods from Assam and Cambodia.',
    bannerImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1200&auto=format&fit=crop&q=80',
    sortOrder: 1,
    isActive: true,
  },
  {
    id: 'col-private-blend',
    name: 'Private Blend Reserve',
    slug: 'private-blend-reserve',
    description: 'Exclusive small-batch extraits formulated for hypnotic projection and all-day longevity.',
    bannerImage: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=1200&auto=format&fit=crop&q=80',
    sortOrder: 2,
    isActive: true,
  },
  {
    id: 'col-discovery',
    name: 'Discovery Coffrets',
    slug: 'discovery-coffrets',
    description: 'Experience the entire symphony with our travel atomizers before selecting your full flacon.',
    bannerImage: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=1200&auto=format&fit=crop&q=80',
    sortOrder: 3,
    isActive: true,
  },
];

export const mockProducts: MockProduct[] = [
  {
    id: 'prod-oud-imperial',
    name: 'Oud Impérial Extrait de Parfum',
    slug: 'oud-imperial-extrait-de-parfum',
    sku: 'AMAL-OUD-001',
    price: 3499,
    comparePrice: 4999,
    description: 'Intoxicating 25-year aged Cambodian agarwood, fiery royal saffron, and smoky maritime ambergris. Hand-compounded at an exquisite 35% pure extrait concentration for intense 24-hour longevity and commanding sillage.',
    categoryId: 'cat-oud',
    category: { id: 'cat-oud', name: 'Oud & Oriental', slug: 'oud-oriental' },
    images: [
      { id: 'img-oud-1', url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1200&auto=format&fit=crop&q=80', alt: 'Oud Impérial Extrait de Parfum', sortOrder: 1 },
      { id: 'img-oud-2', url: '/amal-logo.jpg', alt: 'Amal Perfume Crest', sortOrder: 2 },
    ],
    variants: [
      { id: 'var-oud-50', size: '50ml', color: 'Crystal Gold Flacon', colorHex: '#D4AF37', stock: 25, price: 3499 },
      { id: 'var-oud-100', size: '100ml', color: 'Crystal Gold Flacon', colorHex: '#D4AF37', stock: 15, price: 5499 },
    ],
    totalStock: 40,
    isBestSeller: true,
    isTrending: true,
    isNewArrival: false,
    isFeatured: true,
    isActive: true,
    isDeleted: false,
    avgRating: 4.9,
    ratingCount: 128,
  },
  {
    id: 'prod-baccarat-noir',
    name: 'Baccarat Noir Extrait de Parfum',
    slug: 'baccarat-noir-extrait-de-parfum',
    sku: 'AMAL-BAC-002',
    price: 2999,
    comparePrice: 4299,
    description: 'Luminous crystal ambergris, bitter almond, spun caramelized sugar crystals, and rich cedarwood woven into an irresistible warm aura.',
    categoryId: 'cat-extrait',
    category: { id: 'cat-extrait', name: 'Extrait de Parfum', slug: 'extrait-de-parfum' },
    images: [
      { id: 'img-bac-1', url: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=1200&auto=format&fit=crop&q=80', alt: 'Baccarat Noir Extrait Flacon', sortOrder: 1 },
      { id: 'img-bac-2', url: '/amal-logo.jpg', alt: 'Amal Perfume Crest', sortOrder: 2 },
    ],
    variants: [
      { id: 'var-bac-50', size: '50ml', color: 'Noir Crystal Flacon', colorHex: '#C5A059', stock: 30, price: 2999 },
      { id: 'var-bac-100', size: '100ml', color: 'Noir Crystal Flacon', colorHex: '#C5A059', stock: 18, price: 4799 },
    ],
    totalStock: 48,
    isBestSeller: true,
    isTrending: false,
    isNewArrival: true,
    isFeatured: true,
    isActive: true,
    isDeleted: false,
    avgRating: 4.9,
    ratingCount: 94,
  },
  {
    id: 'prod-royal-ambergris',
    name: 'Royal Ambergris Elixir',
    slug: 'royal-ambergris-elixir',
    sku: 'AMAL-AMB-003',
    price: 3999,
    comparePrice: 5499,
    description: 'Golden maritime ambergris steeped with white musk, Egyptian grandiflorum jasmine, and velvety Atlas cedarwood.',
    categoryId: 'cat-oud',
    category: { id: 'cat-oud', name: 'Oud & Oriental', slug: 'oud-oriental' },
    images: [
      { id: 'img-amb-1', url: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200&auto=format&fit=crop&q=80', alt: 'Royal Ambergris Elixir', sortOrder: 1 },
      { id: 'img-amb-2', url: '/amal-logo.jpg', alt: 'Amal Perfume Crest', sortOrder: 2 },
    ],
    variants: [
      { id: 'var-amb-50', size: '50ml', color: 'Noir Gold Flacon', colorHex: '#1A1815', stock: 14, price: 3999 },
    ],
    totalStock: 14,
    isBestSeller: false,
    isTrending: true,
    isNewArrival: false,
    isFeatured: true,
    isActive: true,
    isDeleted: false,
    avgRating: 5.0,
    ratingCount: 42,
  },
  {
    id: 'prod-santal-rose',
    name: 'Santal & Velvet Rose Extrait',
    slug: 'santal-velvet-rose',
    sku: 'AMAL-SAN-004',
    price: 2799,
    comparePrice: 3899,
    description: 'Deep Damascus rose petals enveloped in creamy Mysore sandalwood, rich vanilla bourbon, and soft cashmeran.',
    categoryId: 'cat-floral',
    category: { id: 'cat-floral', name: 'Floral & Gourmand', slug: 'floral-gourmand' },
    images: [
      { id: 'img-san-1', url: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=1200&auto=format&fit=crop&q=80', alt: 'Santal Velvet Rose Flacon', sortOrder: 1 },
    ],
    variants: [
      { id: 'var-san-50', size: '50ml', color: 'Rose Gold Flacon', colorHex: '#B76E79', stock: 22, price: 2799 },
    ],
    totalStock: 22,
    isBestSeller: false,
    isTrending: true,
    isNewArrival: true,
    isFeatured: true,
    isActive: true,
    isDeleted: false,
    avgRating: 4.8,
    ratingCount: 67,
  },
  {
    id: 'prod-iris-musk',
    name: 'Florentine Iris & Musk Eau de Parfum',
    slug: 'florentine-iris-musk',
    sku: 'AMAL-IRI-005',
    price: 2499,
    comparePrice: 3499,
    description: 'Powdery Tuscan orris butter intertwined with luminous white musk, delicate violet, and subtle pink pepper.',
    categoryId: 'cat-edp',
    category: { id: 'cat-edp', name: 'Eau de Parfum', slug: 'eau-de-parfum' },
    images: [
      { id: 'img-iri-1', url: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1200&auto=format&fit=crop&q=80', alt: 'Florentine Iris & Musk', sortOrder: 1 },
    ],
    variants: [
      { id: 'var-iri-50', size: '50ml', color: 'Crystal Flacon', colorHex: '#E6E6FA', stock: 20, price: 2499 },
    ],
    totalStock: 20,
    isBestSeller: false,
    isTrending: false,
    isNewArrival: true,
    isFeatured: false,
    isActive: true,
    isDeleted: false,
    avgRating: 4.7,
    ratingCount: 31,
  },
  {
    id: 'prod-discovery-coffret',
    name: 'Master Perfumer’s Discovery Coffret',
    slug: 'master-perfumers-discovery-coffret',
    sku: 'AMAL-COF-006',
    price: 1499,
    comparePrice: 2199,
    description: 'Five 10ml travel spray flacons in a velvet-lined gold case (Oud Impérial, Baccarat Noir, Royal Ambergris, Santal Rose, and Vétiver Bourbon). Includes a ₹1,000 voucher towards your full bottle.',
    categoryId: 'cat-discovery',
    category: { id: 'cat-discovery', name: 'Discovery Sets', slug: 'discovery-coffrets' },
    images: [
      { id: 'img-cof-1', url: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=1200&auto=format&fit=crop&q=80', alt: 'Discovery Coffret Set', sortOrder: 1 },
    ],
    variants: [
      { id: 'var-cof-5x10', size: '5 x 10ml', color: 'Velvet Case', colorHex: '#D4AF37', stock: 50, price: 1499 },
    ],
    totalStock: 50,
    isBestSeller: true,
    isTrending: true,
    isNewArrival: false,
    isFeatured: true,
    isActive: true,
    isDeleted: false,
    avgRating: 5.0,
    ratingCount: 210,
  },
  {
    id: 'prod-vetiver-bourbon',
    name: 'Vétiver Bourbon Extrait',
    slug: 'vetiver-bourbon-parfum',
    sku: 'AMAL-VET-007',
    price: 2699,
    comparePrice: 3799,
    description: 'Earthy Haitian vetiver sharpened with bitter grapefruit, smoked cedar, and warm bourbon resin.',
    categoryId: 'cat-extrait',
    category: { id: 'cat-extrait', name: 'Extrait de Parfum', slug: 'extrait-de-parfum' },
    images: [
      { id: 'img-vet-1', url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1200&auto=format&fit=crop&q=80', alt: 'Vetiver Bourbon Extrait', sortOrder: 1 },
    ],
    variants: [
      { id: 'var-vet-50', size: '50ml', color: 'Smoked Flacon', colorHex: '#2C2A29', stock: 18, price: 2699 },
    ],
    totalStock: 18,
    isBestSeller: false,
    isTrending: true,
    isNewArrival: false,
    isFeatured: true,
    isActive: true,
    isDeleted: false,
    avgRating: 4.9,
    ratingCount: 53,
  },
  {
    id: 'prod-soleil-blanc',
    name: 'Soleil Blanc Nectar Eau de Parfum',
    slug: 'soleil-blanc-nectar',
    sku: 'AMAL-SOL-008',
    price: 2899,
    comparePrice: 3999,
    description: 'Sun-drenched Calabrian bergamot, coconut milk, ylang-ylang, and warm amber beach sands.',
    categoryId: 'cat-citrus',
    category: { id: 'cat-citrus', name: 'Fresh & Citrus', slug: 'fresh-citrus' },
    images: [
      { id: 'img-sol-1', url: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=1200&auto=format&fit=crop&q=80', alt: 'Soleil Blanc Nectar', sortOrder: 1 },
    ],
    variants: [
      { id: 'var-sol-50', size: '50ml', color: 'Ivory Flacon', colorHex: '#FDFBF7', stock: 25, price: 2899 },
    ],
    totalStock: 25,
    isBestSeller: false,
    isTrending: false,
    isNewArrival: true,
    isFeatured: true,
    isActive: true,
    isDeleted: false,
    avgRating: 4.8,
    ratingCount: 45,
  },
];

export const mockReviews = [
  {
    id: 'rev-1',
    name: 'Aisha Al-Mansoor',
    rating: 5,
    title: 'An absolute masterpiece of aged oud',
    body: 'Oud Impérial is by far the most regal, intoxicating fragrance I have ever encountered. The 25-year aged Cambodian agarwood and saffron project for well over 18 hours. Complete strangers stopped me at an evening gala in Mumbai to ask what I was wearing.',
    product: 'Oud Impérial Extrait de Parfum',
    location: 'Mumbai, India',
    verified: true,
    productId: 'prod-oud-imperial',
  },
  {
    id: 'rev-2',
    name: 'Vikramaditya S.',
    rating: 5,
    title: 'Pure crystal luxury & seductive sillage',
    body: 'Baccarat Noir Extrait has this warm, glowing ambergris and bitter almond drydown that feels like velvet against the skin. The bottle itself is weighty and magnificent. 10/10 worth every single rupee.',
    product: 'Baccarat Noir Extrait de Parfum',
    location: 'New Delhi, India',
    verified: true,
    productId: 'prod-baccarat-noir',
  },
  {
    id: 'rev-3',
    name: 'Dr. Meera Nambiar',
    rating: 5,
    title: 'The Discovery Coffret is phenomenal',
    body: 'I started with the 5 x 10ml Master Discovery Coffret. Every single scent is complex, niche-tier, and long-lasting. Used the included voucher immediately to purchase the full 100ml flacon of Santal & Velvet Rose.',
    product: 'Master Perfumer’s Discovery Coffret',
    location: 'Bangalore, India',
    verified: true,
    productId: 'prod-discovery-coffret',
  },
];

export const mockSiteSettings = {
  id: 'site-settings-1',
  prepaidDiscountPercent: 5,
  codAdvancePercent: 0,
  freeShippingThreshold: 1499,
  standardShippingCharge: 99,
  taxPercent: 0,
};
