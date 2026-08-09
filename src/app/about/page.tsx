import type { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'About Crown Watch Co. | Luxury Timepieces & Watch Experts',
  description:
    'Learn the Crown Watch Co. story — decades of horological expertise, authenticated timepieces, and trusted watchmaking craftsmanship in Bangladesh.',
  keywords: ['Crown Watch Co', 'About', 'Watchmakers', 'Authentic Watches', 'Watch Repair Bangladesh'],
};

export default function Page() {
  return <ClientPage />;
}
