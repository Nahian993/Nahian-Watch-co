'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Product, CartItem, Coupon } from '../types';
import { calculateCartTotals } from '@/lib/pricing';

export const VALID_COUPONS: Record<string, Coupon> = {
  HERITAGE50: {
    code: 'HERITAGE50',
    discountType: 'percentage',
    discountValue: 10,
    description: { en: '10% 50-Year Heritage Discount', bn: '১০% ৫০-বছর ঐতিহ্য ছাড়' },
  },
  EID500: {
    code: 'EID500',
    discountType: 'fixed',
    discountValue: 500,
    description: { en: '৳500 Special Eid Coupon', bn: '৳৫০- বিশেষ ঈদ কুপন' },
  },
  EID2026: {
    code: 'EID2026',
    discountType: 'fixed',
    discountValue: 500,
    minOrderAmount: 3000,
    description: { en: '৳500 Special Eid Coupon', bn: '৳৫০- ঈদ বিশেষ কুপন' },
  },
  CROWN10: {
    code: 'CROWN10',
    discountType: 'percentage',
    discountValue: 10,
    description: { en: '10% Crown Watch Discount', bn: '১০% ক্রাউন ওয়াচ ডিসকাউন্ট' },
  },
};

interface CartContextType {
  items: CartItem[];
  subtotal: number;
  coupon: Coupon | null;
  appliedCoupon: Coupon | null;
  discount: number;
  discountAmount: number;
  selectedDistrict: string;
  shippingDistrict: string;
  shippingFee: number;
  total: number;
  isCartOpen: boolean;
  totalItems: number;
  cartCount: number;
  totalItemCount: number;
  addItem: (product: Product, quantity?: number, engravingText?: string, engravingFee?: number) => void;
  addToCart: (product: Product, quantity?: number, engravingText?: string, engravingFee?: number) => void;
  removeItem: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  setDistrict: (district: string) => void;
  setShippingDistrict: (district: string) => void;
  setIsCartOpen: (open: boolean) => void;
  toggleCartDrawer: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [shippingDistrict, setShippingDistrictState] = useState<string>('dhaka');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('crown_cart');
      if (savedCart) {
        const savedItems = JSON.parse(savedCart) as CartItem[];
        setItems(savedItems.filter(item => item.product && item.product.stockQuantity > 0).map(item => ({
          ...item,
          quantity: Math.max(1, Math.min(item.product.stockQuantity, Math.floor(Number(item.quantity) || 1))),
          engravingFee: item.selectedEngravingText ? (item.engravingFee ?? item.product.engravingFeeBDT ?? 300) : 0,
        })));
      }
      const savedDistrict = localStorage.getItem('crown_district');
      if (savedDistrict) {
        setShippingDistrictState(savedDistrict.toLowerCase());
      }
    } catch (e) {
      console.error('Failed to load cart state from localStorage', e);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem('crown_cart', JSON.stringify(items));
      } catch (e) {
        console.error('Failed to save cart to localStorage', e);
      }
    }
  }, [items, isHydrated]);

  const setShippingDistrict = (district: string) => {
    const normalized = district.trim().toLowerCase();
    setShippingDistrictState(normalized);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('crown_district', normalized);
      } catch (e) {
        console.error('Failed to save district', e);
      }
    }
  };

  const addItem = (product: Product, quantity: number = 1, engravingText?: string, customEngravingFee?: number) => {
    const fee = customEngravingFee ?? (engravingText && product.allowEngraving ? (product.engravingFeeBDT || 300) : 0);
    const cleanText = engravingText?.trim() || undefined;
    const itemId = cleanText
      ? `${product.id}-eng-${encodeURIComponent(cleanText.toLowerCase())}`
      : product.id;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === itemId);
      const currentQuantity = existingIndex > -1 ? prevItems[existingIndex].quantity : 0;
      const nextQuantity = Math.min(product.stockQuantity, currentQuantity + Math.max(1, quantity));
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: nextQuantity,
          selectedEngravingText: cleanText,
          engravingText: cleanText,
          engravingFee: fee,
        };
        return updated;
      }

      const newItem: CartItem = {
        id: itemId,
        product,
        quantity: Math.min(product.stockQuantity, Math.max(1, quantity)),
        selectedEngravingText: cleanText,
        engravingText: cleanText,
        engravingFee: fee,
      };
      return [...prevItems, newItem];
    });

    setIsCartOpen(true);
  };

  const removeItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    const safeQuantity = Number.isFinite(quantity) ? Math.floor(quantity) : 0;
    if (safeQuantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prevItems) => prevItems.map((item) =>
      item.id === itemId
        ? { ...item, quantity: Math.max(1, Math.min(item.product.stockQuantity, safeQuantity)) }
        : item
    ));
  };

  const clearCart = () => {
    setItems([]);
    setCoupon(null);
  };

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const upperCode = code.trim().toUpperCase();
    const foundCoupon = VALID_COUPONS[upperCode];

    if (!foundCoupon) {
      setCoupon(null);
      return { success: false, message: 'Invalid coupon code.' };
    }

    const currentSubtotal = items.reduce((acc, item) => {
      const price = item.product.salePrice ?? item.product.price;
      return acc + (price + (item.engravingFee || 0)) * item.quantity;
    }, 0);

    if (foundCoupon.minOrderAmount && currentSubtotal < foundCoupon.minOrderAmount) {
      return {
        success: false,
        message: `Coupon requires a minimum order amount of ৳${foundCoupon.minOrderAmount}.`,
      };
    }

    setCoupon(foundCoupon);
    return { success: true, message: `Coupon '${upperCode}' applied!` };
  };

  const removeCoupon = () => {
    setCoupon(null);
  };

  const toggleCartDrawer = () => {
    setIsCartOpen((prev) => !prev);
  };

  const totals = useMemo(
    () => calculateCartTotals(items, shippingDistrict, coupon),
    [items, shippingDistrict, coupon]
  );
  const subtotal = totals.subtotal;
  const discount = totals.discount;
  const shippingFee = totals.shippingFee;
  const total = totals.total;

  const totalItems = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        subtotal,
        coupon,
        appliedCoupon: coupon,
        discount,
        discountAmount: discount,
        selectedDistrict: shippingDistrict,
        shippingDistrict,
        shippingFee,
        total,
        isCartOpen,
        totalItems,
        cartCount: totalItems,
        totalItemCount: totalItems,
        addItem,
        addToCart: addItem,
        removeItem,
        removeFromCart: removeItem,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        setDistrict: setShippingDistrict,
        setShippingDistrict,
        setIsCartOpen,
        toggleCartDrawer,
        toggleCart: toggleCartDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
