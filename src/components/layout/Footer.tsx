'use client';

import Link from 'next/link';
import { Clock3, Crown, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-[#080B12] text-gray-400 border-t border-[#D4AF37]/30 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top 50-Year Heritage Banner Header */}
        <div className="bg-[#111827] rounded-xl border border-[#D4AF37]/30 p-6 mb-10 text-center flex flex-col md:flex-row items-center justify-between shadow-lg">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Crown className="w-10 h-10 text-[#D4AF37]" aria-hidden="true" />
            <div className="text-left">
              <h3 className="text-lg font-serif font-bold text-white">
                {t('footer.heritage_title')}
              </h3>
              <p className="text-xs text-[#D4AF37]">
                {t('footer.heritage_desc')}
              </p>
            </div>
          </div>
          <Link
            href="/heritage"
            className="px-4 py-2 bg-[#D4AF37] text-[#0B0F19] text-xs font-bold rounded-lg hover:bg-[#F3E5AB] transition-all shadow-[0_0_12px_rgba(212,175,55,0.3)]"
          >
            {t('footer.heritage_cta')}
          </Link>
        </div>

        {/* 4-Column Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 text-sm">
          {/* Col 1: Showroom & Contact */}
          <div>
            <h4 className="text-white font-serif font-bold text-base mb-4 border-b border-[#D4AF37]/30 pb-2">
              {t('footer.showroom_title')}
            </h4>
            <p className="flex items-start gap-2 text-xs leading-relaxed text-gray-300 mb-3">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-[#D4AF37]" aria-hidden="true" />
              <span>{t('footer.showroom_address')}</span>
            </p>
            <p className="flex items-center gap-2 text-xs mb-1"><Phone className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" /> {t('footer.phone')}</p>
            <p className="flex items-center gap-2 text-xs mb-1"><MessageCircle className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" /> {t('footer.whatsapp')}</p>
            <p className="flex items-center gap-2 text-xs mb-1"><Mail className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" /> {t('footer.email')}</p>
            <p className="flex items-center gap-2 text-xs text-[#D4AF37] mt-2 font-medium"><Clock3 className="w-3.5 h-3.5" aria-hidden="true" /> {t('footer.hours')}</p>
          </div>

          {/* Col 2: Catalog Collections */}
          <div>
            <h4 className="text-white font-serif font-bold text-base mb-4 border-b border-[#D4AF37]/30 pb-2">
              {t('footer.catalog_title')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/shop" className="hover:text-[#D4AF37]">All Watches (সকল ঘড়ি)</Link></li>
              <li><Link href="/shop/casio" className="hover:text-[#D4AF37]">Casio Collection</Link></li>
              <li><Link href="/shop/seiko" className="hover:text-[#D4AF37]">Seiko Automatic</Link></li>
              <li><Link href="/shop/citizen" className="hover:text-[#D4AF37]">Citizen Eco-Drive</Link></li>
              <li><Link href="/shop/smartwatches" className="hover:text-[#D4AF37]">Smartwatches</Link></li>
              <li><Link href="/shop/calculators" className="hover:text-[#D4AF37]">Scientific Calculators</Link></li>
              <li><Link href="/shop/affordable" className="hover:text-[#D4AF37]">Budget Timepieces (&lt; ৳5,000)</Link></li>
            </ul>
          </div>

          {/* Col 3: Watch Repair & Tools */}
          <div>
            <h4 className="text-white font-serif font-bold text-base mb-4 border-b border-[#D4AF37]/30 pb-2">
              {t('footer.repair_title')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/repair" className="hover:text-[#D4AF37] text-[#D4AF37] font-semibold">Watch Repair Hub</Link></li>
              <li><Link href="/repair/calculator" className="hover:text-[#D4AF37]">Instant Quote Calculator</Link></li>
              <li><Link href="/repair/book" className="hover:text-[#D4AF37]">Book Repair Service</Link></li>
              <li><Link href="/repair/track" className="hover:text-[#D4AF37]">Track Repair Status</Link></li>
              <li><Link href="/quiz" className="hover:text-[#D4AF37]">Watch Finder Quiz</Link></li>
              <li><Link href="/compare" className="hover:text-[#D4AF37]">Watch Comparison Tool</Link></li>
            </ul>
          </div>

          {/* Col 4: Customer Care & Policy */}
          <div>
            <h4 className="text-white font-serif font-bold text-base mb-4 border-b border-[#D4AF37]/30 pb-2">
              {t('footer.policy_title')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/about" className="hover:text-[#D4AF37]">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-[#D4AF37]">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-[#D4AF37]">Contact</Link></li>
              <li><Link href="/privacy-terms" className="hover:text-[#D4AF37]">Privacy & Terms</Link></li>
              <li><Link href="/authenticity" className="hover:text-[#D4AF37]">Authenticity Guide</Link></li>
              <li><Link href="/shipping" className="hover:text-[#D4AF37]">Shipping Policy (Dhaka ৳60 / BD ৳120)</Link></li>
              <li><Link href="/returns" className="hover:text-[#D4AF37]">Returns & Exchange</Link></li>
              <li><Link href="/warranty" className="hover:text-[#D4AF37]">Warranty Policy</Link></li>
              <li><Link href="/faq" className="hover:text-[#D4AF37]">Frequently Asked Questions</Link></li>
              <li><Link href="/admin" className="hover:text-[#D4AF37] text-gray-500">Store Admin Portal</Link></li>
            </ul>
          </div>
        </div>

        {/* Bangladesh Payment Methods & Footer Bottom */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between text-xs space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <span className="text-gray-500">{t('footer.accepted_payments')}</span>
            <span className="px-2 py-1 bg-[#E2136E] text-white font-bold rounded text-[10px]">bKash</span>
            <span className="px-2 py-1 bg-[#F7941D] text-white font-bold rounded text-[10px]">Nagad</span>
            <span className="px-2 py-1 bg-[#8C3494] text-white font-bold rounded text-[10px]">Rocket</span>
            <span className="px-2 py-1 bg-emerald-700 text-white font-bold rounded text-[10px]">COD</span>
            <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-[10px]">Card</span>
          </div>

          <p className="text-gray-500 text-center">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
