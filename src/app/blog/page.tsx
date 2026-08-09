import type { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Watch World Insights | Crown Watch Co. Blog',
  description: 'Latest news, reviews, and guides from Crown Watch experts on Casio, Seiko, Citizen, smartwatches, and more.',
};

export default function Page() {
  return <ClientPage />;
}
