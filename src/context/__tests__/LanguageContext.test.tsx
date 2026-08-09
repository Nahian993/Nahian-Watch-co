import React from 'react';
import { render, act, renderHook } from '@testing-library/react';
import { LanguageProvider, useLanguage, dictionary } from '../LanguageContext';

describe('LanguageContext', () => {
  it('provides default language "en"', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LanguageProvider>{children}</LanguageProvider>
    );
    const { result } = renderHook(() => useLanguage(), { wrapper });

    expect(result.current.language).toBe('en');
    expect(result.current.t('nav.home')).toBe('Home');
  });

  it('toggles language between "en" and "bn"', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LanguageProvider>{children}</LanguageProvider>
    );
    const { result } = renderHook(() => useLanguage(), { wrapper });

    act(() => {
      result.current.toggleLanguage();
    });

    expect(result.current.language).toBe('bn');
    expect(result.current.t('nav.home')).toBe('হোম');
  });

  it('interpolates parameters in translation strings', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LanguageProvider>{children}</LanguageProvider>
    );
    const { result } = renderHook(() => useLanguage(), { wrapper });

    expect(result.current.t('catalog.results_count', { count: 15 })).toBe('Showing 15 items');
  });
});
