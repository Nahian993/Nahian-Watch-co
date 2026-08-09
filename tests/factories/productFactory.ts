/**
 * Product Factory for E2E Test Suite
 */

export interface Product {
  id: string;
  sku: string;
  title: { en: string; bn: string };
  slug: string;
  brand: 'Casio' | 'Seiko' | 'Citizen' | 'Other';
  category: 'Watches' | 'Smartwatches' | 'Calculators';
  subcategory?: string;
  price: number;
  salePrice?: number;
  stockQuantity: number;
  isAuthentic: boolean;
  warrantyInfo: string;
  images: string[];
  description: { en: string; bn: string };
  specifications: Record<string, string>;
  rating: number;
  reviewCount: number;
  allowEngraving: boolean;
  engravingFeeBDT?: number;
}

/**
 * Creates a mock Product object with sensible defaults and optional overrides.
 */
export function createMockProduct(overrides?: Partial<Product>): Product {
  const uniqueId = `prod_${Date.now()}_${Math.floor(100 + Math.random() * 900)}`;
  return {
    id: uniqueId,
    sku: `CS-EDIFICE-${Math.floor(100 + Math.random() * 900)}`,
    title: {
      en: 'Casio Edifice Chronograph EFR-539D',
      bn: 'ক্যাসিও এডিফিস ক্রোনোগ্রাফ EFR-539D',
    },
    slug: 'casio-edifice-chronograph-efr-539d',
    brand: 'Casio',
    category: 'Watches',
    subcategory: 'Chronograph',
    price: 14500,
    stockQuantity: 12,
    isAuthentic: true,
    warrantyInfo: '2 Years Official Warranty',
    images: ['/images/products/casio-efr-539d-1.jpg'],
    description: {
      en: 'Authentic Casio Edifice stainless steel chronograph watch with 100m water resistance.',
      bn: '১০০ মিটার ওয়াটার রেজিস্ট্যান্স সহ প্রিমিয়াম স্টেইনলেস স্টিল ক্যাসিও এডিফিস ঘড়ি।',
    },
    specifications: {
      CaseMaterial: 'Stainless Steel',
      WaterResistance: '100m',
      Movement: 'Quartz',
      DialColor: 'Black Gold',
    },
    rating: 4.9,
    reviewCount: 38,
    allowEngraving: true,
    engravingFeeBDT: 500,
    ...overrides,
  };
}

/**
 * Generates an array of mock Product objects.
 */
export function createMockProducts(count: number, overrides?: Partial<Product>): Product[] {
  return Array.from({ length: count }, (_, idx) =>
    createMockProduct({
      id: `prod_mock_${idx + 1}`,
      sku: `CS-MOCK-${100 + idx}`,
      ...overrides,
    })
  );
}
