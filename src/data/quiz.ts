import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    title: {
      en: 'What is your primary reason or category of choice?',
      bn: 'আপনার প্রধান প্রয়োজন বা পছন্দের ক্যাটাগরি কোনটি?',
    },
    subtitle: {
      en: 'Select the item type that fits your current need.',
      bn: 'আপনার বর্তমান প্রয়োজন অনুযায়ী আইটেম নির্বাচন করুন।',
    },
    options: [
      {
        id: 'opt-watches',
        label: { en: 'Traditional & Luxury Wristwatch', bn: 'ঐতিহ্যবাহী ও লাক্সারি হাতঘড়ি' },
        icon: '⌚',
        tagWeights: { watches: 5, luxury: 3 },
        targetCategory: 'watches',
      },
      {
        id: 'opt-smartwatches',
        label: { en: 'Smartwatch & Fitness Tracker', bn: 'স্মার্টওয়াচ ও ফিটনেস ট্র্যাকার' },
        icon: '📱',
        tagWeights: { smartwatches: 5, fitness: 3 },
        targetCategory: 'smartwatches',
      },
      {
        id: 'opt-calculators',
        label: { en: 'Scientific / Academic Calculator', bn: 'সায়েন্টিফিক বা শিক্ষা ক্যাটেগরি ক্যালকুলেটর' },
        icon: '🔢',
        tagWeights: { calculators: 5, education: 3 },
        targetCategory: 'calculators',
      },
    ],
  },
  {
    id: 2,
    title: {
      en: 'What is your budget range (in BDT)?',
      bn: 'আপনার সম্ভাব্য বাজেট সীমা কত (টাকায়)?',
    },
    options: [
      {
        id: 'budget-low',
        label: { en: 'Under ৳5,000 (Affordable & Academic)', bn: '৳৫,০০০ এর নিচে (বাজেট ও পড়াশোনা)' },
        maxPrice: 5000,
        tagWeights: { budget: 5, affordable: 3 },
      },
      {
        id: 'budget-mid',
        label: { en: '৳5,000 - ৳15,000 (Mid-Range & Sports)', bn: '৳৫,০০০ - ৳১৫,০০০ (মিড-রেঞ্জ ও স্পোর্টস)' },
        maxPrice: 15000,
        tagWeights: { mid: 5, sports: 3 },
      },
      {
        id: 'budget-high',
        label: { en: '৳15,000+ (Automatic & Luxury Steel)', bn: '৳১৫,০০০+ (অটোমেটিক ও লাক্সারি স্টিল)' },
        maxPrice: 100000,
        tagWeights: { automatic: 5, luxury: 5 },
      },
    ],
  },
  {
    id: 3,
    title: {
      en: 'Which watch movement or technology do you prefer?',
      bn: 'আপনি কোন ধরনের ঘড়ির মেকানিজম পছন্দ করেন?',
    },
    options: [
      {
        id: 'mov-quartz',
        label: { en: 'Quartz (Battery & Precision)', bn: 'কুয়ার্টজ (ব্যাটারি ও নিখুঁত সময়)' },
        icon: '⚡',
        tagWeights: { quartz: 5 },
      },
      {
        id: 'mov-auto',
        label: { en: 'Automatic (Self-winding mechanical craftsmanship)', bn: 'অটোমেটিক (মেকানিক্যাল কারিগরি)' },
        icon: '⚙️',
        tagWeights: { automatic: 5, mechanical: 4 },
      },
      {
        id: 'mov-solar',
        label: { en: 'Solar / Eco-Drive (Light powered)', bn: 'সোলার / ইকো-ড্রাইভ (আলো থেকে চার্জ)' },
        icon: '☀️',
        tagWeights: { solar: 5, ecodrive: 4 },
      },
    ],
  },
];
