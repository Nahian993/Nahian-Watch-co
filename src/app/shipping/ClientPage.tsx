'use client';

import React from 'react';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function ShippingPage() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB]">
      <div className="bg-[#111827] border-b border-[#1F2937]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center">
          <p className="text-xs text-[#D4AF37] uppercase tracking-[0.3em] font-semibold mb-3">CROWN WATCH CO.</p>
          <h1 className="text-3xl font-bold font-serif text-gold-gradient mb-3">Shipping & Delivery</h1>
          <p className="text-[#9CA3AF] text-sm">We deliver to all 64 districts of Bangladesh. Fast, safe, and fully tracked.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Delivery zones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-[#111827] border border-[#D4AF37]/40 rounded-xl p-6">
            <p className="text-lg font-bold text-[#D4AF37] mb-1">?x?"? Dhaka City</p>
            <p className="text-3xl font-bold text-[#F9FAFB] mb-1">?60</p>
            <p className="text-sm text-[#8B8FA8]">1?2 business days</p>
          </div>
          <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
            <p className="text-lg font-bold text-[#9CA3AF] mb-1">?x?? Outside Dhaka</p>
            <p className="text-3xl font-bold text-[#F9FAFB] mb-1">?120</p>
            <p className="text-sm text-[#8B8FA8]">2?4 business days</p>
          </div>
        </div>

        <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6 space-y-3">
          <h2 className="text-base font-bold text-[#D4AF37] uppercase tracking-widest mb-4">Delivery Details</h2>
          {[
            ['Courier Partners', 'Sundarban Courier, Pathao, SA Paribahan'],
            ['Coverage', 'All 64 districts ? every thana and upazila'],
            ['Order Cut-off', 'Orders placed before 2 PM are dispatched same day'],
            ['Packaging', 'Watches are securely padded in tamper-evident sealed boxes'],
            ['Tracking', 'Tracking number provided via SMS/WhatsApp after dispatch'],
            ['Cash on Delivery', 'Available for all orders, nationwide'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between text-sm py-2 border-b border-[#1F2937] last:border-0">
              <span className="text-[#8B8FA8] font-medium">{k}</span>
              <span className="text-[#F9FAFB] text-right max-w-[60%]">{v}</span>
            </div>
          ))}
        </div>

        <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-xl p-5">
          <p className="text-sm text-[#9CA3AF]">
            <strong className="text-[#D4AF37]">Free Shipping Threshold:</strong> Orders over ?15,000 qualify for free shipping to Dhaka. Orders over ?25,000 qualify for free shipping nationwide. Discount applied automatically at checkout.
          </p>
        </div>

        <div className="text-center">
          <Link href="/faq" className="text-sm text-[#D4AF37] hover:underline mr-5">More Delivery FAQs</Link>
          <Link href="/shop" className="px-6 py-2.5 bg-[#D4AF37] text-[#0B0F19] font-bold rounded-lg hover:bg-[#C5A059] transition text-sm">Start Shopping</Link>
        </div>
      </div>
    </main>
  );
}

