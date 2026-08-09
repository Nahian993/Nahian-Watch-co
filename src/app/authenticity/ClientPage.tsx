'use client';

import React from 'react';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function AuthenticityPage() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB]">
      {/* Hero */}
      <section className="bg-[#111827] border-b border-[#1F2937]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold uppercase tracking-widest mb-6">
            ?x:?? Our Authenticity Promise
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-gold-gradient mb-5">
            {language === 'bn' ? '???% ????x? ?????!? ?????a????' : '100% Authenticity Guaranteed'}
          </h1>
          <p className="text-[#9CA3AF] text-base max-w-2xl mx-auto">
            {language === 'bn'
              ? '?"????0? ?????a ?"?9? ??!?"?! ?"?!?? ??????x? ????? ??? ?"?????"???!?x? ???% ????x? ??? ???? ?0?}? ??!?"?! ? ???'
              : 'Every timepiece and calculator sold at Crown Watch Co. is 100% authentic, sourced from verified importers and official distributors.'}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        {/* What authentic means */}
        <section>
          <h2 className="text-2xl font-bold font-serif text-[#D4AF37] mb-6">What "Authentic" Means at Crown Watch</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { icon: '?xS', title: 'Genuine Documentation', desc: 'Every product comes with original manufacturer warranty cards, serial numbers, and packaging.' },
              { icon: '?x?', title: 'Verified Source', desc: 'We source exclusively from authorized importers and licensed distributors, never from grey markets.' },
              { icon: '?xa?', title: 'Zero Counterfeits', desc: 'We have a strict zero-tolerance policy on replica or counterfeit goods. Our 50-year reputation depends on it.' },
              { icon: '?a?', title: 'Honest Disclosure', desc: 'Crown Watch Co. is a reseller, not an official brand representative. We do not claim manufacturer authorization unless verified.' },
            ].map(item => (
              <div key={item.title} className="bg-[#111827] border border-[#1F2937] rounded-xl p-5">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-base font-bold text-[#F9FAFB] mb-2">{item.title}</h3>
                <p className="text-sm text-[#9CA3AF]">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How to verify */}
        <section className="bg-[#111827] border border-[#D4AF37]/20 rounded-2xl p-8">
          <h2 className="text-xl font-bold font-serif text-[#D4AF37] mb-5">How to Verify Your Watch</h2>
          <ol className="space-y-4">
            {[
              { step: '1', title: 'Check Serial Number', desc: 'Every genuine watch has a serial number engraved on the case back. For Casio, this matches the box and warranty card.' },
              { step: '2', title: 'Scan QR / Hologram', desc: 'Many Seiko and Citizen watches include holographic authenticity stickers with QR codes verifiable on the brand website.' },
              { step: '3', title: 'Review Warranty Card', desc: 'Authentic products include filled warranty cards with purchase date, dealer name, and authorized stamp.' },
              { step: '4', title: 'Contact Crown Watch', desc: 'If you ever doubt the authenticity of a Crown Watch purchase, contact us immediately. We will verify and replace if needed.' },
            ].map(item => (
              <li key={item.step} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] font-bold text-sm flex items-center justify-center shrink-0">{item.step}</div>
                <div>
                  <p className="text-sm font-bold text-[#F9FAFB] mb-1">{item.title}</p>
                  <p className="text-sm text-[#9CA3AF]">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Disclaimer */}
        <section className="border border-[#2A2F45] rounded-xl p-6">
          <p className="text-xs text-[#8B8FA8] leading-relaxed">
            <strong className="text-[#9CA3AF]">Important Disclaimer:</strong> Crown Watch Co. is an independent retailer and is not an officially authorized dealer or representative of Casio, Seiko, or Citizen unless explicitly stated on a specific product listing. Brand names, trademarks, and logos are the property of their respective owners. All products are sourced from legitimate importers and are genuine goods. Manufacturer warranty claims may need to be processed through official brand service centers.
          </p>
        </section>

        <div className="text-center">
          <Link href="/shop" className="inline-block px-8 py-3.5 bg-[#D4AF37] text-[#0B0F19] font-bold rounded-lg hover:bg-[#C5A059] transition">
            Shop Authentic Watches ? 
          </Link>
        </div>
      </div>
    </main>
  );
}

