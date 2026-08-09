import type { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Shipping & Delivery | Crown Watch Co.',
  description: 'Review Crown Watch Co. delivery coverage, timing, courier details, and shipping charges in Bangladesh.',
};

export default function Page() {
  return <ClientPage />;
}

