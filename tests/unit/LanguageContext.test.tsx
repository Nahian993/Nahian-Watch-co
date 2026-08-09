import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '../../src/context/LanguageContext';

describe('LanguageContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <LanguageProvider>{children}</LanguageProvider>
  );

  beforeEach(() => {
    localStorage.clear();
  });

  it('provides default English language and translation lookup', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });

    expect(result.current.language).toBe('en');
    expect(result.current.t('nav.home')).toBe('Home');
    expect(result.current.t('nav.shop')).toBe('Shop Catalog');
  });

  it('switches to Bangla language and translates keys', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });

    act(() => {
      result.current.setLanguage('bn');
    });

    expect(result.current.language).toBe('bn');
    expect(result.current.t('nav.home')).toBe('হোম');
    expect(result.current.t('nav.shop')).toBe('ঘড়ির ক্যাটালগ');
  });

  it('handles parameter interpolation in translations', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });

    expect(result.current.t('catalog.low_stock', { count: 3 })).toBe('Only 3 units left');

    act(() => {
      result.current.setLanguage('bn');
    });

    expect(result.current.t('catalog.low_stock', { count: 3 })).toBe('মাত্র ৩টি অবশিষ্ট আছে');
  });

  it('formats numbers based on selected language', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });

    expect(result.current.formatNumber(12345)).toBe('12345');

    act(() => {
      result.current.setLanguage('bn');
    });

    expect(result.current.formatNumber(12345)).toBe('১২৩৪৫');
  });

  it('toggles language between en and bn', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });

    expect(result.current.language).toBe('en');

    act(() => {
      result.current.toggleLanguage();
    });

    expect(result.current.language).toBe('bn');

    act(() => {
      result.current.toggleLanguage();
    });

    expect(result.current.language).toBe('en');
  });
});
