'use client';

import React, { useState } from 'react';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
  const { language } = useLanguage();
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const upd = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500/40 mb-6">
            <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold font-serif text-[#F9FAFB] mb-3">Message Sent!</h2>
          <p className="text-[#9CA3AF] text-sm mb-6">We'll get back to you within 24 hours. For urgent matters, contact us on WhatsApp.</p>
          <Link href="/" className="px-6 py-3 bg-[#D4AF37] text-[#0B0F19] font-bold rounded-lg hover:bg-[#C5A059] transition">Back to Home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB]">
      <div className="bg-[#111827] border-b border-[#1F2937]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-xs text-[#D4AF37] uppercase tracking-[0.3em] font-semibold mb-3">GET IN TOUCH</p>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-gold-gradient mb-3">Contact Us</h1>
          <p className="text-[#9CA3AF] text-sm">We're here 7 days a week. Reach out for orders, repairs, or any questions.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-serif text-[#D4AF37] mb-6">How to Reach Us</h2>
            {[
              { icon: '?x?', label: 'Store Address', value: '78, Masjid Market, 2 Patuatully Lane, Dhaka 1100, Bangladesh', href: null },
              { icon: '?x~', label: 'Phone', value: '+880 1715 881701', href: 'tel:+8801715881701' },
              { icon: '?x?', label: 'WhatsApp', value: 'Chat with us on WhatsApp', href: 'https://wa.me/8801715881701' },
              { icon: '?x?', label: 'Email', value: 'support@crownwatchbd.com', href: 'mailto:support@crownwatchbd.com' },
            ].map(item => (
              <div key={item.label} className="flex gap-4 bg-[#111827] border border-[#1F2937] rounded-xl p-4">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-xs text-[#8B8FA8] font-semibold uppercase tracking-wider mb-1">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-[#F9FAFB] hover:text-[#D4AF37] transition">{item.value}</a>
                  ) : (
                    <p className="text-sm text-[#F9FAFB]">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-4">
              <p className="text-xs text-[#8B8FA8] font-semibold uppercase tracking-wider mb-3">Business Hours</p>
              {[
                ['Saturday ? Thursday', '9:00 AM ? 9:00 PM'],
                ['Friday', '2:00 PM ? 9:00 PM (After Jumma)'],
              ].map(([day, time]) => (
                <div key={day} className="flex justify-between text-sm py-1.5 border-b border-[#1F2937] last:border-0">
                  <span className="text-[#9CA3AF]">{day}</span>
                  <span className="text-[#F9FAFB] font-medium">{time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-xl font-bold font-serif text-[#D4AF37] mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="bg-[#111827] border border-[#1F2937] rounded-xl p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#9CA3AF] font-medium mb-1.5">Full Name</label>
                  <input required value={form.name} onChange={e => upd('name', e.target.value)}
                    className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] text-[#F9FAFB] rounded-lg px-4 py-2.5 text-sm outline-none transition"
                    placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-xs text-[#9CA3AF] font-medium mb-1.5">Phone</label>
                  <input value={form.phone} onChange={e => upd('phone', e.target.value)}
                    className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] text-[#F9FAFB] rounded-lg px-4 py-2.5 text-sm outline-none transition"
                    placeholder="01XXXXXXXXX" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-[#9CA3AF] font-medium mb-1.5">Email (Optional)</label>
                <input type="email" value={form.email} onChange={e => upd('email', e.target.value)}
                  className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] text-[#F9FAFB] rounded-lg px-4 py-2.5 text-sm outline-none transition"
                  placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-xs text-[#9CA3AF] font-medium mb-1.5">Subject</label>
                <select value={form.subject} onChange={e => upd('subject', e.target.value)} required
                  className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] text-[#F9FAFB] rounded-lg px-4 py-2.5 text-sm outline-none transition">
                  <option value="">Select subject...</option>
                  <option>Product Inquiry</option>
                  <option>Order Support</option>
                  <option>Repair Inquiry</option>
                  <option>Return / Refund</option>
                  <option>Corporate Order</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#9CA3AF] font-medium mb-1.5">Message</label>
                <textarea required rows={4} value={form.message} onChange={e => upd('message', e.target.value)}
                  className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] text-[#F9FAFB] rounded-lg px-4 py-2.5 text-sm outline-none transition resize-none"
                  placeholder="How can we help you?" />
              </div>
              <button type="submit" className="w-full py-3.5 bg-[#D4AF37] text-[#0B0F19] font-bold rounded-lg hover:bg-[#C5A059] transition active:scale-95">
                Send Message ? 
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

