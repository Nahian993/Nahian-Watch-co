import React from 'react';
import { act, renderHook } from '@testing-library/react';
import { CartProvider, useCart } from '../CartContext';
import { sampleProducts } from '../../data/products';

describe('CartContext', () => {
  const sampleProduct = sampleProducts[0];

  it('starts with an empty cart', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.items).toEqual([]);
    expect(result.current.subtotal).toBe(0);
    expect(result.current.cartCount).toBe(0);
  });

  it('adds items to the cart and calculates subtotal', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(sampleProduct, 1);
    });

    const expectedPrice = sampleProduct.salePrice ?? sampleProduct.price;
    expect(result.current.items.length).toBe(1);
    expect(result.current.subtotal).toBe(expectedPrice);
    expect(result.current.cartCount).toBe(1);
  });

  it('applies valid discount coupon', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(sampleProduct, 1);
    });

    let res: { success: boolean; message: string } = { success: false, message: '' };
    act(() => {
      res = result.current.applyCoupon('HERITAGE50');
    });

    expect(res.success).toBe(true);
    expect(result.current.discount).toBeGreaterThan(0);
  });

  it('updates shipping fee based on district', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.shippingFee).toBe(60); // Default Dhaka

    act(() => {
      result.current.setDistrict('Chittagong');
    });

    expect(result.current.shippingFee).toBe(120);
  });
});
