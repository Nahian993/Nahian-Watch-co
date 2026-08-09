import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../../src/context/CartContext';
import { initialProducts } from '../../src/data/products';

describe('CartContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  const mockProduct1 = initialProducts[0]; // Casio G-Shock (salePrice: 13800)
  const mockProduct2 = initialProducts[4]; // Casio Calculator FX-991EX

  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with an empty cart and default Dhaka shipping', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.items).toEqual([]);
    expect(result.current.totalItemCount).toBe(0);
    expect(result.current.subtotal).toBe(0);
    expect(result.current.shippingFee).toBe(0);
    expect(result.current.shippingDistrict).toBe('dhaka');
  });

  it('adds items to cart and updates subtotal and shipping fee', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const expectedPrice = mockProduct1.salePrice ?? mockProduct1.price;

    act(() => {
      result.current.addToCart(mockProduct1, 1);
    });

    expect(result.current.items.length).toBe(1);
    expect(result.current.totalItemCount).toBe(1);
    expect(result.current.subtotal).toBe(expectedPrice);
    expect(result.current.shippingFee).toBe(60); // Dhaka
    expect(result.current.total).toBe(expectedPrice + 60);
  });

  it('handles custom engraving add-on fee correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const expectedPrice = (mockProduct1.salePrice ?? mockProduct1.price) + 300;

    act(() => {
      result.current.addToCart(mockProduct1, 1, 'Custom Name');
    });

    expect(result.current.items[0].selectedEngravingText).toBe('Custom Name');
    expect(result.current.subtotal).toBe(expectedPrice);
  });

  it('updates quantity and removes item when quantity is set to 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct1, 2);
    });

    expect(result.current.totalItemCount).toBe(2);

    act(() => {
      result.current.updateQuantity(mockProduct1.id, 5);
    });

    expect(result.current.totalItemCount).toBe(5);

    act(() => {
      result.current.updateQuantity(mockProduct1.id, 0);
    });

    expect(result.current.items.length).toBe(0);
  });

  it('calculates shipping fee dynamically based on district (Dhaka ৳60 vs Outside Dhaka ৳120)', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const expectedPrice = mockProduct2.salePrice ?? mockProduct2.price;

    act(() => {
      result.current.addToCart(mockProduct2, 1);
    });

    expect(result.current.shippingFee).toBe(60); // Dhaka default

    act(() => {
      result.current.setShippingDistrict('outside_dhaka');
    });

    expect(result.current.shippingFee).toBe(120);
    expect(result.current.total).toBe(expectedPrice + 120);
  });

  it('validates and applies coupon code discount correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const expectedPrice = mockProduct1.salePrice ?? mockProduct1.price;

    act(() => {
      result.current.addToCart(mockProduct1, 1);
    });

    let couponRes;
    act(() => {
      couponRes = result.current.applyCoupon('EID500'); // ৳500 flat discount
    });

    expect(couponRes).toEqual({ success: true, message: "Coupon 'EID500' applied!" });
    expect(result.current.discountAmount).toBe(500);
    expect(result.current.total).toBe(expectedPrice - 500 + 60);
  });

  it('rejects invalid coupon codes', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct1, 1);
    });

    let couponRes: { success: boolean; message?: string } | undefined;
    act(() => {
      couponRes = result.current.applyCoupon('INVALID_CODE');
    });

    expect(couponRes?.success).toBe(false);
    expect(result.current.discountAmount).toBe(0);
  });

  it('clears cart and coupon state on clearCart()', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct1, 1);
      result.current.applyCoupon('CROWN10');
    });

    expect(result.current.items.length).toBe(1);

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items.length).toBe(0);
    expect(result.current.subtotal).toBe(0);
    expect(result.current.appliedCoupon).toBeNull();
  });
});
