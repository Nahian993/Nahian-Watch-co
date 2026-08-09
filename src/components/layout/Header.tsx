'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Crown, Heart, Package, Phone, Search, ShoppingBag, Wrench } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import Navigation from './Navigation';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { cartCount, isCartOpen, toggleCartDrawer } = useCart();
  const { wishlistCount } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="w-full bg-[#0B0F19] border-b border-[#D4AF37]/20 sticky top-0 z-50 shadow-md">
      {/* Top Utility Bar */}
      <div className="bg-[#111827] text-xs py-1.5 px-4 text-[#9CA3AF] border-b border-[#D4AF37]/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center gap-2 text-crown-brand font-semibold">
              <Crown className="h-3.5 w-3.5" aria-hidden="true" /> {t('header.tagline')}
            </span>
            <span className="hidden md:inline text-gray-600">|</span>
            <span className="hidden md:inline">
              {t('header.showroom_status')}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline">
              <Phone className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" /> <a href="tel:+8801715881701" className="text-gray-300 hover:text-[#D4AF37]">{t('header.hotline')}</a>
            </span>
            {/* Language Switcher Toggle Button */}
            <div className="flex items-center bg-[#1F2937] rounded-md p-0.5 border border-[#D4AF37]/30">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-0.5 rounded text-xs font-medium transition-colors ${
                  language === 'en' ? 'bg-[#D4AF37] text-[#0B0F19] font-bold' : 'text-gray-300 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('bn')}
                className={`px-2.5 py-0.5 rounded text-xs font-medium transition-colors ${
                  language === 'bn' ? 'bg-[#D4AF37] text-[#0B0F19] font-bold' : 'text-gray-300 hover:text-white'
                }`}
              >
                বাংলা
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo & Crown Icon */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#111827] text-[#D4AF37] transition-all group-hover:border-[#D4AF37] group-hover:shadow-[0_0_10px_rgba(212,175,55,0.3)]">
            <Crown className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <span className="text-xl font-serif font-bold text-white tracking-wider group-hover:text-[#D4AF37] transition-colors block leading-tight">
              CROWN WATCH CO.
            </span>
            <span className="text-[10px] text-[#D4AF37] tracking-widest uppercase block font-sans">
              {language === 'en' ? 'Dhaka • Est. 1974' : 'ঢাকা • ১৯৭৪ থেকে'}
            </span>
          </div>
        </Link>

        {/* Header Search Input */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8">
          <form action="/shop" method="GET" className="w-full relative">
            <input
              type="text"
              name="search"
              placeholder={t('header.search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111827] text-sm text-white placeholder-gray-400 pl-4 pr-10 py-2 rounded-lg border border-[#D4AF37]/30 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
            />
            <button type="submit" aria-label={t('header.search_placeholder')} className="absolute right-3 top-2.5 text-gray-400 hover:text-[#D4AF37]">
              <Search className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>

        {/* Action Buttons: Repair Status, Order Tracking, Wishlist, Cart */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <Link
            href="/repair/track"
            className="hidden sm:flex items-center space-x-1 text-xs text-[#D4AF37] hover:text-white border border-[#D4AF37]/30 hover:border-[#D4AF37] px-2.5 py-1.5 rounded transition-all bg-[#111827]"
          >
            <Wrench className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t('header.track_repair')}</span>
          </Link>

          <Link
            href="/track-order"
            className="hidden sm:flex items-center space-x-1 text-xs text-gray-300 hover:text-[#D4AF37] border border-gray-700 hover:border-[#D4AF37]/50 px-2.5 py-1.5 rounded transition-all bg-[#111827]"
          >
            <Package className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t('header.track_order')}</span>
          </Link>

          {/* Wishlist Link Button */}
          <Link
            href="/wishlist"
            className="relative p-2 text-gray-200 hover:text-red-400 bg-[#111827] border border-[#D4AF37]/30 rounded-lg hover:border-red-400/50 transition-all"
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5" aria-hidden="true" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Icon Drawer Trigger */}
          <button
            onClick={toggleCartDrawer}
            className="relative p-2 text-gray-200 hover:text-[#D4AF37] bg-[#111827] border border-[#D4AF37]/30 rounded-lg hover:border-[#D4AF37] transition-all"
            aria-label="Shopping Cart"
            aria-controls="cart-drawer"
            aria-expanded={isCartOpen}
          >
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#D4AF37] text-[#0B0F19] font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Bar Component */}
      <Navigation />
    </header>
  );
}
