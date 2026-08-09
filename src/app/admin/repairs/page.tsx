'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { RepairTicket, RepairStatus } from '@/types';
import { formatBDT } from '@/lib/formatters';

const STATUSES: RepairStatus[] = ['Submitted','Received','Inspection','In Progress','Quality Check','Ready for Pickup','Completed','Cancelled'];

const STATUS_COLORS: Record<string, string> = {
  Submitted: 'bg-[#2A2F45] text-[#9CA3AF] border-[#2A2F45]',
  Received: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  Inspection: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  'In Progress': 'bg-orange-500/10 text-orange-400 border-orange-500/30',
  'Quality Check': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  'Ready for Pickup': 'bg-teal-500/10 text-teal-400 border-teal-500/30',
  Completed: 'bg-green-500/10 text-green-400 border-green-500/30',
  Cancelled: 'bg-red-500/10 text-red-400 border-red-500/30',
};

export default function AdminRepairsPage() {
  const [repairs, setRepairs] = useState<RepairTicket[]>([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editNote, setEditNote] = useState<Record<string, string>>({});
  const [editCost, setEditCost] = useState<Record<string, string>>({});
  const [toast, setToast] = useState('');

  const load = () => setRepairs(db.getRepairs());
  useEffect(() => { load(); }, []);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const updateStatus = (id: string, status: RepairStatus) => {
    db.updateRepairTicket(id, { status });
    load();
    showToast(`Status updated to ${status}`);
  };

  const saveFinalCost = (id: string) => {
    const raw = editCost[id];
    if (raw !== undefined && raw !== '') {
      const cost = Number(raw);
      if (!isNaN(cost) && cost >= 0) {
        db.updateRepairTicket(id, { finalCost: cost });
        load();
        showToast('Final cost saved');
      }
    }
  };

  const filtered = repairs.filter(r => {
    const matchFilter = filter === 'All' || r.status === filter;
    const matchSearch = !search || r.ticketNumber.toLowerCase().includes(search.toLowerCase()) || r.customerName.toLowerCase().includes(search.toLowerCase()) || r.customerPhone.includes(search) || r.watchBrand.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB]">
      {toast && <div className="fixed top-4 right-4 z-50 bg-green-500 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-lg">✓ {toast}</div>}

      <header className="bg-[#111827] border-b border-[#1F2937] px-6 py-4 flex items-center gap-3">
        <Link href="/admin" className="text-[#8B8FA8] hover:text-[#D4AF37] text-sm transition">← Dashboard</Link>
        <span className="text-[#2A2F45]">|</span>
        <h1 className="text-base font-bold text-[#D4AF37]">Repair Ticket Manager</h1>
        <span className="ml-auto text-sm text-[#8B8FA8]">{repairs.length} total tickets</span>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search ticket, name, phone, brand..."
            className="flex-1 min-w-[200px] bg-[#111827] border border-[#1F2937] focus:border-[#D4AF37] text-[#F9FAFB] rounded-xl px-4 py-2.5 text-sm outline-none transition" />
          <div className="flex flex-wrap gap-1.5">
            {['All', 'Submitted', 'In Progress', 'Ready for Pickup', 'Completed'].map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold border transition ${filter === s ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-[#2A2F45] text-[#9CA3AF] hover:border-[#D4AF37]/40'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map(ticket => (
            <div key={ticket.id} className="bg-[#111827] border border-[#1F2937] rounded-xl overflow-hidden">
              <div className="px-5 py-4 flex flex-wrap items-center gap-4 cursor-pointer hover:bg-[#0d1120] transition"
                onClick={() => setExpanded(expanded === ticket.id ? null : ticket.id)}>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-bold text-[#D4AF37] font-mono">{ticket.ticketNumber}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${STATUS_COLORS[ticket.status]}`}>{ticket.status}</span>
                  </div>
                  <p className="text-sm text-[#F9FAFB] font-medium">{ticket.customerName} · {ticket.customerPhone}</p>
                  <p className="text-xs text-[#8B8FA8]">{ticket.watchBrand} {ticket.watchModel} · {ticket.serviceRequested}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-[#F9FAFB]">
                    {ticket.finalCost ? formatBDT(ticket.finalCost) : `${formatBDT(ticket.estimatedCostRange.min)}–${formatBDT(ticket.estimatedCostRange.max)}`}
                  </p>
                  <p className="text-xs text-[#8B8FA8]">⏱ {typeof ticket.estimatedTurnaround === 'string' ? ticket.estimatedTurnaround : ticket.estimatedTurnaround.en}</p>
                  <p className="text-xs text-[#8B8FA8]">{new Date(ticket.createdAt).toLocaleDateString('en-BD', { day: 'numeric', month: 'short' })}</p>
                </div>
                <span className={`text-[#8B8FA8] transition-transform text-sm ${expanded === ticket.id ? 'rotate-180' : ''}`}>▾</span>
              </div>

              {expanded === ticket.id && (
                <div className="border-t border-[#1F2937] px-5 py-5 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div><span className="text-[#8B8FA8]">Watch Type: </span><span className="font-medium">{ticket.watchType}</span></div>
                    <div><span className="text-[#8B8FA8]">District: </span><span className="font-medium">{ticket.district}</span></div>
                    <div className="sm:col-span-2"><span className="text-[#8B8FA8]">Problem: </span><span className="text-[#9CA3AF] italic">"{ticket.problemDescription}"</span></div>
                  </div>

                  {/* Status Update */}
                  <div>
                    <p className="text-xs text-[#8B8FA8] uppercase tracking-widest font-semibold mb-2">Update Status</p>
                    <div className="flex flex-wrap gap-1.5">
                      {STATUSES.map(s => (
                        <button key={s} onClick={() => updateStatus(ticket.id, s)}
                          className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold transition ${ticket.status === s ? STATUS_COLORS[s] : 'border-[#2A2F45] text-[#8B8FA8] hover:border-[#D4AF37]/30'}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Final Cost */}
                  <div>
                    <p className="text-xs text-[#8B8FA8] uppercase tracking-widest font-semibold mb-2">Set Final Cost</p>
                    <div className="flex gap-2 max-w-xs">
                      <input type="number" placeholder={`e.g. ${ticket.estimatedCostRange.min}`}
                        value={editCost[ticket.id] ?? (ticket.finalCost?.toString() ?? '')}
                        onChange={e => setEditCost(c => ({ ...c, [ticket.id]: e.target.value }))}
                        className="flex-1 bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] text-[#F9FAFB] rounded-lg px-3 py-2 text-sm outline-none transition" />
                      <button onClick={() => saveFinalCost(ticket.id)}
                        className="px-4 py-2 bg-[#D4AF37] text-[#0B0F19] font-bold text-xs rounded-lg hover:bg-[#C5A059] transition">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="py-20 text-center text-[#8B8FA8] text-sm">No repair tickets found.</div>
          )}
        </div>
      </div>
    </main>
  );
}
