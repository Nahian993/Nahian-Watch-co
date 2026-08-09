'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { db } from '@/lib/db';
import { WatchType } from '@/types';

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
const SERVICES = ['Battery Replacement','Glass Replacement','Strap Fitting','Movement Servicing','Water Damage Inspection','Full Watch Servicing'];
const WATCH_TYPES: WatchType[] = ['Quartz','Automatic','Solar','Digital','Smartwatch'];
const PRICING: Record<string, { min: number; max: number; days: string }> = {
  'Battery Replacement': { min: 150, max: 500, days: '1–2 Days' },
  'Glass Replacement': { min: 400, max: 1500, days: '2–4 Days' },
  'Strap Fitting': { min: 100, max: 300, days: 'Same Day' },
  'Movement Servicing': { min: 800, max: 3000, days: '5–10 Days' },
  'Water Damage Inspection': { min: 300, max: 800, days: '2–3 Days' },
  'Full Watch Servicing': { min: 1500, max: 5000, days: '7–14 Days' },
};

function RepairBookContent() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();

  const preselectedService = searchParams.get('service')?.trim().toLowerCase();
  const normalizeService = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const resolvedService = preselectedService
    ? (SERVICES.find(s => {
        const normalized = normalizeService(s);
        return normalized === normalizeService(preselectedService) || normalized.includes(normalizeService(preselectedService));
      }) ?? '')
    : '';

  const [form, setForm] = useState({
    customerName: '',
    customerPhone: '',
    district: 'Dhaka',
    watchBrand: '',
    watchModel: '',
    watchType: 'Quartz' as WatchType,
    serviceRequested: resolvedService || SERVICES[0],
    problemDescription: '',
    pickupMethod: 'drop-off',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  const update = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  const pricing = PRICING[form.serviceRequested];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.customerName.trim()) errs.customerName = 'Name is required';
    if (!/^01[3-9]\d{8}$/.test(form.customerPhone)) errs.customerPhone = 'Enter a valid BD phone number';
    if (!form.watchBrand.trim()) errs.watchBrand = 'Watch brand is required';
    if (!form.problemDescription.trim()) errs.problemDescription = 'Briefly describe the issue';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      const ticket = db.createRepairTicket({
        customerName: form.customerName,
        customerPhone: form.customerPhone,
        district: form.district,
        watchBrand: form.watchBrand,
        watchModel: form.watchModel,
        watchType: form.watchType,
        serviceRequested: form.serviceRequested,
        problemDescription: form.problemDescription,
        deliveryMethod: form.pickupMethod === 'courier' ? 'courier' : 'dropoff',
        estimatedCostRange: { min: pricing.min, max: pricing.max },
        estimatedTurnaround: pricing.days,
      });
      setTicketNumber(ticket.ticketNumber);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500/40 mb-6">
            <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold font-serif text-[#F9FAFB] mb-2">Repair Ticket Submitted!</h1>
          <p className="text-[#9CA3AF] text-sm mb-6">Your repair ticket has been created. We will contact you shortly.</p>
          <div className="bg-[#111827] border border-[#D4AF37]/40 rounded-xl p-5 mb-6">
            <p className="text-xs text-[#8B8FA8] uppercase tracking-widest mb-2">Your Ticket Number</p>
            <p className="text-2xl font-bold text-[#D4AF37] font-mono">{ticketNumber}</p>
            <p className="text-xs text-[#8B8FA8] mt-2">Save this number to track your repair status</p>
          </div>
          <div className="flex gap-3">
            <Link href={`/repair/track?ticket=${ticketNumber}`} className="flex-1 py-3 bg-[#D4AF37] text-[#0B0F19] font-bold rounded-lg hover:bg-[#C5A059] transition">
              Track My Repair
            </Link>
            <Link href="/repair" className="flex-1 py-3 border border-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB] rounded-lg font-medium transition text-center">
              Back to Repair Hub
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <nav className="flex items-center gap-2 text-xs text-[#8B8FA8] mb-6">
          <Link href="/repair" className="hover:text-[#D4AF37]">Repair Hub</Link><span>›</span><span className="text-[#F9FAFB]">Book Repair</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-gold-gradient mb-2">Book a Repair</h1>
        <p className="text-[#9CA3AF] text-sm mb-8">Fill in your watch details and we'll create a repair ticket for you.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Info */}
          <section className="bg-[#111827] border border-[#1F2937] rounded-xl p-6 space-y-4">
            <h2 className="text-sm font-bold text-[#D4AF37] uppercase tracking-widest">Your Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#9CA3AF] font-medium mb-1.5">Full Name *</label>
                <input value={form.customerName} onChange={e => update('customerName', e.target.value)}
                  className={`w-full bg-[#0B0F19] border rounded-lg px-4 py-2.5 text-sm text-[#F9FAFB] outline-none transition ${errors.customerName ? 'border-red-500' : 'border-[#2A2F45] focus:border-[#D4AF37]'}`}
                  placeholder="Your full name" />
                {errors.customerName && <p className="text-xs text-red-400 mt-1">{errors.customerName}</p>}
              </div>
              <div>
                <label className="block text-xs text-[#9CA3AF] font-medium mb-1.5">Phone Number *</label>
                <input value={form.customerPhone} onChange={e => update('customerPhone', e.target.value)}
                  className={`w-full bg-[#0B0F19] border rounded-lg px-4 py-2.5 text-sm text-[#F9FAFB] outline-none transition ${errors.customerPhone ? 'border-red-500' : 'border-[#2A2F45] focus:border-[#D4AF37]'}`}
                  placeholder="01712345678" />
                {errors.customerPhone && <p className="text-xs text-red-400 mt-1">{errors.customerPhone}</p>}
              </div>
            </div>
            <div>
              <label className="block text-xs text-[#9CA3AF] font-medium mb-1.5">Your District</label>
              <select value={form.district} onChange={e => update('district', e.target.value)}
                className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] rounded-lg px-4 py-2.5 text-sm text-[#F9FAFB] outline-none transition">
                {BD_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </section>

          {/* Watch Info */}
          <section className="bg-[#111827] border border-[#1F2937] rounded-xl p-6 space-y-4">
            <h2 className="text-sm font-bold text-[#D4AF37] uppercase tracking-widest">Watch Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#9CA3AF] font-medium mb-1.5">Watch Brand *</label>
                <input value={form.watchBrand} onChange={e => update('watchBrand', e.target.value)}
                  className={`w-full bg-[#0B0F19] border rounded-lg px-4 py-2.5 text-sm text-[#F9FAFB] outline-none transition ${errors.watchBrand ? 'border-red-500' : 'border-[#2A2F45] focus:border-[#D4AF37]'}`}
                  placeholder="e.g. Casio, Seiko, Citizen" />
                {errors.watchBrand && <p className="text-xs text-red-400 mt-1">{errors.watchBrand}</p>}
              </div>
              <div>
                <label className="block text-xs text-[#9CA3AF] font-medium mb-1.5">Watch Model (Optional)</label>
                <input value={form.watchModel} onChange={e => update('watchModel', e.target.value)}
                  className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] rounded-lg px-4 py-2.5 text-sm text-[#F9FAFB] outline-none transition"
                  placeholder="e.g. G-Shock GA-2100" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-[#9CA3AF] font-medium mb-1.5">Watch Type</label>
              <div className="flex flex-wrap gap-2">
                {WATCH_TYPES.map(wt => (
                  <button key={wt} type="button" onClick={() => update('watchType', wt)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition ${form.watchType === wt ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-[#2A2F45] text-[#9CA3AF] hover:border-[#D4AF37]/40'}`}>
                    {wt}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Service Selection */}
          <section className="bg-[#111827] border border-[#1F2937] rounded-xl p-6 space-y-4">
            <h2 className="text-sm font-bold text-[#D4AF37] uppercase tracking-widest">Service Required</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SERVICES.map(s => (
                <button key={s} type="button" onClick={() => update('serviceRequested', s)}
                  className={`text-left px-4 py-3 rounded-xl border transition text-sm ${form.serviceRequested === s ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] font-semibold' : 'border-[#2A2F45] text-[#9CA3AF] hover:border-[#D4AF37]/40'}`}>
                  {s}
                </button>
              ))}
            </div>
            {pricing && (
              <div className="bg-[#0B0F19] rounded-lg p-3 border border-[#2A2F45]">
                <p className="text-xs text-[#8B8FA8]">Estimated cost: <span className="text-[#D4AF37] font-bold">৳{pricing.min.toLocaleString()} – ৳{pricing.max.toLocaleString()}</span> · Turnaround: <span className="text-[#F9FAFB]">{pricing.days}</span></p>
              </div>
            )}
            <div>
              <label className="block text-xs text-[#9CA3AF] font-medium mb-1.5">Describe the Problem *</label>
              <textarea value={form.problemDescription} onChange={e => update('problemDescription', e.target.value)} rows={4}
                className={`w-full bg-[#0B0F19] border rounded-lg px-4 py-2.5 text-sm text-[#F9FAFB] outline-none transition resize-none ${errors.problemDescription ? 'border-red-500' : 'border-[#2A2F45] focus:border-[#D4AF37]'}`}
                placeholder="e.g. Watch stopped working after getting wet, crystal is cracked, crown is stuck..." />
              {errors.problemDescription && <p className="text-xs text-red-400 mt-1">{errors.problemDescription}</p>}
            </div>
            <div>
              <label className="block text-xs text-[#9CA3AF] font-medium mb-2">Preferred Handover Method</label>
              <div className="flex gap-3">
                {['drop-off', 'courier'].map(method => (
                  <button key={method} type="button" onClick={() => update('pickupMethod', method)}
                    className={`flex-1 py-2.5 rounded-lg border text-sm font-medium capitalize transition ${form.pickupMethod === method ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-[#2A2F45] text-[#9CA3AF] hover:border-[#D4AF37]/40'}`}>
                    {method === 'drop-off' ? '🏪 Drop-off at Store' : '📦 Courier Pickup'}
                  </button>
                ))}
              </div>
              {form.pickupMethod === 'drop-off' && (
                <p className="text-xs text-[#8B8FA8] mt-2">Visit our Dhaka store. Full address provided after booking.</p>
              )}
              {form.pickupMethod === 'courier' && (
                <p className="text-xs text-[#8B8FA8] mt-2">We'll arrange courier pickup from your address. Pack the watch securely.</p>
              )}
            </div>
          </section>

          <button type="submit" disabled={submitting}
            className="w-full py-4 bg-[#D4AF37] text-[#0B0F19] font-bold text-base rounded-xl hover:bg-[#C5A059] transition active:scale-95 disabled:opacity-60">
            {submitting ? 'Submitting...' : '⚙️ Submit Repair Booking'}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function RepairBookPage() {
  return (
    <Suspense fallback={<main className="flex min-h-[55vh] items-center justify-center text-sm text-[#9CA3AF]">Loading repair booking…</main>}>
      <RepairBookContent />
    </Suspense>
  );
}
