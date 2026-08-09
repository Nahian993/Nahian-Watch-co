'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { formatBDT } from '@/lib/formatters';
import { db } from '@/lib/db';
import { PaymentMethod } from '@/types';
import { getLineTotal, calculateCartTotals } from '@/lib/pricing';
import { isValidBDPhone, isValidMFSTrxID } from '@/lib/validators';

const BD_DISTRICTS = Array.from(new Set([
  'Dhaka','Chattogram','Rajshahi','Khulna','Barishal','Sylhet','Rangpur','Mymensingh',
  'Gazipur','Narayanganj','Cumilla','Feni','Noakhali','Lakshmipur','Chandpur','Brahmanbaria',
  'Narsingdi','Kishoreganj','Netrokona','Jamalpur','Sherpur','Tangail','Manikganj',
  'Munshiganj','Faridpur','Gopalganj','Madaripur','Rajbari','Shariatpur',
  'Bogura','Naogaon','Natore','Chapai Nawabganj','Joypurhat','Sirajganj','Pabna',
  'Jessore','Satkhira','Narail','Bagerhat','Magura','Jhenaidah','Meherpur','Chuadanga',
  'Kushtia','Patuakhali','Bhola','Pirojpur','Jhalokathi','Barguna',
  'Moulvibazar','Habiganj','Sunamganj','Dinajpur','Gaibandha','Kurigram',
  'Lalmonirhat','Nilphamari','Panchagarh','Thakurgaon','Bandarban','Cox\'s Bazar','Khagrachhari','Rangamati'
])).sort();

export default function CheckoutPage() {
  const { language, t } = useLanguage();
  const { items, coupon, applyCoupon: applyCartCoupon, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: '', phone: '', email: '', address: '', district: 'Dhaka',
  });
  const [payment, setPayment] = useState<PaymentMethod>('bKash');
  const [trxId, setTrxId] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-2xl font-bold text-[#F9FAFB] mb-4">Nothing to checkout</h1>
          <Link href="/shop" className="px-6 py-3 bg-[#D4AF37] text-[#0B0F19] font-bold rounded-lg hover:bg-[#C5A059] transition">
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const totals = calculateCartTotals(items, form.district, coupon);
  const { subtotal, shippingFee, discount: couponDiscount, total } = totals;

  const updateForm = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  const applyCoupon = () => {
    const result = applyCartCoupon(couponCode);
    setCouponMsg(result.success ? `✓ ${result.message}` : `✗ ${result.message}`);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = 'Name is required';
    if (!isValidBDPhone(form.phone)) errs.phone = 'Enter a valid Bangladeshi phone number';
    if (!form.address.trim()) errs.address = 'Address is required';
    if (!form.district) errs.district = 'Select a district';
    if (items.some(item => !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > item.product.stockQuantity)) {
      errs.items = 'One or more cart quantities are invalid. Please return to the cart and correct them.';
    }
    if (payment !== 'COD') {
      if (!isValidBDPhone(senderPhone)) errs.senderPhone = 'Enter a valid sender phone number';
      if (!isValidMFSTrxID(trxId)) errs.trxId = 'Enter a valid transaction ID';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      const orderItems = items.map(item => ({
        productId: item.product.id,
        productTitle: item.product.title,
        price: item.product.salePrice ?? item.product.price,
        quantity: item.quantity,
        engravingText: item.selectedEngravingText,
        engravingFee: item.engravingFee ?? 0,
      }));

      const order = db.createOrder({
        customerInfo: { fullName: form.fullName, phone: form.phone, email: form.email, address: form.address, district: form.district },
        items: orderItems,
        subtotal,
        shippingFee,
        discount: couponDiscount,
        couponCode: couponCode.trim().toUpperCase() || undefined,
        totalAmount: total,
        paymentMethod: payment,
        paymentDetails: { senderPhone: senderPhone || undefined, trxId: trxId || undefined },
        paymentStatus: 'Pending',
        orderStatus: 'Pending',
      });

      clearCart();
      router.push(`/checkout/success?order=${order.orderNumber}`);
    } catch {
      setSubmitError('We could not place your order. Please check your details and try again.');
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-gold-gradient mb-2">Checkout</h1>
        <nav className="flex items-center gap-2 text-xs text-[#8B8FA8] mb-8">
          <Link href="/cart" className="hover:text-[#D4AF37]">Cart</Link><span>›</span><span className="text-[#F9FAFB]">Checkout</span>
        </nav>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Customer & Payment */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Info */}
              <section className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
                <h2 className="text-base font-bold text-[#D4AF37] uppercase tracking-widest mb-5">Delivery Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-[#9CA3AF] font-medium mb-1.5">Full Name *</label>
                    <input value={form.fullName} onChange={e => updateForm('fullName', e.target.value)}
                      className={`w-full bg-[#0B0F19] border rounded-lg px-4 py-2.5 text-sm text-[#F9FAFB] outline-none transition ${errors.fullName ? 'border-red-500' : 'border-[#2A2F45] focus:border-[#D4AF37]'}`}
                      placeholder="Your full name" />
                    {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className="block text-xs text-[#9CA3AF] font-medium mb-1.5">Phone Number * (e.g. 01712345678)</label>
                    <input value={form.phone} onChange={e => updateForm('phone', e.target.value)}
                      className={`w-full bg-[#0B0F19] border rounded-lg px-4 py-2.5 text-sm text-[#F9FAFB] outline-none transition ${errors.phone ? 'border-red-500' : 'border-[#2A2F45] focus:border-[#D4AF37]'}`}
                      placeholder="01712345678" />
                    {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-xs text-[#9CA3AF] font-medium mb-1.5">Email (Optional)</label>
                    <input value={form.email} onChange={e => updateForm('email', e.target.value)}
                      className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] rounded-lg px-4 py-2.5 text-sm text-[#F9FAFB] outline-none transition"
                      placeholder="example@email.com" />
                  </div>
                  <div>
                    <label className="block text-xs text-[#9CA3AF] font-medium mb-1.5">District *</label>
                    <select value={form.district} onChange={e => updateForm('district', e.target.value)}
                      className={`w-full bg-[#0B0F19] border rounded-lg px-4 py-2.5 text-sm text-[#F9FAFB] outline-none transition ${errors.district ? 'border-red-500' : 'border-[#2A2F45] focus:border-[#D4AF37]'}`}>
                      {BD_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-[#9CA3AF] font-medium mb-1.5">Full Delivery Address *</label>
                    <textarea value={form.address} onChange={e => updateForm('address', e.target.value)} rows={3}
                      className={`w-full bg-[#0B0F19] border rounded-lg px-4 py-2.5 text-sm text-[#F9FAFB] outline-none transition resize-none ${errors.address ? 'border-red-500' : 'border-[#2A2F45] focus:border-[#D4AF37]'}`}
                      placeholder="House #, Road #, Area, City" />
                    {errors.address && <p className="text-xs text-red-400 mt-1">{errors.address}</p>}
                  </div>
                </div>

                <div className="mt-4 p-3 bg-[#0B0F19] rounded-lg border border-[#2A2F45] flex items-center justify-between">
                  <div className="text-sm">
                    <p className="text-[#9CA3AF]">Delivery fee for <span className="text-[#F9FAFB] font-semibold">{form.district}</span></p>
                  </div>
                  <span className="text-[#D4AF37] font-bold">{formatBDT(shippingFee, language)}</span>
                </div>
              </section>

              {/* Payment */}
              <section className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
                <h2 className="text-base font-bold text-[#D4AF37] uppercase tracking-widest mb-5">Payment Method</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                  {(['bKash', 'Nagad', 'Rocket', 'COD'] as PaymentMethod[]).map((method) => (
                    <button key={method} type="button" onClick={() => setPayment(method)}
                      className={`py-3 rounded-xl border-2 font-bold text-sm transition ${payment === method ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-[#2A2F45] text-[#9CA3AF] hover:border-[#D4AF37]/40'}`}>
                      {method}
                    </button>
                  ))}
                </div>

                {payment !== 'COD' ? (
                  <div className="bg-[#0B0F19] border border-[#2A2F45] rounded-xl p-4 space-y-4">
                    <p className="text-sm text-[#FDE68A]">
                      {payment} merchant payment instructions are temporarily unavailable. Please do not send money until our payment number is confirmed. Your order will remain <span className="font-bold">Pending</span> until payment is verified.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-[#9CA3AF] font-medium mb-1.5">Your {payment} Number *</label>
                        <input value={senderPhone} onChange={e => setSenderPhone(e.target.value)}
                          className={`w-full bg-[#111827] border rounded-lg px-4 py-2.5 text-sm text-[#F9FAFB] outline-none transition ${errors.senderPhone ? 'border-red-500' : 'border-[#2A2F45] focus:border-[#D4AF37]'}`}
                          placeholder="01XXXXXXXXX" />
                        {errors.senderPhone && <p className="text-xs text-red-400 mt-1">{errors.senderPhone}</p>}
                      </div>
                      <div>
                        <label className="block text-xs text-[#9CA3AF] font-medium mb-1.5">Transaction ID (TrxID) *</label>
                        <input value={trxId} onChange={e => setTrxId(e.target.value)}
                          className={`w-full bg-[#111827] border rounded-lg px-4 py-2.5 text-sm text-[#F9FAFB] font-mono outline-none transition ${errors.trxId ? 'border-red-500' : 'border-[#2A2F45] focus:border-[#D4AF37]'}`}
                          placeholder="e.g. AB1234567890" />
                        {errors.trxId && <p className="text-xs text-red-400 mt-1">{errors.trxId}</p>}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#0B0F19] border border-[#2A2F45] rounded-xl p-4">
                    <p className="text-sm text-[#9CA3AF]">
                      💵 Pay <span className="text-[#D4AF37] font-bold">{formatBDT(total, language)}</span> in cash when your order is delivered to your door.
                    </p>
                  </div>
                )}
              </section>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-5 sticky top-6">
                <h2 className="text-base font-bold text-[#D4AF37] uppercase tracking-widest mb-4">Order Summary</h2>

                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto pr-1">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 shrink-0 bg-[#0d1120] rounded-md overflow-hidden border border-[#2A2F45]">
                        {item.product.images?.[0] ? <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" /> : null}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[#F9FAFB] font-medium line-clamp-1">{item.product.title[language]}</p>
                        <p className="text-xs text-[#8B8FA8]">×{item.quantity}</p>
                      </div>
                      <p className="text-xs font-semibold text-[#F9FAFB] shrink-0">{formatBDT(getLineTotal(item), language)}</p>
                    </div>
                  ))}
                </div>

                {/* Coupon */}
                <div className="mb-4">
                  <div className="flex gap-2">
                    <input value={couponCode} onChange={e => setCouponCode(e.target.value)}
                      className="flex-1 bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-sm text-[#F9FAFB] outline-none transition uppercase placeholder:normal-case placeholder:text-[#8B8FA8]"
                      placeholder="Coupon code" />
                    <button type="button" onClick={applyCoupon} className="px-3 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold rounded-lg hover:bg-[#D4AF37]/20 transition">Apply</button>
                  </div>
                    {couponMsg && <p className={`text-xs mt-1.5 ${couponMsg.startsWith('✓') ? 'text-green-400' : 'text-red-400'}`}>{couponMsg}</p>}
                 </div>

                 {errors.items && <p className="text-xs text-red-400 mb-3">{errors.items}</p>}
                 {submitError && <p role="alert" className="text-sm text-red-400 mb-3">{submitError}</p>}

                <div className="border-t border-[#1F2937] pt-4 space-y-2 mb-5">
                  <div className="flex justify-between text-sm"><span className="text-[#9CA3AF]">Subtotal</span><span>{formatBDT(subtotal, language)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-[#9CA3AF]">Shipping ({form.district})</span><span>{formatBDT(shippingFee, language)}</span></div>
                  {couponDiscount > 0 && <div className="flex justify-between text-sm text-green-400"><span>Coupon Discount</span><span>-{formatBDT(couponDiscount, language)}</span></div>}
                  <div className="flex justify-between font-bold text-base pt-2 border-t border-[#1F2937]">
                    <span className="text-[#F9FAFB]">Total</span>
                    <span className="text-[#D4AF37]">{formatBDT(total, language)}</span>
                  </div>
                </div>

                <button type="submit" disabled={submitting}
                  className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#C5A059] text-[#0B0F19] font-bold rounded-lg transition active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed">
                  {submitting ? 'Placing Order...' : `Place Order — ${formatBDT(total, language)}`}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
