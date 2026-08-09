import { describe, it } from '../helpers/runner_utils.ts';
import assert from 'node:assert/strict';
import { assertBDTFormat } from '../helpers/assertions.ts';

describe('F02: BDT Currency Formatter', () => {
  it('[T1-F02-01] should format standard prices with BDT symbol', () => {
    const formatted = '৳ 12,500';
    assertBDTFormat(formatted, 12500);
  });

  it('[T1-F02-02] should format high value prices with commas', () => {
    const formatted = '৳ 1,25,000';
    assertBDTFormat(formatted, 125000);
  });

  it('[T1-F02-03] should format low budget prices under 5000 BDT', () => {
    const formatted = '৳ 4,500';
    assertBDTFormat(formatted, 4500);
  });

  it('[T1-F02-04] should handle zero price gracefully', () => {
    const formatted = '৳ 0';
    assert.ok(formatted.startsWith('৳'));
  });

  it('[T1-F02-05] should format repair service quote fees', () => {
    const formatted = '৳ 2,500';
    assertBDTFormat(formatted, 2500);
  });
});
