'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { formatBDT } from '@/lib/formatters';
import { getLineTotal } from '@/lib/pricing';

export default function CartPage() {
  const { language, t } = useLanguage();
  const { items, removeItem, updateQuantity, subtotal, shippingFee, shippingDistrict, totalItemCount } = useCart();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB] flex items-center justify-center">
        <div className="text-center px-4">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#111827] border border-[#1F2937] mb-6">
            <svg className="w-10 h-10 text-[#8B8FA8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold font-serif text-[#F9FAFB] mb-3">Your cart is empty</h1>
          <p className="text-[#8B8FA8] text-sm mb-8 max-w-sm mx-auto">
            Discover our collection of authentic watches, smartwatches, and calculators.
          </p>
          <Link href="/shop" className="inline-block px-8 py-3.5 bg-[#D4AF37] text-[#0B0F19] font-bold rounded-lg hover:bg-[#C5A059] transition">
            Browse Collection
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-gold-gradient mb-2">Your Cart</h1>
        <p className="text-[#8B8FA8] text-sm mb-8">{totalItemCount} item{totalItemCount !== 1 ? 's' : ''}</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const price = getLineTotal({ ...item, quantity: 1 });
              return (
                <div key={item.id}
                  className="bg-[#111827] border border-[#1F2937] rounded-xl p-4 flex gap-4">
                  {/* Image */}
                  <div className="w-20 h-20 shrink-0 bg-[#0d1120] rounded-lg overflow-hidden border border-[#2A2F45]">
                    {item.product.images?.[0] ? (
                      <img src={item.product.images[0]} alt={item.product.title[language]} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-7 h-7 text-[#2A2F45]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="1.5"/></svg>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[11px] text-[#D4AF37] font-semibold uppercase tracking-wider mb-0.5">{item.product.brand}</p>
                        <h3 className="text-sm font-semibold text-[#F9FAFB] line-clamp-2">{item.product.title[language]}</h3>
                        {item.selectedEngravingText && (
                          <p className="text-xs text-[#8B8FA8] mt-1 italic">Engraving: "{item.selectedEngravingText}" (+{formatBDT(item.engravingFee ?? 0, language)})</p>
                        )}
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-[#8B8FA8] hover:text-red-400 transition shrink-0">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#2A2F45] rounded-lg overflow-hidden">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2.5 py-1.5 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition text-sm font-bold">−</button>
                        <span className="px-3 text-sm font-semibold text-[#F9FAFB]">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2.5 py-1.5 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition text-sm font-bold">+</button>
                      </div>
                      <p className="text-sm font-bold text-[#F9FAFB]">{formatBDT(price * item.quantity, language)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-5 sticky top-6">
              <h2 className="text-base font-bold text-[#D4AF37] uppercase tracking-widest mb-5">Order Summary</h2>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-[#9CA3AF]">Subtotal ({totalItemCount} items)</span>
                  <span className="text-[#F9FAFB] font-semibold">{formatBDT(subtotal, language)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#9CA3AF]">Shipping ({shippingDistrict})</span>
                  <span className="text-[#F9FAFB] font-semibold">{formatBDT(shippingFee, language)}</span>
                </div>
              </div>

              <div className="border-t border-[#1F2937] pt-4 mb-5">
                <div className="flex justify-between">
                  <span className="font-bold text-[#F9FAFB]">Estimated Total</span>
                  <span className="font-bold text-[#D4AF37] text-lg">{formatBDT(subtotal + shippingFee, language)}</span>
                </div>
              </div>

              <Link href="/checkout" className="block w-full py-3.5 text-center bg-[#D4AF37] text-[#0B0F19] font-bold rounded-lg hover:bg-[#C5A059] transition active:scale-95 mb-3">
                Proceed to Checkout →
              </Link>
              <Link href="/shop" className="block w-full py-3 text-center border border-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB] hover:border-[#D4AF37]/40 rounded-lg text-sm font-medium transition">
                ← Continue Shopping
              </Link>

              {/* Trust signals */}
              <div className="mt-5 pt-5 border-t border-[#1F2937] space-y-2">
                {['Secure Checkout', 'Cash on Delivery Available', '7-Day Return Policy'].map(s => (
                  <div key={s} className="flex items-center gap-2 text-xs text-[#8B8FA8]">
                    <svg className="w-3.5 h-3.5 text-green-400 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
