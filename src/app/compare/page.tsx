'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { db } from '@/lib/db';
import { Product } from '@/types';
import { formatBDT } from '@/lib/formatters';

export default function ComparePage() {
  const { language } = useLanguage();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<(Product | null)[]>([null, null, null]);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => { setAllProducts(db.getProducts()); }, []);

  const setSlot = (index: number, product: Product) => {
    const newSelected = [...selected];
    newSelected[index] = product;
    setSelected(newSelected);
    setDropdownOpen(null);
    setSearch('');
  };

  const clearSlot = (index: number) => {
    const newSelected = [...selected];
    newSelected[index] = null;
    setSelected(newSelected);
  };

  const filtered = allProducts.filter(p =>
    !search || p.title.en.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const filledSlots = selected.filter(Boolean) as Product[];

  const SPEC_KEYS = ['CaseSize', 'Weight', 'WaterResistance', 'Movement', 'BatteryLife', 'CaseMaterial', 'GlassMaterial'];
  const allSpecKeys = [...new Set(filledSlots.flatMap(p => Object.keys(p.specifications ?? {})))];

  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB]">
      <div className="bg-[#111827] border-b border-[#1F2937]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-xs text-[#D4AF37] uppercase tracking-[0.3em] font-semibold mb-2">CROWN WATCH CO.</p>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-gold-gradient mb-3">Compare Watches</h1>
          <p className="text-[#9CA3AF] text-sm">Select up to 3 watches to compare specifications side by side.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Slot selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {selected.map((product, i) => (
            <div key={i} className="relative">
              {product ? (
                <div className="bg-[#111827] border border-[#D4AF37]/40 rounded-xl p-4 relative">
                  <button onClick={() => clearSlot(i)} className="absolute top-3 right-3 text-[#8B8FA8] hover:text-red-400 transition">✕</button>
                  <div className="aspect-square bg-[#0d1120] rounded-lg mb-3 overflow-hidden">
                    {product.images?.[0] ? <img src={product.images[0]} alt={product.title[language]} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-4xl text-[#2A2F45]">⌚</div>}
                  </div>
                  <p className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider mb-1">{product.brand}</p>
                  <p className="text-sm font-semibold text-[#F9FAFB] line-clamp-2 mb-2">{product.title[language]}</p>
                  <p className="text-base font-bold text-[#D4AF37]">{formatBDT(product.salePrice ?? product.price, language)}</p>
                </div>
              ) : (
                <button
                  onClick={() => setDropdownOpen(dropdownOpen === i ? null : i)}
                  className="w-full h-52 bg-[#111827] border-2 border-dashed border-[#2A2F45] hover:border-[#D4AF37]/50 rounded-xl flex flex-col items-center justify-center gap-2 transition group">
                  <span className="text-3xl text-[#2A2F45] group-hover:text-[#D4AF37]/40 transition">+</span>
                  <span className="text-sm text-[#8B8FA8] group-hover:text-[#D4AF37] transition font-medium">Add Watch {i + 1}</span>
                </button>
              )}

              {/* Dropdown */}
              {dropdownOpen === i && (
                <div className="absolute top-full left-0 right-0 z-20 mt-2 bg-[#111827] border border-[#D4AF37]/40 rounded-xl shadow-2xl max-h-80 overflow-hidden flex flex-col">
                  <div className="p-3 border-b border-[#1F2937]">
                    <input value={search} onChange={e => setSearch(e.target.value)} autoFocus
                      placeholder="Search watches..."
                      className="w-full bg-[#0B0F19] border border-[#2A2F45] text-[#F9FAFB] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#D4AF37] transition" />
                  </div>
                  <div className="overflow-y-auto flex-1">
                    {filtered.filter(p => !selected.some(s => s?.id === p.id)).map(p => (
                      <button key={p.id} onClick={() => setSlot(i, p)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#0d1120] transition text-left">
                        <div className="w-10 h-10 bg-[#0B0F19] rounded-md overflow-hidden shrink-0 border border-[#2A2F45]">
                          {p.images?.[0] ? <img src={p.images[0]} className="w-full h-full object-cover" alt="" /> : null}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-[#D4AF37] font-semibold">{p.brand}</p>
                          <p className="text-sm text-[#F9FAFB] line-clamp-1">{p.title.en}</p>
                          <p className="text-xs text-[#8B8FA8]">{formatBDT(p.salePrice ?? p.price)}</p>
                        </div>
                      </button>
                    ))}
                    {filtered.filter(p => !selected.some(s => s?.id === p.id)).length === 0 && (
                      <p className="text-center text-[#8B8FA8] text-sm py-6">No results found</p>
                    )}
                  </div>
                  <button onClick={() => setDropdownOpen(null)} className="p-2 text-xs text-center text-[#8B8FA8] hover:text-[#F9FAFB] border-t border-[#1F2937] transition">Close</button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        {filledSlots.length >= 2 && (
          <div className="bg-[#111827] border border-[#1F2937] rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1F2937]">
                    <th className="text-left px-5 py-3.5 text-xs text-[#8B8FA8] uppercase tracking-widest w-40">Feature</th>
                    {filledSlots.map(p => (
                      <th key={p.id} className="px-5 py-3.5 text-center">
                        <p className="text-xs text-[#D4AF37] font-bold uppercase tracking-wider">{p.brand}</p>
                        <p className="text-xs text-[#F9FAFB] font-semibold line-clamp-2 max-w-[140px] mx-auto">{p.title[language]}</p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Price */}
                  <tr className="border-b border-[#1F2937]/50 bg-[#0d1120]/40">
                    <td className="px-5 py-3.5 text-xs text-[#8B8FA8] font-semibold uppercase tracking-wider">Price</td>
                    {filledSlots.map(p => {
                      const best = Math.min(...filledSlots.map(x => x.salePrice ?? x.price));
                      const isLowest = (p.salePrice ?? p.price) === best;
                      return (
                        <td key={p.id} className="px-5 py-3.5 text-center">
                          <span className={`text-sm font-bold ${isLowest && filledSlots.length > 1 ? 'text-green-400' : 'text-[#F9FAFB]'}`}>
                            {formatBDT(p.salePrice ?? p.price, language)}
                            {isLowest && filledSlots.length > 1 && <span className="text-[10px] ml-1 text-green-400">Best</span>}
                          </span>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Rating */}
                  <tr className="border-b border-[#1F2937]/50">
                    <td className="px-5 py-3.5 text-xs text-[#8B8FA8] font-semibold uppercase tracking-wider">Rating</td>
                    {filledSlots.map(p => {
                      const best = Math.max(...filledSlots.map(x => x.rating));
                      return (
                        <td key={p.id} className="px-5 py-3.5 text-center">
                          <span className={`text-sm font-bold ${p.rating === best && filledSlots.length > 1 ? 'text-[#D4AF37]' : 'text-[#F9FAFB]'}`}>
                            ★ {p.rating} <span className="text-xs text-[#8B8FA8]">({p.reviewCount})</span>
                          </span>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Authentic */}
                  <tr className="border-b border-[#1F2937]/50 bg-[#0d1120]/40">
                    <td className="px-5 py-3.5 text-xs text-[#8B8FA8] font-semibold uppercase tracking-wider">Authentic</td>
                    {filledSlots.map(p => (
                      <td key={p.id} className="px-5 py-3.5 text-center">
                        <span className={p.isAuthentic ? 'text-green-400 text-sm font-bold' : 'text-red-400 text-sm'}>
                          {p.isAuthentic ? '✓ Yes' : '✗ No'}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Stock */}
                  <tr className="border-b border-[#1F2937]/50">
                    <td className="px-5 py-3.5 text-xs text-[#8B8FA8] font-semibold uppercase tracking-wider">In Stock</td>
                    {filledSlots.map(p => (
                      <td key={p.id} className="px-5 py-3.5 text-center">
                        <span className={`text-xs font-semibold ${p.stockQuantity === 0 ? 'text-red-400' : 'text-green-400'}`}>
                          {p.stockQuantity === 0 ? 'Out of Stock' : `${p.stockQuantity} units`}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Specifications */}
                  {allSpecKeys.map((key, i) => (
                    <tr key={key} className={`border-b border-[#1F2937]/50 ${i % 2 === 0 ? 'bg-[#0d1120]/40' : ''}`}>
                      <td className="px-5 py-3.5 text-xs text-[#8B8FA8] font-semibold uppercase tracking-wider">{key}</td>
                      {filledSlots.map(p => (
                        <td key={p.id} className="px-5 py-3.5 text-center text-xs text-[#9CA3AF]">
                          {p.specifications?.[key] ?? <span className="text-[#2A2F45]">—</span>}
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* Engraving */}
                  <tr className="border-b border-[#1F2937]/50">
                    <td className="px-5 py-3.5 text-xs text-[#8B8FA8] font-semibold uppercase tracking-wider">Engraving</td>
                    {filledSlots.map(p => (
                      <td key={p.id} className="px-5 py-3.5 text-center">
                        <span className={`text-xs font-semibold ${p.allowEngraving ? 'text-[#D4AF37]' : 'text-[#8B8FA8]'}`}>
                          {p.allowEngraving ? `✓ +${formatBDT(p.engravingFeeBDT ?? 300)}` : '✗ No'}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* CTA */}
                  <tr>
                    <td className="px-5 py-4 text-xs text-[#8B8FA8] font-semibold uppercase tracking-wider">Action</td>
                    {filledSlots.map(p => (
                      <td key={p.id} className="px-5 py-4 text-center">
                        <Link href={`/shop/${p.slug}`} className="inline-block px-4 py-2 bg-[#D4AF37] text-[#0B0F19] font-bold text-xs rounded-lg hover:bg-[#C5A059] transition">
                          View Details
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {filledSlots.length < 2 && (
          <div className="text-center py-16 text-[#8B8FA8] text-sm">
            Select at least 2 watches above to compare specifications side by side.
          </div>
        )}
      </div>
    </main>
  );
}
