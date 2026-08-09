'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { db } from '@/lib/db';
import { formatBDT } from '@/lib/formatters';
import { RepairTicket } from '@/types';

const STATUS_ORDER = ['Submitted', 'Received', 'Inspection', 'In Progress', 'Quality Check', 'Ready for Pickup', 'Completed'];
const COMPLETED_STATUSES = new Set(['completed', 'received']);
const CURRENT_STATUSES = new Set(['current', 'inspecting', 'in_repair', 'ready_for_pickup']);

type DisplayTimelineEntry = {
  step: string;
  status: 'completed' | 'current' | 'upcoming';
  timestamp?: string;
  note?: string;
};

function toDisplayTimelineEntry(entry: unknown, index: number, language: 'en' | 'bn'): DisplayTimelineEntry {
  const raw = (entry && typeof entry === 'object' ? entry : {}) as Record<string, unknown>;
  const title = raw.title && typeof raw.title === 'object'
    ? (raw.title as Record<string, unknown>)[language]
    : raw.title;
  const step = typeof raw.step === 'string' ? raw.step : typeof title === 'string' ? title : `Repair update ${index + 1}`;
  const rawStatus = typeof raw.status === 'string' ? raw.status.toLowerCase() : '';
  const status = COMPLETED_STATUSES.has(rawStatus)
    ? 'completed'
    : CURRENT_STATUSES.has(rawStatus)
      ? 'current'
      : 'upcoming';
  return {
    step,
    status,
    timestamp: typeof raw.timestamp === 'string' ? raw.timestamp : undefined,
    note: typeof raw.note === 'string' ? raw.note : undefined,
  };
}


function RepairTrackContent() {
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const [query, setQuery] = useState(searchParams.get('ticket') ?? '');
  const [ticket, setTicket] = useState<RepairTicket | null>(null);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = () => {
    setSearched(true);
    setError('');
    setTicket(null);
    if (!query.trim()) {
      setError('Please enter your Ticket ID.');
      return;
    }
    const found = db.getRepairByTicketNumber(query.trim().toUpperCase());
    if (found) setTicket(found);
    else setError('No repair ticket found. Please check your Ticket ID and try again.');
  };

  useEffect(() => {
    const tParam = searchParams.get('ticket');
    if (tParam) {
      setQuery(tParam);
      setSearched(true);
      setError('');
      const found = db.getRepairByTicketNumber(tParam.trim().toUpperCase());
      if (found) setTicket(found);
      else setError('No repair ticket found. Please check your Ticket ID and try again.');
    }
  }, [searchParams]);

  const currentStepIdx = ticket ? Math.max(0, STATUS_ORDER.indexOf(ticket.status)) : -1;
  const displayTimeline: DisplayTimelineEntry[] = ticket
    ? Array.isArray(ticket.timeline) && ticket.timeline.length > 0
      ? ticket.timeline.map((entry, index) => toDisplayTimelineEntry(entry, index, language as 'en' | 'bn'))
      : STATUS_ORDER.map((step, index) => ({
          step,
          status: index < currentStepIdx ? 'completed' as const : index === currentStepIdx ? 'current' as const : 'upcoming' as const,
          timestamp: index === 0 ? ticket.createdAt : undefined,
        }))
    : [];

  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB]">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <nav className="mb-6 flex items-center gap-2 text-xs text-[#8B8FA8]">
          <Link href="/repair" className="hover:text-[#D4AF37]">Repair Hub</Link><span>›</span><span className="text-[#F9FAFB]">Track Repair</span>
        </nav>

        <h1 className="mb-2 font-serif text-2xl font-bold text-gold-gradient sm:text-3xl">Track your repair</h1>
        <p className="mb-8 text-sm text-[#9CA3AF]">Enter your Ticket ID to see the latest repair status.</p>

        <div className="mb-8 flex gap-3">
          <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} placeholder="CROWN-REP-2026-XXXX" aria-label="Repair ticket ID" className="flex-1 rounded-xl border border-[#1F2937] bg-[#111827] px-4 py-3 font-mono text-sm uppercase text-[#F9FAFB] outline-none transition placeholder:font-sans placeholder:text-[#8B8FA8] focus:border-[#D4AF37]" />
          <button type="button" onClick={handleSearch} className="rounded-xl bg-[#D4AF37] px-6 py-3 font-bold text-[#0B0F19] transition hover:bg-[#C5A059]">Track</button>
        </div>

        {searched && error && <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">{error}</div>}

        {ticket && (
          <div className="overflow-hidden rounded-2xl border border-[#1F2937] bg-[#111827]">
            <div className="flex items-center justify-between border-b border-[#1F2937] bg-[#D4AF37]/5 px-6 py-4">
              <div><p className="text-xs uppercase tracking-wider text-[#8B8FA8]">Ticket</p><p className="font-mono font-bold text-[#D4AF37]">{ticket.ticketNumber}</p></div>
              <span className="rounded-full border border-[#2A2F45] bg-[#2A2F45] px-3 py-1 text-xs font-semibold text-[#9CA3AF]">{ticket.status}</span>
            </div>

            <div className="px-6 py-6">
              <div className="mb-8">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">Repair progress</p>
                <div className="space-y-4">
                  {displayTimeline.map((entry, i) => (
                    <div key={`${entry.step}-${i}`} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${entry.status === 'completed' ? 'border-green-500 bg-green-500 text-white' : entry.status === 'current' ? 'border-[#D4AF37] bg-[#D4AF37] text-[#0B0F19]' : 'border-[#2A2F45] bg-[#0B0F19] text-[#8B8FA8]'}`}>{entry.status === 'completed' ? '✓' : i + 1}</div>
                        {i < displayTimeline.length - 1 && <div className={`mt-1 h-8 w-0.5 ${entry.status === 'completed' ? 'bg-green-500/40' : 'bg-[#2A2F45]'}`} />}
                      </div>
                      <div className="pb-4">
                        <p className={`text-sm font-semibold ${entry.status === 'current' ? 'text-[#D4AF37]' : entry.status === 'completed' ? 'text-[#F9FAFB]' : 'text-[#8B8FA8]'}`}>{entry.step}</p>
                        {entry.timestamp && entry.status !== 'upcoming' && <p className="mt-0.5 text-xs text-[#8B8FA8]">{entry.timestamp.includes('T') ? new Date(entry.timestamp).toLocaleDateString('en-BD', { day: 'numeric', month: 'short', year: 'numeric' }) : entry.timestamp}</p>}
                        {entry.note && <p className="mt-1 text-xs italic text-[#9CA3AF]">{entry.note}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 border-t border-[#1F2937] pt-5 text-sm">
                <div className="flex justify-between gap-4"><span className="text-[#9CA3AF]">Watch</span><span className="text-right font-medium">{ticket.watchBrand} {ticket.watchModel}</span></div>
                <div className="flex justify-between gap-4"><span className="text-[#9CA3AF]">Service</span><span className="text-right font-medium">{ticket.serviceRequested}</span></div>
                <div className="flex justify-between gap-4"><span className="text-[#9CA3AF]">Estimated cost</span><span className="font-bold text-[#D4AF37]">{ticket.finalCost ? formatBDT(ticket.finalCost, language) : `${formatBDT(ticket.estimatedCostRange.min, language)} – ${formatBDT(ticket.estimatedCostRange.max, language)}`}</span></div>
                <div className="flex justify-between gap-4"><span className="text-[#9CA3AF]">Turnaround</span><span>{typeof ticket.estimatedTurnaround === 'string' ? ticket.estimatedTurnaround : ticket.estimatedTurnaround[language]}</span></div>
                <div className="flex justify-between gap-4"><span className="text-[#9CA3AF]">Submitted</span><span>{new Date(ticket.createdAt).toLocaleDateString('en-BD', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-center"><p className="mb-3 text-xs text-[#8B8FA8]">Didn’t receive your ticket ID?</p><Link href="/contact" className="text-xs text-[#D4AF37] hover:underline">Contact Crown Watch Support →</Link></div>
      </div>
    </main>
  );
}

export default function RepairTrackPage() {
  return (
    <Suspense fallback={<main className="flex min-h-[55vh] items-center justify-center text-sm text-[#9CA3AF]">Loading repair tracker…</main>}>
      <RepairTrackContent />
    </Suspense>
  );
}
