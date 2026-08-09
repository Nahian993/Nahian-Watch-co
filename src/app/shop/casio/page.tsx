'use client';
import React from 'react';
import ShopCategoryPage from '@/components/storefront/ShopCategoryPage';

export default function CasioPage() {
  return (
    <ShopCategoryPage
      brand="Casio"
      title={{ en: 'Casio Collection', bn: 'ক্যাসিও কালেকশন' }}
      subtitle={{ en: 'G-Shock, Edifice, Baby-G — Legendary Japanese Durability', bn: 'জি-শক, এডিফাইস, বেবি-জি — কিংবদন্তি জাপানি স্থায়িত্ব' }}
    />
  );
}
