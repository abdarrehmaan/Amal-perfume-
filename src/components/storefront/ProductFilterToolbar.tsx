'use client';

import React, { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, Search, X, RotateCcw, Check } from 'lucide-react';

interface CategoryOption {
  id: string;
  name: string;
  slug: string;
}

interface ProductFilterToolbarProps {
  categories: CategoryOption[];
  sortOptions: { value: string; label: string }[];
  currentCategory?: string;
  currentSort?: string;
  currentSearch?: string;
  currentMinPrice?: string;
  currentMaxPrice?: string;
  totalCount: number;
}

export default function ProductFilterToolbar({
  categories,
  sortOptions,
  currentCategory = '',
  currentSort = 'newest',
  currentSearch = '',
  currentMinPrice = '',
  currentMaxPrice = '',
  totalCount,
}: ProductFilterToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(currentSearch);
  const [selectedCat, setSelectedCat] = useState(currentCategory);
  const [selectedSort, setSelectedSort] = useState(currentSort);
  const [selectedMinPrice, setSelectedMinPrice] = useState(currentMinPrice);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(currentMaxPrice);

  const applyFilters = (overrides?: {
    category?: string;
    sort?: string;
    search?: string;
    minPrice?: string;
    maxPrice?: string;
  }) => {
    const params = new URLSearchParams();

    const cat = overrides?.category !== undefined ? overrides.category : selectedCat;
    const srt = overrides?.sort !== undefined ? overrides.sort : selectedSort;
    const srch = overrides?.search !== undefined ? overrides.search : searchInput;
    const minP = overrides?.minPrice !== undefined ? overrides.minPrice : selectedMinPrice;
    const maxP = overrides?.maxPrice !== undefined ? overrides.maxPrice : selectedMaxPrice;

    if (cat) params.set('category', cat);
    if (srt && srt !== 'newest') params.set('sort', srt);
    if (srch?.trim()) params.set('search', srch.trim());
    if (minP) params.set('minPrice', minP);
    if (maxP) params.set('maxPrice', maxP);

    router.push(`${pathname}?${params.toString()}`);
    setDrawerOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters({ search: searchInput });
  };

  const clearAll = () => {
    setSearchInput('');
    setSelectedCat('');
    setSelectedSort('newest');
    setSelectedMinPrice('');
    setSelectedMaxPrice('');
    router.push(pathname);
    setDrawerOpen(false);
  };

  const hasActiveFilters = Boolean(
    currentCategory || (currentSort && currentSort !== 'newest') || currentSearch || currentMinPrice || currentMaxPrice
  );

  return (
    <div className="mb-8 space-y-4">
      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs sm:text-sm">
        <button
          onClick={() => {
            setSelectedCat('');
            applyFilters({ category: '' });
          }}
          className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all duration-200 ${
            !currentCategory
              ? 'bg-stone-900 text-white shadow-sm'
              : 'bg-white border border-stone-200 text-stone-700 hover:border-stone-400'
          }`}
        >
          All Fragrances ({totalCount})
        </button>
        {categories.map((cat) => {
          const isSelected = currentCategory === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => {
                const next = isSelected ? '' : cat.slug;
                setSelectedCat(next);
                applyFilters({ category: next });
              }}
              className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all duration-200 ${
                isSelected
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-white border border-stone-200 text-stone-700 hover:border-stone-400'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Main Search & Control Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 pb-4 border-b border-stone-200">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search notes (oud, rose, amber, leather)..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-stone-200 bg-white text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-700 transition-all"
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => {
                setSearchInput('');
                applyFilters({ search: '' });
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5"
            >
              <X size={14} />
            </button>
          )}
        </form>

        <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-auto w-full sm:w-auto justify-between sm:justify-start">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 text-sm font-medium text-stone-700 bg-white hover:bg-stone-50 transition-colors shadow-2xs"
          >
            <SlidersHorizontal size={15} className="text-amber-700" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
            )}
          </button>

          <select
            className="px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm font-medium text-stone-700 bg-white hover:border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 cursor-pointer shadow-2xs"
            value={currentSort}
            onChange={(e) => {
              setSelectedSort(e.target.value);
              applyFilters({ sort: e.target.value });
            }}
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filter Badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-stone-500 font-medium">Active Filters:</span>
          {currentCategory && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 font-medium">
              <span>Category: {categories.find((c) => c.slug === currentCategory)?.name || currentCategory}</span>
              <button
                onClick={() => {
                  setSelectedCat('');
                  applyFilters({ category: '' });
                }}
                className="hover:text-amber-950"
              >
                <X size={12} />
              </button>
            </span>
          )}
          {currentSearch && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 font-medium">
              <span>Search: &ldquo;{currentSearch}&rdquo;</span>
              <button
                onClick={() => {
                  setSearchInput('');
                  applyFilters({ search: '' });
                }}
                className="hover:text-amber-950"
              >
                <X size={12} />
              </button>
            </span>
          )}
          {(currentMinPrice || currentMaxPrice) && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 font-medium">
              <span>
                Price: {currentMinPrice ? `₹${currentMinPrice}` : '₹0'} – {currentMaxPrice ? `₹${currentMaxPrice}` : 'Above'}
              </span>
              <button
                onClick={() => {
                  setSelectedMinPrice('');
                  setSelectedMaxPrice('');
                  applyFilters({ minPrice: '', maxPrice: '' });
                }}
                className="hover:text-amber-950"
              >
                <X size={12} />
              </button>
            </span>
          )}
          <button
            onClick={clearAll}
            className="text-stone-500 hover:text-stone-900 underline ml-2 font-medium"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Slide-out Filter Drawer Modal */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-6 border-b border-stone-200 bg-[#FAF8F5]">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-amber-700" />
                  <h3 className="font-display text-lg font-bold text-stone-900">Refine Collection</h3>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Olfactory Family */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-stone-900 mb-3">
                    Olfactory Family / Category
                  </h4>
                  <div className="space-y-2">
                    <label
                      onClick={() => setSelectedCat('')}
                      className={`flex items-center justify-between p-3 rounded-xl border text-sm cursor-pointer transition-colors ${
                        !selectedCat
                          ? 'border-amber-600 bg-amber-50/50 text-amber-950 font-semibold'
                          : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span>All Collections</span>
                      {!selectedCat && <Check size={16} className="text-amber-700" />}
                    </label>
                    {categories.map((c) => (
                      <label
                        key={c.id}
                        onClick={() => setSelectedCat(c.slug)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-sm cursor-pointer transition-colors ${
                          selectedCat === c.slug
                            ? 'border-amber-600 bg-amber-50/50 text-amber-950 font-semibold'
                            : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        <span>{c.name}</span>
                        {selectedCat === c.slug && <Check size={16} className="text-amber-700" />}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-stone-900 mb-3">
                    Price Range (INR)
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Under ₹3,500', min: '', max: '3500' },
                      { label: '₹3,500 – ₹4,000', min: '3500', max: '4000' },
                      { label: '₹4,000 – ₹6,000', min: '4000', max: '6000' },
                      { label: 'Above ₹6,000', min: '6000', max: '' },
                    ].map((bracket) => {
                      const active = selectedMinPrice === bracket.min && selectedMaxPrice === bracket.max;
                      return (
                        <button
                          key={bracket.label}
                          type="button"
                          onClick={() => {
                            if (active) {
                              setSelectedMinPrice('');
                              setSelectedMaxPrice('');
                            } else {
                              setSelectedMinPrice(bracket.min);
                              setSelectedMaxPrice(bracket.max);
                            }
                          }}
                          className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                            active
                              ? 'border-amber-600 bg-amber-50 text-amber-950 ring-1 ring-amber-600'
                              : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                          }`}
                        >
                          {bracket.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sort Order */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-stone-900 mb-3">
                    Sort Sequence
                  </h4>
                  <div className="space-y-2">
                    {sortOptions.map((opt) => (
                      <label
                        key={opt.value}
                        onClick={() => setSelectedSort(opt.value)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-sm cursor-pointer transition-colors ${
                          selectedSort === opt.value
                            ? 'border-amber-600 bg-amber-50/50 text-amber-950 font-semibold'
                            : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {selectedSort === opt.value && <Check size={16} className="text-amber-700" />}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-5 border-t border-stone-200 bg-[#FAF8F5] flex items-center gap-3">
                <button
                  type="button"
                  onClick={clearAll}
                  className="flex-1 py-3 px-4 rounded-xl border border-stone-300 text-stone-700 font-semibold text-sm hover:bg-stone-100 flex items-center justify-center gap-2 transition-colors"
                >
                  <RotateCcw size={15} /> Reset
                </button>
                <button
                  type="button"
                  onClick={() => applyFilters()}
                  className="flex-1 py-3 px-4 rounded-xl bg-stone-900 text-white font-semibold text-sm hover:bg-black transition-colors shadow-sm"
                >
                  Show Fragrances
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
