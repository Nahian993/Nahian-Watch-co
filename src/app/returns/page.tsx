import type { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Returns & Exchange Policy | Crown Watch Co.',
  description: "Review Crown Watch Co.'s return, exchange, and refund policy for eligible orders.",
};

export default function Page() {
  return <ClientPage />;
}

