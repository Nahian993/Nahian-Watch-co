import { describe, it } from '../helpers/runner_utils.ts';
import { assertSchemaJSONLD } from '../helpers/assertions.ts';

describe('F27: Dynamic Schema.org JSON-LD', () => {
  it('[T1-F27-01] should embed valid Product Schema.org JSON-LD', () => {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Casio Edifice',
    };
    assertSchemaJSONLD(jsonLd, 'Product');
  });

  it('[T1-F27-02] should embed valid LocalBusiness Schema.org JSON-LD', () => {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'CROWN WATCH CO.',
    };
    assertSchemaJSONLD(jsonLd, 'LocalBusiness');
  });

  it('[T1-F27-03] should embed valid RepairService Schema.org JSON-LD', () => {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'RepairService',
      name: 'Watch Repair Hub',
    };
    assertSchemaJSONLD(jsonLd, 'RepairService');
  });

  it('[T1-F27-04] should embed valid Offer Schema.org JSON-LD with BDT currency', () => {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Offer',
      priceCurrency: 'BDT',
      price: 14500,
    };
    assertSchemaJSONLD(jsonLd, 'Offer');
  });

  it('[T1-F27-05] should embed valid BreadcrumbList Schema.org JSON-LD', () => {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
    };
    assertSchemaJSONLD(jsonLd, 'BreadcrumbList');
  });
});
