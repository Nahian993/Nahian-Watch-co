import type { Metadata } from 'next';
import { Inter, Noto_Sans_Bengali } from 'next/font/google';
import './globals.css';
import { ClientProviders } from './ClientProviders';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { OrganizationJsonLd } from '@/components/seo/JsonLd';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  variable: '--font-noto-bengali',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  fallback: ['sans-serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://crownwatch.bd'),
  title: {
    default: 'CROWN WATCH CO. | Luxury Timepieces & Authorized Repair Hub',
    template: '%s | Crown Watch Co.',
  },
  description:
    'Premier Bangladesh destination for 100% authentic Casio, Seiko, and Citizen watches, scientific calculators, smartwatches, and master repair services in Dhaka since 1974.',
  keywords: [
    'Crown Watch Co',
    'Casio Bangladesh',
    'Seiko Automatic Dhaka',
    'Citizen Eco-Drive',
    'Watch Repair Bangladesh',
    'G-Shock CasiOak',
    'FX-991CW Calculator',
    'Luxury Watches Dhaka',
  ],
  alternates: {
    canonical: '/',
    languages: {
      'en-BD': 'https://crownwatch.bd',
      'bn-BD': 'https://crownwatch.bd/?lang=bn',
    },
  },
  openGraph: {
    title: 'CROWN WATCH CO. | Authentic Watches & Master Repair Hub',
    description:
      'Explore 100% genuine Casio, Seiko, and Citizen watches with official warranty and certified watch repair services in Bangladesh.',
    url: 'https://crownwatch.bd',
    siteName: 'Crown Watch Co.',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CROWN WATCH CO. | Luxury Timepieces',
    description: 'Premier destination for authentic Casio, Seiko, and Citizen watches in Bangladesh.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansBengali.variable}`}>
      <head>
        <OrganizationJsonLd />
      </head>
      <body className="min-h-screen antialiased">
        <ClientProviders>
          <Header />
          {children}
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
