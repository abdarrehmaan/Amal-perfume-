'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { useCartStore } from '@/features/cart/store';
import { formatPrice, calculateDiscount } from '@/lib/utils';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal, clearCart } = useCartStore();
  const [siteSettings, setSiteSettings] = React.useState({
    freeShippingThreshold: 1499,
    standardShippingCharge: 99,
    prepaidDiscountPercent: 5,
    taxPercent: 0,
  });

  React.useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const res = await fetch('/api/admin/settings');
        const data = await res.json();
        if (res.ok && data.settings) {
          setSiteSettings(data.settings);
        }
      } catch (err) {
        console.error('Failed to fetch cart drawer site settings:', err);
      }
    };

    fetchSiteSettings();
  }, []);

  const subtotal = getSubtotal();
  const freeShippingThreshold = Number(siteSettings.freeShippingThreshold || 1499);
  const standardShipping = Number(siteSettings.standardShippingCharge || 99);
  const prepaidPercent = Number(siteSettings.prepaidDiscountPercent || 5);
  const taxPercent = Number(siteSettings.taxPercent || 0);

  const shipping = subtotal >= freeShippingThreshold ? 0 : standardShipping;
  const prepaidDiscount = prepaidPercent > 0 ? Math.round(subtotal * (prepaidPercent / 100)) : 0;
  const finalTotal = Math.max(0, subtotal - prepaidDiscount + shipping);

  const activeTaxPercent = taxPercent > 0 ? taxPercent : 5;
  const gstAmount = Math.round((subtotal - prepaidDiscount) * (activeTaxPercent / (100 + activeTaxPercent)));
  const remaining = freeShippingThreshold - subtotal;
  const totalItemCount = items.reduce((s, i) => s + i.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div
        id="cart-drawer"
        className="fixed inset-y-0 right-0 w-full max-w-md bg-[#FAF8F5] text-stone-900 shadow-2xl z-50 flex flex-col h-[100dvh] max-h-[100dvh] overflow-hidden border-l border-stone-200 animate-slide-in-right"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Bag"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-white border-b border-stone-200/80 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-700">
              <ShoppingBag size={17} strokeWidth={2.2} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-stone-900 text-base sm:text-lg tracking-tight">Shopping Bag</h2>
                {totalItemCount > 0 && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-stone-900 text-amber-300">
                    {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-[11px] font-semibold text-stone-600 hover:text-red-700 px-2 py-1 rounded transition-colors mr-1"
                title="Clear Bag"
              >
                Clear
              </button>
            )}
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              onClick={closeCart}
              aria-label="Close cart"
            >
              <X size={19} />
            </button>
          </div>
        </div>

        {/* Free Shipping Indicator */}
        {items.length > 0 && (
          <div className="px-4 sm:px-6 py-2.5 bg-gradient-to-r from-amber-50/80 via-white to-amber-50/80 border-b border-amber-100/80 shrink-0">
            {remaining > 0 ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-stone-700 font-medium">
                    <Truck size={13} className="text-amber-600" />
                    Add <strong className="text-amber-800 font-bold">{formatPrice(remaining)}</strong> for <span className="text-amber-800 font-bold">FREE Shipping</span>
                  </span>
                  <span className="text-[10px] text-stone-600 font-bold">{Math.round((subtotal / freeShippingThreshold) * 100)}%</span>
                </div>
                <div className="h-1.5 w-full bg-stone-200/70 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-amber-500 to-amber-700"
                    style={{
                      width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                <Sparkles size={14} className="text-amber-500 shrink-0" />
                <span>You’ve unlocked <strong>FREE Express Shipping</strong>!</span>
              </div>
            )}
          </div>
        )}

        {/* Scrollable Items List */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-3 divide-y divide-stone-200/60">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-16 px-6 text-center">
              <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-700">
                <ShoppingBag size={28} strokeWidth={1.75} />
              </div>
              <div className="max-w-xs">
                <p className="font-display font-bold text-stone-900 text-lg mb-1">Your bag is empty</p>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Discover our pure extrait collection and artisanal fragrances.
                </p>
              </div>
              <button
                onClick={closeCart}
                className="btn-gold text-xs px-6 py-2.5 uppercase tracking-widest font-bold mt-2 shadow-sm"
              >
                Explore Fragrances
              </button>
            </div>
          ) : (
            items.map((item) => {
              const discount = item.product.comparePrice
                ? calculateDiscount(item.product.price, item.product.comparePrice)
                : 0;

              return (
                <div key={item.id} className="py-3.5 first:pt-1 last:pb-2 flex gap-3.5 items-start group">
                  {/* Thumbnail */}
                  <div className="relative w-16 h-20 sm:w-20 sm:h-24 rounded-lg overflow-hidden bg-stone-100 border border-stone-200/80 shrink-0 shadow-xs">
                    <Image
                      src={item.product.image || '/placeholder-product.jpg'}
                      alt={item.product.name}
                      fill
                      className="object-cover object-center"
                      sizes="80px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-0.5">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="font-display text-xs sm:text-sm font-bold text-stone-900 hover:text-amber-800 transition-colors line-clamp-1 leading-snug"
                          onClick={closeCart}
                        >
                          {item.product.name}
                        </Link>
                        <button
                          className="text-stone-600 hover:text-red-700 transition-colors p-1 -mr-1 rounded-full hover:bg-stone-100 shrink-0"
                          onClick={() => removeItem(item.id)}
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {/* Variant Badges */}
                      {item.variant && (
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {item.variant.size && (
                            <span className="text-[10px] font-medium text-stone-600 bg-white border border-stone-200 px-1.5 py-0.5 rounded">
                              {item.variant.size}
                            </span>
                          )}
                          {item.variant.color && (
                            <span className="text-[10px] font-medium text-stone-600 bg-white border border-stone-200 px-1.5 py-0.5 rounded truncate max-w-[140px]">
                              {item.variant.color}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Price & Quantity Controls */}
                    <div className="flex items-center justify-between mt-2.5 pt-1">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-bold text-xs sm:text-sm text-stone-900">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        {discount > 0 && item.product.comparePrice && (
                          <span className="text-[10px] text-stone-400 line-through">
                            {formatPrice(item.product.comparePrice * item.quantity)}
                          </span>
                        )}
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-white border border-stone-200 rounded-lg shadow-2xs overflow-hidden">
                        <button
                          className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-stone-100 active:bg-stone-200 transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={11} strokeWidth={2.5} />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-stone-900 select-none">
                          {item.quantity}
                        </span>
                        <button
                          className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-stone-100 active:bg-stone-200 transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={11} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Compact, Luxury Sticky Footer */}
        {items.length > 0 && (
          <div className="bg-white border-t border-stone-200/90 px-4 sm:px-6 pt-3.5 pb-4 sm:pb-5 space-y-3 shrink-0 shadow-lg pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
            {/* Price Breakdown Card */}
            <div className="bg-[#FAF8F5] border border-stone-200/70 rounded-xl p-3 space-y-1.5 text-xs">
              <div className="flex justify-between items-center text-stone-600">
                <span>Product Subtotal</span>
                <span className="font-semibold text-stone-900">{formatPrice(subtotal)}</span>
              </div>
              
              <div className="flex justify-between items-center text-[11px] text-stone-500">
                <span>Includes {activeTaxPercent}% GST</span>
                <span>{formatPrice(gstAmount)}</span>
              </div>

              {prepaidDiscount > 0 && (
                <div className="flex justify-between items-center text-emerald-700 font-medium">
                  <span className="flex items-center gap-1">Prepaid Offer ({prepaidPercent}%)</span>
                  <span className="font-bold">-{formatPrice(prepaidDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between items-center text-stone-600">
                <span>Delivery Charges</span>
                <span className={shipping === 0 ? 'text-emerald-700 font-bold uppercase text-[11px]' : 'font-semibold text-stone-900'}>
                  {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                </span>
              </div>

              <div className="border-t border-stone-200/80 pt-2 mt-1 flex justify-between items-baseline font-bold text-stone-900">
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-stone-700 font-bold">Total Payable</span>
                  <span className="text-[10px] text-stone-600 font-normal">All taxes included</span>
                </div>
                <span className="text-base sm:text-lg font-display text-amber-900 font-bold">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5">
              <Link
                href="/cart"
                className="w-1/3 py-3 text-center text-xs uppercase tracking-wider font-bold rounded-xl border border-stone-300 text-stone-800 hover:bg-stone-100 hover:border-stone-400 transition-all shadow-xs"
                onClick={closeCart}
              >
                View Bag
              </Link>
              
              <Link
                href="/checkout"
                className="w-2/3 py-3 text-center text-xs sm:text-sm uppercase tracking-wider font-bold rounded-xl btn-gold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                onClick={closeCart}
              >
                <span>Checkout</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Trust Assurance Guarantee */}
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-600 font-medium pt-0.5">
              <ShieldCheck size={13} className="text-amber-700 shrink-0" />
              <span>100% Authentic • Secure 256-Bit SSL Checkout</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

