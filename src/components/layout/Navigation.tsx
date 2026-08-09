'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Navigation() {
  const pathname = usePathname();
  const { language, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/shop', label: t('nav.shop') },
    { href: '/shop/casio', label: t('nav.casio') },
    { href: '/shop/seiko', label: t('nav.seiko') },
    { href: '/shop/citizen', label: t('nav.citizen') },
    { href: '/shop/smartwatches', label: t('nav.smartwatches') },
    { href: '/shop/calculators', label: t('nav.calculators') },
    { href: '/shop/affordable', label: t('nav.affordable') },
    { href: '/repair', label: t('nav.repair') },
    { href: '/heritage', label: t('nav.heritage') },
    { href: '/authenticity', label: t('nav.authenticity') },
    { href: '/quiz', label: t('nav.quiz') },
    { href: '/about', label: t('nav.about') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/contact', label: t('nav.contact') },
    { href: '/faq', label: t('nav.faq') },
  ];

  return (
    <nav className="w-full bg-[#0B0F19]/95 border-t border-[#D4AF37]/15">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between space-x-1 overflow-x-auto py-2.5 scrollbar-none">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`px-3 py-1.5 rounded text-xs uppercase font-medium tracking-wider whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#D4AF37] text-[#0B0F19] font-bold shadow-[0_0_10px_rgba(212,175,55,0.4)]'
                    : 'text-gray-300 hover:text-[#D4AF37] hover:bg-[#111827]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Hamburger Toggle Bar */}
        <div className="md:hidden flex items-center justify-between py-2.5">
          <span className="text-xs text-[#D4AF37] font-medium uppercase tracking-wider">
            {language === 'en' ? 'Menu & Categories' : 'মেনু ও ক্যাটালগ'}
          </span>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-gray-700 bg-[#111827] px-3 text-xs text-gray-300 hover:text-[#D4AF37]"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
            {mobileMenuOpen ? (language === 'en' ? 'Close' : 'বন্ধ করুন') : (language === 'en' ? 'Menu' : 'মেনু')}
          </button>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div id="mobile-navigation" className="md:hidden py-3 border-t border-gray-800 space-y-1 bg-[#111827] rounded-b-lg px-2 shadow-xl">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                 key={link.href}
                 href={link.href}
                 onClick={() => setMobileMenuOpen(false)}
                 aria-current={isActive ? 'page' : undefined}
                 className={`block px-4 py-2 rounded text-sm font-medium ${
                    isActive
                      ? 'bg-[#D4AF37] text-[#0B0F19] font-bold'
                      : 'text-gray-200 hover:text-[#D4AF37] hover:bg-[#1F2937]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
