'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { Order, Product, UserTelemetryProfile } from '@/types';
import { formatBDT } from '@/lib/formatters';
import { TrendingUp, DollarSign, ShoppingBag, Percent, Award, ArrowLeft, RefreshCw, BarChart2 } from 'lucide-react';

interface TopProduct {
  productId: string;
  title: string;
  brand: string;
  quantity: number;
  revenue: number;
}

export default function AdminAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [revenue, setRevenue] = useState(0);
  const [aov, setAov] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [deviceStats, setDeviceStats] = useState({ mobileViews: 0, desktopViews: 0 });

  const calculateAnalytics = () => {
    setLoading(true);
    try {
      const orders = db.getOrders();
      const telemetry = db.getTelemetryProfiles();
      const allProducts = db.getProducts();

      // 1. Calculate Revenue & AOV
      // Include processing, shipped, and delivered orders, excluding cancelled
      const activeOrders = orders.filter(
        (o) => o.orderStatus?.toLowerCase() !== 'cancelled'
      );
      const totalRev = activeOrders.reduce((sum, o) => sum + o.totalAmount, 0);
      const calculatedAov = activeOrders.length > 0 ? totalRev / activeOrders.length : 0;

      // 2. Conversion Rate (Orders / Unique Visitors)
      // Fallback if telemetry is empty
      const uniqueVisitors = Math.max(telemetry.length, 12); 
      const convRate = (orders.length / uniqueVisitors) * 100;

      // 3. Aggregate Top Selling Products
      const salesMap: Record<string, { quantity: number; revenue: number }> = {};
      
      orders.forEach((order) => {
        if (order.orderStatus?.toLowerCase() === 'cancelled') return;
        order.items.forEach((item) => {
          if (!item.productId) return;
          const qty = item.quantity || 1;
          const price = item.price || 0;
          if (salesMap[item.productId]) {
            salesMap[item.productId].quantity += qty;
            salesMap[item.productId].revenue += price * qty;
          } else {
            salesMap[item.productId] = { quantity: qty, revenue: price * qty };
          }
        });
      });

      const topList: TopProduct[] = Object.entries(salesMap)
        .map(([pId, data]) => {
          const product = allProducts.find((p) => p.id === pId);
          return {
            productId: pId,
            title: product?.title?.en || 'Deleted Product',
            brand: product?.brand || 'Unknown',
            quantity: data.quantity,
            revenue: data.revenue,
          };
        })
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5);

      // 4. Device Telemetry View Splits
      let mobileViews = 0;
      let desktopViews = 0;
      telemetry.forEach((t) => {
        if (t.deviceType === 'mobile') mobileViews += t.totalViews || 1;
        else desktopViews += t.totalViews || 1;
      });

      setRevenue(totalRev);
      setAov(calculatedAov);
      setTotalOrders(orders.length);
      setConversionRate(convRate);
      setTopProducts(topList);
      setDeviceStats({ mobileViews, desktopViews });

    } catch (e) {
      console.error('Failed to calculate analytics', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateAnalytics();
  }, []);

  return (
    <div className="p-6 bg-[#0B0F19] min-h-screen text-[#F9FAFB]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-[#1F2937] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1">
            <BarChart2 className="w-4 h-4" /> Operations Control
          </div>
          <h1 className="text-3xl font-bold font-serif text-gold-gradient">
            Analytics & Sales Dashboard
          </h1>
          <p className="text-sm text-[#9CA3AF] mt-1">
            Overview of total revenue, purchase conversion rates, device metrics, and top-performing luxury products.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={calculateAnalytics}
            className="flex items-center gap-2 bg-[#111827] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#D4AF37] px-4 py-2 rounded-xl text-sm font-semibold transition"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh Data
          </button>
          <Link
            href="/admin"
            className="flex items-center gap-1.5 bg-[#1F2937] border border-gray-700 text-[#9CA3AF] hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition"
          >
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-[#9CA3AF]">Calculating analytics metrics...</div>
      ) : (
        <div className="space-y-8">
          {/* Top-line Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-[#111827] border border-[#1F2937] p-5 rounded-2xl">
              <div className="flex items-center justify-between text-[#8B8FA8] text-xs font-semibold uppercase tracking-wider mb-2">
                <span>Total Gross Revenue</span>
                <DollarSign className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div className="text-3xl font-bold font-serif text-[#F9FAFB]">{formatBDT(revenue, 'en')}</div>
              <div className="text-xs text-[#9CA3AF] mt-1">Active order totals</div>
            </div>

            <div className="bg-[#111827] border border-[#1F2937] p-5 rounded-2xl">
              <div className="flex items-center justify-between text-[#8B8FA8] text-xs font-semibold uppercase tracking-wider mb-2">
                <span>Average Order Value (AOV)</span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-bold font-serif text-[#F9FAFB]">{formatBDT(aov, 'en')}</div>
              <div className="text-xs text-[#9CA3AF] mt-1">Average transaction value</div>
            </div>

            <div className="bg-[#111827] border border-[#1F2937] p-5 rounded-2xl">
              <div className="flex items-center justify-between text-[#8B8FA8] text-xs font-semibold uppercase tracking-wider mb-2">
                <span>Total Orders</span>
                <ShoppingBag className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-3xl font-bold font-serif text-[#F9FAFB]">{totalOrders}</div>
              <div className="text-xs text-[#9CA3AF] mt-1">Order transactions submitted</div>
            </div>

            <div className="bg-[#111827] border border-[#1F2937] p-5 rounded-2xl">
              <div className="flex items-center justify-between text-[#8B8FA8] text-xs font-semibold uppercase tracking-wider mb-2">
                <span>Purchase Conversion Rate</span>
                <Percent className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-3xl font-bold font-serif text-emerald-400">{conversionRate.toFixed(2)}%</div>
              <div className="text-xs text-[#9CA3AF] mt-1">Order-to-Visitor session ratio</div>
            </div>
          </div>

          {/* Lower Grid: Top Selling Products + Device Conversion split */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Top Products */}
            <div className="lg:col-span-2 bg-[#111827] border border-[#1F2937] rounded-2xl p-6">
              <h3 className="text-lg font-bold font-serif text-[#F9FAFB] mb-5 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#D4AF37]" /> Top Performing Products
              </h3>

              {topProducts.length === 0 ? (
                <div className="text-center py-8 text-xs text-[#9CA3AF]">No sales transactions completed yet to determine top products.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-[#1F2937] text-[#8B8FA8] text-xs font-bold uppercase">
                        <th className="pb-3">Product Name</th>
                        <th className="pb-3">Brand</th>
                        <th className="pb-3 text-center">Qty Sold</th>
                        <th className="pb-3 text-right">Revenue Generated</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1F2937]">
                      {topProducts.map((p, idx) => (
                        <tr key={p.productId} className="hover:bg-[#1F2937]/20">
                          <td className="py-4 font-semibold text-[#F9FAFB] flex items-center gap-2">
                            <span className="w-5 h-5 rounded bg-[#D4AF37]/10 text-[#D4AF37] font-bold text-xs flex items-center justify-center">
                              {idx + 1}
                            </span>
                            {p.title}
                          </td>
                          <td className="py-4 text-[#9CA3AF]">{p.brand}</td>
                          <td className="py-4 text-center font-mono font-bold text-[#F9FAFB]">{p.quantity}</td>
                          <td className="py-4 text-right font-mono font-bold text-[#D4AF37]">
                            {formatBDT(p.revenue, 'en')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Device Affinity & Live Conversion Info */}
            <div className="lg:col-span-1 bg-[#111827] border border-[#1F2937] rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold font-serif text-[#F9FAFB] mb-5">
                  Device Engagement Splits
                </h3>
                
                <div className="space-y-6">
                  {/* Mobile split */}
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-[#9CA3AF]">Mobile View Engagement</span>
                      <span className="font-semibold text-[#F9FAFB]">{deviceStats.mobileViews} views</span>
                    </div>
                    <div className="w-full bg-[#0B0F19] h-2.5 rounded-full overflow-hidden border border-[#1F2937]">
                      <div
                        className="bg-blue-500 h-full"
                        style={{
                          width: `${
                            deviceStats.mobileViews + deviceStats.desktopViews > 0
                              ? (deviceStats.mobileViews / (deviceStats.mobileViews + deviceStats.desktopViews)) * 100
                              : 50
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Desktop split */}
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-[#9CA3AF]">Desktop View Engagement</span>
                      <span className="font-semibold text-[#F9FAFB]">{deviceStats.desktopViews} views</span>
                    </div>
                    <div className="w-full bg-[#0B0F19] h-2.5 rounded-full overflow-hidden border border-[#1F2937]">
                      <div
                        className="bg-emerald-400 h-full"
                        style={{
                          width: `${
                            deviceStats.mobileViews + deviceStats.desktopViews > 0
                              ? (deviceStats.desktopViews / (deviceStats.mobileViews + deviceStats.desktopViews)) * 100
                              : 50
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-[#0B0F19] p-4 rounded-xl border border-[#1F2937] text-xs text-[#9CA3AF] space-y-2">
                <div className="font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
                  💡 AI Business Suggestion
                </div>
                {conversionRate < 5 ? (
                  <p>Conversion rate is lower than 5%. We recommend launching a dynamic countdown deal banner or introducing localized discount coupons to drive immediate purchase intent.</p>
                ) : (
                  <p>Conversion rates are performing healthy. Emphasize marketing on your top luxury automatic watch categories to capture higher average cart values.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
