'use client';
import React from 'react';
import ShopCategoryPage from '@/components/storefront/ShopCategoryPage';
export default function CalculatorsPage() {
  return <ShopCategoryPage category="Calculators" title={{ en: 'Calculators', bn: 'ক্যালকুলেটর' }} subtitle={{ en: 'Scientific, financial & business calculators for students and professionals', bn: 'ছাত্র ও পেশাদারদের জন্য সায়েন্টিফিক, ফিন্যান্সিয়াল ও বিজনেস ক্যালকুলেটর' }} />;
}
