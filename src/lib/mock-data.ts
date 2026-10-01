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
    image: '/products/saddle-leather.jpg',
    count: '4 Fragrances',
    description: '30%+ Pure oil concentration with lasting sillage',
    sortOrder: 1,
    isActive: true,
  },
  {
    id: 'cat-edp',
    name: 'Eau de Parfum',
    slug: 'eau-de-parfum',
    image: '/products/enigma.jpg',
    count: '3 Fragrances',
    description: 'Signature daily luxury',
    sortOrder: 2,
    isActive: true,
  },
  {
    id: 'cat-oud',
    name: 'Oud & Oriental',
    slug: 'oud-oriental',
    image: '/products/saddle-leather.jpg',
    count: '3 Fragrances',
    description: 'Rare agarwood & royal amber',
    sortOrder: 3,
    isActive: true,
  },
  {
    id: 'cat-floral',
    name: 'Floral & Gourmand',
    slug: 'floral-gourmand',
    image: '/products/enigma.jpg',
    count: '2 Fragrances',
    description: 'Velvet rose & Bourbon vanilla',
    sortOrder: 4,
    isActive: true,
  },
  {
    id: 'cat-citrus',
    name: 'Fresh & Citrus',
    slug: 'fresh-citrus',
    image: '/products/enigma.jpg',
    count: '2 Fragrances',
    description: 'Calabrian bergamot & sea spray',
    sortOrder: 5,
    isActive: true,
  },
  {
    id: 'cat-discovery',
    name: 'Discovery Sets',
    slug: 'discovery-coffrets',
    image: '/products/amal-collection.jpg',
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
    description: 'Hand-crafted extraits featuring 25-year aged agarwoods and rare botanical infusions.',
    bannerImage: '/products/saddle-leather.jpg',
    sortOrder: 1,
    isActive: true,
  },
  {
    id: 'col-private-blend',
    name: 'Private Blend Reserve',
    slug: 'private-blend-reserve',
    description: 'Exclusive small-batch extraits formulated for hypnotic projection and all-day longevity.',
    bannerImage: '/products/enigma.jpg',
    sortOrder: 2,
    isActive: true,
  },
  {
    id: 'col-discovery',
    name: 'Discovery Coffrets',
    slug: 'discovery-coffrets',
    description: 'Experience the entire symphony with our travel flacons before selecting your full flacon.',
    bannerImage: '/products/amal-collection.jpg',
    sortOrder: 3,
    isActive: true,
  },
];

export const mockProducts: MockProduct[] = [
  {
    id: 'prod-saddle-leather',
    name: 'AMAL Saddle Leather Extrait de Parfum',
    slug: 'saddle-leather-extrait-de-parfum',
    sku: 'AMAL-SDL-001',
    price: 3499,
    comparePrice: 4999,
    description: 'Every detail has a purpose, every shadow has a place, every color has a feeling, and every frame tells a different part of the story, because luxury is always in the way it is presented. Some fragrances disappear into the air. Others remain long after the moment has passed.',
    categoryId: 'cat-extrait',
    category: { id: 'cat-extrait', name: 'Extrait de Parfum', slug: 'extrait-de-parfum' },
    images: [
      { id: 'img-sdl-1', url: '/products/saddle-leather.jpg', alt: 'AMAL Saddle Leather Extrait de Parfum Flacon', sortOrder: 1 },
      { id: 'img-sdl-2', url: '/products/amal-collection.jpg', alt: 'AMAL Flacon Collection', sortOrder: 2 },
      { id: 'img-sdl-3', url: '/products/enigma.jpg', alt: 'AMAL Enigma Extrait Perspective', sortOrder: 3 },
    ],
    variants: [
      { id: 'var-sdl-50', size: '50ml', color: 'Architectural Flacon', colorHex: '#D4AF37', stock: 25, price: 3499 },
      { id: 'var-sdl-100', size: '100ml', color: 'Architectural Flacon', colorHex: '#D4AF37', stock: 15, price: 5499 },
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
    id: 'prod-enigma',
    name: 'AMAL Enigma Extrait de Parfum',
    slug: 'enigma-extrait-de-parfum',
    sku: 'AMAL-ENM-002',
    price: 3299,
    comparePrice: 4699,
    description: 'Where every note becomes a statement. Soft, diffused lighting distributed across the scene to create a clean and luxurious atmosphere, allowing the fragrance and its natural color to become the main focus.',
    categoryId: 'cat-extrait',
    category: { id: 'cat-extrait', name: 'Extrait de Parfum', slug: 'extrait-de-parfum' },
    images: [
      { id: 'img-enm-1', url: '/products/enigma.jpg', alt: 'AMAL Enigma Extrait Flacon', sortOrder: 1 },
      { id: 'img-enm-2', url: '/products/amal-collection.jpg', alt: 'AMAL Flacon Collection', sortOrder: 2 },
      { id: 'img-enm-3', url: '/products/saddle-leather.jpg', alt: 'AMAL Saddle Leather Perspective', sortOrder: 3 },
    ],
    variants: [
      { id: 'var-enm-50', size: '50ml', color: 'Noir Crystal Flacon', colorHex: '#257774', stock: 30, price: 3299 },
      { id: 'var-enm-100', size: '100ml', color: 'Noir Crystal Flacon', colorHex: '#257774', stock: 18, price: 4999 },
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
    id: 'prod-vanero',
    name: 'AMAL Vanero Extrait de Parfum',
    slug: 'vanero-extrait-de-parfum',
    sku: 'AMAL-VAN-003',
    price: 3599,
    comparePrice: 4999,
    description: 'Elegance is not always found in what a man is attention, sometimes it lives in what speaks softly, in the warmth of a precious note, in the shadow of a perfectly crafted bottle, an aroma fragrance that leaves its story behind.',
    categoryId: 'cat-floral',
    category: { id: 'cat-floral', name: 'Floral & Gourmand', slug: 'floral-gourmand' },
    images: [
      { id: 'img-van-1', url: '/products/saddle-leather.jpg', alt: 'AMAL Vanero Extrait de Parfum Flacon', sortOrder: 1 },
      { id: 'img-van-2', url: '/products/amal-collection.jpg', alt: 'AMAL Flacon Collection', sortOrder: 2 },
    ],
    variants: [
      { id: 'var-van-50', size: '50ml', color: 'Warm Amber Flacon', colorHex: '#C56A2D', stock: 22, price: 3599 },
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
    id: 'prod-the-hermes-shadow',
    name: 'AMAL The Hermes Shadow Extrait',
    slug: 'the-hermes-shadow-extrait-de-parfum',
    sku: 'AMAL-THS-004',
    price: 3699,
    comparePrice: 5199,
    description: 'A crystalline, airy vetiver and cold spices paired with mineral flint, Sicilian bitter orange peel, and sharp pink peppercorn.',
    categoryId: 'cat-citrus',
    category: { id: 'cat-citrus', name: 'Fresh & Citrus', slug: 'fresh-citrus' },
    images: [
      { id: 'img-ths-1', url: '/products/enigma.jpg', alt: 'AMAL The Hermes Shadow Extrait Flacon', sortOrder: 1 },
      { id: 'img-ths-2', url: '/products/amal-collection.jpg', alt: 'AMAL Flacon Collection', sortOrder: 2 },
    ],
    variants: [
      { id: 'var-ths-50', size: '50ml', color: 'Crystalline Flacon', colorHex: '#4A6984', stock: 20, price: 3699 },
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
    id: 'prod-amal-collection-set',
    name: 'AMAL Haute Parfumerie Flacon Set (4 Flacons)',
    slug: 'master-perfumers-discovery-coffret',
    sku: 'AMAL-COL-005',
    price: 9999,
    comparePrice: 13999,
    description: 'The complete AMAL Haute Parfumerie wardrobe in full architectural glass flacons: Saddle Leather, Enigma, Vanero, and The Hermes Shadow. Luxury is always in the way it is presented.',
    categoryId: 'cat-discovery',
    category: { id: 'cat-discovery', name: 'Discovery Sets', slug: 'discovery-coffrets' },
    images: [
      { id: 'img-col-1', url: '/products/amal-collection.jpg', alt: 'AMAL Haute Parfumerie 4-Flacon Set', sortOrder: 1 },
      { id: 'img-col-2', url: '/products/saddle-leather.jpg', alt: 'AMAL Saddle Leather Flacon', sortOrder: 2 },
      { id: 'img-col-3', url: '/products/enigma.jpg', alt: 'AMAL Enigma Flacon', sortOrder: 3 },
    ],
    variants: [
      { id: 'var-col-4x50', size: '4 x 50ml Flacons', color: 'Full Flacon Set', colorHex: '#D4AF37', stock: 35, price: 9999 },
    ],
    totalStock: 35,
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
    id: 'prod-oud-imperial',
    name: 'Oud Impérial Extrait de Parfum',
    slug: 'oud-imperial-extrait-de-parfum',
    sku: 'AMAL-OUD-006',
    price: 3899,
    comparePrice: 5499,
    description: 'Intoxicating 25-year aged Cambodian agarwood, fiery royal saffron, and smoky maritime ambergris. Hand-compounded at an exquisite 35% pure extrait concentration for intense 24-hour longevity.',
    categoryId: 'cat-oud',
    category: { id: 'cat-oud', name: 'Oud & Oriental', slug: 'oud-oriental' },
    images: [
      { id: 'img-oud-1', url: '/products/saddle-leather.jpg', alt: 'Oud Impérial Extrait Flacon', sortOrder: 1 },
      { id: 'img-oud-2', url: '/products/amal-collection.jpg', alt: 'AMAL Collection', sortOrder: 2 },
    ],
    variants: [
      { id: 'var-oud-50', size: '50ml', color: 'Crystal Gold Flacon', colorHex: '#D4AF37', stock: 25, price: 3899 },
      { id: 'var-oud-100', size: '100ml', color: 'Crystal Gold Flacon', colorHex: '#D4AF37', stock: 15, price: 5899 },
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
    sku: 'AMAL-BAC-007',
    price: 3299,
    comparePrice: 4599,
    description: 'Luminous crystal ambergris, bitter almond, spun caramelized sugar crystals, and rich cedarwood woven into an irresistible warm aura.',
    categoryId: 'cat-extrait',
    category: { id: 'cat-extrait', name: 'Extrait de Parfum', slug: 'extrait-de-parfum' },
    images: [
      { id: 'img-bac-1', url: '/products/enigma.jpg', alt: 'Baccarat Noir Extrait Flacon', sortOrder: 1 },
      { id: 'img-bac-2', url: '/products/amal-collection.jpg', alt: 'AMAL Collection', sortOrder: 2 },
    ],
    variants: [
      { id: 'var-bac-50', size: '50ml', color: 'Noir Crystal Flacon', colorHex: '#C5A059', stock: 30, price: 3299 },
      { id: 'var-bac-100', size: '100ml', color: 'Noir Crystal Flacon', colorHex: '#C5A059', stock: 18, price: 4999 },
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
    sku: 'AMAL-AMB-008',
    price: 3999,
    comparePrice: 5499,
    description: 'Golden maritime ambergris steeped with white musk, Egyptian grandiflorum jasmine, and velvety Atlas cedarwood.',
    categoryId: 'cat-oud',
    category: { id: 'cat-oud', name: 'Oud & Oriental', slug: 'oud-oriental' },
    images: [
      { id: 'img-amb-1', url: '/products/saddle-leather.jpg', alt: 'Royal Ambergris Elixir', sortOrder: 1 },
      { id: 'img-amb-2', url: '/products/enigma.jpg', alt: 'Enigma Flacon', sortOrder: 2 },
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
];

export const mockReviews = [
  {
    id: 'rev-1',
    name: 'Aisha Al-Mansoor',
    rating: 5,
    title: 'Masterpiece of Aged Oud',
    body: 'The aged Cambodian agarwood and royal saffron project for over 18 hours — truly regal.',
    product: 'Oud Impérial Extrait',
    location: 'Mumbai, India',
    verified: true,
    productId: 'prod-oud-imperial',
  },
  {
    id: 'rev-2',
    name: 'Vikramaditya S.',
    rating: 5,
    title: 'Pure Seductive Sillage',
    body: 'Warm glowing ambergris and bitter almond that feels like pure velvet on the skin.',
    product: 'Baccarat Noir Extrait',
    location: 'New Delhi, India',
    verified: true,
    productId: 'prod-baccarat-noir',
  },
  {
    id: 'rev-3',
    name: 'Dr. Meera Nambiar',
    rating: 5,
    title: 'Exceptional Discovery Set',
    body: 'Every single flacon is niche-tier, complex, and extraordinarily long-lasting.',
    product: 'Discovery Coffret Set',
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
