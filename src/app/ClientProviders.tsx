'use client';

import React, { ReactNode } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import CartDrawer from '@/components/storefront/CartDrawer';

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <CartProvider>
        <WishlistProvider>
          {children}
          <CartDrawer />
        </WishlistProvider>
      </CartProvider>
    </LanguageProvider>
  );
}
