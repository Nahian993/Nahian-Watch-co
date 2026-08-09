import type { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Contact Crown Watch Co. | Crown Watch Co.',
  description: 'Contact Crown Watch Co. about orders, repairs, product questions, and customer support.',
};

export default function Page() {
  return <ClientPage />;
}

