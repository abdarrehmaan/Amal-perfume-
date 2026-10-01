import { PrismaClient } from '@prisma/client';
import {
  mockProducts,
  mockCategories,
  mockCollections,
  mockReviews,
  mockSiteSettings,
} from './mock-data';

// Helper to clone objects
const clone = <T>(item: T): T => JSON.parse(JSON.stringify(item));

function filterMockProducts(where?: any): any[] {
  let list = clone(mockProducts);
  if (!where) return list;

  if (where.isActive !== undefined) list = list.filter((p) => p.isActive === where.isActive);
  if (where.isDeleted !== undefined) list = list.filter((p) => p.isDeleted === where.isDeleted);
  if (where.isNewArrival) list = list.filter((p) => p.isNewArrival);
  if (where.isBestSeller) list = list.filter((p) => p.isBestSeller);
  if (where.isTrending) list = list.filter((p) => p.isTrending);
  if (where.isFeatured) list = list.filter((p) => p.isFeatured);
  if (where.categoryId) list = list.filter((p) => p.categoryId === where.categoryId);
  if (where.category?.slug) list = list.filter((p) => p.category?.slug === where.category.slug);
  if (where.id?.not) list = list.filter((p) => p.id !== where.id.not);
  if (where.id && typeof where.id === 'string') list = list.filter((p) => p.id === where.id);
  if (where.slug && typeof where.slug === 'string') list = list.filter((p) => p.slug === where.slug);

  if (where.OR && Array.isArray(where.OR)) {
    list = list.filter((p) => {
      return where.OR.some((condition: any) => {
        if (condition.name?.contains) {
          const needle = String(condition.name.contains).toLowerCase();
          if (p.name.toLowerCase().includes(needle)) return true;
        }
        if (condition.description?.contains) {
          const needle = String(condition.description.contains).toLowerCase();
          if (p.description.toLowerCase().includes(needle)) return true;
        }
        if (condition.category?.name?.contains) {
          const needle = String(condition.category.name.contains).toLowerCase();
          if (p.category?.name?.toLowerCase().includes(needle)) return true;
        }
        if (condition.slug) {
          const val = typeof condition.slug === 'object' && condition.slug.equals ? condition.slug.equals : condition.slug;
          if (p.slug.toLowerCase() === String(val).toLowerCase()) return true;
        }
        if (condition.id) {
          if (p.id === condition.id) return true;
        }
        return false;
      });
    });
  }

  return list;
}

function createMockPrismaClient(): any {
  const mockDb = {
    product: {
      findMany: async (args?: any) => {
        let list = filterMockProducts(args?.where);

        if (args?.orderBy) {
          if (args.orderBy.price === 'asc') list.sort((a, b) => a.price - b.price);
          else if (args.orderBy.price === 'desc') list.sort((a, b) => b.price - a.price);
          else if (args.orderBy.isBestSeller === 'desc') list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
          else if (args.orderBy.isFeatured === 'desc') list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        }

        if (args?.skip) list = list.slice(args.skip);
        if (args?.take) list = list.slice(0, args.take);
        return list;
      },
      findFirst: async (args?: any) => {
        const where = args?.where;
        if (!where) return clone(mockProducts[0]);
        if (where.OR && Array.isArray(where.OR)) {
          for (const condition of where.OR) {
            const val = condition.slug || condition.id;
            if (val) {
              const found = mockProducts.find(
                (p) =>
                  p.slug.toLowerCase() === String(val).toLowerCase() ||
                  p.id === val ||
                  (condition.slug?.equals && p.slug.toLowerCase() === String(condition.slug.equals).toLowerCase())
              );
              if (found) return clone(found);
            }
          }
        }
        if (where.slug) {
          const found = mockProducts.find(
            (p) =>
              p.slug.toLowerCase() === String(where.slug).toLowerCase() ||
              (where.slug.equals && p.slug.toLowerCase() === String(where.slug.equals).toLowerCase())
          );
          if (found) return clone(found);
        }
        if (where.id) {
          const found = mockProducts.find((p) => p.id === where.id);
          if (found) return clone(found);
        }
        return clone(mockProducts[0]) || null;
      },
      findUnique: async (args?: any) => {
        const where = args?.where;
        if (where?.id) return clone(mockProducts.find((p) => p.id === where.id)) || null;
        if (where?.slug) return clone(mockProducts.find((p) => p.slug === where.slug)) || null;
        return null;
      },
      count: async (args?: any) => {
        return filterMockProducts(args?.where).length;
      },
    },

    category: {
      findMany: async (args?: any) => {
        let list = clone(mockCategories);
        const where = args?.where;
        if (where) {
          if (where.isActive !== undefined) list = list.filter((c) => c.isActive === where.isActive);
          if (where.name?.contains) {
            const needle = String(where.name.contains).toLowerCase();
            list = list.filter((c) => c.name.toLowerCase().includes(needle));
          }
        }
        return list.map((c) => ({
          ...c,
          _count: {
            products: mockProducts.filter((p) => p.categoryId === c.id).length || 2,
          },
        }));
      },
      findFirst: async (args?: any) => {
        const where = args?.where;
        if (where?.slug) {
          const cat = mockCategories.find((c) => c.slug === where.slug);
          if (cat) return clone(cat);
        }
        return clone(mockCategories[0]);
      },
      findUnique: async (args?: any) => {
        const where = args?.where;
        if (where?.slug) return clone(mockCategories.find((c) => c.slug === where.slug)) || null;
        if (where?.id) return clone(mockCategories.find((c) => c.id === where.id)) || null;
        return null;
      },
      count: async () => mockCategories.length,
    },

    collection: {
      findMany: async () => clone(mockCollections),
      findFirst: async (args?: any) => {
        const where = args?.where;
        if (where?.slug) return clone(mockCollections.find((c) => c.slug === where.slug)) || null;
        return clone(mockCollections[0]);
      },
      findUnique: async (args?: any) => {
        const where = args?.where;
        if (where?.slug) return clone(mockCollections.find((c) => c.slug === where.slug)) || null;
        return null;
      },
      count: async () => mockCollections.length,
    },

    siteSettings: {
      findFirst: async () => clone(mockSiteSettings),
      findUnique: async () => clone(mockSiteSettings),
      findMany: async () => [clone(mockSiteSettings)],
      upsert: async () => clone(mockSiteSettings),
    },

    review: {
      findMany: async (args?: any) => clone(mockReviews),
      findFirst: async () => clone(mockReviews[0]),
      count: async () => mockReviews.length,
      create: async (args: any) => ({
        id: `rev-${Date.now()}`,
        ...args?.data,
        createdAt: new Date().toISOString(),
      }),
    },

    order: {
      findMany: async () => [],
      findFirst: async () => null,
      findUnique: async () => null,
      count: async () => 0,
      create: async (args: any) => ({
        id: `order-mock-${Date.now()}`,
        orderNumber: args?.data?.orderNumber || `ORD-${Date.now()}`,
        status: 'CONFIRMED',
        paymentStatus: 'PAID',
        createdAt: new Date().toISOString(),
        ...args?.data,
      }),
      update: async (args: any) => ({
        id: args?.where?.id || `order-${Date.now()}`,
        ...args?.data,
      }),
    },

    orderItem: {
      create: async (args: any) => ({
        id: `item-${Date.now()}`,
        ...args?.data,
      }),
      update: async (args: any) => ({
        id: args?.where?.id,
        ...args?.data,
      }),
    },

    address: {
      findMany: async () => [],
      findFirst: async () => null,
      findUnique: async () => null,
      create: async (args: any) => ({
        id: `addr-${Date.now()}`,
        ...args?.data,
      }),
      update: async (args: any) => ({
        id: args?.where?.id,
        ...args?.data,
      }),
    },

    user: {
      findMany: async () => [],
      findFirst: async () => null,
      findUnique: async () => null,
      create: async (args: any) => ({
        id: `usr-${Date.now()}`,
        ...args?.data,
      }),
      update: async (args: any) => ({
        id: args?.where?.id,
        ...args?.data,
      }),
    },

    $transaction: async (arg: any) => {
      if (typeof arg === 'function') {
        return await arg(mockPrisma);
      }
      if (Array.isArray(arg)) {
        return Promise.all(arg);
      }
      return arg;
    },

    $disconnect: async () => {},
    $connect: async () => {},
  };

  // Fallback Proxy to handle any unspecified model gracefully
  const mockPrisma = new Proxy(mockDb, {
    get(target: any, prop: string) {
      if (prop in target) {
        return target[prop];
      }
      // Return a model stub
      return new Proxy(
        {},
        {
          get(_mTarget, method: string) {
            return async (..._args: any[]) => {
              if (method.startsWith('findMany')) return [];
              if (method.startsWith('count')) return 0;
              if (method.startsWith('find')) return null;
              if (method.startsWith('create') || method.startsWith('update')) {
                return { id: `mock-${prop}-${Date.now()}` };
              }
              return null;
            };
          },
        }
      );
    },
  });

  return mockPrisma;
}

const isMockMode =
  process.env.NEXT_PUBLIC_MOCK_MODE === 'true' ||
  !process.env.DATABASE_URL ||
  process.env.DATABASE_URL.includes('mock');

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma: PrismaClient = (isMockMode
  ? createMockPrismaClient()
  : (globalForPrisma.prisma ?? createMockPrismaClient())) as unknown as PrismaClient;

if (process.env.NODE_ENV !== 'production' && !isMockMode) {
  globalForPrisma.prisma = prisma;
}

export default prisma;
