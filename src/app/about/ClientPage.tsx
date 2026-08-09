'use client';

import Link from 'next/link';
import {
  Award,
  Briefcase,
  CheckCircle,
  Gem,
  Heart,
  Headset,
  MapPin,
  Megaphone,
  ShieldCheck,
  ShoppingBag,
  Wrench,
} from 'lucide-react';

type ValueCard = {
  title: string;
  description: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type TeamMember = {
  name: string;
  role: string;
  avatar: string;
  alt: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type CtaItem = {
  text: string;
};

const VALUES: ValueCard[] = [
  {
    title: 'Authenticity',
    description:
      'Every watch is 100% authentic, sourced from trusted partners and verified by our experts.',
    Icon: Gem,
  },
  {
    title: 'Trust',
    description:
      'We stand behind every sale with transparent policies and a commitment to your satisfaction.',
    Icon: ShieldCheck,
  },
  {
    title: 'Expertise',
    description:
      'Our certified watchmakers and knowledgeable staff are always ready to help and advise.',
    Icon: Wrench,
  },
  {
    title: 'Passion',
    description:
      'We love watches as much as you do, and it shows in everything we do.',
    Icon: Heart,
  },
];

const TEAM: TeamMember[] = [
  {
    name: 'Arif Rahman',
    role: 'Founder & CEO',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    alt: 'Arif Rahman, Founder & CEO',
    Icon: Briefcase,
  },
  {
    name: 'Sara Chowdhury',
    role: 'Head Watchmaker',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    alt: 'Sara Chowdhury, Head Watchmaker',
    Icon: Wrench,
  },
  {
    name: 'Imran Hossain',
    role: 'Customer Service Lead',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    alt: 'Imran Hossain, Customer Service Lead',
    Icon: Headset,
  },
  {
    name: 'Fatima Akter',
    role: 'Marketing Manager',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    alt: 'Fatima Akter, Marketing Manager',
    Icon: Megaphone,
  },
];

const CTA_ITEMS: CtaItem[] = [
  { text: 'Free worldwide shipping' },
  { text: '5-year warranty on all watches' },
  { text: '24/7 customer support' },
  { text: 'Secure payment & easy returns' },
];

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902231727964!2d90.3915633154317!3d23.75090339462556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b894b5e1c6e7%3A0x7e1e3e8e8e8e8e8e!2sDhaka!5e0!3m2!1sen!2sbd!4v1680000000000!5m2!1sen!2sbd';

export default function AboutClientPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB]">
      {/* Hero Banner */}
      <section className="bg-[#111827] border-b border-[#1F2937]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-serif text-gold-gradient">
            About Crown Watch
          </h1>
          <p className="mt-4 text-[#9CA3AF] text-sm">
            Timeless elegance, trusted expertise, and a passion for horology.
          </p>
        </div>
      </section>

      {/* Content Wrapper */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Our Story */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-[#D4AF37] mb-6">
            Our Story
          </h2>
          <div className="space-y-4 text-[#CBD5E1] leading-relaxed">
            <p>
              Founded in 2020, Crown Watch was born from a love of fine
              timepieces and a desire to bring the world’s best watches to
              enthusiasts everywhere. Our team is made up of passionate
              collectors, certified watchmakers, and customer service
              professionals dedicated to delivering an exceptional experience.
            </p>
            <p>
              We believe a great watch is more than just a way to tell time —
              it’s a statement of style, craftsmanship, and heritage. Whether
              you’re a seasoned collector or buying your first luxury watch,
              we’re here to guide you every step of the way.
            </p>
          </div>
        </section>

        {/* Our Values */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-[#D4AF37] mb-6">
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value) => {
              const Icon = value.Icon;
              return (
                <div
                  key={value.title}
                  className="bg-[#111827] border border-[#1F2937] rounded-xl p-6 text-center transition-transform hover:border-[#D4AF37]/40"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#080B12] text-[#D4AF37]">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-[#F9FAFB] font-serif">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Meet Our Team */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-[#D4AF37] mb-6">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member) => {
              const Icon = member.Icon;
              return (
                <div
                  key={member.name}
                  className="bg-[#111827] border border-[#1F2937] rounded-xl p-6 text-center transition-transform hover:border-[#0077ff]/50"
                >
                  <div className="mx-auto mb-3 h-24 w-24 overflow-hidden rounded-full border-2 border-[#0077ff]">
                    <img
                      src={member.avatar}
                      alt={member.alt}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-md bg-[#080B12] text-[#0077ff]">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <h4 className="text-lg font-bold text-[#F9FAFB] font-serif">
                    {member.name}
                  </h4>
                  <span className="text-sm text-[#9CA3AF]">{member.role}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why Choose CTA */}
        <section className="bg-[#111827] border border-[#1F2937] rounded-xl p-8 text-center">
          <h2 className="text-2xl font-serif font-bold text-[#D4AF37] mb-6">
            Why Choose Crown Watch?
          </h2>
          <ul className="mx-auto flex flex-col gap-3 text-left text-[#CBD5E1]">
            {CTA_ITEMS.map((item) => (
              <li
                key={item.text}
                className="flex items-center gap-3 text-base"
              >
                <CheckCircle
                  className="h-5 w-5 text-[#D4AF37] shrink-0"
                  aria-hidden="true"
                />
                {item.text}
              </li>
            ))}
          </ul>
          <Link
            href="/shop"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-[#D4AF37] px-8 py-3 font-bold text-[#0B0F19] hover:bg-[#C5A059] transition focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          >
            <ShoppingBag className="mr-2 h-4 w-4" aria-hidden="true" />
            Browse Our Collection
          </Link>
        </section>

        {/* Find Us — Google Maps + Business Hours */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-[#D4AF37] mb-6">
            Find Us
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-[#1F2937]">
              <iframe
                src={MAP_SRC}
                width="100%"
                height="260"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Crown Watch Co. location in Dhaka"
                className="h-full w-full"
              />
            </div>
            <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-5 w-5 text-[#D4AF37]" aria-hidden="true" />
                <h3 className="font-serif text-lg font-bold text-[#F9FAFB]">
                  Dhaka Showroom
                </h3>
              </div>
              <p className="text-sm text-[#9CA3AF]">
                Crown Watch Co., 78, Masjid Market, 2 Patuatully Lane, Dhaka 1100, Bangladesh.
              </p>
              <h4 className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                Business Hours
              </h4>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-[#9CA3AF]">Mon – Fri</span>
                  <span className="text-[#F9FAFB]">10:00 AM – 8:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#9CA3AF]">Saturday</span>
                  <span className="text-[#F9FAFB]">11:00 AM – 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#9CA3AF]">Sunday</span>
                  <span className="text-[#D4AF37] font-medium">Closed</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* Footer strip */}
      <footer className="bg-[#080B12] border-t border-[#1F2937] py-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-[#9CA3AF]">
          <p className="flex items-center justify-center gap-2">
            <Award className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
            © 2025 Crown Watch Co. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
