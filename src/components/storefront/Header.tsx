'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag, Heart, Search, Menu, X, User, ChevronDown,
  Phone, Mail, Sparkles, TrendingUp
} from 'lucide-react';
import { useCartStore } from '@/features/cart/store';
import { useWishlistStore } from '@/features/wishlist/store';
import { useAuthStore } from '@/features/auth/store';
import { cn, formatPrice } from '@/lib/utils';

const defaultCategories = [
  { name: 'Extrait de Parfum', slug: 'extrait-de-parfum', description: '30%+ Pure oil concentration' },
  { name: 'Eau de Parfum', slug: 'eau-de-parfum', description: 'Signature daily luxury' },
  { name: 'Oud & Oriental', slug: 'oud-oriental', description: 'Rare agarwood & royal amber' },
  { name: 'Floral & Gourmand', slug: 'floral-gourmand', description: 'Velvet rose & Bourbon vanilla' },
  { name: 'Fresh & Citrus', slug: 'fresh-citrus', description: 'Calabrian bergamot & sea spray' },
  { name: 'Discovery Sets', slug: 'discovery-coffrets', description: 'Curated miniature flacons' },
];

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Fragrances', href: '/categories', hasDropdown: true },
  { label: 'Collections', href: '/collections' },
  { label: 'New Releases', href: '/new-arrivals' },
  { label: 'Best Sellers', href: '/best-sellers' },
  { label: 'The Maison', href: '/about' },
];

export default function Header({ featuredProducts = [] }: { featuredProducts?: any[] }) {
  const pathname = usePathname();
  const [categories, setCategories] = useState<any[]>(defaultCategories);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [liveSearchResults, setLiveSearchResults] = useState<any[]>([]);
  const [liveSearchCategories, setLiveSearchCategories] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [cartPreviewOpen, setCartPreviewOpen] = useState(false);
  
  const searchRef = useRef<HTMLInputElement>(null);
  const cartTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setLiveSearchResults([]);
      setLiveSearchCategories([]);
      setIsSearching(false);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery.trim())}`);
        if (res.ok) {
          const data = await res.json();
          setLiveSearchResults(data.products || []);
          setLiveSearchCategories(data.categories || []);
        }
      } catch (err) {
        console.error('Search fetch error:', err);
      } finally {
        setIsSearching(false);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/admin/categories');
        const data = await res.json();
        if (res.ok) {
          setCategories(data.categories.filter((c: any) => c.isActive) || []);
        }
      } catch (err) {
        console.error('Failed to load categories in header:', err);
      }
    };
    fetchCategories();
  }, []);

  const cartItems = useCartStore((s) => s.items);
  const cartCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const openCart = useCartStore((s) => s.openCart);
  const user = useAuthStore((s) => s.user);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setCatOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const handleCartEnter = () => {
    if (cartTimer.current) clearTimeout(cartTimer.current);
    setCartPreviewOpen(true);
  };

  const handleCartLeave = () => {
    cartTimer.current = setTimeout(() => {
      setCartPreviewOpen(false);
    }, 300);
  };

  return (
    <>
      {/* Main header */}
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-stone-200 py-1'
            : 'bg-white/85 backdrop-blur-md py-3 border-b border-stone-200/60'
        )}
      >
        <div className="container-plt">
          <div className="flex items-center justify-between h-16 sm:h-20 md:h-24">

            {/* Logo — LEFT side */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile menu button */}
              <button
                id="mobile-menu-btn"
                className="btn-icon md:hidden text-stone-800 hover:bg-stone-100"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>

              <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
                <img src="/amal-logo.jpg" alt="AMAL PERFUME" className="h-12 sm:h-16 md:h-20 w-auto object-contain hover:scale-105 transition-all duration-300" style={{ maxHeight: '82px' }} />
                <div className="hidden md:flex flex-col">
                  <span className="font-display text-2xl lg:text-3xl font-bold text-stone-900 tracking-widest leading-none">AMAL</span>
                  <span className="text-[10px] tracking-[0.45em] uppercase text-amber-700 font-bold mt-1">PERFUME</span>
                  <span className="text-[9px] tracking-[0.15em] uppercase text-stone-500 font-medium mt-0.5">Luxury In Every Spray</span>
                </div>
              </Link>
            </div>

            {/* Desktop nav — CENTER */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.label} className="relative" onMouseLeave={() => setCatOpen(false)}>
                    <button
                      id="categories-nav-btn"
                      className={cn(
                        'flex items-center gap-1.5 py-2 text-sm uppercase tracking-widest font-semibold transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-amber-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left',
                        isActive(link.href) ? 'text-amber-800 after:scale-x-100 font-bold' : 'text-stone-700 hover:text-stone-950'
                      )}
                      onMouseEnter={() => setCatOpen(true)}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={cn('transition-transform duration-300', catOpen && 'rotate-180')}
                      />
                    </button>

                    {/* Mega dropdown */}
                    {catOpen && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[600px] bg-white/95 backdrop-blur-2xl rounded-2xl shadow-card-hover border border-white/60 p-8 grid grid-cols-2 gap-6 z-50 animate-fade-up"
                        onMouseEnter={() => setCatOpen(true)}
                      >
                        <div className="col-span-2 pb-3 border-b border-gray-100 mb-2">
                          <p className="text-xs text-gray-400 uppercase tracking-[0.2em] font-bold">Discover Olfactory Families</p>
                        </div>
                        {categories.map((cat) => (
                          <Link
                            key={cat.slug}
                            href={`/categories/${cat.slug}`}
                            className="flex flex-col gap-1 px-4 py-3 rounded-xl hover:bg-brand-50/50 transition-all duration-300 group"
                          >
                            <span className="text-sm font-display font-semibold text-gray-900 group-hover:text-brand-700 text-lg">
                              {cat.name}
                            </span>
                            <span className="text-xs text-gray-500">{cat.description}</span>
                          </Link>
                        ))}
                        <div className="col-span-2 mt-4">
                          <Link
                            href="/categories"
                            className="flex items-center justify-center gap-2 px-4 py-4 rounded-xl text-xs uppercase tracking-widest font-bold text-white bg-gradient-brand hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-0.5"
                          >
                            <Sparkles size={14} />
                            Explore The Fragrance Lookbook
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      'py-2 text-sm uppercase tracking-widest font-semibold transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-amber-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left',
                      isActive(link.href) ? 'text-amber-800 after:scale-x-100 font-bold' : 'text-stone-700 hover:text-stone-950'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* Search */}
              <button
                id="search-btn"
                className="w-10 h-10 rounded-full flex items-center justify-center text-stone-700 hover:bg-stone-100 hover:text-stone-950 transition-colors"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
              >
                <Search size={20} strokeWidth={2.5} />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                id="wishlist-btn"
                className="w-10 h-10 rounded-full flex items-center justify-center text-stone-700 hover:bg-stone-100 hover:text-stone-950 transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart size={20} strokeWidth={2.5} />
                {mounted && wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-amber-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <div 
                className="relative"
                onMouseEnter={handleCartEnter}
                onMouseLeave={handleCartLeave}
              >
                <button
                  id="cart-btn"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-stone-700 hover:bg-stone-100 hover:text-stone-950 transition-colors relative"
                  onClick={openCart}
                  aria-label="Cart"
                >
                  <ShoppingBag size={20} strokeWidth={2.5} />
                  {mounted && cartCount > 0 && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-amber-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </button>

                {/* Cart Preview Hover */}
                {cartPreviewOpen && (
                  <div className="absolute top-full right-0 mt-4 w-80 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-card-hover border border-stone-200 p-5 z-50 animate-fade-up">
                    <h4 className="text-sm uppercase tracking-widest font-bold text-gray-900 border-b border-gray-100 pb-3 mb-3">Your Bag</h4>
                    {cartItems.length === 0 ? (
                      <p className="text-sm text-gray-500 py-4 text-center">Your shopping bag is empty.</p>
                    ) : (
                      <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto">
                        {cartItems.slice(0, 3).map((item) => (
                          <div key={item.id} className="flex gap-3 items-center">
                            <div className="w-12 h-14 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                              <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-gray-900 truncate">{item.product.name}</p>
                              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <p className="text-xs font-bold">{formatPrice(item.product.price)}</p>
                          </div>
                        ))}
                        {cartItems.length > 3 && (
                          <p className="text-xs text-center text-gray-400 pt-2 border-t border-gray-100">+{cartItems.length - 3} more items</p>
                        )}
                      </div>
                    )}
                    <button onClick={openCart} className="w-full py-3 text-xs uppercase tracking-widest font-bold text-white bg-stone-900 hover:bg-black rounded-xl transition-colors">
                      View Shopping Bag
                    </button>
                  </div>
                )}
              </div>

              {/* Account */}
              {mounted && user ? (
                <Link
                  href="/account"
                  id="account-btn"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm bg-stone-900 hover:bg-amber-600 transition-colors border border-stone-200"
                  aria-label="Account"
                >
                  {user.name ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2) : 'U'}
                </Link>
              ) : (
                <Link
                  href="/account"
                  id="account-btn"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-stone-700 hover:bg-stone-100 hover:text-stone-950 transition-colors hidden sm:flex"
                  aria-label="Account"
                >
                  <User size={20} strokeWidth={2.5} />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Smart Search Bar */}
        {searchOpen && (
          <div className="absolute top-full left-0 w-full bg-white/98 backdrop-blur-2xl shadow-2xl border-t border-gray-200 py-4 sm:py-8 animate-fade-down z-50 text-gray-900">
            <div className="container-plt">
              <div className="max-w-3xl mx-auto">
                <div className="relative flex items-center">
                  <Search size={22} className="absolute left-4 text-brand-600 pointer-events-none z-10" />
                  <input
                    ref={searchRef}
                    id="search-input"
                    type="text"
                    placeholder="Search for designer suits, chikankari..."
                    style={{ paddingLeft: '52px', paddingRight: '48px' }}
                    className="w-full py-4 bg-gray-50 border border-gray-300 rounded-2xl text-base md:text-lg font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:bg-white focus:border-brand-500 transition-all shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && searchQuery.trim()) {
                        window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
                      }
                      if (e.key === 'Escape') setSearchOpen(false);
                    }}
                  />
                  {searchQuery ? (
                    <button
                      className="absolute right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors z-10"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search query"
                    >
                      <X size={16} />
                    </button>
                  ) : (
                    <button
                      className="absolute right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors z-10"
                      onClick={() => setSearchOpen(false)}
                      aria-label="Close search"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                
                {/* Live search results or default suggestions */}
                {searchQuery.trim() ? (
                  <div className="mt-6 space-y-6">
                    {isSearching && (
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest animate-pulse">
                        Searching products...
                      </p>
                    )}

                    {!isSearching && liveSearchCategories.length > 0 && (
                      <div>
                        <h4 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-3">Matching Categories</h4>
                        <div className="flex flex-wrap gap-2">
                          {liveSearchCategories.map((cat) => (
                            <Link
                              key={cat.id}
                              href={`/categories/${cat.slug}`}
                              onClick={() => setSearchOpen(false)}
                              className="px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-700 hover:bg-brand-100 text-xs font-semibold transition-colors border border-brand-100"
                            >
                              {cat.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {!isSearching && (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-xs uppercase tracking-widest font-bold text-gray-400">Matching Products</h4>
                          {liveSearchResults.length > 0 && (
                            <Link
                              href={`/products?search=${encodeURIComponent(searchQuery.trim())}`}
                              onClick={() => setSearchOpen(false)}
                              className="text-xs font-semibold text-brand-600 hover:underline"
                            >
                              View all results ({liveSearchResults.length}) &rarr;
                            </Link>
                          )}
                        </div>

                        {liveSearchResults.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {liveSearchResults.map((p) => (
                              <Link
                                key={p.id}
                                href={`/products/${p.slug}`}
                                onClick={() => setSearchOpen(false)}
                                className="flex items-center gap-3 p-3 rounded-2xl border border-gray-100 bg-white hover:border-brand-200 hover:shadow-md transition-all group"
                              >
                                <img src={p.image} alt={p.name} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                                <div className="min-w-0 flex-1">
                                  <p className="text-xs font-semibold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-1">
                                    {p.name}
                                  </p>
                                  <p className="text-[11px] text-gray-400">{p.categoryName}</p>
                                  <p className="text-xs font-bold text-brand-700 mt-0.5">{formatPrice(p.price)}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="py-6 text-center text-sm text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                            No products found matching &ldquo;<span className="font-semibold text-gray-800">{searchQuery}</span>&rdquo;.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  /* Default Trending & Featured Suggestions */
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-gray-400 mb-4">
                        <TrendingUp size={14} className="text-brand-600" /> Trending Searches
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {['Oud Impérial', 'Baccarat Noir', 'Extrait de Parfum', 'Bourbon Vanilla', 'Discovery Coffret', 'Neroli'].map(term => (
                          <button
                            key={term}
                            onClick={() => setSearchQuery(term)}
                            className="px-4 py-2 rounded-full bg-gray-100 hover:bg-brand-50 hover:text-brand-700 text-sm font-medium text-gray-700 transition-colors border border-gray-200/60"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-4">Featured Products</h3>
                      <div className="space-y-3">
                        {featuredProducts.slice(0, 3).map(p => (
                          <Link key={p.id} href={`/products/${p.slug}`} onClick={() => setSearchOpen(false)} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors group">
                            <img src={p.images[0]?.url} alt={p.name} className="w-12 h-12 rounded object-cover" />
                            <div>
                              <p className="text-sm font-semibold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-1">{p.name}</p>
                              <p className="text-xs text-gray-500">{formatPrice(p.price)}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-[85vw] max-w-[320px] bg-[#FAF8F5] text-stone-800 border-r border-stone-200 z-50 md:hidden flex flex-col shadow-2xl animate-slide-in-left">
            <div className="flex items-center justify-between p-5 border-b border-stone-200 bg-white">
              <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
                <img src="/amal-logo.jpg" alt="AMAL PERFUME" className="h-12 w-auto object-contain rounded-lg border border-stone-200" />
                <div className="flex flex-col">
                  <span className="font-display text-lg font-bold text-stone-900 tracking-widest leading-none">AMAL</span>
                  <span className="text-[8px] tracking-[0.3em] uppercase text-amber-700 font-bold mt-0.5">PERFUME</span>
                </div>
              </Link>
              <button
                className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-100 text-stone-700 hover:text-stone-950 hover:bg-stone-200 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4">
              <div className="space-y-1">
                {navLinks.map((link) =>
                  link.hasDropdown ? (
                    <div key={link.label}>
                      <button
                        className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider text-stone-800 hover:bg-amber-50 hover:text-amber-800 transition-colors"
                        onClick={() => setCatOpen(!catOpen)}
                      >
                        {link.label}
                        <ChevronDown
                          size={16}
                          className={cn('transition-transform duration-300', catOpen && 'rotate-180')}
                        />
                      </button>
                      {catOpen && (
                        <div className="mt-1 ml-4 space-y-1 border-l-2 border-amber-500/40 pl-3 py-2">
                          {categories.map((cat) => (
                            <Link
                              key={cat.slug}
                              href={`/categories/${cat.slug}`}
                              onClick={() => setMobileOpen(false)}
                              className="block px-3 py-2.5 text-sm font-medium text-stone-600 hover:text-amber-800 rounded-lg hover:bg-amber-50/50 transition-colors"
                            >
                              {cat.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'block px-4 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-colors',
                        isActive(link.href)
                          ? 'bg-amber-100 text-amber-900 border border-amber-300/80 font-bold'
                          : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                      )}
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>
            </nav>

            <div className="p-6 bg-white border-t border-stone-200 space-y-4">
              {mounted && user ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 font-bold text-sm shrink-0">
                      {user.name ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2) : 'U'}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-stone-900 truncate">{user.name}</p>
                      <p className="text-xs text-stone-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    href="/account"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-bold bg-stone-900 text-white hover:bg-black transition-colors shadow-md"
                  >
                    Go to Concierge
                  </Link>
                </div>
              ) : (
                <Link
                  href="/account"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold bg-amber-50 border border-amber-200 text-amber-900 hover:bg-amber-100 transition-all"
                >
                  <User size={18} className="text-amber-700" />
                  Sign In / Register
                </Link>
              )}
              <div className="text-xs text-stone-500 font-medium pt-2">
                <p className="flex items-center gap-2 mb-2"><Phone size={14} className="text-amber-700" /> +91 98765 43210</p>
                <p className="flex items-center gap-2"><Mail size={14} className="text-amber-700" /> concierge@amalperfume.com</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
