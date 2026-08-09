'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';

interface Stats {
  totalProducts: number;
  totalOrders: number;
  pendingOrders: number;
  totalRepairs: number;
  activeRepairs: number;
  lowStockCount: number;
  pendingReviews: number;
  todayRevenue: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const products = db.getProducts();
    const orders = db.getOrders();
    const repairs = db.getRepairs();
    const reviews = db.getReviews();

    const today = new Date().toDateString();
    const todayRevenue = orders
      .filter(o => new Date(o.createdAt).toDateString() === today)
      .reduce((sum, o) => sum + o.totalAmount, 0);

    setStats({
      totalProducts: products.length,
      totalOrders: orders.length,
      pendingOrders: orders.filter(o => o.orderStatus?.toLowerCase() === 'pending').length,
      totalRepairs: repairs.length,
      activeRepairs: repairs.filter(r => !['completed', 'cancelled'].includes(r.status?.toLowerCase())).length,
      lowStockCount: products.filter(p => p.stockQuantity <= 5).length,
      pendingReviews: reviews.filter(r => r.status?.toLowerCase() === 'pending').length,
      todayRevenue,
    });
  }, []);

  const cards = stats ? [
    { label: 'Total Products', value: stats.totalProducts, sub: `${stats.lowStockCount} low stock`, icon: '📦', href: '/admin/products', color: 'text-blue-400', alert: stats.lowStockCount > 0 },
    { label: 'Total Orders', value: stats.totalOrders, sub: `${stats.pendingOrders} pending`, icon: '🛍️', href: '/admin/orders', color: 'text-[#D4AF37]', alert: stats.pendingOrders > 0 },
    { label: 'Repair Tickets', value: stats.totalRepairs, sub: `${stats.activeRepairs} active`, icon: '⚙️', href: '/admin/repairs', color: 'text-purple-400', alert: false },
    { label: 'Pending Reviews', value: stats.pendingReviews, sub: 'awaiting moderation', icon: '💬', href: '/admin/reviews', color: 'text-green-400', alert: stats.pendingReviews > 0 },
    { label: 'AI Telemetry & IPs', value: 'Live', sub: 'hardware & IP intelligence', icon: '⚡', href: '/admin/telemetry', color: 'text-amber-400', alert: false },
    { label: 'Analytics Dashboard', value: `৳${stats.todayRevenue.toLocaleString('en-BD')}`, sub: 'revenue & conversion metrics', icon: '📈', href: '/admin/analytics', color: 'text-emerald-400', alert: false },
  ] : [];

  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB]">
      {/* Admin Header */}
      <header className="bg-[#111827] border-b border-[#1F2937] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-lg font-bold text-[#D4AF37] font-serif">CROWN WATCH CO.</h1>
            <p className="text-xs text-[#8B8FA8]">Admin Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" target="_blank" className="text-xs text-[#8B8FA8] hover:text-[#D4AF37] transition border border-[#2A2F45] px-3 py-1.5 rounded-lg">
            View Store ↗
          </Link>
          <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-sm font-bold text-[#D4AF37]">A</div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#F9FAFB] mb-1">Overview</h2>
          <p className="text-[#8B8FA8] text-sm">{new Date().toLocaleDateString('en-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        {/* Stat Cards */}
        {stats ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {cards.map(card => (
              <Link key={card.label} href={card.href}
                className="group bg-[#111827] border border-[#1F2937] hover:border-[#D4AF37]/50 rounded-xl p-5 transition-all duration-200 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)] relative">
                {card.alert && (
                  <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-orange-400 animate-pulse" />
                )}
                <div className="text-3xl mb-3">{card.icon}</div>
                <div className={`text-3xl font-bold mb-1 ${card.color}`}>{card.value}</div>
                <div className="text-sm font-semibold text-[#F9FAFB] mb-1">{card.label}</div>
                <div className="text-xs text-[#8B8FA8]">{card.sub}</div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-[#111827] border border-[#1F2937] rounded-xl p-5 animate-pulse">
                <div className="w-10 h-10 bg-[#1F2937] rounded-lg mb-3" />
                <div className="h-8 bg-[#1F2937] rounded w-1/2 mb-2" />
                <div className="h-3 bg-[#1F2937] rounded w-3/4" />
              </div>
            ))}
          </div>
        )}

        {/* Quick Nav */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { href: '/admin/products', label: 'Manage Products', desc: 'Add, edit, delete products & update stock', icon: '📦' },
            { href: '/admin/orders', label: 'Manage Orders', desc: 'View orders, verify payments, update status', icon: '🛍️' },
            { href: '/admin/repairs', label: 'Manage Repairs', desc: 'Update repair ticket statuses & notes', icon: '⚙️' },
            { href: '/admin/reviews', label: 'Moderate Reviews', desc: 'Approve or reject customer reviews', icon: '💬' },
          ].map(nav => (
            <Link key={nav.href} href={nav.href}
              className="group bg-[#111827] border border-[#1F2937] hover:border-[#D4AF37]/50 rounded-xl p-5 transition-all hover:shadow-[0_0_15px_rgba(212,175,55,0.08)]">
              <div className="text-2xl mb-3">{nav.icon}</div>
              <h3 className="text-sm font-bold text-[#F9FAFB] group-hover:text-[#D4AF37] transition mb-1">{nav.label}</h3>
              <p className="text-xs text-[#8B8FA8]">{nav.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
