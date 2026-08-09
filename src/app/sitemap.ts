import type { MetadataRoute } from 'next';
import { initialProducts } from '@/data/products';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://crownwatchbd.com';

const publicRoutes = [
  '/',
  '/shop',
  '/shop/affordable',
  '/shop/calculators',
  '/shop/casio',
  '/shop/citizen',
  '/shop/seiko',
  '/shop/smartwatches',
  '/about',
  '/heritage',
  '/authenticity',
  '/contact',
  '/faq',
  '/blog',
  '/login',
  '/dashboard',
  '/privacy-terms',
  '/shipping',
  '/returns',
  '/warranty',
  '/repair',
  '/repair/book',
  '/repair/calculator',
  '/quiz',
  '/wishlist',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = publicRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '/shop' ? ('daily' as const) : ('monthly' as const),
    priority: route === '/' ? 1 : route === '/shop' ? 0.9 : 0.6,
  }));

  const products = initialProducts.map((product) => ({
    url: `${siteUrl}/shop/${product.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...routes, ...products];
}
