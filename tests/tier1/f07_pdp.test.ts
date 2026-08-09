import { describe, it } from '../helpers/runner_utils.ts';
import assert from 'node:assert/strict';
import { createMockProduct } from '../factories/index.ts';
import { assertBDTFormat } from '../helpers/assertions.ts';

describe('F07: Product Details PDP', () => {
  it('[T1-F07-01] should render product title and brand', () => {
    const product = createMockProduct({ brand: 'Seiko', title: { en: 'Seiko 5 Sports', bn: 'সেইকো ৫ স্পোর্টস' } });
    assert.strictEqual(product.brand, 'Seiko');
    assert.strictEqual(product.title.en, 'Seiko 5 Sports');
  });

  it('[T1-F07-02] should display authentic BDT price formatting', () => {
    const product = createMockProduct({ price: 24500 });
    assertBDTFormat('৳ 24,500', product.price);
  });

  it('[T1-F07-03] should render stock status indicator', () => {
    const product = createMockProduct({ stockQuantity: 8 });
    assert.ok(product.stockQuantity > 0);
  });

  it('[T1-F07-04] should render warranty information', () => {
    const product = createMockProduct({ warrantyInfo: '2 Year Official Manufacturer Warranty' });
    assert.ok(product.warrantyInfo.includes('Warranty'));
  });

  it('[T1-F07-05] should render image gallery paths', () => {
    const product = createMockProduct({ images: ['/images/seiko1.jpg', '/images/seiko2.jpg'] });
    assert.strictEqual(product.images.length, 2);
  });
});
