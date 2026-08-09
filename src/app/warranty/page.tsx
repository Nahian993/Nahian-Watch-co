import type { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Warranty Policy | Crown Watch Co.',
  description: 'Review Crown Watch Co. manufacturer warranty information, repair coverage, exclusions, and claims guidance.',
};

export default function Page() {
  return <ClientPage />;
}

