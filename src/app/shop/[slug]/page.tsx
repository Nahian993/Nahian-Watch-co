'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { db } from '@/lib/db';
import { formatBDT } from '@/lib/formatters';
import { Product } from '@/types';
import ProductCard from '@/components/storefront/ProductCard';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { language, t } = useLanguage();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [engravingText, setEngravingText] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const found = db.getProductBySlug(slug);
    if (found) {
      setProduct(found);
      const related = db.getProducts({ brand: found.brand }).filter(p => p.id !== found.id).slice(0, 4);
      setRelatedProducts(related);
    }
  }, [slug]);

  if (!product) {
    return (
      <main className="flex min-h-[55vh] items-center justify-center px-4">
        <div className="max-w-md text-center">
          <p className="eyebrow">Product unavailable</p>
          <h1 className="heading-xl mt-3 text-crown-primary">This timepiece is not available here.</h1>
          <p className="mt-4 text-sm leading-6 text-crown-secondary">The link may be outdated, or this product may have been removed. Browse the collection to find another match.</p>
          <Link href="/shop" className="button-primary mt-7">Return to shop <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </main>
    );
  }

  const displayPrice = product.salePrice ?? product.price;
  const hasDiscount = !!product.salePrice;
  const discountPercent = hasDiscount ? Math.round(((product.price - product.salePrice!) / product.price) * 100) : 0;
  const isOutOfStock = product.stockQuantity === 0;
  const engravingFee = product.allowEngraving && engravingText.trim() ? (product.engravingFeeBDT ?? 300) : 0;
  const totalPrice = (displayPrice + engravingFee) * quantity;

  const handleAddToCart = () => {
    addItem(product, quantity, engravingText.trim() || undefined);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, quantity, engravingText.trim() || undefined);
    router.push('/checkout');
  };

  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB]">
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://crownwatch.bd' },
          { name: 'Shop', url: 'https://crownwatch.bd/shop' },
          { name: product.title.en, url: `https://crownwatch.bd/shop/${product.slug}` },
        ]}
      />
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <nav className="flex items-center gap-2 text-xs text-[#8B8FA8]">
          <Link href="/" className="hover:text-[#D4AF37] transition">Home</Link>
          <span>›</span>
          <Link href="/shop" className="hover:text-[#D4AF37] transition">Shop</Link>
          <span>›</span>
          <span className="text-[#F9FAFB] truncate max-w-[200px]">{product.title[language]}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Image Gallery */}
          <div>
            <div className="relative bg-[#111827] border border-[#1F2937] rounded-2xl overflow-hidden aspect-square mb-3">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[selectedImage]}
                  alt={product.title[language]}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-24 h-24 text-[#2A2F45]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6l3 3"/>
                  </svg>
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {hasDiscount && (
                  <span className="bg-[#D4AF37] text-[#0B0F19] text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                    -{discountPercent}% OFF
                  </span>
                )}
                {product.isAuthentic && (
                  <span className="bg-[#0B0F19]/80 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold px-2.5 py-1 rounded-full">
                    ✓ Authentic
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail strip */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition ${selectedImage === i ? 'border-[#D4AF37]' : 'border-[#1F2937] hover:border-[#D4AF37]/50'}`}
                  >
                    <img src={img} alt={`${product.title[language]} view ${i+1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest border border-[#D4AF37]/30 px-2.5 py-0.5 rounded-md">
                {product.brand}
              </span>
              <span className="text-xs text-[#8B8FA8] capitalize">{product.subcategory}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#F9FAFB] mb-3 leading-snug">
              {product.title[language]}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1,2,3,4,5].map((star) => (
                  <svg key={star} className={`w-4 h-4 ${star <= Math.round(product.rating) ? 'text-[#D4AF37]' : 'text-[#2A2F45]'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <span className="text-sm text-[#D4AF37] font-semibold">{product.rating}</span>
              <span className="text-sm text-[#8B8FA8]">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-4 mb-5">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-3xl font-bold text-[#F9FAFB]">{formatBDT(displayPrice, language)}</span>
                {hasDiscount && (
                  <span className="text-lg line-through text-[#8B8FA8]">{formatBDT(product.price, language)}</span>
                )}
              </div>
              {hasDiscount && (
                <p className="text-sm text-green-400 font-medium">
                  You save {formatBDT(product.price - product.salePrice!, language)} ({discountPercent}%)
                </p>
              )}
              <p className="text-xs text-[#8B8FA8] mt-2 flex items-center gap-1.5">
                <span className={`inline-block w-2 h-2 rounded-full ${isOutOfStock ? 'bg-red-500' : product.stockQuantity <= 5 ? 'bg-orange-400' : 'bg-green-400'}`} />
                {isOutOfStock ? 'Out of Stock' : product.stockQuantity <= 5 ? `Only ${product.stockQuantity} left` : 'In Stock'}
              </p>
              <div className="mt-4 grid gap-3 border-t border-[#1F2937] pt-4 sm:grid-cols-2">
                <p className="flex items-start gap-2 text-xs leading-5 text-[#9CA3AF]"><Truck className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" /> Dhaka delivery ৳60, nationwide ৳120.</p>
                <p className="flex items-start gap-2 text-xs leading-5 text-[#9CA3AF]"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" /> Review warranty details before purchase.</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-[#9CA3AF] text-sm leading-relaxed mb-5">
              {product.description[language]}
            </p>

            {/* Warranty */}
            <div className="flex items-start gap-2.5 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-lg p-3 mb-5">
              <svg className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
              <p className="text-xs text-[#D4AF37]">{product.warrantyInfo[language]}</p>
            </div>

            {/* Engraving Option */}
            {product.allowEngraving && (
              <div className="mb-5">
                <label className="block text-sm font-semibold text-[#F9FAFB] mb-2">
                  Custom Engraving
                  <span className="ml-2 text-xs font-normal text-[#8B8FA8]">
                    +{formatBDT(product.engravingFeeBDT ?? 300, language)}
                  </span>
                </label>
                <input
                  type="text"
                  maxLength={25}
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value)}
                  placeholder="e.g. Happy Anniversary ♥"
                  className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] text-[#F9FAFB] rounded-lg px-4 py-2.5 text-sm outline-none transition placeholder:text-[#8B8FA8]"
                />
                <p className="text-xs text-[#8B8FA8] mt-1">{engravingText.length}/25 characters</p>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            {!isOutOfStock && (
              <div className="flex gap-3 mb-4">
                <div className="flex items-center border border-[#2A2F45] rounded-lg overflow-hidden">
                  <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-2.5 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition text-lg font-bold">−</button>
                  <span className="px-4 text-sm font-semibold text-[#F9FAFB] min-w-[2rem] text-center">{quantity}</span>
                  <button type="button" aria-label="Increase quantity" onClick={() => setQuantity(q => Math.min(product.stockQuantity, q + 1))} className="px-3 py-2.5 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition text-lg font-bold">+</button>
                </div>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 py-2.5 font-bold rounded-lg text-sm transition-all active:scale-95 ${addedToCart ? 'bg-green-500 text-white' : 'bg-[#D4AF37] hover:bg-[#C5A059] text-[#0B0F19]'}`}
                >
                  {addedToCart ? '✓ Added to Cart!' : `Add to Cart — ${formatBDT(totalPrice, language)}`}
                </button>
                <button type="button" onClick={handleBuyNow} className="flex-1 rounded-lg border border-[#D4AF37] py-2.5 text-sm font-bold text-[#D4AF37] transition hover:bg-[#D4AF37]/10">
                  Buy now
                </button>
                <button
                  type="button"
                  aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                  onClick={() => toggleWishlist(product.id)}
                  className={`px-4 rounded-lg border flex items-center justify-center transition ${
                    isInWishlist(product.id)
                      ? 'bg-red-500 text-white border-red-500'
                      : 'border-[#2A2F45] text-[#9CA3AF] hover:text-red-400 hover:border-red-400/50'
                  }`}
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </button>
              </div>
            )}

            <div className="flex gap-3">
              <Link href="/shop" className="flex-1 text-center py-2.5 border border-[#1F2937] text-[#9CA3AF] hover:border-[#D4AF37]/40 hover:text-[#F9FAFB] rounded-lg text-sm font-medium transition">
                ← Back to Shop
              </Link>
              <Link href="/repair" className="flex-1 text-center py-2.5 border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-lg text-sm font-medium transition">
                Watch Repair Hub
              </Link>
            </div>
          </div>
        </div>

        {/* Specifications */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <section className="mb-16">
            <h2 className="text-xl font-bold font-serif text-[#D4AF37] mb-5 border-b border-[#1F2937] pb-3">
              Specifications
            </h2>
            <div className="bg-[#111827] border border-[#1F2937] rounded-xl overflow-hidden">
              {Object.entries(product.specifications).map(([key, value], i) => (
                <div key={key} className={`flex justify-between px-5 py-3 text-sm ${i % 2 === 0 ? 'bg-[#111827]' : 'bg-[#0d1120]'}`}>
                  <span className="text-[#8B8FA8] font-medium">{key}</span>
                  <span className="text-[#F9FAFB] text-right max-w-xs">{value}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-xl font-bold font-serif text-[#D4AF37] mb-5 border-b border-[#1F2937] pb-3">
              More from {product.brand}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((p) => <ProductCard key={p.id} product={p} compact />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
