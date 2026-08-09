import { RepairTicket, RepairServiceType } from '../types';

export interface ServiceQuoteOption {
  id: string;
  name: {
    en: string;
    bn: string;
  };
  serviceType: RepairServiceType;
  description: {
    en: string;
    bn: string;
  };
  estimatedCostRange: {
    min: number;
    max: number;
  };
  estimatedTurnaround: {
    en: string;
    bn: string;
  };
}

export const sampleRepairServices: ServiceQuoteOption[] = [
  {
    id: 'srv-battery',
    name: {
      en: 'Swiss / Japanese Battery Replacement & Seal',
      bn: 'সুইস/জাপানিজ ব্যাটারি প্রতিস্থাপন ও ওয়াটারপ্রুফ সিল',
    },
    serviceType: 'Battery Replacement',
    description: {
      en: 'Original Maxell/Renata silver-oxide battery installation with case cleaning, gasket lubrication, and pressure seal test.',
      bn: 'অরিজিনাল ব্র্যান্ডের ব্যাটারি সংযোজন, বডি ক্লিনিং এবং ওয়াটারপ্রুফ গাস্কেট চেকিং।',
    },
    estimatedCostRange: { min: 300, max: 800 },
    estimatedTurnaround: { en: '24 Hours / Same Day', bn: '২৪ ঘণ্টা / একই দিনে' },
  },
  {
    id: 'srv-glass',
    name: {
      en: 'Glass / Crystal Replacement (Mineral or Sapphire)',
      bn: 'ঘড়ির গ্লাস/ক্রিস্টাল পরিবর্তন (মিনারেল বা স্যাফায়ার)',
    },
    serviceType: 'Glass Replacement',
    description: {
      en: 'Replacement of broken or scratched watch crystal with custom-fitted acrylic, mineral glass, or anti-reflective sapphire crystal.',
      bn: 'ভাঙা বা দাগ পড়া কাঁচ পরিবর্তন করে নতুন মিনারেল বা স্যাফায়ার গ্লাস বসানো।',
    },
    estimatedCostRange: { min: 800, max: 2500 },
    estimatedTurnaround: { en: '2 - 3 Days', bn: '২ - ৩ দিন' },
  },
  {
    id: 'srv-movement',
    name: {
      en: 'Full Mechanical & Automatic Movement Servicing',
      bn: 'সম্পূর্ণ মেকানিক্যাল ও অটোমেটিক মুভমেন্ট সার্ভিসিং',
    },
    serviceType: 'Movement Servicing',
    description: {
      en: 'Complete disassembly, ultrasonic cleaning of gear train, synthetic oil relubrication, beat error calibration, and timing adjustment.',
      bn: 'ঘড়ির সকল যন্ত্রাংশ খুলে আল্ট্রাসনিক ওয়াশ, বিশেষ অয়েলিং এবং মেকানিক্যাল টাইমিং টিউনিং।',
    },
    estimatedCostRange: { min: 1500, max: 5000 },
    estimatedTurnaround: { en: '4 - 7 Days', bn: '৪ - ৭ দিন' },
  },
  {
    id: 'srv-water-damage',
    name: {
      en: 'Water Damage Restoration & Dial De-moisturizing',
      bn: 'পানি ঢুকলে ওয়াটার ড্যামেজ রিকভারি ও ড্রায়িং',
    },
    serviceType: 'Water Damage Repair',
    description: {
      en: 'Emergency rust removal, moisture drying, dial & hand restoration, and O-ring gasket replacement.',
      bn: 'ঘড়ির ভেতরে জমাপড়া পানি শুকানো, মরিচা পরিষ্কার এবং ডায়াল রিকভারি।',
    },
    estimatedCostRange: { min: 1200, max: 4000 },
    estimatedTurnaround: { en: '2 - 4 Days', bn: '২ - ৪ দিন' },
  },
];

export const initialRepairs: RepairTicket[] = [
  {
    id: 'rep-001',
    ticketNumber: 'CROWN-REP-2026-8941',
    customerName: 'Tanvir Ahmed',
    customerPhone: '01711223344',
    customerEmail: 'tanvir@example.com',
    district: 'Dhaka',
    watchBrand: 'Seiko',
    watchModel: 'Seiko 5 SNK809',
    watchType: 'Automatic',
    serviceRequested: 'Movement Servicing',
    problemDescription: 'Watch is losing 2 minutes per day and auto-rotor makes rattling noise.',
    deliveryMethod: 'dropoff',
    estimatedCostRange: { min: 1800, max: 2500 },
    finalCost: 2000,
    estimatedTurnaround: { en: '3-5 Days', bn: '৩-৫ দিন' },
    status: 'in_repair',
    createdAt: '2026-08-04T10:30:00Z',
    timeline: [
      {
        status: 'received',
        title: { en: 'Ticket Created & Drop-Off Received', bn: 'টিকিট তৈরি ও ঘড়ি জমা নেওয়া হয়েছে' },
        description: { en: 'Watch received at Dhaka Showroom.', bn: 'ঢাকা শোরুমে ঘড়ি জমা নেওয়া হয়েছে।' },
        timestamp: '2026-08-04T10:30:00Z',
        isCompleted: true,
      },
      {
        status: 'inspecting',
        title: { en: 'Master Technician Inspection', bn: 'প্রধান টেকনিশিয়ান দ্বারা পরীক্ষা' },
        description: { en: 'Disassembled movement; dry jewel balance noticed.', bn: 'মুভমেন্ট খুলে প্রাথমিক ত্রুটি চিহ্নিত করা হয়েছে।' },
        timestamp: '2026-08-05T14:15:00Z',
        isCompleted: true,
      },
      {
        status: 'in_repair',
        title: { en: 'Ultrasonic Cleaning & Relubrication', bn: 'আল্ট্রাসনিক ওয়াশ ও টিউনিং চলছে' },
        description: { en: 'Parts currently undergoing synthetic Moebius lubrication.', bn: 'যন্ত্রাংশ ওয়াশ করে স্পেশাল অয়েল প্রয়োগ করা হচ্ছে।' },
        timestamp: '2026-08-06T11:00:00Z',
        isCompleted: true,
      },
      {
        status: 'ready_for_pickup',
        title: { en: 'Quality Check & Ready for Pickup', bn: 'কোয়ালিটি চেক ও ডেলিভারির জন্য প্রস্তুত' },
        description: { en: '24-hour timing test pending before customer notification.', bn: '২৪ ঘণ্টার টাইমিং টেস্টের পর কাস্টমারকে কল করা হবে।' },
        timestamp: '2026-08-07T09:00:00Z',
        isCompleted: false,
      },
    ],
  },
  {
    id: 'rep-002',
    ticketNumber: 'CROWN-REP-2026-8942',
    customerName: 'Jashim Uddin',
    customerPhone: '01811556677',
    district: 'Chittagong',
    watchBrand: 'Casio',
    watchModel: 'Edifice EFR-539D',
    watchType: 'Quartz',
    serviceRequested: 'Glass Replacement',
    problemDescription: 'Cracked mineral glass after accidental fall.',
    deliveryMethod: 'courier_pickup',
    estimatedCostRange: { min: 1000, max: 1800 },
    estimatedTurnaround: { en: '2-3 Days', bn: '২-৩ দিন' },
    status: 'received',
    createdAt: '2026-08-05T11:00:00Z',
    timeline: [
      {
        status: 'received',
        title: { en: 'Ticket Created', bn: 'টিকিট তৈরি করা হয়েছে' },
        description: { en: 'Courier pickup scheduled.', bn: 'কুরিয়ার পিকআপ শিডিউল করা হয়েছে।' },
        timestamp: '2026-08-05T11:00:00Z',
        isCompleted: true,
      },
    ],
  },
  {
    id: 'rep-003',
    ticketNumber: 'CROWN-REP-2026-8943',
    customerName: 'Mehedi Hasan',
    customerPhone: '01911889900',
    district: 'Dhaka',
    watchBrand: 'Citizen',
    watchModel: 'Eco-Drive BM7100',
    watchType: 'Solar',
    serviceRequested: 'Battery Replacement',
    problemDescription: 'Capacitor solar battery replacement.',
    deliveryMethod: 'dropoff',
    estimatedCostRange: { min: 1200, max: 2000 },
    estimatedTurnaround: { en: '1-2 Days', bn: '১-২ দিন' },
    status: 'ready_for_pickup',
    createdAt: '2026-08-03T16:00:00Z',
    timeline: [
      {
        status: 'ready_for_pickup',
        title: { en: 'Ready for Pickup', bn: 'পিকআপের জন্য প্রস্তুত' },
        description: { en: 'Capacitor replaced and solar charge confirmed.', bn: 'ক্যাপাসিটর পরিবর্তন করা হয়েছে এবং চার্জ টেস্ট ওকে।' },
        timestamp: '2026-08-04T17:00:00Z',
        isCompleted: true,
      },
    ],
  },
];

export const sampleRepairTickets = initialRepairs;
