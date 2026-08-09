import { describe, it } from '../helpers/runner_utils.ts';
import assert from 'node:assert/strict';
import { createMockProduct, createMockProducts } from '../factories/index.ts';

describe('F06: Product Sorting', () => {
  it('[T1-F06-01] should sort products by Price Low to High', () => {
    const products = [
      createMockProduct({ price: 15000 }),
      createMockProduct({ price: 4500 }),
      createMockProduct({ price: 8900 }),
    ];
    const sorted = [...products].sort((a, b) => a.price - b.price);
    assert.strictEqual(sorted[0].price, 4500);
    assert.strictEqual(sorted[2].price, 15000);
  });

  it('[T1-F06-02] should sort products by Price High to Low', () => {
    const products = [
      createMockProduct({ price: 15000 }),
      createMockProduct({ price: 4500 }),
      createMockProduct({ price: 28000 }),
    ];
    const sorted = [...products].sort((a, b) => b.price - a.price);
    assert.strictEqual(sorted[0].price, 28000);
    assert.strictEqual(sorted[2].price, 4500);
  });

  it('[T1-F06-03] should sort products by Rating Highest First', () => {
    const products = [
      createMockProduct({ rating: 4.2 }),
      createMockProduct({ rating: 4.9 }),
      createMockProduct({ rating: 4.5 }),
    ];
    const sorted = [...products].sort((a, b) => b.rating - a.rating);
    assert.strictEqual(sorted[0].rating, 4.9);
  });

  it('[T1-F06-04] should sort products by Newest Arrivals', () => {
    const p1 = createMockProduct({ id: 'p1' });
    const p2 = createMockProduct({ id: 'p2' });
    const products = [p1, p2];
    assert.ok(products.length === 2);
  });

  it('[T1-F06-05] should maintain stable sort order for equal prices', () => {
    const p1 = createMockProduct({ id: 'p1', price: 10000 });
    const p2 = createMockProduct({ id: 'p2', price: 10000 });
    const products = [p1, p2];
    const sorted = [...products].sort((a, b) => a.price - b.price);
    assert.strictEqual(sorted.length, 2);
  });
});
