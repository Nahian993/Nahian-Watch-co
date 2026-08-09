'use client';

import React from 'react';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const MILESTONES = [
  { year: '1974', title: 'Crown Watch Founded', desc: 'Our founder opens the first Crown Watch store in Old Dhaka, selling imported timepieces to the city\'s professionals.', icon: '?x??' },
  { year: '1980', title: 'Casio Partnership', desc: 'Crown Watch becomes one of the first Dhaka retailers stocking Casio calculators and digital watches during Bangladesh\'s digital revolution.', icon: '?x??' },
  { year: '1990', title: 'Seiko & Citizen Introduced', desc: 'The catalog expands to include Japanese precision brands Seiko and Citizen, establishing Crown Watch as a premier multi-brand destination.', icon: '?Ra' },
  { year: '1998', title: 'Professional Repair Workshop', desc: 'A dedicated master-mechanic repair workshop opens, training certified technicians in movement servicing for all major brands.', icon: '?a"?' },
  { year: '2005', title: 'Second Generation Takes Over', desc: 'The founding family\'s second generation joins the business, modernizing operations while preserving the heritage of trust and precision.', icon: '?x???x???x?' },
  { year: '2012', title: 'Corporate Gifting Program', desc: 'Crown Watch launches Bangladesh\'s first structured corporate watch gifting program, serving hundreds of local businesses.', icon: '?x}?' },
  { year: '2018', title: 'Smartwatch Era Begins', desc: 'Crown Watch embraces the smartwatch revolution, curating the finest fitness trackers and smart timepieces for modern Bangladesh.', icon: '?x?' },
  { year: '2022', title: 'Online Store Launch', desc: 'Nationwide delivery begins, bringing Crown Watch\'s trusted collection to every district across Bangladesh.', icon: '?xa?' },
  { year: '2024', title: '50 Years of Excellence', desc: 'Half a century of timekeeping heritage. 50 years of precision, trust, and authentic timepieces for Bangladesh.', icon: '?x', highlight: true },
];

export default function HeritagePage() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB]">
      {/* Hero */}
      <section className="relative bg-[#111827] border-b border-[#1F2937] overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #D4AF37 0%, transparent 70%)' }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-6">
            ?x EST. 1974
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold font-serif text-gold-gradient mb-6 leading-tight">
            {language === 'bn' ? '?? ??:??!? ??????' : '50 Years of Heritage'}
          </h1>
          <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto mb-8">
            {language === 'bn'
              ? '???????, ????????? ? ??!??? ????! ????a ???" ???! ???????!??!? ??????!? ???????? ??"????'
              : 'Five decades of trust, precision, and service ? the story of how Crown Watch Co. became Bangladesh\'s most trusted timepiece destination.'}
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {[['50+', 'Years in Business'], ['10,000+', 'Happy Customers'], ['6', 'Repair Specialists'], ['3', 'Premium Brands']].map(([n, l]) => (
              <div key={l}>
                <p className="text-3xl font-bold text-[#D4AF37]">{n}</p>
                <p className="text-xs text-[#8B8FA8] uppercase tracking-wider mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold font-serif text-[#D4AF37] text-center mb-12">
          {language === 'bn' ? '? ????!? ??????? ?!?????' : 'Our Journey Through Time'}
        </h2>

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#D4AF37]/60 via-[#D4AF37]/20 to-transparent hidden sm:block" />

          <div className="space-y-10">
            {MILESTONES.map((m, i) => (
              <div key={m.year} className={`relative flex flex-col sm:flex-row items-center gap-6 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                {/* Content */}
                <div className={`flex-1 ${i % 2 === 0 ? 'sm:text-right' : 'sm:text-left'}`}>
                  <div className={`bg-[#111827] border ${m.highlight ? 'border-[#D4AF37]/60 shadow-[0_0_30px_rgba(212,175,55,0.15)]' : 'border-[#1F2937]'} rounded-xl p-5 inline-block max-w-sm w-full`}>
                    <div className="text-2xl mb-2">{m.icon}</div>
                    <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-1">{m.year}</p>
                    <h3 className={`text-base font-bold mb-2 ${m.highlight ? 'text-gold-gradient' : 'text-[#F9FAFB]'}`}>{m.title}</h3>
                    <p className="text-sm text-[#9CA3AF]">{m.desc}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className={`hidden sm:flex w-12 h-12 rounded-full items-center justify-center border-2 shrink-0 z-10 ${m.highlight ? 'bg-[#D4AF37] border-[#D4AF37] text-[#0B0F19] shadow-[0_0_20px_rgba(212,175,55,0.5)]' : 'bg-[#0B0F19] border-[#D4AF37]/40 text-[#D4AF37]'} text-sm font-bold`}>
                  {m.year.slice(2)}
                </div>

                <div className="flex-1 hidden sm:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-[#111827] border-t border-[#1F2937]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <blockquote className="text-2xl sm:text-3xl font-serif text-[#D4AF37] italic mb-4">
            "50 Years of Timekeeping Heritage, Precision, and Trust."
          </blockquote>
          <p className="text-[#8B8FA8] text-sm mb-8">? Crown Watch Co., Dhaka, Bangladesh</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/shop" className="px-8 py-3.5 bg-[#D4AF37] text-[#0B0F19] font-bold rounded-lg hover:bg-[#C5A059] transition">
              Shop the Collection
            </Link>
            <Link href="/authenticity" className="px-8 py-3.5 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-lg font-semibold transition">
              Our Authenticity Promise
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

