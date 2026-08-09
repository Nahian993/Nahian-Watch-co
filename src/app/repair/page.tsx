'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { formatBDT } from '@/lib/formatters';

const SERVICES = [
  { id: 'battery', name: 'Battery Replacement', namebn: 'ব্যাটারি পরিবর্তন', min: 150, max: 500, days: '1–2 Days', icon: '🔋' },
  { id: 'glass', name: 'Glass Replacement', namebn: 'গ্লাস পরিবর্তন', min: 400, max: 1500, days: '2–4 Days', icon: '🪟' },
  { id: 'strap', name: 'Strap Fitting', namebn: 'স্ট্র্যাপ ফিটিং', min: 100, max: 300, days: 'Same Day', icon: '⌚' },
  { id: 'movement', name: 'Movement Servicing', namebn: 'মুভমেন্ট সার্ভিসিং', min: 800, max: 3000, days: '5–10 Days', icon: '⚙️' },
  { id: 'water', name: 'Water Damage Inspection', namebn: 'পানি ক্ষতি পরীক্ষা', min: 300, max: 800, days: '2–3 Days', icon: '💧' },
  { id: 'full', name: 'Full Watch Servicing', namebn: 'সম্পূর্ণ ঘড়ি সার্ভিসিং', min: 1500, max: 5000, days: '7–14 Days', icon: '🔧' },
];

export default function RepairPage() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB]">
      {/* Hero */}
      <div className="bg-[#111827] border-b border-[#1F2937]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <span className="inline-block text-4xl mb-4">⚙️</span>
          <p className="text-xs text-[#D4AF37] uppercase tracking-[0.3em] font-semibold mb-3">CROWN WATCH REPAIR HUB</p>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-gold-gradient mb-4">
            {language === 'bn' ? 'পেশাদার ঘড়ি মেরামত সেবা' : 'Professional Watch Repair Services'}
          </h1>
          <p className="text-[#9CA3AF] text-base max-w-2xl mx-auto mb-8">
            {language === 'bn'
              ? '৫০ বছরের অভিজ্ঞতাসম্পন্ন মাস্টার মেকানিকদের দ্বারা সকল ব্র্যান্ডের ঘড়ি মেরামত।'
              : 'Expert servicing for all watch brands by our master mechanics with 50 years of combined experience.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/repair/calculator" className="px-8 py-3.5 bg-[#D4AF37] text-[#0B0F19] font-bold rounded-lg hover:bg-[#C5A059] transition shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              Get Instant Quote →
            </Link>
            <Link href="/repair/book" className="px-8 py-3.5 bg-[#111827] border border-[#D4AF37]/50 text-[#F9FAFB] hover:border-[#D4AF37] rounded-lg font-semibold transition">
              Book Repair
            </Link>
            <Link href="/repair/track" className="px-8 py-3.5 bg-[#111827] border border-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB] hover:border-[#D4AF37]/30 rounded-lg font-semibold transition">
              Track Ticket
            </Link>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-bold font-serif text-[#D4AF37] mb-8 text-center">
          {language === 'bn' ? 'আমাদের মেরামত সেবাসমূহ' : 'Our Repair Services'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s) => (
            <div key={s.id} className="group bg-[#111827] border border-[#1F2937] hover:border-[#D4AF37]/60 rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]">
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="text-base font-bold text-[#F9FAFB] mb-2 group-hover:text-[#D4AF37] transition">
                {language === 'bn' ? s.namebn : s.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-[#D4AF37] font-bold">{formatBDT(s.min, language)}</span>
                <span className="text-[#8B8FA8] text-xs">–</span>
                <span className="text-[#D4AF37] font-bold">{formatBDT(s.max, language)}</span>
              </div>
              <p className="text-xs text-[#8B8FA8] mb-4">⏱ Turnaround: {s.days}</p>
              <Link href={`/repair/book?service=${s.id}`} className="text-xs font-semibold text-[#D4AF37] hover:underline">
                Book This Service →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Signals */}
      <div className="border-t border-[#1F2937] bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { icon: '🏅', title: '50 Years Experience', desc: 'Our master mechanics have serviced thousands of watches' },
            { icon: '🛡️', title: 'Repair Warranty', desc: 'All repairs covered by Crown Watch service guarantee' },
            { icon: '📦', title: 'Courier Pickup', desc: 'Door-to-door service available across Bangladesh' },
          ].map(({ icon, title, desc }) => (
            <div key={title}>
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-bold text-[#F9FAFB] mb-2">{title}</h3>
              <p className="text-[#8B8FA8] text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
