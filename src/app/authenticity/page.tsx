import type { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Authenticity Promise | Crown Watch Co.',
  description: "Read Crown Watch Co.'s authenticity promise, sourcing disclosures, and product verification guidance.",
};

export default function Page() {
  return <ClientPage />;
}

