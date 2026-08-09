'use client';

import React, { useState, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  const { t } = useLanguage();
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className={`relative flex items-center bg-[#111827] border rounded-xl transition-all duration-200 ${focused ? 'border-[#D4AF37] shadow-[0_0_0_3px_rgba(212,175,55,0.12)]' : 'border-[#1F2937]'}`}>
      {/* Search Icon */}
      <div className="pl-4 pr-2 text-[#8B8FA8]" aria-hidden="true">
        <Search className="w-4 h-4" />
      </div>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder || t('catalog.search_placeholder') || 'Search watches, brands, models...'}
        className="flex-1 bg-transparent py-3 pr-2 text-sm text-[#F9FAFB] placeholder:text-[#8B8FA8] outline-none"
        aria-label="Search products"
        id="product-search"
      />

      {/* Clear button */}
      {value && (
        <button
          onClick={handleClear}
          className="pr-4 pl-2 text-[#8B8FA8] hover:text-[#D4AF37] transition"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
