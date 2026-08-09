'use client';
import React from 'react';
import ShopCategoryPage from '@/components/storefront/ShopCategoryPage';
export default function AffordablePage() {
  return <ShopCategoryPage maxPrice={5000} title={{ en: 'Affordable Watches — Under ৳5,000', bn: 'সাশ্রয়ী ঘড়ি — ৳৫,০০০ এর নিচে' }} subtitle={{ en: 'Quality timepieces that fit every budget — perfect for students, daily wear, and gifts', bn: 'প্রতিটি বাজেটে সেরা ঘড়ি — ছাত্র, দৈনন্দিন পরিধান এবং উপহারের জন্য আদর্শ' }} />;
}
