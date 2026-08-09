'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { db } from '@/lib/db';
import { formatBDT } from '@/lib/formatters';
import { Order } from '@/types';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order');
  const { language } = useLanguage();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderNumber) setOrder(db.getOrderByNumber(orderNumber) ?? null);
  }, [orderNumber]);

  if (!order) {
    return (
      <main className="flex min-h-[55vh] items-center justify-center px-4 py-12">
        <div className="max-w-md text-center">
          <p className="eyebrow">Order confirmation</p>
          <h1 className="heading-xl mt-3 text-crown-primary">We could not find that order.</h1>
          <p className="mt-4 text-sm leading-6 text-crown-secondary">The confirmation may have expired or the order number may be incorrect. Check your details or return to the shop.</p>
          <Link href="/shop" className="button-primary mt-7">Continue shopping</Link>
        </div>
      </main>
    );
  }

  const paymentConfirmed = order.paymentStatus === 'Verified' || order.paymentStatus === 'verified';

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B0F19] px-4 py-12 text-[#F9FAFB]">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <div className="mb-5 inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-green-500/40 bg-green-500/10">
            <svg className="h-10 w-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="mb-2 font-serif text-2xl font-bold text-[#F9FAFB] sm:text-3xl">Order received</h1>
          <p className="text-sm text-[#9CA3AF]">{language === 'bn' ? 'আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে।' : 'Your order has been received. We will contact you shortly.'}</p>
        </div>

        <div className="mb-6 overflow-hidden rounded-2xl border border-[#1F2937] bg-[#111827]">
          <div className="flex items-center justify-between border-b border-[#1F2937] bg-[#D4AF37]/5 px-6 py-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#8B8FA8]">Order number</p>
              <p className="font-mono text-base font-bold text-[#D4AF37]">{order.orderNumber}</p>
            </div>
            <span className="rounded-full border border-yellow-500/30 bg-yellow-500/20 px-3 py-1 text-xs font-semibold text-yellow-400">{order.orderStatus}</span>
          </div>

          <div className="space-y-4 px-6 py-5">
            <div>
              <p className="mb-1 text-xs uppercase tracking-wider text-[#8B8FA8]">Delivering to</p>
              <p className="text-sm font-semibold text-[#F9FAFB]">{order.customerInfo.fullName}</p>
              <p className="text-sm text-[#9CA3AF]">{order.customerInfo.district}, Bangladesh</p>
            </div>

            <div className="border-t border-[#1F2937] pt-4">
              <p className="mb-3 text-xs uppercase tracking-wider text-[#8B8FA8]">Items ordered</p>
              <div className="space-y-2">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between gap-4 text-sm">
                    <span className="text-[#9CA3AF]">{item.productTitle?.[language] ?? item.title} ×{item.quantity}</span>
                    <span className="shrink-0 font-medium text-[#F9FAFB]">{formatBDT((item.price + (item.engravingFee ?? 0)) * item.quantity, language)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 border-t border-[#1F2937] pt-4">
              <div className="flex justify-between text-sm"><span className="text-[#9CA3AF]">Subtotal</span><span>{formatBDT(order.subtotal, language)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-[#9CA3AF]">Shipping</span><span>{formatBDT(order.shippingFee, language)}</span></div>
              {order.discount > 0 && <div className="flex justify-between text-sm text-green-400"><span>Discount</span><span>-{formatBDT(order.discount, language)}</span></div>}
              <div className="flex justify-between border-t border-[#1F2937] pt-2 text-base font-bold"><span>{paymentConfirmed ? 'Total paid' : 'Total due'}</span><span className="text-[#D4AF37]">{formatBDT(order.totalAmount, language)}</span></div>
            </div>

            <div className="rounded-lg bg-[#0B0F19] p-3 text-xs text-[#8B8FA8]">Payment: <span className="font-semibold text-[#F9FAFB]">{order.paymentMethod}</span> · Status: <span className={paymentConfirmed ? 'text-green-400' : 'text-yellow-400'}>{order.paymentStatus}</span></div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href={`/track-order?id=${order.orderNumber}`} className="flex-1 rounded-lg bg-[#D4AF37] py-3 text-center font-bold text-[#0B0F19] transition hover:bg-[#C5A059]">Track my order</Link>
          <Link href="/shop" className="flex-1 rounded-lg border border-[#1F2937] py-3 text-center font-medium text-[#9CA3AF] transition hover:border-[#D4AF37]/40 hover:text-[#F9FAFB]">Continue shopping</Link>
        </div>
        <p className="mt-5 text-center text-xs text-[#8B8FA8]">Questions? Contact us on WhatsApp or visit our store in Dhaka.</p>
      </div>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<main className="flex min-h-[55vh] items-center justify-center text-sm text-[#9CA3AF]">Loading order confirmation…</main>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
