'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { db } from '@/lib/db';
import { Product } from '@/types';
import { formatBDT } from '@/lib/formatters';

interface QuizAnswer {
  occasion: string;
  gender: string;
  budget: string;
  style: string;
  movement: string;
}

const STEPS = [
  {
    key: 'occasion',
    question: 'What is this watch for?',
    questionbn: 'এই ঘড়িটি কীসের জন্য?',
    options: [
      { value: 'daily', label: 'Daily Wear', icon: '☀️' },
      { value: 'gift', label: 'Gift', icon: '🎁' },
      { value: 'formal', label: 'Office / Formal', icon: '💼' },
      { value: 'sports', label: 'Sports / Outdoor', icon: '🏃' },
      { value: 'wedding', label: 'Wedding / Special', icon: '💍' },
    ],
  },
  {
    key: 'gender',
    question: 'Who is it for?',
    questionbn: 'এটি কার জন্য?',
    options: [
      { value: 'men', label: "Men's", icon: '👔' },
      { value: 'women', label: "Women's", icon: '👗' },
      { value: 'couple', label: 'Couple Set', icon: '👫' },
      { value: 'unisex', label: 'Unisex', icon: '🌟' },
    ],
  },
  {
    key: 'budget',
    question: 'What is your budget?',
    questionbn: 'আপনার বাজেট কত?',
    options: [
      { value: '0-5000', label: 'Under ৳5,000', icon: '💚' },
      { value: '5000-15000', label: '৳5,000 – ৳15,000', icon: '💛' },
      { value: '15000-50000', label: '৳15,000 – ৳50,000', icon: '🧡' },
      { value: '50000+', label: '৳50,000+', icon: '❤️' },
    ],
  },
  {
    key: 'style',
    question: 'What style do you prefer?',
    questionbn: 'আপনার পছন্দের স্টাইল কোনটি?',
    options: [
      { value: 'classic', label: 'Classic / Elegant', icon: '🎩' },
      { value: 'sport', label: 'Sport / Rugged', icon: '⚡' },
      { value: 'minimal', label: 'Minimal / Clean', icon: '⬜' },
      { value: 'smart', label: 'Smart / Digital', icon: '📲' },
    ],
  },
  {
    key: 'movement',
    question: 'Preferred movement type?',
    questionbn: 'পছন্দের মুভমেন্ট টাইপ?',
    options: [
      { value: 'automatic', label: 'Automatic (self-winding)', icon: '🔄' },
      { value: 'quartz', label: 'Quartz (battery)', icon: '🔋' },
      { value: 'solar', label: 'Solar (eco-drive)', icon: '☀️' },
      { value: 'digital', label: 'Digital / Smart', icon: '💡' },
      { value: 'any', label: "Don't mind", icon: '🤷' },
    ],
  },
];

function scoreProduct(product: Product, answers: Partial<QuizAnswer>): number {
  let score = 0;
  const brand = product.brand.toLowerCase();
  const cat = product.category?.toLowerCase() ?? '';
  const sub = product.subcategory?.toLowerCase() ?? '';
  const price = product.salePrice ?? product.price;

  if (answers.budget) {
    const [min, max] = answers.budget.split('-').map(Number);
    const inRange = max ? price >= min && price <= max : price >= min;
    if (inRange) score += 30;
  }

  if (answers.movement) {
    const mv = (product as any).movement?.toLowerCase() ?? '';
    if (answers.movement === 'any') score += 10;
    else if (answers.movement === 'automatic' && mv.includes('auto')) score += 20;
    else if (answers.movement === 'quartz' && mv.includes('quartz')) score += 20;
    else if (answers.movement === 'solar' && (mv.includes('solar') || brand === 'citizen')) score += 20;
    else if (answers.movement === 'digital' && (cat === 'smartwatches' || mv.includes('digital'))) score += 20;
  }

  if (answers.style) {
    if (answers.style === 'sport' && (sub.includes('sport') || brand === 'casio')) score += 15;
    if (answers.style === 'classic' && (brand === 'seiko' || brand === 'citizen')) score += 15;
    if (answers.style === 'smart' && cat === 'smartwatches') score += 15;
  }

  if (answers.gender) {
    const g = (product as any).gender?.toLowerCase() ?? '';
    if (answers.gender === 'couple' && (sub.includes('couple') || sub.includes('pair'))) score += 20;
    else if (answers.gender === 'men' && (g === 'men' || g === 'unisex')) score += 10;
    else if (answers.gender === 'women' && (g === 'women' || g === 'unisex' || g === 'ladies')) score += 10;
    else if (answers.gender === 'unisex' && g === 'unisex') score += 10;
  }

  score += product.rating * 2;
  return score;
}

export default function QuizPage() {
  const { language } = useLanguage();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswer>>({});
  const [results, setResults] = useState<Product[]>([]);
  const [done, setDone] = useState(false);

  const currentStep = STEPS[step];

  const select = (key: string, value: string) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);
    if (step < STEPS.length - 1) {
      setTimeout(() => setStep(s => s + 1), 200);
    } else {
      const products = db.getProducts();
      const scored = products
        .map(p => ({ product: p, score: scoreProduct(p, newAnswers) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 4)
        .map(x => x.product);
      setResults(scored);
      setDone(true);
    }
  };

  const restart = () => { setStep(0); setAnswers({}); setResults([]); setDone(false); };

  if (done) {
    return (
      <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-4">
              👑 Your Perfect Match
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-gold-gradient mb-3">
              {language === 'bn' ? 'আপনার জন্য সেরা ঘড়ি' : 'Watches Matched For You'}
            </h1>
            <p className="text-[#9CA3AF] text-sm">Based on your preferences, we recommend these timepieces.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {results.map((p, i) => (
              <div key={p.id} className={`bg-[#111827] border rounded-xl overflow-hidden transition ${i === 0 ? 'border-[#D4AF37]/60 shadow-[0_0_25px_rgba(212,175,55,0.15)]' : 'border-[#1F2937]'}`}>
                {i === 0 && <div className="bg-[#D4AF37] text-[#0B0F19] text-[10px] font-bold text-center py-1.5 uppercase tracking-widest">⭐ Best Match</div>}
                <div className="aspect-square bg-[#0d1120] overflow-hidden">
                  {p.images?.[0] ? <img src={p.images[0]} alt={p.title[language]} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-4xl text-[#2A2F45]">⌚</div>}
                </div>
                <div className="p-4">
                  <p className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider mb-1">{p.brand}</p>
                  <h3 className="text-sm font-semibold text-[#F9FAFB] line-clamp-2 mb-2">{p.title[language]}</h3>
                  <p className="text-base font-bold text-[#D4AF37] mb-3">{formatBDT(p.salePrice ?? p.price, language)}</p>
                  <Link href={`/shop/${p.slug}`} className="block text-center py-2 bg-[#D4AF37] text-[#0B0F19] font-bold text-xs rounded-lg hover:bg-[#C5A059] transition">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button onClick={restart} className="px-6 py-2.5 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-lg text-sm font-semibold transition mr-3">
              Retake Quiz
            </button>
            <Link href="/shop" className="px-6 py-2.5 bg-[#D4AF37] text-[#0B0F19] font-bold rounded-lg hover:bg-[#C5A059] transition text-sm">
              Browse All Watches
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-[#8B8FA8]">Question {step + 1} of {STEPS.length}</p>
            <p className="text-xs text-[#D4AF37] font-semibold">{Math.round(((step) / STEPS.length) * 100)}% complete</p>
          </div>
          <div className="h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
            <div className="h-full bg-[#D4AF37] rounded-full transition-all duration-300" style={{ width: `${(step / STEPS.length) * 100}%` }} />
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold mb-4">
            ⌚ Watch Finder Quiz
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#F9FAFB]">
            {language === 'bn' ? currentStep.questionbn : currentStep.question}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {currentStep.options.map(opt => (
            <button key={opt.value} onClick={() => select(currentStep.key, opt.value)}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all active:scale-98 ${(answers as any)[currentStep.key] === opt.value ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-[#1F2937] bg-[#111827] hover:border-[#D4AF37]/40 hover:bg-[#0d1120]'}`}>
              <span className="text-2xl">{opt.icon}</span>
              <span className={`font-semibold text-sm ${(answers as any)[currentStep.key] === opt.value ? 'text-[#D4AF37]' : 'text-[#F9FAFB]'}`}>{opt.label}</span>
            </button>
          ))}
        </div>

        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)} className="mt-6 text-sm text-[#8B8FA8] hover:text-[#D4AF37] transition w-full text-center">
            ← Go back
          </button>
        )}
      </div>
    </main>
  );
}
