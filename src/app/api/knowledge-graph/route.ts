import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const products = db.getProducts();

  const knowledgeGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://crownwatch.bd/#organization',
        name: 'Crown Watch Co.',
        url: 'https://crownwatch.bd',
        logo: 'https://crownwatch.bd/images/logo.png',
        foundingDate: '1974',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Crown Watch Tower, Gulshan 1',
          addressLocality: 'Dhaka',
          postalCode: '1212',
          addressCountry: 'BD',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+8801700000000',
          contactType: 'customer service',
          areaServed: 'BD',
          availableLanguage: ['English', 'Bengali'],
        },
      },
      {
        '@type': 'ItemList',
        name: 'Crown Watch Co. Authorized Catalog',
        numberOfItems: products.length,
        itemListElement: products.map((p, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          item: {
            '@type': 'Product',
            name: p.title.en,
            brand: p.brand,
            sku: p.sku,
            priceCurrency: 'BDT',
            price: p.salePrice ?? p.price,
            url: `https://crownwatch.bd/shop/${p.slug}`,
          },
        })),
      },
    ],
  };

  return NextResponse.json(knowledgeGraph, {
    headers: {
      'Content-Type': 'application/ld+json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
