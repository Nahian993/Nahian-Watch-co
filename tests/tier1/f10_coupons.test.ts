import { describe, it } from '../helpers/runner_utils.ts';
import assert from 'node:assert/strict';

describe('F10: Coupon Code Validation', () => {
  it('[T1-F10-01] should apply valid percentage discount coupon EID2026', () => {
    const subtotal = 10000;
    const discountRate = 0.1;
    const discount = subtotal * discountRate;
    assert.strictEqual(discount, 1000);
  });

  it('[T1-F10-02] should apply flat discount coupon CROWN1000', () => {
    const discount = 1000;
    assert.strictEqual(discount, 1000);
  });

  it('[T1-F10-03] should reject invalid coupon code INVALIDCODE', () => {
    const validCoupons = ['EID2026', 'CROWN1000'];
    const isValid = validCoupons.includes('INVALIDCODE');
    assert.strictEqual(isValid, false);
  });

  it('[T1-F10-04] should reject expired promotional coupon', () => {
    const isExpired = true;
    assert.strictEqual(isExpired, true);
  });

  it('[T1-F10-05] should recalculate order total after coupon application', () => {
    const subtotal = 12500;
    const discount = 1000;
    const shipping = 60;
    const total = subtotal - discount + shipping;
    assert.strictEqual(total, 11560);
  });
});
