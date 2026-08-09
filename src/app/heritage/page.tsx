import type { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Our Heritage | Crown Watch Co.',
  description: "Learn about Crown Watch Co.'s timekeeping heritage, collection, and service story in Bangladesh.",
};

export default function Page() {
  return <ClientPage />;
}

