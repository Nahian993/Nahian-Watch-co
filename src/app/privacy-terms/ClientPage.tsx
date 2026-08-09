'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  Award,
  Baby,
  Ban,
  CircleHelp,
  Clock,
  Cookie,
  Fingerprint,
  Globe,
  Lock,
  Scale,
  Shield,
  ShoppingBag,
  Truck,
  Undo2,
  UserCog,
} from 'lucide-react';

type SectionItem = {
  title: string;
  description: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type Tab = 'privacy' | 'terms';

const PRIVACY_ITEMS: SectionItem[] = [
  {
    title: 'What We Collect',
    description:
      'Name, email, address, phone number, payment information, and browsing data.',
    Icon: Fingerprint,
  },
  {
    title: 'How We Use It',
    description:
      'To process your orders, personalize your experience, improve our site, and send updates (only if you opt in).',
    Icon: Lock,
  },
  {
    title: 'How We Protect It',
    description:
      'We use SSL encryption, secure servers, and never sell your data. Ever.',
    Icon: Shield,
  },
  {
    title: 'Cookies',
    description:
      'We use cookies to remember your preferences and make your visit smoother. You can disable cookies in your browser settings.',
    Icon: Cookie,
  },
  {
    title: 'Your Rights',
    description:
      'You can access, update, or delete your data anytime. Contact us at ',
    Icon: UserCog,
  },
  {
    title: 'Data Retention',
    description:
      'We keep your data only as long as needed to fulfill your orders and meet legal requirements.',
    Icon: Clock,
  },
  {
    title: 'Children',
    description:
      'We do not knowingly collect personal data from children under the age of 16.',
    Icon: Baby,
  },
];

const TERMS_ITEMS: SectionItem[] = [
  {
    title: 'Orders',
    description:
      'By placing an order, you agree to provide accurate information and pay the listed price. Orders may be canceled if payment is not received.',
    Icon: ShoppingBag,
  },
  {
    title: 'Shipping',
    description:
      'We ship worldwide. Delivery times are estimates and may vary. Customs fees are the buyer’s responsibility.',
    Icon: Truck,
  },
  {
    title: 'Returns',
    description:
      'You may return any watch within 14 days of delivery in original condition for a full refund.',
    Icon: Undo2,
  },
  {
    title: 'Warranty',
    description:
      'All watches come with a 5-year warranty against manufacturing defects. Damage from misuse is not covered.',
    Icon: Award,
  },
  {
    title: 'Account',
    description:
      'You are responsible for keeping your account information and password secure.',
    Icon: Lock,
  },
  {
    title: 'Prohibited',
    description: 'No illegal activity, fraud, or abuse of our site or services.',
    Icon: Ban,
  },
  {
    title: 'Liability',
    description:
      'We are not liable for indirect damages or delays beyond our reasonable control.',
    Icon: Scale,
  },
  {
    title: 'Changes',
    description:
      'We may update these terms from time to time. Continued use means you accept the latest version.',
    Icon: Globe,
  },
  {
    title: 'Questions',
    description: 'Contact support@crownwatchbd.com for any help.',
    Icon: CircleHelp,
  },
];

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902231727964!2d90.3915633154317!3d23.75090339462556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b894b5e1c6e7%3A0x7e1e3e8e8e8e8e8e!2sDhaka!5e0!3m2!1sen!2sbd!4v1680000000000!5m2!1sen!2sbd';

export default function PrivacyTermsPage() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>('privacy');

  const items = activeTab === 'privacy' ? PRIVACY_ITEMS : TERMS_ITEMS;

  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB]">
      {/* Hero Banner */}
      <section className="bg-[#111827] border-b border-[#1F2937]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#080B12] text-[#D4AF37]">
            <Shield className="h-6 w-6" aria-hidden="true" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-gold-gradient">
            Privacy Policy &amp; Terms of Service
          </h1>
          <p className="mt-3 text-[#9CA3AF] text-sm">
            Your trust is our crown jewel. Here’s how we protect it.
          </p>
        </div>
      </section>

      {/* Content Wrapper */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Tabs */}
        <nav
          className="mb-8 flex gap-2 border-b border-[#1F2937]"
          role="tablist"
          aria-label="Policy navigation"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'privacy'}
            aria-controls="privacy-panel"
            onClick={() => setActiveTab('privacy')}
            className={`rounded-t-lg px-6 py-3 text-sm font-semibold transition-all ${
              activeTab === 'privacy'
                ? 'border-b-2 border-[#D4AF37] text-[#D4AF37]'
                : 'text-[#9CA3AF] hover:text-[#F9FAFB] hover:border-[#1F2937]'
            }`}
          >
            Privacy Policy
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'terms'}
            aria-controls="terms-panel"
            onClick={() => setActiveTab('terms')}
            className={`rounded-t-lg px-6 py-3 text-sm font-semibold transition-all ${
              activeTab === 'terms'
                ? 'border-b-2 border-[#D4AF37] text-[#D4AF37]'
                : 'text-[#9CA3AF] hover:text-[#F9FAFB] hover:border-[#1F2937]'
            }`}
          >
            Terms of Service
          </button>
        </nav>

        {/* Tab Panels */}
        <section>
          <div
            id={activeTab === 'privacy' ? 'privacy-panel' : 'terms-panel'}
            role="tabpanel"
            className="space-y-6"
          >
            <h2 className="flex items-center gap-3 text-xl font-serif font-bold text-[#D4AF37]">
              {activeTab === 'privacy' ? (
                <Fingerprint className="h-5 w-5" aria-hidden="true" />
              ) : (
                <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              )}
              {activeTab === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
            </h2>

            <p className="text-[#CBD5E1] leading-relaxed">
              {activeTab === 'privacy'
                ? 'At Crown Watch, your privacy is as important as the precision of our timepieces. We are committed to protecting your personal information and being transparent about how we use it.'
                : 'These Terms of Service govern your use of the Crown Watch Co. website, orders, and services. Please read them carefully. By placing an order or using our site, you agree to these terms.'}
            </p>

            <ul className="space-y-4">
              {items.map((item) => {
                const Icon = item.Icon;
                return (
                  <li
                    key={item.title}
                    className="flex gap-3 text-[#CBD5E1]"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#D4AF37]/20 bg-[#080B12] text-[#D4AF37]">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-bold text-[#F9FAFB]">
                        {item.title}:{' '}
                      </p>
                      {item.title === 'Your Rights' && activeTab === 'privacy' ? (
                        <p className="mt-0.5 leading-relaxed">
                          You can access, update, or delete your data anytime.
                          Contact us at{' '}
                          <Link
                            href="mailto:privacy@crownwatch.com"
                            className="text-[#D4AF37] hover:underline"
                          >
                            privacy@crownwatch.com
                          </Link>
                          .
                        </p>
                      ) : item.title === 'Questions' && activeTab === 'terms' ? (
                        <p className="mt-0.5 leading-relaxed">
                          Contact{' '}
                          <Link
                            href="mailto:support@crownwatchbd.com"
                            className="text-[#D4AF37] hover:underline ml-1"
                          >
                            support@crownwatchbd.com
                          </Link>{' '}
                          for any help.
                        </p>
                      ) : (
                        <p className="mt-0.5 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            {activeTab === 'privacy' ? (
              <p className="pt-2 text-[#CBD5E1]">
                For more details, read our full privacy statement or{' '}
                <Link
                  href="/contact"
                  className="text-[#D4AF37] hover:underline"
                >
                  contact us
                </Link>{' '}
                with any questions.
              </p>
            ) : (
              <p className="pt-2 text-[#CBD5E1]">
                By using Crown Watch, you agree to these terms. Thank you for
                trusting us with your time!
              </p>
            )}
          </div>
        </section>
      </div>

      {/* Footer with map */}
      <footer className="bg-[#080B12] border-t border-[#1F2937] py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-[#1F2937]">
              <iframe
                src={MAP_SRC}
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Crown Watch Co. location in Dhaka"
                className="h-full w-full"
              />
            </div>
            <div>
              <h3 className="text-sm font-serif font-bold text-[#D4AF37] mb-3">
                Dhaka Showroom
              </h3>
              <p className="text-xs text-[#9CA3AF]">
                Crown Watch Co., 78, Masjid Market, 2 Patuatully Lane, Dhaka 1100, Bangladesh.
              </p>
              <p className="mt-3 text-xs text-[#9CA3AF]">
                Open 7 Days: 10:00 AM – 8:00 PM
              </p>
              <p className="mt-4 text-[10px] uppercase tracking-wider text-[#6B7280]">
                Last updated: January 2025
              </p>
              <p className="mt-1 text-[10px] text-[#6B7280]">
                © 2025 Crown Watch Co. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
