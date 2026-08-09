'use client';

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { useLanguage } from '@/context/LanguageContext';
import ProductCard from '@/components/storefront/ProductCard';

export default function WishlistPage() {
  const { wishlistProducts, wishlistCount, clearWishlist } = useWishlist();
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#8B8FA8] mb-6">
          <Link href="/" className="hover:text-[#D4AF37]">
            Home
          </Link>
          <span>›</span>
          <span className="text-[#F9FAFB]">Wishlist</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-[#1F2937] pb-6">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold font-serif text-gold-gradient mb-2">
              My Saved Wishlist ❤️
            </h1>
            <p className="text-sm text-[#9CA3AF]">
              {language === 'en'
                ? `You have ${wishlistCount} saved timepiece${wishlistCount === 1 ? '' : 's'} in your personal wishlist.`
                : `আপনার উইশলিস্টে ${wishlistCount}টি পছন্দের ঘড়ি সংরক্ষিত আছে।`}
            </p>
          </div>

          {wishlistCount > 0 && (
            <button
              onClick={clearWishlist}
              className="text-xs text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-500/60 px-4 py-2 rounded-lg transition"
            >
              Clear Entire Wishlist
            </button>
          )}
        </div>

        {/* Products Grid or Empty State */}
        {wishlistCount > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-12 text-center max-w-lg mx-auto my-12 shadow-xl">
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-4 text-2xl">
              ❤️
            </div>
            <h2 className="text-xl font-bold font-serif text-[#F9FAFB] mb-2">
              Your Wishlist is Empty
            </h2>
            <p className="text-sm text-[#9CA3AF] mb-6">
              Browse our catalog of authentic Casio, Seiko, and Citizen timepieces and tap the heart icon to save your favorites.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#D4AF37] text-[#0B0F19] font-bold text-sm rounded-xl hover:bg-[#C5A059] transition shadow-lg"
            >
              Explore Watch Catalog →
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
