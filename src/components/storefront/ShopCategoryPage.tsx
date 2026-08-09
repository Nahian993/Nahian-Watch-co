'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { db } from '@/lib/db';
import { Product } from '@/types';
import ProductCard from '@/components/storefront/ProductCard';

interface LocalizedString { en: string; bn: string; }

interface ShopCategoryPageProps {
  brand?: string;
  category?: string;
  maxPrice?: number;
  title: LocalizedString;
  subtitle: LocalizedString;
}

export default function ShopCategoryPage({ brand, category, maxPrice, title, subtitle }: ShopCategoryPageProps) {
  const { language, t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState('rating');

  useEffect(() => {
    const results = db.getProducts({
      brand: brand !== 'All' ? brand : undefined,
      category: category !== 'All' ? category : undefined,
      maxPrice,
      sort,
    });
    setProducts(results);
  }, [brand, category, maxPrice, sort]);

  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB]">
      {/* Header */}
      <div className="bg-[#111827] border-b border-[#1F2937]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-xs text-[#D4AF37] uppercase tracking-[0.3em] font-semibold mb-2">CROWN WATCH CO.</p>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-gold-gradient mb-3">{title[language]}</h1>
          <p className="text-[#9CA3AF] text-sm max-w-xl">{subtitle[language]}</p>
          <nav className="mt-4 flex items-center gap-2 text-xs text-[#8B8FA8]">
            <Link href="/" className="hover:text-[#D4AF37] transition">Home</Link>
            <span>›</span>
            <Link href="/shop" className="hover:text-[#D4AF37] transition">Shop</Link>
            <span>›</span>
            <span className="text-[#F9FAFB]">{title[language]}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sort */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[#8B8FA8]">{products.length} products</p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-[#111827] border border-[#1F2937] text-[#F9FAFB] text-sm rounded-lg px-3 py-2 outline-none focus:border-[#D4AF37] transition"
          >
            <option value="rating">Best Rated</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#8B8FA8] mb-4">No products found in this category.</p>
            <Link href="/shop" className="px-6 py-2.5 bg-[#D4AF37] text-[#0B0F19] font-bold rounded-lg hover:bg-[#C5A059] transition">
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
