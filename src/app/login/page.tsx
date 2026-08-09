import type { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Login | Crown Watch Co.',
  description:
    'Login to your Crown Watch Co. account or create a new account. Access your orders, wishlist, and profile.',
};

export default function Page() {
  return <ClientPage />;
}
