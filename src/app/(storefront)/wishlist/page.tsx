'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlistStore } from '@/features/wishlist/store';
import { useCartStore } from '@/features/cart/store';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';
import BackButton from '@/components/storefront/BackButton';

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const addToCart = useCartStore(s => s.addItem);

  const handleMoveToCart = (item: typeof items[0]) => {
    addToCart({ id: item.id, name: item.name, slug: item.slug, price: item.price, comparePrice: item.comparePrice, image: item.image });
    removeItem(item.id);
    toast.success('Moved to cart!');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-16">
      <div className="py-10 md:py-12 border-b border-stone-200 bg-[#F4F0E6]">
        <div className="container-plt flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto flex justify-start">
            <BackButton label="Back to Shopping" />
          </div>
          <div className="text-center sm:text-right">
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-amber-800 block mb-0.5">AMAL PERFUME Vault</span>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 tracking-wide">My Saved Fragrances</h1>
            <p className="text-stone-600 text-xs sm:text-sm mt-0.5">{items.length} {items.length === 1 ? 'flacon' : 'flacons'} saved</p>
          </div>
        </div>
      </div>
      <div className="container-plt py-8">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-24 h-24 rounded-full bg-brand-50 flex items-center justify-center">
              <Heart size={40} className="text-brand-300" />
            </div>
            <h2 className="font-display text-2xl font-bold text-gray-900">Your wishlist is empty</h2>
            <p className="text-gray-500">Save items you love and come back to them later.</p>
            <Link href="/products" className="btn-primary">Explore Collection</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div key={item.id} className="card-product group">
                <div className="product-img-wrapper">
                  <Link href={`/products/${item.slug}`}>
                    <Image src={item.image || '/products/default-product.jpg'} alt={item.name} fill className="object-cover" sizes="(max-width: 640px) 50vw, 25vw" />
                  </Link>
                  <button onClick={() => removeItem(item.id)} className="btn-wishlist active" aria-label="Remove from wishlist">
                    <Trash2 size={15} className="stroke-red-500" />
                  </button>
                </div>
                <div className="p-4">
                  <Link href={`/products/${item.slug}`}>
                    <h3 className="text-sm font-semibold text-gray-900 hover:text-brand-700 line-clamp-2 mb-2">{item.name}</h3>
                  </Link>
                  <p className="price-current mb-3">{formatPrice(item.price)}</p>
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 transition-colors"
                  >
                    <ShoppingBag size={15} /> Move to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
