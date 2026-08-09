import type { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Dashboard | Crown Watch Co.',
  description:
    'View and manage your Crown Watch Co. orders, wishlist, profile, addresses, and security settings.',
};

export default function Page() {
  return <ClientPage />;
}
