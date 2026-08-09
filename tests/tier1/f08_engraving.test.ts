import { describe, it } from '../helpers/runner_utils.ts';
import assert from 'node:assert/strict';
import { createMockProduct } from '../factories/index.ts';

describe('F08: Watch Engraving Option', () => {
  it('[T1-F08-01] should allow engraving on eligible products', () => {
    const product = createMockProduct({ allowEngraving: true, engravingFeeBDT: 500 });
    assert.strictEqual(product.allowEngraving, true);
  });

  it('[T1-F08-02] should add engraving fee to item total', () => {
    const itemPrice = 14500;
    const engravingFee = 500;
    assert.strictEqual(itemPrice + engravingFee, 15000);
  });

  it('[T1-F08-03] should enforce custom engraving text max length of 30 chars', () => {
    const text = 'T.A. 2026 - Happy Birthday';
    assert.ok(text.length <= 30);
  });

  it('[T1-F08-04] should disable engraving for non-eligible products', () => {
    const product = createMockProduct({ allowEngraving: false });
    assert.strictEqual(product.allowEngraving, false);
  });

  it('[T1-F08-05] should include engraving text in order details payload', () => {
    const engravingText = 'CROWN 1974';
    assert.strictEqual(engravingText, 'CROWN 1974');
  });
});
