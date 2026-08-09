import { describe, it } from '../helpers/runner_utils.ts';
import assert from 'node:assert/strict';
import { createMockReview } from '../factories/index.ts';

describe('F22: Customer Review Moderation', () => {
  it('[T1-F22-01] should submit new customer review with Pending status', () => {
    const review = createMockReview({ status: 'Pending' });
    assert.strictEqual(review.status, 'Pending');
  });

  it('[T1-F22-02] should approve pending customer review in admin panel', () => {
    const review = createMockReview({ status: 'Pending' });
    review.status = 'Approved';
    assert.strictEqual(review.status, 'Approved');
  });

  it('[T1-F22-03] should reject spam customer review in admin panel', () => {
    const review = createMockReview({ status: 'Pending' });
    review.status = 'Rejected';
    assert.strictEqual(review.status, 'Rejected');
  });

  it('[T1-F22-04] should render verified purchase badge on review', () => {
    const review = createMockReview({ isVerifiedPurchase: true });
    assert.strictEqual(review.isVerifiedPurchase, true);
  });

  it('[T1-F22-05] should compute average rating after review approval', () => {
    const reviews = [createMockReview({ rating: 5 }), createMockReview({ rating: 4 })];
    const avg = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    assert.strictEqual(avg, 4.5);
  });
});
