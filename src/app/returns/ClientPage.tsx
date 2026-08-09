'use client';

import React from 'react';

import Link from 'next/link';

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB]">
      <div className="bg-[#111827] border-b border-[#1F2937]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center">
          <p className="text-xs text-[#D4AF37] uppercase tracking-[0.3em] font-semibold mb-3">CROWN WATCH CO.</p>
          <h1 className="text-3xl font-bold font-serif text-gold-gradient mb-3">Returns & Exchange Policy</h1>
          <p className="text-[#9CA3AF] text-sm">We want you to be completely satisfied. Here's everything you need to know.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        {[
          {
            icon: '?x', title: '7-Day Return Window',
            content: 'You may return any product within 7 days of delivery if it is defective, damaged during shipping, or incorrectly delivered. Items must be unused, in original packaging, with all accessories and documentation intact.',
          },
          {
            icon: '?xa?', title: 'Non-Returnable Items',
            content: 'Engraved or personalized items cannot be returned unless they are defective. Batteries, straps, and consumable accessories are also non-returnable once opened.',
          },
          {
            icon: '?x?', title: 'How to Initiate a Return',
            content: 'Contact us within 7 days via WhatsApp or email with: (1) Your order number, (2) Photos/video of the defect, (3) Description of the issue. We will provide return instructions within 24 hours.',
          },
          {
            icon: '?x?', title: 'Refund Process',
            content: 'Approved refunds are processed within 3?5 business days back to your original payment method (bKash, Nagad, or Rocket). COD refunds are done via bKash mobile transfer.',
          },
          {
            icon: '?x', title: 'Exchange',
            content: 'If you prefer an exchange instead of a refund, we will send the replacement unit within 2?3 days of receiving your returned item. Exchanges are subject to stock availability.',
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
          <Link href="/contact" className="px-6 py-2.5 bg-[#D4AF37] text-[#0B0F19] font-bold rounded-lg hover:bg-[#C5A059] transition text-sm">Contact Support</Link>
          <Link href="/faq" className="px-6 py-2.5 border border-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB] rounded-lg font-medium text-sm transition">View FAQ</Link>
        </div>
      </div>
    </main>
  );
}

