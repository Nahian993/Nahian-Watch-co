'use client';

import React, { useState } from 'react';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const FAQS = [
  { cat: 'Shopping', q: 'Are all watches 100% authentic?', a: 'Yes. Crown Watch Co. only sources products from authorized importers and verified distributors. Every timepiece comes with genuine manufacturer warranty documentation. We are a reseller ? not a manufacturer or official authorized dealer ? but we guarantee authenticity of every product we sell.' },
  { cat: 'Shopping', q: 'Do you sell calculator models for SSC/HSC exams?', a: 'Yes! We stock the Casio FX-991EX and other approved scientific calculators suitable for all Bangladesh national examinations. Check our Calculators collection for full details and board approval status.' },
  { cat: 'Shopping', q: 'Can I get engraving on a watch?', a: 'Many of our watches support custom laser engraving. Look for the "Engraving Available" badge on the product page. You can enter your custom text (up to 30 characters) during checkout. Engraving fee starts from ?300.' },
  { cat: 'Payment', q: 'What payment methods do you accept?', a: 'We accept bKash, Nagad, Rocket (Mobile Banking), and Cash on Delivery (COD). For mobile payments, send the amount to our merchant number and provide the Transaction ID during checkout. COD is available across all 64 districts of Bangladesh.' },
  { cat: 'Payment', q: 'Is Cash on Delivery available?', a: 'Yes. COD is available everywhere in Bangladesh. You pay the delivery person when your watch arrives. No advance payment needed for COD orders.' },
  { cat: 'Payment', q: 'Are there any coupon codes available?', a: 'Yes! Try CROWN10 for 10% off, or HERITAGE50 for our 50-year anniversary discount. Check our social media pages for seasonal coupon codes during Eid, Puja, and other festivals.' },
  { cat: 'Delivery', q: 'How long does delivery take?', a: 'Dhaka: 1?2 business days (?60 delivery fee). Outside Dhaka: 2?4 business days via courier (?120 delivery fee). We ship through Sundarban Courier, Pathao, and SA Paribahan. Tracking is provided for all orders.' },
  { cat: 'Delivery', q: 'Do you deliver outside Dhaka?', a: 'Yes! We deliver to all 64 districts of Bangladesh. Simply enter your district during checkout and the correct delivery fee will be calculated automatically.' },
  { cat: 'Repairs', q: 'Can you service any watch brand?', a: 'Our master mechanics are trained to service all major brands including Casio, Seiko, Citizen, Titan, Fossil, and most other quartz and automatic watches. Smartwatch hardware repairs may have limitations.' },
  { cat: 'Repairs', q: 'How long does a repair take?', a: 'Battery replacement: same-day or 1?2 days. Glass/crystal replacement: 2?4 days. Full movement servicing: 5?14 days depending on complexity. You will receive a ticket number to track your repair status online.' },
  { cat: 'Returns', q: 'What is your return policy?', a: 'We offer a 7-day return policy for defective or incorrectly delivered products. Items must be unused, in original packaging, with all accessories. Engraved items are non-returnable unless defective. Contact us within 7 days of delivery to initiate a return.' },
  { cat: 'Returns', q: 'What if my watch stops working under warranty?', a: 'Bring or courier the watch to us with your proof of purchase. We will inspect, repair or replace the unit free of charge within the warranty period (varies by brand: Casio 2 years, Seiko 1?2 years, Citizen 2 years Eco-Drive).' },
];

const CATEGORIES = ['All', 'Shopping', 'Payment', 'Delivery', 'Repairs', 'Returns'];

export default function FAQPage() {
  const { language } = useLanguage();
  const [activeCat, setActiveCat] = useState('All');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = FAQS.filter(f => activeCat === 'All' || f.cat === activeCat);

  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB]">
      <div className="bg-[#111827] border-b border-[#1F2937]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-xs text-[#D4AF37] uppercase tracking-[0.3em] font-semibold mb-3">CROWN WATCH CO.</p>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-gold-gradient mb-3">Frequently Asked Questions</h1>
          <p className="text-[#9CA3AF] text-sm">Everything you need to know about shopping, delivery, and repairs at Crown Watch Co.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${activeCat === cat ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-[#2A2F45] text-[#9CA3AF] hover:border-[#D4AF37]/40'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((faq, i) => (
            <div key={i} className={`bg-[#111827] border rounded-xl overflow-hidden transition-all ${openIndex === i ? 'border-[#D4AF37]/40' : 'border-[#1F2937]'}`}>
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left gap-4">
                <div>
                  <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-1 block">{faq.cat}</span>
                  <span className="text-sm font-semibold text-[#F9FAFB]">{faq.q}</span>
                </div>
                <span className={`text-[#D4AF37] text-lg shrink-0 transition-transform ${openIndex === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 border-t border-[#1F2937]">
                  <p className="text-sm text-[#9CA3AF] leading-relaxed pt-4">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 bg-[#111827] border border-[#D4AF37]/20 rounded-xl p-6 text-center">
          <p className="text-[#F9FAFB] font-semibold mb-2">Still have a question?</p>
          <p className="text-sm text-[#8B8FA8] mb-4">Our team is available 7 days a week to help you.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="px-6 py-2.5 bg-[#D4AF37] text-[#0B0F19] font-bold rounded-lg hover:bg-[#C5A059] transition text-sm">Contact Us</Link>
            <a href="https://wa.me/880" className="px-6 py-2.5 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 rounded-lg font-semibold text-sm transition">WhatsApp</a>
          </div>
        </div>
      </div>
    </main>
  );
}

