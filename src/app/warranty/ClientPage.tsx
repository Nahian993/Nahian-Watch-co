'use client';

import React from 'react';

import Link from 'next/link';

export default function WarrantyPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB]">
      <div className="bg-[#111827] border-b border-[#1F2937]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center">
          <p className="text-xs text-[#D4AF37] uppercase tracking-[0.3em] font-semibold mb-3">CROWN WATCH CO.</p>
          <h1 className="text-3xl font-bold font-serif text-gold-gradient mb-3">Warranty Policy</h1>
          <p className="text-[#9CA3AF] text-sm">We stand behind every timepiece we sell. Here's how your warranty works.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-5">
        {/* Brand warranty table */}
        <div className="bg-[#111827] border border-[#1F2937] rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-[#1F2937]">
            <h2 className="text-base font-bold text-[#D4AF37]">Manufacturer Warranty Periods</h2>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-xs text-[#8B8FA8] uppercase tracking-widest border-b border-[#1F2937]">
                <th className="text-left px-5 py-3">Brand</th>
                <th className="text-left px-5 py-3">Warranty Period</th>
                <th className="text-left px-5 py-3">Coverage</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Casio', '2 Years', 'Manufacturing defects, movement issues'],
                ['Seiko', '1?2 Years', 'Movement defects, water resistance (as rated)'],
                ['Citizen Eco-Drive', '2 Years', 'Solar cell, movement, lug defects'],
                ['G-Shock', '2 Years', 'Shock, water, manufacturing defects'],
                ['Smartwatches', '1 Year', 'Hardware defects, screen issues'],
                ['Scientific Calculators', '1 Year', 'Display, keypad, manufacturing defects'],
              ].map(([brand, period, coverage], i) => (
                <tr key={brand} className={`border-b border-[#1F2937]/50 text-sm ${i % 2 === 0 ? '' : 'bg-[#0d1120]/40'}`}>
                  <td className="px-5 py-3 font-semibold text-[#D4AF37]">{brand}</td>
                  <td className="px-5 py-3 text-[#F9FAFB] font-bold">{period}</td>
                  <td className="px-5 py-3 text-[#9CA3AF] text-xs">{coverage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {[
          {
            icon: '?x?', title: 'Crown Watch Repair Warranty',
            content: 'All repairs performed at Crown Watch Co. carry a 90-day workmanship warranty. If the same issue recurs within 90 days of repair, we will fix it at no additional charge.',
          },
          {
            icon: '?x9', title: 'What Warranty Covers',
            content: 'Manufacturer defects in materials or workmanship. Movement failure not caused by misuse. Water damage within the stated water resistance rating. Crystal/glass defects (manufacturing only).',
          },
          {
            icon: '?xa?', title: 'What Warranty Does NOT Cover',
            content: 'Physical damage from drops or impacts. Water damage beyond rated resistance. Normal wear (scratches, strap wear). Damage from unauthorized repair attempts. Battery replacement (consumable item).',
          },
          {
            icon: '?x~', title: 'How to Claim Warranty',
            content: 'Bring the watch to our Dhaka store with your original receipt/order number, or courier it to us. We will inspect, repair or replace within the warranty terms, and return your watch free of charge.',
          },
        ].map(section => (
          <div key={section.title} className="bg-[#111827] border border-[#1F2937] rounded-xl p-5">
            <div className="flex gap-4">
              <span className="text-2xl shrink-0">{section.icon}</span>
              <div>
                <h2 className="text-base font-bold text-[#F9FAFB] mb-2">{section.title}</h2>
                <p className="text-sm text-[#9CA3AF] leading-relaxed">{section.content}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="text-center pt-4 flex flex-wrap justify-center gap-3">
          <Link href="/repair" className="px-6 py-2.5 bg-[#D4AF37] text-[#0B0F19] font-bold rounded-lg hover:bg-[#C5A059] transition text-sm">Claim Repair</Link>
          <Link href="/contact" className="px-6 py-2.5 border border-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB] rounded-lg font-medium text-sm transition">Contact Us</Link>
        </div>
      </div>
    </main>
  );
}

