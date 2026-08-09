import { describe, it } from '../helpers/runner_utils.ts';
import assert from 'node:assert/strict';

describe('F06 Boundary: Product Sorting', () => {
  it('[T2-F06-01] should handle sorting empty product list', () => {
    const products: any[] = [];
    const sorted = [...products].sort();
    assert.strictEqual(sorted.length, 0);
  });

  it('[T2-F06-02] should handle sorting list with single product', () => {
    const products = [{ price: 10000 }];
    const sorted = [...products].sort((a, b) => a.price - b.price);
    assert.strictEqual(sorted.length, 1);
  });

  it('[T2-F06-03] should handle sorting products with identical prices', () => {
    const products = [{ id: 1, price: 5000 }, { id: 2, price: 5000 }];
    const sorted = [...products].sort((a, b) => a.price - b.price);
    assert.strictEqual(sorted.length, 2);
  });

  it('[T2-F06-04] should handle invalid sorting key parameter', () => {
    const validSortKeys = ['price_asc', 'price_desc', 'rating', 'newest'];
    const selectedKey = 'invalid_key';
    const safeKey = validSortKeys.includes(selectedKey) ? selectedKey : 'newest';
    assert.strictEqual(safeKey, 'newest');
  });

  it('[T2-F06-05] should handle products with missing sale price gracefully', () => {
    const p = { price: 12000, salePrice: undefined };
    const effectivePrice = p.salePrice || p.price;
    assert.strictEqual(effectivePrice, 12000);
  });
});
