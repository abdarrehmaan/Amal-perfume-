import ProductGridSkeleton from '@/components/storefront/ProductGridSkeleton';

export default function GlobalStorefrontLoading() {
  return (
    <ProductGridSkeleton
      count={8}
      columns={4}
      title="AMAL PERFUME"
      subtitle="Distilling Rare Extraits..."
    />
  );
}
