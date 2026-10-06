'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Zap, Star, ChevronLeft, ChevronRight, Minus, Plus, Shield, Truck, Share2, X } from 'lucide-react';
import { useCartStore } from '@/features/cart/store';
import { useWishlistStore } from '@/features/wishlist/store';
import { formatPrice, calculateDiscount, sanitizeImageUrl } from '@/lib/utils';
import ProductGrid from '@/components/storefront/ProductGrid';
import SectionHeader from '@/components/storefront/SectionHeader';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

interface Variant {
  id: string;
  size: string;
  color: string;
  colorHex?: string;
  stock: number;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  price: number;
  comparePrice?: number;
  description?: string;
  totalStock: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  avgRating?: number;
  category?: { name: string; slug?: string };
  images?: { url: string; alt?: string; color?: string | null }[];
  variants?: Variant[];
  _count?: { reviews: number };
}

const DEFAULT_FALLBACK_IMAGE = '/products/default-product.jpg';

export default function ProductDetailClient({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  // Find first variant that is in stock, or fallback to the first variant
  const initialVariant = product.variants?.find((v) => v.stock > 0) || product.variants?.[0];

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(initialVariant?.size || null);
  const [selectedColor, setSelectedColor] = useState<string | null>(initialVariant?.color || null);
  const [quantity, setQuantity] = useState(1);

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Discover ${product.name} at AMAL PERFUME.`,
          url,
        });
        return;
      } catch (err) {
        // Dismissed by user
      }
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      toast.success('Product link copied to clipboard!');
    } else {
      toast.success('Link ready to share!');
    }
  };

  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const wishlisted = isInWishlist(product.id);

  const discount = product.comparePrice ? calculateDiscount(product.price, product.comparePrice) : 0;
  
  const sizes = [...new Set((product.variants || []).map((v) => v.size))];
  const colors = [...new Set((product.variants || []).map((v) => v.color))];

  // Filter images based on selected color
  const filteredImages = React.useMemo(() => {
    const validList = (product.images || [])
      .map((img: any) => ({ ...img, url: sanitizeImageUrl(img?.url) }))
      .filter((img: any) => img && typeof img.url === 'string' && img.url.trim().length > 0);
    if (validList.length === 0) {
      return [{ url: DEFAULT_FALLBACK_IMAGE, alt: product.name }];
    }
    
    if (selectedColor) {
      const colorImages = validList.filter(
        (img: any) => img.color && img.color.toLowerCase() === selectedColor.toLowerCase()
      );
      const remainingImages = validList.filter(
        (img: any) => !img.color || img.color.toLowerCase() !== selectedColor.toLowerCase()
      );
      if (colorImages.length > 0) {
        return [...colorImages, ...remainingImages];
      }
    }
    
    return validList;
  }, [product.images, selectedColor, product.name]);

  const images = filteredImages;

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIdx, setLightboxImageIdx] = useState(0);
  const touchStartX = React.useRef<number | null>(null);
  const touchEndX = React.useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50; // minimum pixels to count as swipe

    if (diff > swipeThreshold) {
      // Swiped left -> next image
      setLightboxImageIdx((prev) => (prev + 1) % images.length);
    } else if (diff < -swipeThreshold) {
      // Swiped right -> previous image
      setLightboxImageIdx((prev) => (prev - 1 + images.length) % images.length);
    }

    // Reset touch variables
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Selected variant must match both selected size and color exactly
  const selectedVariant = product.variants?.find(
    (v) => v.size === selectedSize && v.color === selectedColor
  );

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setSelectedImage(0); // Reset main image to the first image of the new color
    
    // Check if there is a variant with the new color and the current size
    const exists = product.variants?.some((v) => v.color === color && v.size === selectedSize);
    if (!exists) {
      // Select the first size available for the new color (preferring in stock)
      const firstAvailable = product.variants?.find((v) => v.color === color && v.stock > 0) || product.variants?.find((v) => v.color === color);
      if (firstAvailable) {
        setSelectedSize(firstAvailable.size);
      }
    }
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    
    // Check if there is a variant with the new size and the current color
    const exists = product.variants?.some((v) => v.size === size && v.color === selectedColor);
    if (!exists) {
      // Select the first color available for the new size (preferring in stock)
      const firstAvailable = product.variants?.find((v) => v.size === size && v.stock > 0) || product.variants?.find((v) => v.size === size);
      if (firstAvailable) {
        setSelectedColor(firstAvailable.color);
      }
    }
  };

  const stockAvailable = selectedVariant ? selectedVariant.stock : product.totalStock;
  const canAddToCart = stockAvailable > 0;

  const handleAddToCart = () => {
    if (!canAddToCart) return;
    addItem(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        comparePrice: product.comparePrice,
        image: images[0]?.url || product.images?.[0]?.url || '/products/default-product.jpg',
      },
      selectedVariant ? {
        id: selectedVariant.id,
        size: selectedVariant.size,
        color: selectedVariant.color,
        colorHex: selectedVariant.colorHex,
        stock: selectedVariant.stock,
      } : undefined,
      quantity
    );
    toast.success('Added to cart!');
  };

  const [imageError, setImageError] = useState(false);
  const activeMainImage = imageError ? DEFAULT_FALLBACK_IMAGE : (images[selectedImage]?.url || images[0]?.url || DEFAULT_FALLBACK_IMAGE);

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="container-plt py-4">
        <nav className="breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={14} className="text-gray-300" />
          {product.category && (
            <>
              <Link href={`/categories/${product.category.slug || product.category.name.toLowerCase()}`}>
                {product.category.name}
              </Link>
              <ChevronRight size={14} className="text-gray-300" />
            </>
          )}
          <span className="text-gray-900 font-medium truncate max-w-xs">{product.name}</span>
        </nav>
      </div>

      {/* Product section */}
      <div className="container-plt pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0 scrollbar-hide">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setImageError(false);
                    setSelectedImage(i);
                  }}
                  className={cn(
                    'relative w-14 h-16 sm:w-16 sm:h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 bg-stone-100 shadow-xs',
                    i === selectedImage ? 'border-amber-600 ring-2 ring-amber-600/30' : 'border-transparent hover:border-stone-300'
                  )}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image src={img.url} alt={img.alt || ''} fill className="object-cover" sizes="64px" onError={(e) => { (e.target as any).src = DEFAULT_FALLBACK_IMAGE; }} />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div 
              onClick={() => {
                setLightboxImageIdx(selectedImage);
                setIsLightboxOpen(true);
              }}
              className="relative flex-1 rounded-xl overflow-hidden bg-stone-100 cursor-zoom-in group w-full" 
              style={{ aspectRatio: '3/4' }}
            >
              <Image
                key={activeMainImage}
                src={activeMainImage}
                alt={images[selectedImage]?.alt || product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-102"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                onError={() => setImageError(true)}
              />
              {discount > 0 && (
                <div className="badge-discount">{discount}% OFF</div>
              )}
            </div>
          </div>

          {/* Product info */}
          <div className="flex flex-col">
            {/* Category */}
            {product.category && (
              <Link
                href={`/categories/${product.category.slug || 'all'}`}
                className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2 hover:text-brand-800"
              >
                {product.category.name}
              </Link>
            )}

            {/* Name */}
            <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
              {product.name}
            </h1>

            {/* Rating & Reviews */}
            {product.avgRating && product._count?.reviews ? (
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={16}
                      className={s <= Math.round(product.avgRating!) ? 'fill-amber-400 stroke-amber-400' : 'fill-gray-200 stroke-gray-200'}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-700">{product.avgRating.toFixed(1)}</span>
                <span className="text-sm text-gray-400">({product._count.reviews} reviews)</span>
              </div>
            ) : null}

            {/* Price */}
            <div className="flex items-center gap-3 mb-1">
              <span className="text-2xl md:text-3xl font-bold text-brand-800">{formatPrice(product.price)}</span>
              {product.comparePrice && product.comparePrice > product.price && (
                <span className="text-lg text-gray-400 line-through">{formatPrice(product.comparePrice)}</span>
              )}
              {discount > 0 && (
                <span className="px-3 py-1 rounded-full text-xs uppercase tracking-wider font-bold text-amber-300 border border-amber-600/40" style={{ background: 'linear-gradient(135deg, #1C1917, #451A03)' }}>
                  {discount}% OFF
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 mb-5">SKU: {product.sku}</p>

            {/* Colors */}
            {colors.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-sm font-semibold text-gray-900">Edition / Flacon Finish:</p>
                  {selectedColor && <p className="text-sm text-gray-500">{selectedColor}</p>}
                </div>
                <div className="flex gap-2 flex-wrap">
                  {colors.map((color) => {
                    const variant = product.variants?.find((v) => v.color === color);
                    return (
                      <button
                        key={color}
                        onClick={() => handleColorSelect(color)}
                        className={cn(
                          'w-8 h-8 rounded-full border-2 transition-all flex-shrink-0 hover:scale-110',
                          selectedColor === color ? 'border-brand-600 scale-110 shadow-brand' : 'border-transparent'
                        )}
                        style={{ backgroundColor: variant?.colorHex || '#ccc' }}
                        title={color}
                        aria-label={`Select edition ${color}`}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Sizes */}
            {sizes.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-900">Bottle Volume:</p>
                  <Link href="/size-guide" className="text-xs text-brand-600 hover:underline">Volume & Sillage Guide</Link>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {sizes.map((size) => {
                    const variantForSize = product.variants?.find(
                      (v) => v.size === size && v.color === selectedColor
                    );
                    const isOutOfStockForSelectedColor = variantForSize ? variantForSize.stock === 0 : true;
                    const isCompletelyOutOfStock = !product.variants?.some((v) => v.size === size && v.stock > 0);

                    return (
                      <button
                        key={size}
                        onClick={() => handleSizeSelect(size)}
                        disabled={isCompletelyOutOfStock}
                        className={cn(
                          'min-w-[2.75rem] h-10 px-3 rounded-xl text-sm font-semibold border-2 transition-all',
                          isCompletelyOutOfStock
                            ? 'border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50 line-through'
                            : isOutOfStockForSelectedColor
                            ? 'border-gray-250 text-gray-400 bg-gray-50/50 line-through hover:border-brand-300'
                            : selectedSize === size
                            ? 'border-brand-600 bg-brand-50 text-brand-700'
                            : 'border-gray-200 text-gray-700 hover:border-brand-300'
                        )}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Stock */}
            <p className={cn(
              'text-sm font-semibold mb-4',
              stockAvailable === 0 ? 'text-red-500' :
              stockAvailable <= 5 ? 'text-amber-600' : 'text-emerald-600'
            )}>
              {stockAvailable === 0 ? '✗ Out of Stock' :
               stockAvailable <= 5 ? `⚡ Only ${stockAvailable} left!` : '✓ In Stock'}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-3 mb-6">
              <p className="text-sm font-semibold text-gray-900 w-20">Quantity:</p>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600 disabled:opacity-40"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="w-12 text-center font-bold text-gray-900">{quantity}</span>
                <button
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600 disabled:opacity-40"
                  onClick={() => setQuantity(Math.min(stockAvailable, quantity + 1))}
                  disabled={quantity >= stockAvailable}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                id="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={!canAddToCart}
                className="btn-secondary flex items-center justify-center gap-2 py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>
              <Link
                href="/checkout"
                id="buy-now-btn"
                className="btn-primary flex items-center justify-center gap-2 py-3.5"
                onClick={handleAddToCart}
              >
                <Zap size={18} />
                Buy Now
              </Link>
            </div>

            <div className="flex gap-3">
              <button
                id={`wishlist-detail-${product.id}`}
                onClick={() => {
                  toggleItem({
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    price: product.price,
                    comparePrice: product.comparePrice,
                    image: images[0].url,
                  });
                  toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist!');
                }}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-semibold transition-all',
                  wishlisted ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-gray-200 text-gray-600 hover:border-brand-300'
                )}
              >
                <Heart size={16} className={wishlisted ? 'fill-brand-600 stroke-brand-600' : ''} />
                {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
                aria-label="Share product"
                title="Share fragrance"
              >
                <Share2 size={16} />
              </button>
            </div>

            {/* Delivery info */}
            <div className="mt-6 pt-5 border-t border-gray-100 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Truck size={16} className="text-brand-500 flex-shrink-0" />
                <span>Free delivery on orders above ₹1499 · Estimated 3-5 business days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fragrance Story */}
        <div id="product-description-section" className="mt-16 pt-8 border-t border-gray-200">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-gray-900 mb-6">Fragrance Story</h2>
          <div className="prose max-w-none text-gray-600 text-sm leading-relaxed whitespace-pre-line">
            {product.description ? (
              <p>{product.description}</p>
            ) : (
              <>
                <p>An exquisite creation from AMAL PERFUME's Private Reserve collection. Compounded with rare botanical extraits, aged resins, and precious floral distillates, this fragrance is designed to unveil an unforgettable signature sillage.</p>
                <ul className="mt-4 space-y-2">
                  <li>✓ Formulated with high-concentration pure perfume oils</li>
                  <li>✓ Handcrafted in small macerated batches</li>
                  <li>✓ Exceptional 18+ hours longevity on skin and fabric</li>
                  <li>✓ Delivered with a complimentary 2ml matching sample vial to test before opening</li>
                  <li>✓ Heat-sealed in a velvet-lined gold embossed presentation flacon</li>
                </ul>
              </>
            )}
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-100">
            <SectionHeader
              tag="You May Also Like"
              title="Related Products"
              align="left"
              viewAllHref={`/categories/${product.category?.slug || 'all'}`}
              viewAllLabel="View All"
            />
            <ProductGrid products={relatedProducts} columns={4} />
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col justify-between p-4 sm:p-6 no-print"
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <div className="flex justify-end w-full">
            <button 
              onClick={() => setIsLightboxOpen(false)}
              className="text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="Close viewer"
            >
              <X size={24} />
            </button>
          </div>

          {/* Main content area */}
          <div className="flex-1 flex items-center justify-center relative w-full select-none">
            {/* Left Nav */}
            {images.length > 1 && (
              <button 
                onClick={() => setLightboxImageIdx((prev) => (prev - 1 + images.length) % images.length)}
                className="absolute left-2 sm:left-4 z-10 text-white hover:text-gray-300 transition-colors p-3 rounded-full hover:bg-white/10"
                aria-label="Previous image"
              >
                <ChevronLeft size={36} />
              </button>
            )}

            {/* Image display */}
            <div 
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="relative w-full h-full max-h-[80vh] flex items-center justify-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={images[lightboxImageIdx]?.url} 
                alt={images[lightboxImageIdx]?.alt || product.name} 
                className="max-h-full max-w-full object-contain rounded-lg shadow-2xl transition-all duration-305 select-none pointer-events-none"
              />
            </div>

            {/* Right Nav */}
            {images.length > 1 && (
              <button 
                onClick={() => setLightboxImageIdx((prev) => (prev + 1) % images.length)}
                className="absolute right-2 sm:right-4 z-10 text-white hover:text-gray-300 transition-colors p-3 rounded-full hover:bg-white/10"
                aria-label="Next image"
              >
                <ChevronRight size={36} />
              </button>
            )}
          </div>

          {/* Bottom indicators */}
          <div className="py-4 text-center text-white/80 text-sm font-medium">
            {images.length > 1 && (
              <div className="flex items-center justify-center gap-2 mb-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxImageIdx(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === lightboxImageIdx ? 'bg-white w-6' : 'bg-white/40'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
            <p>
              Image {lightboxImageIdx + 1} of {images.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
