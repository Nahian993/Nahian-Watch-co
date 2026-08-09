import type { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Crown Watch Co.',
  description: 'Find answers about Crown Watch Co. products, payments, delivery, repairs, returns, and warranties.',
};

export default function Page() {
  return <ClientPage />;
}

