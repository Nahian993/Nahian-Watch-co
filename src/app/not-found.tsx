'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ShoppingBag, BookOpen, Users, Mail, Home, RotateCw } from 'lucide-react';

const FUNNY_TIPS = [
  "Maybe your watch is set to the wrong timezone?",
  "404: Time not found. Please synchronize your device.",
  "You just discovered a secret watchmaker's portal!",
  "Even the best watches sometimes skip a second.",
  "Tick-tock... but this page doesn't exist!",
  "Try winding your browser and check again.",
  "Lost in time? Our shop can help you find your way.",
  "This page is rarer than a diamond-studded Rolex.",
  "You're seconds away from finding what you need.",
  "Don't worry, even Swiss watches aren't perfect!",
  "Time flies — and so did this page.",
  "Hold tight! We're rewinding the clock.",
];

export default function NotFound() {
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [tip, setTip] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setSecond(now.getSeconds());
      setMinute(now.getMinutes());
      setHour(now.getHours() % 12);
    };
    update();
    const interval = setInterval(update, 1000);
    setTip(FUNNY_TIPS[Math.floor(Math.random() * FUNNY_TIPS.length)]);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#e0e7ef]/20 via-[#0B0F19] to-[#e0e7ef]/20 flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full text-center">
        {/* Animated Watch Face */}
        <div className="relative mx-auto mb-8" style={{ width: '200px', height: '200px' }}>
          {/* Watch face circle */}
          <div
            className="absolute inset-0 rounded-full border-8 border-[#D4AF37] bg-[#F9FAFB] shadow-[0_0_40px_rgba(212,175,55,0.15)]"
            style={{ width: '200px', height: '200px' }}
          >
            {/* 404 markers */}
            <span className="absolute text-4xl font-bold text-[#222]/15 select-none font-montserrat" style={{ left: '10px', top: '50%', transform: 'translateY(-50%) rotate(-10deg)' }}>
              4
            </span>
            <span className="absolute text-4xl font-bold text-[#222]/15 select-none font-montserrat" style={{ left: '50%', top: '10px', transform: 'translateX(-50%) rotate(8deg)' }}>
              0
            </span>
            <span className="absolute text-4xl font-bold text-[#222]/15 select-none font-montserrat" style={{ right: '10px', top: '50%', transform: 'translateY(-50%) rotate(10deg)' }}>
              4
            </span>

            {/* Watch center */}
            <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#222] z-10 shadow-[0_0_8px_rgba(212,175,55,0.4)]" />

            {/* Hour hand */}
            <div
              className="absolute left-1/2 bottom-1/2 w-2 h-12 bg-[#222] rounded-full origin-bottom z-3 transition-transform"
              style={{
                width: '6px',
                height: '50px',
                transform: `translate(-50%, -100%) rotate(${hour * 30 + minute * 0.5}deg)`,
              }}
            />

            {/* Minute hand */}
            <div
              className="absolute left-1/2 bottom-1/2 bg-[#0077ff] rounded-full origin-bottom z-2 transition-transform"
              style={{
                width: '4px',
                height: '70px',
                transform: `translate(-50%, -100%) rotate(${minute * 6}deg)`,
              }}
            />

            {/* Second hand */}
            <div
              className="absolute left-1/2 bottom-1/2 bg-[#f44336] rounded-full origin-bottom z-1 transition-transform"
              style={{
                width: '2px',
                height: '82px',
                transform: `translate(-50%, -100%) rotate(${second * 6}deg)`,
              }}
            />
          </div>

          {/* Watch shadow */}
          <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-12 h-3 bg-gradient-radial from-[#aaa] to-transparent rounded-full blur-sm opacity-25" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-gold-gradient mb-3">
          Oops! Lost Track of Time
        </h1>

        <p className="text-[#9CA3AF] text-sm leading-relaxed mb-2">
          The page you're looking for doesn't exist.
          <br />
          Even the best watches skip a second sometimes.
        </p>

        {tip && (
          <p className="text-[#0077ff] font-semibold italic text-sm mb-8">
            {tip}
          </p>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#D4AF37] px-8 py-3 font-bold text-[#0B0F19] hover:bg-[#C5A059] transition transform hover:scale-105 shadow-[0_4px_15px_rgba(212,175,55,0.3)]"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Go Home
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#1F2937] bg-transparent px-8 py-3 font-bold text-[#F9FAFB] hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
          >
            <RotateCw className="h-4 w-4" aria-hidden="true" />
            Try Again
          </button>
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap gap-6 justify-center">
          <Link
            href="/shop"
            className="flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#D4AF37] transition font-medium"
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            Shop
          </Link>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#D4AF37] transition font-medium"
          >
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            Blog
          </Link>
          <Link
            href="/about"
            className="flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#D4AF37] transition font-medium"
          >
            <Users className="h-4 w-4" aria-hidden="true" />
            About Us
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#D4AF37] transition font-medium"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Contact
          </Link>
        </div>
      </div>
    </main>
  );
}
