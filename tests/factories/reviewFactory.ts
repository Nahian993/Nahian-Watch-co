/**
 * Customer Review Factory for E2E Test Suite
 */

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  comment: string;
  isVerifiedPurchase: boolean;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
}

/**
 * Creates a mock Review object with sensible defaults and optional overrides.
 */
export function createMockReview(overrides?: Partial<Review>): Review {
  const uniqueId = `rev_${Date.now()}_${Math.floor(100 + Math.random() * 900)}`;

  return {
    id: uniqueId,
    productId: 'prod_1',
    customerName: 'Sabbir Hossain',
    rating: 5,
    comment: 'Authentic Casio watch with official warranty card. Fast delivery to Sylhet!',
    isVerifiedPurchase: true,
    status: 'Approved',
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

/**
 * Generates an array of mock Review objects.
 */
export function createMockReviews(count: number, overrides?: Partial<Review>): Review[] {
  return Array.from({ length: count }, (_, idx) =>
    createMockReview({
      id: `rev_mock_${idx + 1}`,
      ...overrides,
    })
  );
}
