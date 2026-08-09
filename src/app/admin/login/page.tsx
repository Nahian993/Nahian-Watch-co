import { Suspense } from 'react';
import type { Metadata } from 'next';
import AdminLoginPage from './AdminLoginClient';

export const metadata: Metadata = {
  title: 'Admin Login | Crown Watch Co.',
  robots: 'noindex, nofollow',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B0F19] flex items-center justify-center"><div className="animate-pulse text-[#D4AF37] text-sm">Loading...</div></div>}>
      <AdminLoginPage />
    </Suspense>
  );
}
