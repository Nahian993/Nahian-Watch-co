'use client';

import React, { Suspense, useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Product } from '@/types';
import { db } from '@/lib/db';
import ProductCard from '@/components/storefront/ProductCard';
import FilterSidebar from '@/components/storefront/FilterSidebar';
import SearchBar from '@/components/storefront/SearchBar';

const DEFAULT_FILTERS = {
  brand: 'All',
  category: 'All',
  minPrice: '',
  maxPrice: '',
  sort: 'rating',
  inStockOnly: false,
};

function ShopContent() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch(searchParams.get('search') ?? '');
    setFilters({
      brand: searchParams.get('brand') ?? 'All',
      category: searchParams.get('category') ?? 'All',
      minPrice: searchParams.get('minPrice') ?? '',
      maxPrice: searchParams.get('maxPrice') ?? '',
      sort: searchParams.get('sort') ?? 'rating',
      inStockOnly: searchParams.get('stock') === 'in-stock',
    });
  }, [searchParams]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    try {
      let results = db.getProducts({
        brand: filters.brand !== 'All' ? filters.brand : undefined,
        category: filters.category !== 'All' ? filters.category : undefined,
        search: search.trim() || undefined,
        minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
        maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
        sort: filters.sort,
      });
      if (filters.inStockOnly) {
        results = results.filter((p) => p.stockQuantity > 0);
      }
      setProducts(results);
    } finally {
      setLoading(false);
    }
  }, [filters, search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setSearch('');
  };

  const activeFilterCount = [
    filters.brand !== 'All',
    filters.category !== 'All',
    filters.minPrice !== '',
    filters.maxPrice !== '',
    filters.inStockOnly,
  ].filter(Boolean).length;

  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB]">
      {/* Page Header */}
      <div className="bg-[#111827] border-b border-[#1F2937]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-xs text-[#D4AF37] uppercase tracking-[0.3em] font-semibold mb-2">
            CROWN WATCH CO. — EST. 1974
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-gold-gradient mb-3">
            Shop All Timepieces & Calculators
          </h1>
          <p className="text-[#9CA3AF] text-sm max-w-xl">
            {language === 'bn'
              ? 'সকল বিশ্বস্ত ঘড়ি, স্মার্টওয়াচ ও ক্যালকুলেটর একসাথে। ফিল্টার করুন এবং আপনার পছন্দের পণ্যটি খুঁজে নিন।'
              : 'Browse our complete collection of authentic watches, smartwatches, and calculators. Filter by brand, price, and more.'}
          </p>

          {/* Breadcrumb */}
          <nav className="mt-4 flex items-center gap-2 text-xs text-[#8B8FA8]">
            <a href="/" className="hover:text-[#D4AF37] transition">Home</a>
            <span>›</span>
            <span className="text-[#F9FAFB]">Shop</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + Mobile Filter Bar */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-[#111827] border border-[#1F2937] rounded-xl text-sm font-semibold text-[#D4AF37] hover:border-[#D4AF37]/60 transition relative"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"/>
            </svg>
            Filters
            {activeFilterCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#D4AF37] text-[#0B0F19] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Active Filter Pills */}
        {(search || activeFilterCount > 0) && (
          <div className="flex flex-wrap gap-2 mb-5">
            {search && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] px-3 py-1 rounded-full">
                Search: "{search}"
                <button onClick={() => setSearch('')} className="hover:text-white">✕</button>
              </span>
            )}
            {filters.brand !== 'All' && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] px-3 py-1 rounded-full">
                Brand: {filters.brand}
                <button onClick={() => setFilters(f => ({ ...f, brand: 'All' }))} className="hover:text-white">✕</button>
              </span>
            )}
            {filters.category !== 'All' && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] px-3 py-1 rounded-full capitalize">
                Category: {filters.category}
                <button onClick={() => setFilters(f => ({ ...f, category: 'All' }))} className="hover:text-white">✕</button>
              </span>
            )}
            {(filters.minPrice || filters.maxPrice) && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] px-3 py-1 rounded-full">
                Price: {filters.minPrice ? `৳${filters.minPrice}` : '৳0'} – {filters.maxPrice ? `৳${filters.maxPrice}` : '∞'}
                <button onClick={() => setFilters(f => ({ ...f, minPrice: '', maxPrice: '' }))} className="hover:text-white">✕</button>
              </span>
            )}
          </div>
        )}

        <div className="flex gap-7">
          {/* Sidebar */}
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onReset={resetFilters}
            isMobileOpen={mobileFilterOpen}
            onMobileClose={() => setMobileFilterOpen(false)}
          />

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {/* Results count */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-[#8B8FA8]">
                {loading ? 'Loading...' : `${products.length} product${products.length !== 1 ? 's' : ''} found`}
              </p>
            </div>

            {/* Loading Skeleton */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-[#111827] border border-[#1F2937] rounded-xl overflow-hidden animate-pulse">
                    <div className="aspect-square bg-[#1F2937]" />
                    <div className="p-4 space-y-3">
                      <div className="h-3 bg-[#1F2937] rounded w-1/3" />
                      <div className="h-4 bg-[#1F2937] rounded w-4/5" />
                      <div className="h-4 bg-[#1F2937] rounded w-3/5" />
                      <div className="h-8 bg-[#1F2937] rounded" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && products.length === 0 && (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#111827] border border-[#1F2937] mb-6">
                  <svg className="w-9 h-9 text-[#8B8FA8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="11" cy="11" r="8" strokeWidth="1.5"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-4.35-4.35"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#F9FAFB] mb-2">No products found</h3>
                <p className="text-[#8B8FA8] text-sm mb-6 max-w-sm mx-auto">
                  Try adjusting your filters or search term to find what you're looking for.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-[#D4AF37] text-[#0B0F19] font-bold rounded-lg hover:bg-[#C5A059] transition"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Products Grid */}
            {!loading && products.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<main className="flex min-h-[55vh] items-center justify-center text-sm text-[#9CA3AF]">Loading catalog…</main>}>
      <ShopContent />
    </Suspense>
  );
}
