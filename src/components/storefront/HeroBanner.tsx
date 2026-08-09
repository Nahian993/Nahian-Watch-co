'use client';

import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

export default function HeroBanner() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full bg-[#0B0F19] overflow-hidden py-16 lg:py-24 border-b border-[#D4AF37]/20">
      {/* Background Gold Ambient Spotlight */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, rgba(11, 15, 25, 0) 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Heritage Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#111827] border border-[#D4AF37]/40 rounded-full text-xs font-semibold text-[#D4AF37]">
              <span>👑</span>
              <span>{t('hero.badge')}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
              {t('hero.title_part1')}{' '}
              <br className="hidden sm:inline" />
              <span className="gold-text-gradient">{t('hero.title_part2')}</span>
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              {t('hero.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/shop"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#D4AF37] text-[#0B0F19] text-sm font-bold rounded-lg hover:bg-[#F3E5AB] transition-all text-center shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:scale-105"
              >
                {t('hero.cta_shop')}
              </Link>
              <Link
                href="/repair/calculator"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#111827] text-[#D4AF37] border border-[#D4AF37] text-sm font-semibold rounded-lg hover:bg-[#D4AF37]/10 transition-all text-center hover:scale-105"
              >
                {t('hero.cta_repair')}
              </Link>
            </div>
          </div>

          {/* Hero Visual Card Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-[#111827] border border-[#D4AF37]/30 rounded-2xl p-6 gold-border-glow text-center shadow-2xl">
              <div className="text-6xl mb-4">⌚</div>
              <h3 className="text-xl font-serif font-bold text-white mb-2">
                {t('hero.guarantee_title')}
              </h3>
              <p className="text-xs text-gray-400 mb-4">
                {t('hero.guarantee_subtitle')}
              </p>
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-800 text-xs">
                <div className="bg-[#1F2937] p-2.5 rounded-lg border border-gray-700">
                  <span className="text-[#D4AF37] font-bold block text-sm">🚚 {t('hero.shipping_badge')}</span>
                  <span className="text-gray-400 text-[11px]">
                    {t('trust.shipping_desc')}
                  </span>
                </div>
                <div className="bg-[#1F2937] p-2.5 rounded-lg border border-gray-700">
                  <span className="text-[#D4AF37] font-bold block text-sm">🛠️ {t('hero.warranty_badge')}</span>
                  <span className="text-gray-400 text-[11px]">
                    {t('trust.repair_desc')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Trust Signals Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-[#D4AF37]/20">
          <div className="flex items-center space-x-3 bg-[#111827]/80 p-4 rounded-xl border border-gray-800">
            <span className="text-2xl text-[#D4AF37]">🏛️</span>
            <div>
              <h4 className="text-xs font-bold text-white">{t('trust.heritage_title')}</h4>
              <p className="text-[11px] text-gray-400">{t('trust.heritage_desc')}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-[#111827]/80 p-4 rounded-xl border border-gray-800">
            <span className="text-2xl text-[#D4AF37]">🛡️</span>
            <div>
              <h4 className="text-xs font-bold text-white">{t('trust.authentic_title')}</h4>
              <p className="text-[11px] text-gray-400">{t('trust.authentic_desc')}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-[#111827]/80 p-4 rounded-xl border border-gray-800">
            <span className="text-2xl text-[#D4AF37]">🚚</span>
            <div>
              <h4 className="text-xs font-bold text-white">{t('trust.shipping_title')}</h4>
              <p className="text-[11px] text-gray-400">{t('trust.shipping_desc')}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-[#111827]/80 p-4 rounded-xl border border-gray-800">
            <span className="text-2xl text-[#D4AF37]">🔧</span>
            <div>
              <h4 className="text-xs font-bold text-white">{t('trust.repair_title')}</h4>
              <p className="text-[11px] text-gray-400">{t('trust.repair_desc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
