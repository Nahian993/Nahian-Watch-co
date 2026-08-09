import type { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Privacy Policy & Terms of Service | Crown Watch Co.',
  description:
    'Read Crown Watch Co. privacy policy and terms of service. Learn how we protect your data, process orders, handle returns, and provide a safe shopping experience.',
  keywords: [
    'Crown Watch Co',
    'Privacy Policy',
    'Terms of Service',
    'Data Protection',
    'Returns Policy',
    'Shipping Policy',
  ],
};

export default function Page() {
  return <ClientPage />;
}
