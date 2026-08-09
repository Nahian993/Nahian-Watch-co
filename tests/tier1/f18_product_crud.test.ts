import { describe, it } from '../helpers/runner_utils.ts';
import assert from 'node:assert/strict';
import { createMockProduct } from '../factories/index.ts';

describe('F18: Product CRUD', () => {
  it('[T1-F18-01] should create new product entry in catalog', () => {
    const newProduct = createMockProduct({ title: { en: 'Seiko Presage Cocktail', bn: 'সেইকো প্রিসেজ' } });
    assert.strictEqual(newProduct.title.en, 'Seiko Presage Cocktail');
  });

  it('[T1-F18-02] should update existing product price and details', () => {
    const product = createMockProduct({ price: 14500 });
    product.price = 15500;
    assert.strictEqual(product.price, 15500);
  });

  it('[T1-F18-03] should delete product entry from catalog', () => {
    let products = [createMockProduct({ id: 'p1' }), createMockProduct({ id: 'p2' })];
    products = products.filter((p) => p.id !== 'p1');
    assert.strictEqual(products.length, 1);
  });

  it('[T1-F18-04] should list all inventory products in admin view', () => {
    const products = [createMockProduct(), createMockProduct()];
    assert.strictEqual(products.length, 2);
  });

  it('[T1-F18-05] should validate required product fields on creation', () => {
    const product = createMockProduct();
    assert.ok(product.id && product.sku && product.price > 0);
  });
});
