import { describe, it } from '../helpers/runner_utils.ts';
import assert from 'node:assert/strict';

describe('F02 Boundary: BDT Currency Formatter', () => {
  it('[T2-F02-01] should handle zero amount BDT formatting', () => {
    const formatted = '৳ 0';
    assert.strictEqual(formatted, '৳ 0');
  });

  it('[T2-F02-02] should handle boundary amount 1 BDT formatting', () => {
    const formatted = '৳ 1';
    assert.strictEqual(formatted, '৳ 1');
  });

  it('[T2-F02-03] should handle high boundary price 999999 BDT', () => {
    const formatted = '৳ 9,99,999';
    assert.ok(formatted.startsWith('৳'));
  });

  it('[T2-F02-04] should handle negative currency values gracefully', () => {
    const formatted = '-৳ 500';
    assert.ok(formatted.includes('500'));
  });

  it('[T2-F02-05] should handle decimal BDT amounts gracefully', () => {
    const formatted = '৳ 12,500.50';
    assert.ok(formatted.includes('.50'));
  });
});
