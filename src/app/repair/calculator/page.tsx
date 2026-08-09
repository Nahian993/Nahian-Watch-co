'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { formatBDT } from '@/lib/formatters';

const SERVICES = [
  { id: 'battery', name: 'Battery Replacement', min: 150, max: 500, days: '1–2 Days' },
  { id: 'glass', name: 'Glass Replacement', min: 400, max: 1500, days: '2–4 Days' },
  { id: 'strap', name: 'Strap Fitting', min: 100, max: 300, days: 'Same Day' },
  { id: 'movement', name: 'Movement Servicing', min: 800, max: 3000, days: '5–10 Days' },
  { id: 'water', name: 'Water Damage Inspection', min: 300, max: 800, days: '2–3 Days' },
  { id: 'full', name: 'Full Watch Servicing', min: 1500, max: 5000, days: '7–14 Days' },
];

const WATCH_TYPES = ['Quartz', 'Automatic', 'Solar', 'Digital', 'Smartwatch'];

export default function RepairCalculatorPage() {
  const { language } = useLanguage();
  const [selectedService, setSelectedService] = useState('');
  const [watchType, setWatchType] = useState('Quartz');

  const service = SERVICES.find(s => s.id === selectedService);

  // Multiplier for complexity
  const multiplier = watchType === 'Automatic' ? 1.4 : watchType === 'Smartwatch' ? 1.3 : watchType === 'Solar' ? 1.2 : 1.0;
  const rawMin = service ? service.min * multiplier : 0;
  const rawMax = service ? service.max * multiplier : 0;
  const estimatedMin = service ? Math.floor(rawMin / 50) * 50 : 0;
  const estimatedMax = service ? Math.max(estimatedMin, Math.ceil(rawMax / 50) * 50) : 0;

  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <nav className="flex items-center gap-2 text-xs text-[#8B8FA8] mb-6">
          <Link href="/repair" className="hover:text-[#D4AF37]">Repair Hub</Link><span>›</span><span className="text-[#F9FAFB]">Quote Calculator</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-gold-gradient mb-2">Instant Repair Quote</h1>
        <p className="text-[#9CA3AF] text-sm mb-8">Select your repair type and watch type to get an estimated cost and turnaround time.</p>

        {/* Service Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-[#F9FAFB] mb-3">1. What repair do you need?</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SERVICES.map(s => (
              <button key={s.id} type="button" onClick={() => setSelectedService(s.id)}
                className={`text-left p-4 rounded-xl border-2 transition ${selectedService === s.id ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-[#1F2937] bg-[#111827] hover:border-[#D4AF37]/40'}`}>
                <p className={`text-sm font-semibold ${selectedService === s.id ? 'text-[#D4AF37]' : 'text-[#F9FAFB]'}`}>{s.name}</p>
                <p className="text-xs text-[#8B8FA8] mt-1">{formatBDT(s.min, language)} – {formatBDT(s.max, language)}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Watch Type */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-[#F9FAFB] mb-3">2. What type of watch?</label>
          <div className="flex flex-wrap gap-2">
            {WATCH_TYPES.map(wt => (
              <button key={wt} type="button" onClick={() => setWatchType(wt)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${watchType === wt ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-[#2A2F45] text-[#9CA3AF] hover:border-[#D4AF37]/40'}`}>
                {wt}
              </button>
            ))}
          </div>
        </div>

        {/* Quote Result */}
        {service ? (
          <div className="bg-[#111827] border-2 border-[#D4AF37]/50 rounded-2xl p-6 mb-6 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
            <p className="text-xs text-[#D4AF37] uppercase tracking-widest font-semibold mb-4">Estimated Quote</p>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-bold text-[#F9FAFB]">{formatBDT(estimatedMin, language)}</span>
              <span className="text-xl text-[#8B8FA8]">–</span>
              <span className="text-4xl font-bold text-[#F9FAFB]">{formatBDT(estimatedMax, language)}</span>
            </div>
            <p className="text-sm text-[#9CA3AF] mb-1">{service.name} · {watchType} Watch</p>
            <p className="text-sm text-[#D4AF37] font-medium">⏱ Turnaround: {service.days}</p>
            <p className="text-xs text-[#8B8FA8] mt-3">* Final price depends on watch condition assessed at our workshop. Quote is an estimate only.</p>
          </div>
        ) : (
          <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6 mb-6 text-center text-[#8B8FA8] text-sm">
            Select a repair service above to see your instant estimate.
          </div>
        )}

        <div className="flex gap-3">
          <Link href={selectedService ? `/repair/book?service=${selectedService}` : '/repair/book'}
            className="flex-1 text-center py-3.5 bg-[#D4AF37] text-[#0B0F19] font-bold rounded-xl hover:bg-[#C5A059] transition">
            Book This Repair →
          </Link>
          <Link href="/repair/track" className="flex-1 text-center py-3.5 border border-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB] hover:border-[#D4AF37]/40 rounded-xl font-medium transition">
            Track Existing Repair
          </Link>
        </div>
      </div>
    </main>
  );
}
