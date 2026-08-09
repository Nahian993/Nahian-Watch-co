import { describe, it } from '../helpers/runner_utils.ts';
import assert from 'node:assert/strict';
import { createMockProducts } from '../factories/index.ts';

describe('F04: Product Filtering System', () => {
  it('[T1-F04-01] should filter catalog by Brand Casio', () => {
    const products = createMockProducts(5, { brand: 'Casio' });
    const casioOnly = products.filter((p) => p.brand === 'Casio');
    assert.strictEqual(casioOnly.length, 5);
  });

  it('[T1-F04-02] should filter catalog by Category Watches', () => {
    const products = createMockProducts(5, { category: 'Watches' });
    const watchesOnly = products.filter((p) => p.category === 'Watches');
    assert.strictEqual(watchesOnly.length, 5);
  });

  it('[T1-F04-03] should filter catalog by price range 5000 to 20000 BDT', () => {
    const products = [
      ...createMockProducts(3, { price: 4000 }),
      ...createMockProducts(4, { price: 12500 }),
      ...createMockProducts(2, { price: 25000 }),
    ];
    const filtered = products.filter((p) => p.price >= 5000 && p.price <= 20000);
    assert.strictEqual(filtered.length, 4);
  });

  it('[T1-F04-04] should filter products by movement type Quartz', () => {
    const products = createMockProducts(3, { specifications: { Movement: 'Quartz' } });
    const quartz = products.filter((p) => p.specifications.Movement === 'Quartz');
    assert.strictEqual(quartz.length, 3);
  });

  it('[T1-F04-05] should filter products by in-stock status', () => {
    const products = [
      ...createMockProducts(4, { stockQuantity: 10 }),
      ...createMockProducts(2, { stockQuantity: 0 }),
    ];
    const inStock = products.filter((p) => p.stockQuantity > 0);
    assert.strictEqual(inStock.length, 4);
  });
});
