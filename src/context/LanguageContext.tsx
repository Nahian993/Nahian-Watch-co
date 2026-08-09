'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

const BANGLA_DIGITS: Record<string, string> = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
};

export const dictionary: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.shop': 'Shop Catalog',
    'nav.watches': 'Watches',
    'nav.casio': 'Casio',
    'nav.seiko': 'Seiko',
    'nav.citizen': 'Citizen',
    'nav.smartwatches': 'Smartwatches',
    'nav.calculators': 'Calculators',
    'nav.affordable': 'Under ৳5,000',
    'nav.repair': 'Watch Repair Hub',
    'nav.heritage': '50-Year Heritage',
    'nav.authenticity': 'Authenticity Guide',
    'nav.quiz': 'Watch Finder Quiz',
    'nav.compare': 'Compare',
    'nav.cart': 'Cart',
    'nav.admin': 'Admin Portal',
    'nav.about': 'About',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.faq': 'FAQ',
    
    // Header & Sub-banner
    'header.tagline': '50 Years of Timekeeping Heritage, Precision & Trust',
    'header.free_shipping_notice': 'Nationwide Express Shipping Across Bangladesh',
    'header.showroom_status': 'Dhaka Showroom Open (10 AM - 8 PM)',
    'header.hotline': 'Hotline: +880 1715 881701',
    'header.search_placeholder': 'Search Casio, Seiko, Smartwatches, Calculators...',
    'header.track_repair': 'Repair Status',
    'header.track_order': 'Track Order',

    // Hero Section
    'hero.badge': 'EST. 1974 • 50 YEARS OF TIMEKEEPING HERITAGE',
    'hero.title_part1': 'Precision Timepieces &',
    'hero.title_part2': 'Master Repair Craftsmanship',
    'hero.subtitle': 'Explore genuine Seiko, Casio, and Citizen watches, advanced calculators, smartwatches, and Bangladesh’s most trusted watch service hub.',
    'hero.cta_shop': 'Explore Watch Collection →',
    'hero.cta_repair': 'Get Repair Quote 🔧',
    'hero.guarantee_title': 'Genuine Timepiece Guarantee',
    'hero.guarantee_subtitle': 'Casio • Seiko • Citizen • Calculators • Smartwatches',
    'hero.shipping_badge': 'Dhaka ৳60 • BD ৳120',
    'hero.warranty_badge': '100% Verified Warranty',

    // Trust Signals
    'trust.heritage_title': '50 Years Heritage',
    'trust.heritage_desc': 'Since 1974 in Dhaka',
    'trust.authentic_title': '100% Authentic',
    'trust.authentic_desc': 'Verified Branded Stock',
    'trust.shipping_title': 'Fast BD Shipping',
    'trust.shipping_desc': 'Dhaka ৳60 • BD ৳120',
    'trust.repair_title': 'Expert Repair Hub',
    'trust.repair_desc': 'Battery, Glass & Movement',

    // Catalog & Filters
    'catalog.title': 'Watch & Instrument Catalog',
    'catalog.filter_brand': 'Brand',
    'catalog.filter_category': 'Category',
    'catalog.filter_price': 'Price Range',
    'catalog.filter_movement': 'Movement Type',
    'catalog.sort_by': 'Sort By',
    'catalog.sort_featured': 'Featured',
    'catalog.sort_price_low': 'Price: Low to High',
    'catalog.sort_price_high': 'Price: High to Low',
    'catalog.sort_rating': 'Highest Rated',
    'catalog.sort_newest': 'New Arrivals',
    'catalog.in_stock_only': 'In Stock Only',
    'catalog.clear_filters': 'Clear All Filters',
    'catalog.results_count': 'Showing {count} items',
    'catalog.low_stock': 'Only {count} units left',

    // Product Card & PDP
    'product.add_to_cart': 'Add to Cart',
    'product.view_details': 'View Details',
    'product.wishlist_add': 'Add to wishlist',
    'product.wishlist_remove': 'Remove from wishlist',
    'product.in_stock': 'In Stock',
    'product.out_of_stock': 'Out of Stock',
    'product.authentic_badge': '✓ Authentic',
    'product.authentic_guarantee': '100% Verified Authentic',
    'product.low_stock': 'Only {count} left',
    'product.rating_label': '{rating} out of 5 stars, {count} reviews',
    'product.warranty': 'Warranty',
    'product.engraving_available': 'Backplate Engraving Available (+৳300)',
    'product.engraving_placeholder': 'Enter text to engrave (max 25 chars)',
    'product.specs_title': 'Technical Specifications',
    'product.description_title': 'Product Overview',
    'product.reviews_title': 'Customer Reviews',
    'product.buy_now': 'Buy Now',

    // Cart Drawer & Page
    'cart.title': 'Your Shopping Cart',
    'cart.empty': 'Your cart is currently empty.',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Shipping Fee',
    'cart.discount': 'Discount',
    'cart.total': 'Total Amount',
    'cart.coupon_placeholder': 'Coupon Code (e.g. HERITAGE50)',
    'cart.apply_coupon': 'Apply',
    'cart.remove_coupon': 'Remove Coupon',
    'cart.checkout_cta': 'Proceed to Checkout',
    'cart.engraving_fee': 'Engraving Fee',

    // Checkout Form
    'checkout.title': 'Order Checkout',
    'checkout.customer_info': 'Customer & Shipping Address',
    'checkout.full_name': 'Full Name',
    'checkout.phone': 'Mobile Phone Number',
    'checkout.address': 'Full Street Address',
    'checkout.district': 'District',
    'checkout.dhaka_district': 'Dhaka (৳60 delivery)',
    'checkout.outside_dhaka': 'Outside Dhaka (৳120 delivery)',
    'checkout.payment_method': 'Select Payment Method',
    'checkout.bkash_desc': 'Pay via bKash Merchant (Send Money/Payment to 01711000000)',
    'checkout.nagad_desc': 'Pay via Nagad Merchant (Send Money/Payment to 01811000000)',
    'checkout.rocket_desc': 'Pay via Rocket (Send Money to 01911000000)',
    'checkout.cod_desc': 'Cash on Delivery (Pay cash upon receiving shipment)',
    'checkout.trxid_label': 'Transaction ID (TrxID)',
    'checkout.sender_phone': 'Sender Mobile Number',
    'checkout.place_order': 'Confirm Order',

    // Repair Hub
    'repair.title': 'Master Watch Repair Service',
    'repair.subtitle': '50 Years of Watchmaker Craftsmanship in Dhaka',
    'repair.calc_title': 'Instant Repair Cost Calculator',
    'repair.select_service': 'Select Service Needed',
    'repair.est_cost': 'Estimated Cost',
    'repair.est_time': 'Estimated Turnaround',
    'repair.book_now': 'Book Repair Ticket',
    'repair.track_title': 'Track Repair Status',
    'repair.ticket_input_placeholder': 'Enter Ticket ID (e.g. CROWN-REP-2026-8941)',
    'repair.track_button': 'Check Status',

    // Footer
    'footer.heritage_title': 'CROWN WATCH CO. — Est. 1974',
    'footer.heritage_desc': '50 Years of Timekeeping Heritage, Precision & Trust in Bangladesh',
    'footer.heritage_cta': 'Read Our 50-Year Story →',
    'footer.showroom_title': 'Dhaka Showroom',
    'footer.showroom_address': 'Crown Watch Co., 78, Masjid Market, 2 Patuatully Lane, Dhaka 1100, Bangladesh.',
    'footer.phone': 'Phone: +880 1715 881701',
    'footer.whatsapp': 'WhatsApp: +880 1715 881701',
    'footer.email': 'Email: support@crownwatchbd.com',
    'footer.hours': 'Open 7 Days: 10:00 AM - 8:00 PM',
    'footer.catalog_title': 'Watch Catalog',
    'footer.repair_title': 'Repair & Tools',
    'footer.policy_title': 'Policies & Admin',
    'footer.accepted_payments': 'Accepted Payments:',
    'footer.copyright': '© 2026 CROWN WATCH CO. All Rights Reserved. Built for Bangladesh.',

    // Common
    'common.bdt_symbol': '৳',
    'common.loading': 'Loading...',
    'common.error': 'An error occurred.',
    'common.success': 'Operation successful!',
  },
  bn: {
    // Navigation
    'nav.home': 'হোম',
    'nav.shop': 'ঘড়ির ক্যাটালগ',
    'nav.watches': 'ঘড়ি',
    'nav.casio': 'ক্যাসিও',
    'nav.seiko': 'সেইকো',
    'nav.citizen': 'সিটিজেন',
    'nav.smartwatches': 'স্মার্টওয়াচ',
    'nav.calculators': 'ক্যালকুলেটর',
    'nav.affordable': 'বাজেট ঘড়ি',
    'nav.repair': 'ঘড়ি মেরামত',
    'nav.heritage': '৫০ বছরের ঐতিহ্য',
    'nav.authenticity': 'আসল গ্যারান্টি',
    'nav.quiz': 'ওয়াচ কুইজ',
    'nav.compare': 'তুলনা করুন',
    'nav.cart': 'কার্ট',
    'nav.admin': 'এডমিন পোর্টাল',
    'nav.about': 'আমাদের সম্পর্কে',
    'nav.blog': 'ব্লগ',
    'nav.contact': 'যোগাযোগ',
    'nav.faq': 'প্রশ্নোত্তর',
    
    // Header & Sub-banner
    'header.tagline': '৫০ বছরের সময় গণনার ঐতিহ্য, নিখুঁত মান এবং বিশ্বাস',
    'header.free_shipping_notice': 'সমগ্র বাংলাদেশে দ্রুততম ডেলিভারি সেবা',
    'header.showroom_status': 'ঢাকা শোরুম খোলা (সকাল ১০টা - রাত ৮টা)',
    'header.hotline': 'হটলাইন: +৮৮০ ১৭০০-০০০০০০',
    'header.search_placeholder': 'ক্যাসিও, সেইকো বা ঘড়ি খুঁজুন...',
    'header.track_repair': 'রিপেয়ার ট্র্যাকিং',
    'header.track_order': 'অর্ডার ট্র্যাকিং',

    // Hero Section
    'hero.badge': '১৯৭৪ থেকে • ৫০ বছরের ঐতিহ্য ও বিশ্বাস',
    'hero.title_part1': 'নির্ভুল অরিজিনাল ঘড়ি ও',
    'hero.title_part2': 'দক্ষ কারিগরি মেরামতের ৫০ বছর',
    'hero.subtitle': 'আসল সেইকো, ক্যাসিও ও সিটিজেন ঘড়ি, সায়েন্টিফিক ক্যালকুলেটর, স্মার্টওয়াচ এবং বাংলাদেশের সবচেয়ে নির্ভরযোগ্য ঘড়ি মেরামত সেবা।',
    'hero.cta_shop': 'ঘড়ির সংগ্রহ দেখুন →',
    'hero.cta_repair': 'মেরামত কোটেশন পান 🔧',
    'hero.guarantee_title': '১০০% অরিজিনাল ব্র্যান্ডের নিশ্চয়তা',
    'hero.guarantee_subtitle': 'Casio • Seiko • Citizen • Calculators • Smartwatches',
    'hero.shipping_badge': 'ঢাকা ৬০৳ • সারা দেশ ১২০৳',
    'hero.warranty_badge': '১০০% ওয়ারেন্টি ও মেরামত',

    // Trust Signals
    'trust.heritage_title': '৫০ বছরের ঐতিহ্য',
    'trust.heritage_desc': '১৯৭৪ থেকে ঢাকায় সার্ভিস',
    'trust.authentic_title': '১০০% অরিজিনাল',
    'trust.authentic_desc': 'সার্টিফাইড ব্র্যান্ড শোরুম',
    'trust.shipping_title': 'দ্রুত ডেলিভারি',
    'trust.shipping_desc': 'ঢাকা ৬০৳ • সারা দেশ ১২০৳',
    'trust.repair_title': 'দক্ষ মেরামত হাব',
    'trust.repair_desc': 'ব্যাটারি, গ্লাস ও মুভমেন্ট',

    // Catalog & Filters
    'catalog.title': 'ঘড়ি ও ইনস্ট্রুমেন্ট ক্যাটালগ',
    'catalog.filter_brand': 'ব্র্যান্ড',
    'catalog.filter_category': 'ক্যাটাগরি',
    'catalog.filter_price': 'মূল্য সীমা',
    'catalog.filter_movement': 'মুভমেন্ট ধরন',
    'catalog.sort_by': 'সাজান',
    'catalog.sort_featured': 'বিশেষ পছন্দের',
    'catalog.sort_price_low': 'মূল্য: কম থেকে বেশি',
    'catalog.sort_price_high': 'মূল্য: বেশি থেকে কম',
    'catalog.sort_rating': 'সর্বোচ্চ রেটিং',
    'catalog.sort_newest': 'নতুন আগমন',
    'catalog.in_stock_only': 'শুধু স্টকে থাকা পণ্য',
    'catalog.clear_filters': 'ফিল্টার রিসেট',
    'catalog.results_count': 'মোট {count} টি পণ্য দেখানো হচ্ছে',
    'catalog.low_stock': 'মাত্র {count}টি অবশিষ্ট আছে',

    // Product Card & PDP
    'product.add_to_cart': 'কার্টে যোগ করুন',
    'product.view_details': 'বিস্তারিত দেখুন',
    'product.wishlist_add': 'উইশলিস্টে যোগ করুন',
    'product.wishlist_remove': 'উইশলিস্ট থেকে সরান',
    'product.in_stock': 'স্টকে আছে',
    'product.out_of_stock': 'স্টকে নেই',
    'product.authentic_badge': '✓ আসল',
    'product.authentic_guarantee': '১০০% আসল ও সার্টিফাইড',
    'product.low_stock': 'মাত্র {count}টি অবশিষ্ট',
    'product.rating_label': '৫-এর মধ্যে {rating} রেটিং, {count}টি রিভিউ',
    'product.warranty': 'ওয়ারেন্টি',
    'product.engraving_available': 'ঘড়ির পিছনে নাম খোদাই করা সম্ভব (+৳৩০০)',
    'product.engraving_placeholder': 'খোদাই করার নাম লিখুন (সর্বোচ্চ ২৫ অক্ষর)',
    'product.specs_title': 'কারিগরি বিবরণ',
    'product.description_title': 'পণ্য পরিচিতি',
    'product.reviews_title': 'গ্রাহক পর্যালোচনা',
    'product.buy_now': 'সরাসরি কিনুন',

    // Cart Drawer & Page
    'cart.title': 'আপনার শপিং কার্ট',
    'cart.empty': 'আপনার কার্ট বর্তমানে খালি।',
    'cart.subtotal': 'পণ্য মূল্য (সাবটোটাল)',
    'cart.shipping': 'ডেলিভারি চার্জ',
    'cart.discount': 'ডিসকাউন্ট',
    'cart.total': 'সর্বমোট মূল্য',
    'cart.coupon_placeholder': 'কুপন কোড (যেমন HERITAGE50)',
    'cart.apply_coupon': 'প্রয়োগ করুন',
    'cart.remove_coupon': 'কুপন সরান',
    'cart.checkout_cta': 'চেকআউটে যান',
    'cart.engraving_fee': 'এনগ্রেভিং চার্জ',

    // Checkout Form
    'checkout.title': 'অর্ডার চেকআউট',
    'checkout.customer_info': 'গ্রাহকের তথ্য ও ডেলিভারি ঠিকানা',
    'checkout.full_name': 'সম্পূর্ণ নাম',
    'checkout.phone': 'মোবাইল নম্বর',
    'checkout.address': 'সম্পূর্ণ ঠিকানা',
    'checkout.district': 'জেলা',
    'checkout.dhaka_district': 'ঢাকা (৳৬০ ডেলিভারি চার্জ)',
    'checkout.outside_dhaka': 'ঢাকার বাইরে (৳১২০ ডেলিভারি চার্জ)',
    'checkout.payment_method': 'পেমেন্ট পদ্ধতি নির্বাচন করুন',
    'checkout.bkash_desc': 'বিকাশ পেমেন্ট (মার্চেন্ট/সেন্ড মানি করুন ০১৭১১০০০০০০)',
    'checkout.nagad_desc': 'নগদ পেমেন্ট (মার্চেন্ট/সেন্ড মানি করুন ০১৮১১০০০০০০)',
    'checkout.rocket_desc': 'রকেট পেমেন্ট (সেন্ড মানি করুন ০১৯১১০০০০০০)',
    'checkout.cod_desc': 'ক্যাশ অন ডেলিভারি (পণ্য হাতে পেয়ে মূল্য পরিশোধ)',
    'checkout.trxid_label': 'ট্রানজেকশন আইডি (TrxID)',
    'checkout.sender_phone': 'প্রেরকের মোবাইল নম্বর',
    'checkout.place_order': 'অর্ডার নিশ্চিত করুন',

    // Repair Hub
    'repair.title': 'অভিজ্ঞ ঘড়ি মেরামত সেবা',
    'repair.subtitle': 'ঢাকার বুকে ৫০ বছরের ঘড়ি তৈরির শ্রেষ্ঠত্ব',
    'repair.calc_title': 'ইনস্ট্যান্ট মেরামত খরচ ক্যালকুলেটর',
    'repair.select_service': 'প্রয়োজনীয় সার্ভিস নির্বাচন করুন',
    'repair.est_cost': 'আনুমানিক খরচ',
    'repair.est_time': 'আনুমানিক সময়',
    'repair.book_now': 'মেরামত টিকিট বুকিং করুন',
    'repair.track_title': 'মেরামত ট্র্যাকিং',
    'repair.ticket_input_placeholder': 'টিকিট আইডি লিখুন (যেমন CROWN-REP-2026-8941)',
    'repair.track_button': 'অবস্থা দেখুন',

    // Footer
    'footer.heritage_title': 'ক্রাউন ওয়াচ কোং — প্রতিষ্ঠা ১৯৭৪',
    'footer.heritage_desc': 'বাংলাদেশে ৫০ বছরের বিশ্বস্ত সময়, স্থায়িত্ব ও নির্ভুলতার সেবা',
    'footer.heritage_cta': '৫০ বছরের ইতিহাস জানুন →',
    'footer.showroom_title': 'ঢাকা শোরুম ও ঠিকানা',
    'footer.showroom_address': 'ক্রাউন ওয়াচ কোং, ৭৮, মসজিদ মার্কেট, ২ পটুয়াটুলী লেন, ঢাকা ১১০০, বাংলাদেশ।',
    'footer.phone': 'ফোন: +৮৮০ ১৭১৫ ৮৮১৭০১',
    'footer.whatsapp': 'হোয়াটসঅ্যাপ: +৮৮০ ১৭১৫ ৮৮১৭০১',
    'footer.email': 'ইমেইল: support@crownwatchbd.com',
    'footer.hours': 'খোলা থাকে ৭ দিন: সকাল ১০:০০ - রাত ৮:০০',
    'footer.catalog_title': 'ঘড়ির ক্যাটালগ',
    'footer.repair_title': 'ঘড়ি মেরামত ও টুলস',
    'footer.policy_title': 'নীতিমালা ও গ্রাহক সেবা',
    'footer.accepted_payments': 'গৃহীত পেমেন্ট:',
    'footer.copyright': '© ২০২৬ ক্রাউন ওয়াচ কোং। সর্বস্বত্ব সংরক্ষিত।',

    // Common
    'common.bdt_symbol': '৳',
    'common.loading': 'লোড হচ্ছে...',
    'common.error': 'একটি ত্রুটি ঘটেছে।',
    'common.success': 'সফলভাবে সম্পন্ন হয়েছে!',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  formatNumber: (num: number | string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('crown_lang') as Language;
      if (savedLang === 'en' || savedLang === 'bn') {
        setLanguageState(savedLang);
        if (typeof document !== 'undefined') {
          document.documentElement.lang = savedLang;
        }
      }
    } catch (e) {
      console.error('Failed to read language preference from localStorage', e);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('crown_lang', lang);
        document.documentElement.lang = lang;
      } catch (e) {
        console.error('Failed to save language preference', e);
      }
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'bn' : 'en';
    setLanguage(nextLang);
  };

  const formatNumber = (num: number | string): string => {
    const str = String(num);
    if (language === 'bn') {
      return str.replace(/[0-9]/g, (digit) => BANGLA_DIGITS[digit] || digit);
    }
    return str;
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    const dict = dictionary[language] || dictionary.en;
    let translation = dict[key] || dictionary.en[key] || key;

    if (params) {
      Object.entries(params).forEach(([paramKey, paramVal]) => {
        const valStr = language === 'bn' 
          ? String(paramVal).replace(/[0-9]/g, (d) => BANGLA_DIGITS[d] || d)
          : String(paramVal);
        translation = translation.replace(`{${paramKey}}`, valStr);
      });
    }

    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, formatNumber }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
