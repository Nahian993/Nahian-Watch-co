'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { formatBDT } from '@/lib/formatters';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const { language, t } = useLanguage();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isSaved = isInWishlist(product.id);
  const displayPrice = product.salePrice ?? product.price;
  const hasDiscount = !!product.salePrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0;
  const isLowStock = product.stockQuantity > 0 && product.stockQuantity <= 5;
  const isOutOfStock = product.stockQuantity === 0;

  const [imgError, setImgError] = useState(false);

  return (
    <div className="group bg-[#111827] border border-[#1F2937] hover:border-[#D4AF37]/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] flex flex-col h-full relative">
      {/* Wishlist Heart Button */}
      <button
        type="button"
        aria-label={t(isSaved ? 'product.wishlist_remove' : 'product.wishlist_add')}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
          isSaved
            ? 'bg-red-500 text-white shadow-md'
            : 'bg-[#0B0F19]/70 text-[#9CA3AF] hover:text-red-400 border border-[#1F2937] hover:border-red-400/40'
        }`}
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </button>

      {/* Product Image */}
      <Link href={`/shop/${product.slug}`} className="block relative overflow-hidden bg-[#0d1120] aspect-square">
        {product.images && product.images.length > 0 && !imgError ? (
          <img
            src={product.images[0]}
            alt={product.title[language]}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#0d1120] border border-[#1F2937] text-[#D4AF37]">
            <svg className="w-12 h-12 text-[#D4AF37]/40 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6l3 3"/>
            </svg>
            <span className="text-[10px] font-mono text-[#8B8FA8] uppercase tracking-wider">{product.brand}</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {hasDiscount && (
            <span className="bg-[#D4AF37] text-[#0B0F19] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              -{discountPercent}%
            </span>
          )}
          {product.isAuthentic && (
            <span className="bg-[#0B0F19]/80 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-semibold px-2 py-0.5 rounded-full">
              {t('product.authentic_badge')}
            </span>
          )}
          {isLowStock && (
            <span className="bg-orange-500/20 border border-orange-500/50 text-orange-400 text-[10px] font-semibold px-2 py-0.5 rounded-full">
              {t('product.low_stock', { count: product.stockQuantity })}
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-red-500/20 border border-red-500/50 text-red-400 text-[10px] font-semibold px-2 py-0.5 rounded-full">
              {t('product.out_of_stock')}
            </span>
          )}
        </div>

        {/* Brand tag */}
        <div className="absolute top-3 right-3">
          <span className="bg-[#0B0F19]/80 text-[#D4AF37] text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider border border-[#D4AF37]/20">
            {product.brand}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <div className="mb-1 text-[11px] text-[#8B8FA8] uppercase tracking-widest font-medium">
          {product.subcategory}
        </div>

        <Link href={`/shop/${product.slug}`}>
          <h3 className="text-sm font-semibold text-[#F9FAFB] leading-snug mb-2 line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
            {product.title[language]}
          </h3>
        </Link>

        {/* Rating */}
        <div
          className="flex items-center gap-1.5 mb-3"
          aria-label={t('product.rating_label', {
            rating: product.rating.toFixed(1),
            count: product.reviewCount,
          })}
        >
          <div className="flex" aria-hidden="true">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className={`w-3.5 h-3.5 ${star <= Math.round(product.rating) ? 'text-[#D4AF37]' : 'text-[#2A2F45]'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            ))}
          </div>
          <span className="text-[11px] text-[#8B8FA8]" aria-hidden="true">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-lg font-bold text-[#F9FAFB]">
            {formatBDT(displayPrice, language)}
          </span>
          {hasDiscount && (
            <span className="text-sm line-through text-[#8B8FA8]">
              {formatBDT(product.price, language)}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <Link
            href={`/shop/${product.slug}`}
            className="flex-1 text-center py-2 text-xs font-semibold border border-[#D4AF37]/40 text-[#D4AF37] rounded-lg hover:bg-[#D4AF37]/10 transition"
          >
             {t('product.view_details')}
          </Link>
          {!isOutOfStock && (
            <button
              type="button"
              onClick={() => addItem(product, 1)}
              className="flex-1 py-2 text-xs font-bold bg-[#D4AF37] text-[#0B0F19] rounded-lg hover:bg-[#C5A059] active:scale-95 transition-all"
            >
               {t('product.add_to_cart')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
