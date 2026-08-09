'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { db } from '@/lib/db';
import { formatBDT } from '@/lib/formatters';
import { Order } from '@/types';

const STATUS_STEPS = ['Pending', 'Processing', 'Shipped', 'Delivered'];

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const [query, setQuery] = useState(searchParams.get('id') ?? '');
  const [order, setOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = () => {
    setSearched(true);
    setError('');
    setOrder(null);
    if (!query.trim()) { setError('Please enter an Order ID.'); return; }
    const found = db.getOrderByNumber(query.trim().toUpperCase());
    if (found) setOrder(found);
    else setError('No order found with this ID. Check and try again.');
  };

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setQuery(id);
      setSearched(true);
      setError('');
      const found = db.getOrderByNumber(id.trim().toUpperCase());
      if (found) setOrder(found);
      else setError('No order found with this ID. Check and try again.');
    }
  }, [searchParams]);

  const rawStatus = order?.orderStatus ?? '';
  const normalizedStatus = rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1).toLowerCase();
  const stepIdx = STATUS_STEPS.indexOf(normalizedStatus);
  const currentStep = stepIdx >= 0 ? stepIdx : 0;

  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-gold-gradient mb-2">Track Your Order</h1>
        <p className="text-[#9CA3AF] text-sm mb-8">Enter your Order ID (e.g. CROWN-ORD-2026-8801) to see delivery status.</p>

        {/* Search */}
        <div className="flex gap-3 mb-8">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="CROWN-ORD-2026-XXXX"
            className="flex-1 bg-[#111827] border border-[#1F2937] focus:border-[#D4AF37] text-[#F9FAFB] font-mono rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-[#8B8FA8] placeholder:font-sans uppercase"
          />
          <button onClick={handleSearch} className="px-6 py-3 bg-[#D4AF37] text-[#0B0F19] font-bold rounded-xl hover:bg-[#C5A059] transition">
            Track
          </button>
        </div>

        {/* Error */}
        {searched && error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-sm text-red-400 mb-6">{error}</div>
        )}

        {/* Order Result */}
        {order && (
          <div className="bg-[#111827] border border-[#1F2937] rounded-2xl overflow-hidden">
            <div className="bg-[#D4AF37]/5 border-b border-[#1F2937] px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#8B8FA8] uppercase tracking-wider">Order</p>
                  <p className="font-bold text-[#D4AF37] font-mono">{order.orderNumber}</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                  order.orderStatus === 'Delivered' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                  order.orderStatus === 'Shipped' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                  'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                }`}>
                  {order.orderStatus}
                </span>
              </div>
            </div>

            <div className="px-6 py-6">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  {STATUS_STEPS.map((step, i) => (
                    <div key={step} className="flex flex-col items-center flex-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 mb-2 ${
                        i < currentStep ? 'bg-green-500 border-green-500 text-white' :
                        i === currentStep ? 'bg-[#D4AF37] border-[#D4AF37] text-[#0B0F19]' :
                        'bg-[#0B0F19] border-[#2A2F45] text-[#8B8FA8]'
                      }`}>
                        {i < currentStep ? '✓' : i + 1}
                      </div>
                      <p className={`text-[10px] text-center font-medium ${i <= currentStep ? 'text-[#F9FAFB]' : 'text-[#8B8FA8]'}`}>{step}</p>
                    </div>
                  ))}
                </div>
                <div className="relative h-1 bg-[#2A2F45] rounded-full mx-4">
                  <div className="absolute left-0 top-0 h-full bg-[#D4AF37] rounded-full transition-all duration-500"
                    style={{ width: `${(currentStep / (STATUS_STEPS.length - 1)) * 100}%` }} />
                </div>
              </div>

              {/* Order Details */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-[#9CA3AF]">Customer</span><span className="font-medium">{order.customerInfo.fullName}</span></div>
                <div className="flex justify-between"><span className="text-[#9CA3AF]">Delivery to</span><span className="font-medium">{order.customerInfo.district}</span></div>
                <div className="flex justify-between"><span className="text-[#9CA3AF]">Payment</span><span className={`font-medium ${order.paymentStatus === 'Verified' ? 'text-green-400' : 'text-yellow-400'}`}>{order.paymentMethod} — {order.paymentStatus}</span></div>
                <div className="flex justify-between"><span className="text-[#9CA3AF]">Total</span><span className="font-bold text-[#D4AF37]">{formatBDT(order.totalAmount, language)}</span></div>
                <div className="flex justify-between"><span className="text-[#9CA3AF]">Placed On</span><span>{new Date(order.createdAt).toLocaleDateString('en-BD', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-xs text-[#8B8FA8] mb-3">Need help with your order?</p>
          <Link href="/contact" className="text-xs text-[#D4AF37] hover:underline">Contact Support →</Link>
        </div>
      </div>
    </main>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<main className="flex min-h-[55vh] items-center justify-center text-sm text-[#9CA3AF]">Loading order tracker…</main>}>
      <TrackOrderContent />
    </Suspense>
  );
}
