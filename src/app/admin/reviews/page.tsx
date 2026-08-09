'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { Review } from '@/types';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('Pending');
  const [toast, setToast] = useState('');

  const load = () => setReviews(db.getReviews());
  useEffect(() => { load(); }, []);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const moderate = (id: string, status: 'Approved' | 'Rejected') => {
    db.moderateReview(id, status);
    load();
    showToast(`Review ${status.toLowerCase()}`);
  };

  const filtered = filter === 'All' ? reviews : reviews.filter(r => r.status?.toLowerCase() === filter.toLowerCase());

  const counts = {
    All: reviews.length,
    Pending: reviews.filter(r => r.status?.toLowerCase() === 'pending').length,
    Approved: reviews.filter(r => r.status?.toLowerCase() === 'approved').length,
    Rejected: reviews.filter(r => r.status?.toLowerCase() === 'rejected').length,
  };

  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB]">
      {toast && <div className="fixed top-4 right-4 z-50 bg-green-500 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-lg">✓ {toast}</div>}

      <header className="bg-[#111827] border-b border-[#1F2937] px-6 py-4 flex items-center gap-3">
        <Link href="/admin" className="text-[#8B8FA8] hover:text-[#D4AF37] text-sm transition">← Dashboard</Link>
        <span className="text-[#2A2F45]">|</span>
        <h1 className="text-base font-bold text-[#D4AF37]">Review Moderation</h1>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {(['All', 'Pending', 'Approved', 'Rejected'] as const).map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold border transition flex items-center gap-2 ${filter === s ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-[#2A2F45] text-[#9CA3AF] hover:border-[#D4AF37]/40'}`}>
              {s}
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${filter === s ? 'bg-[#D4AF37]/20' : 'bg-[#2A2F45]'}`}>
                {counts[s]}
              </span>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map(review => {
            const isPending = review.status?.toLowerCase() === 'pending';
            const isApproved = review.status?.toLowerCase() === 'approved';
            return (
              <div key={review.id} className={`bg-[#111827] border rounded-xl p-5 ${
                isPending ? 'border-yellow-500/30' :
                isApproved ? 'border-green-500/20' : 'border-red-500/20'
              }`}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-[#F9FAFB]">{review.customerName}</p>
                      {review.isVerifiedPurchase && (
                        <span className="text-[10px] font-semibold text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full">✓ Verified</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="flex">
                        {[1,2,3,4,5].map(s => (
                          <svg key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? 'text-[#D4AF37]' : 'text-[#2A2F45]'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-[#8B8FA8]">{new Date(review.createdAt).toLocaleDateString('en-BD', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border shrink-0 ${
                    isPending ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' :
                    isApproved ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                    'bg-red-500/10 text-red-400 border-red-500/30'
                  }`}>
                    {review.status}
                  </span>
                </div>

                <p className="text-sm text-[#9CA3AF] italic mb-4">"{review.comment}"</p>

                {isPending && (
                  <div className="flex gap-3">
                    <button onClick={() => moderate(review.id, 'Approved')}
                      className="px-5 py-2 bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 text-sm font-semibold rounded-lg transition">
                      ✓ Approve
                    </button>
                    <button onClick={() => moderate(review.id, 'Rejected')}
                      className="px-5 py-2 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-sm font-semibold rounded-lg transition">
                      ✗ Reject
                    </button>
                  </div>
                )}
                {!isPending && (
                  <button onClick={() => moderate(review.id, isApproved ? 'Rejected' : 'Approved')}
                    className="text-xs text-[#8B8FA8] hover:text-[#D4AF37] transition underline">
                    Change to {isApproved ? 'Rejected' : 'Approved'}
                  </button>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="py-20 text-center text-[#8B8FA8] text-sm">No {filter.toLowerCase()} reviews.</div>
          )}
        </div>
      </div>
    </main>
  );
}
