'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { Order, OrderStatus, PaymentStatus } from '@/types';
import { formatBDT } from '@/lib/formatters';

const STATUS_COLORS: Record<string, string> = {
  Pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  Processing: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  Shipped: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  Delivered: 'bg-green-500/10 text-green-400 border-green-500/30',
  Cancelled: 'bg-red-500/10 text-red-400 border-red-500/30',
};

const PAYMENT_COLORS: Record<string, string> = {
  Pending: 'text-yellow-400',
  Verified: 'text-green-400',
  Failed: 'text-red-400',
  Refunded: 'text-[#8B8FA8]',
};

const ORDER_STATUSES: OrderStatus[] = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
const PAYMENT_STATUSES: PaymentStatus[] = ['Pending', 'Verified', 'Failed', 'Refunded'];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [toast, setToast] = useState('');

  const load = () => setOrders(db.getOrders());
  useEffect(() => { load(); }, []);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const updateStatus = (id: string, orderStatus: OrderStatus, paymentStatus?: PaymentStatus) => {
    db.updateOrderStatus(id, orderStatus, paymentStatus);
    load();
    showToast('Order status updated');
  };

  const filtered = orders.filter(o => {
    const matchFilter = filter === 'All' || o.orderStatus?.toLowerCase() === filter.toLowerCase();
    const matchSearch = !search || o.orderNumber.toLowerCase().includes(search.toLowerCase()) || o.customerInfo.fullName.toLowerCase().includes(search.toLowerCase()) || o.customerInfo.phone.includes(search);
    return matchFilter && matchSearch;
  });

  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB]">
      {toast && <div className="fixed top-4 right-4 z-50 bg-green-500 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-lg">✓ {toast}</div>}

      <header className="bg-[#111827] border-b border-[#1F2937] px-6 py-4 flex items-center gap-3">
        <Link href="/admin" className="text-[#8B8FA8] hover:text-[#D4AF37] text-sm transition">← Dashboard</Link>
        <span className="text-[#2A2F45]">|</span>
        <h1 className="text-base font-bold text-[#D4AF37]">Order Management</h1>
        <span className="ml-auto text-sm text-[#8B8FA8]">{orders.length} total orders</span>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search order ID, name, phone..."
            className="flex-1 min-w-[200px] bg-[#111827] border border-[#1F2937] focus:border-[#D4AF37] text-[#F9FAFB] rounded-xl px-4 py-2.5 text-sm outline-none transition" />
          <div className="flex gap-2">
            {['All', ...ORDER_STATUSES].map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold border transition ${filter === s ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-[#2A2F45] text-[#9CA3AF] hover:border-[#D4AF37]/40'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Orders */}
        <div className="space-y-3">
          {filtered.map(order => (
            <div key={order.id} className="bg-[#111827] border border-[#1F2937] rounded-xl overflow-hidden">
              {/* Row */}
              <div className="px-5 py-4 flex flex-wrap items-center gap-4 cursor-pointer hover:bg-[#0d1120] transition"
                onClick={() => setExpanded(expanded === order.id ? null : order.id)}>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-bold text-[#D4AF37] font-mono">{order.orderNumber}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${STATUS_COLORS[order.orderStatus]}`}>{order.orderStatus}</span>
                  </div>
                  <p className="text-sm text-[#F9FAFB] font-medium">{order.customerInfo.fullName}</p>
                  <p className="text-xs text-[#8B8FA8]">{order.customerInfo.phone} · {order.customerInfo.district}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-base font-bold text-[#F9FAFB]">{formatBDT(order.totalAmount)}</p>
                  <p className="text-xs text-[#8B8FA8]">{order.paymentMethod} · <span className={PAYMENT_COLORS[order.paymentStatus]}>{order.paymentStatus}</span></p>
                  <p className="text-xs text-[#8B8FA8]">{new Date(order.createdAt).toLocaleDateString('en-BD', { day: 'numeric', month: 'short' })}</p>
                </div>
                <span className={`text-[#8B8FA8] transition-transform text-sm ${expanded === order.id ? 'rotate-180' : ''}`}>▾</span>
              </div>

              {/* Expanded Detail */}
              {expanded === order.id && (
                <div className="border-t border-[#1F2937] px-5 py-5 space-y-4">
                  {/* Items */}
                  <div>
                    <p className="text-xs text-[#8B8FA8] uppercase tracking-widest font-semibold mb-2">Items</p>
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm py-1">
                        <span className="text-[#9CA3AF]">{item.productTitle?.en ?? (item as any).title ?? 'Product'} ×{item.quantity}</span>
                        <span className="text-[#F9FAFB] font-medium">{formatBDT(item.price * item.quantity)}</span>
                      </div>
                    ))}
                    <div className="border-t border-[#1F2937] mt-2 pt-2 flex justify-between text-sm font-bold">
                      <span className="text-[#9CA3AF]">Total (incl. shipping ৳{order.shippingFee})</span>
                      <span className="text-[#D4AF37]">{formatBDT(order.totalAmount)}</span>
                    </div>
                  </div>

                  {/* Payment details */}
                  {order.paymentDetails?.trxId && (
                    <div className="bg-[#0B0F19] border border-[#2A2F45] rounded-lg p-3 text-sm">
                      <p className="text-[#8B8FA8]">Sender: <span className="text-[#F9FAFB] font-mono">{order.paymentDetails.senderPhone}</span></p>
                      <p className="text-[#8B8FA8]">TrxID: <span className="text-[#F9FAFB] font-mono font-bold">{order.paymentDetails.trxId}</span></p>
                    </div>
                  )}

                  {/* Status controls */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-[#8B8FA8] mb-1.5 font-medium">Update Order Status</p>
                      <div className="flex flex-wrap gap-1.5">
                        {ORDER_STATUSES.map(s => (
                          <button key={s} onClick={() => updateStatus(order.id, s)}
                            className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold transition ${order.orderStatus === s ? STATUS_COLORS[s] : 'border-[#2A2F45] text-[#8B8FA8] hover:border-[#D4AF37]/30'}`}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-[#8B8FA8] mb-1.5 font-medium">Update Payment Status</p>
                      <div className="flex flex-wrap gap-1.5">
                        {PAYMENT_STATUSES.map(s => (
                          <button key={s} onClick={() => updateStatus(order.id, order.orderStatus, s)}
                            className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold transition ${order.paymentStatus === s ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-[#2A2F45] text-[#8B8FA8] hover:border-[#D4AF37]/30'}`}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="py-20 text-center text-[#8B8FA8] text-sm">No orders found.</div>
          )}
        </div>
      </div>
    </main>
  );
}
