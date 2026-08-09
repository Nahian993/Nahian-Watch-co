'use client';

import React, { useState } from 'react';
import { ChevronDown, Filter, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface FilterState {
  brand: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
  inStockOnly: boolean;
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const BRANDS = ['All', 'Casio', 'Seiko', 'Citizen', 'Smartwatch', 'Other'];
const CATEGORIES = ['All', 'Watches', 'Smartwatches', 'Calculators', 'Accessories', 'Couple Sets'];
const SORT_OPTIONS = [
  { value: 'rating', label: 'Best Rated' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
];

export default function FilterSidebar({ filters, onChange, onReset, isMobileOpen, onMobileClose }: FilterSidebarProps) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState({ brand: true, category: true, price: true, sort: true });

  const toggle = (key: keyof typeof expanded) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  const update = (key: keyof FilterState, value: string | boolean) =>
    onChange({ ...filters, [key]: value });

  const sidebarContent = (
    <div className="w-full">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold text-[#D4AF37] uppercase tracking-widest flex items-center gap-2">
          <Filter className="w-4 h-4" aria-hidden="true" />
          Filters
        </h2>
        <button type="button" onClick={onReset} className="text-xs text-[#8B8FA8] hover:text-[#D4AF37] transition underline">
          Reset All
        </button>
      </div>

      {/* Sort */}
      <div className="mb-5 border-b border-[#1F2937] pb-5">
<button type="button" onClick={() => toggle('sort')} aria-expanded={expanded.sort} className="flex items-center justify-between w-full text-sm font-semibold text-[#F9FAFB] mb-3">
           Sort By
           <ChevronDown className={`w-4 h-4 transition-transform ${expanded.sort ? 'rotate-180' : ''}`} aria-hidden="true" />
         </button>
        {expanded.sort && (
          <div className="space-y-1.5">
            {SORT_OPTIONS.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="radio"
                  name="sort"
                  value={opt.value}
                  checked={filters.sort === opt.value}
                  onChange={() => update('sort', opt.value)}
                  className="accent-[#D4AF37]"
                />
                <span className={`text-sm transition ${filters.sort === opt.value ? 'text-[#D4AF37] font-semibold' : 'text-[#9CA3AF] group-hover:text-[#F9FAFB]'}`}>
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brand */}
      <div className="mb-5 border-b border-[#1F2937] pb-5">
<button type="button" onClick={() => toggle('brand')} aria-expanded={expanded.brand} className="flex items-center justify-between w-full text-sm font-semibold text-[#F9FAFB] mb-3">
           Brand
           <ChevronDown className={`w-4 h-4 transition-transform ${expanded.brand ? 'rotate-180' : ''}`} aria-hidden="true" />
         </button>
        {expanded.brand && (
          <div className="space-y-1.5">
            {BRANDS.map((brand) => (
              <label key={brand} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="radio"
                  name="brand"
                  value={brand}
                  checked={filters.brand === brand}
                  onChange={() => update('brand', brand)}
                  className="accent-[#D4AF37]"
                />
                <span className={`text-sm transition ${filters.brand === brand ? 'text-[#D4AF37] font-semibold' : 'text-[#9CA3AF] group-hover:text-[#F9FAFB]'}`}>
                  {brand}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Category */}
      <div className="mb-5 border-b border-[#1F2937] pb-5">
<button type="button" onClick={() => toggle('category')} aria-expanded={expanded.category} className="flex items-center justify-between w-full text-sm font-semibold text-[#F9FAFB] mb-3">
           Category
           <ChevronDown className={`w-4 h-4 transition-transform ${expanded.category ? 'rotate-180' : ''}`} aria-hidden="true" />
         </button>
        {expanded.category && (
          <div className="space-y-1.5">
            {CATEGORIES.map((cat) => (
              <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={filters.category === cat}
                  onChange={() => update('category', cat)}
                  className="accent-[#D4AF37]"
                />
                <span className={`text-sm transition capitalize ${filters.category === cat ? 'text-[#D4AF37] font-semibold' : 'text-[#9CA3AF] group-hover:text-[#F9FAFB]'}`}>
                  {cat}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-5 border-b border-[#1F2937] pb-5">
<button type="button" onClick={() => toggle('price')} aria-expanded={expanded.price} className="flex items-center justify-between w-full text-sm font-semibold text-[#F9FAFB] mb-3">
           Price Range (BDT)
           <ChevronDown className={`w-4 h-4 transition-transform ${expanded.price ? 'rotate-180' : ''}`} aria-hidden="true" />
         </button>
        {expanded.price && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="number"
                aria-label="Minimum price in BDT"
                placeholder="Min ৳"
                value={filters.minPrice}
                onChange={(e) => update('minPrice', e.target.value)}
                className="w-full bg-[#0B0F19] border border-[#2A2F45] text-[#F9FAFB] rounded-lg px-3 py-2 text-sm focus:border-[#D4AF37] outline-none transition"
              />
              <input
                type="number"
                aria-label="Maximum price in BDT"
                placeholder="Max ৳"
                value={filters.maxPrice}
                onChange={(e) => update('maxPrice', e.target.value)}
                className="w-full bg-[#0B0F19] border border-[#2A2F45] text-[#F9FAFB] rounded-lg px-3 py-2 text-sm focus:border-[#D4AF37] outline-none transition"
              />
            </div>
            {/* Quick price presets */}
            <div className="flex flex-wrap gap-2">
              {[['Under ৳5K', '', '5000'], ['৳5K–15K', '5000', '15000'], ['৳15K+', '15000', '']].map(([label, min, max]) => (
                <button
                  key={label}
                  onClick={() => onChange({ ...filters, minPrice: min, maxPrice: max })}
                  className="text-[11px] px-2.5 py-1 rounded-full border border-[#2A2F45] text-[#9CA3AF] hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* In Stock Only */}
      <label className="flex items-center gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={filters.inStockOnly}
          onChange={(event) => update('inStockOnly', event.target.checked)}
          className="sr-only peer"
        />
        <span aria-hidden="true" className={`w-10 h-5 rounded-full transition-colors relative peer-focus-visible:ring-2 peer-focus-visible:ring-[#D4AF37] ${filters.inStockOnly ? 'bg-[#D4AF37]' : 'bg-[#2A2F45]'}`}>
          <span className={`block w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${filters.inStockOnly ? 'translate-x-5' : 'translate-x-0.5'}`} />
        </span>
        <span className="text-sm text-[#9CA3AF] group-hover:text-[#F9FAFB] transition">In Stock Only</span>
      </label>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 bg-[#111827] border border-[#1F2937] rounded-xl p-5 self-start sticky top-6">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="presentation">
          <button type="button" aria-label="Close filters" className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default" onClick={onMobileClose} />
          <div className="absolute right-0 top-0 h-full w-80 bg-[#111827] border-l border-[#1F2937] p-5 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="mobile-filter-title">
            <div className="flex items-center justify-between mb-6">
              <h2 id="mobile-filter-title" className="text-base font-bold text-[#D4AF37] uppercase tracking-widest">Filters</h2>
              <button type="button" onClick={onMobileClose} aria-label="Close filters" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition p-2 -mr-2">
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
