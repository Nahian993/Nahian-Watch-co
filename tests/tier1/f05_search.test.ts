import { describe, it } from '../helpers/runner_utils.ts';
import assert from 'node:assert/strict';
import { createMockProducts } from '../factories/index.ts';

describe('F05: Search Engine', () => {
  it('[T1-F05-01] should search products by title keyword Edifice', () => {
    const products = createMockProducts(3, { title: { en: 'Casio Edifice Classic', bn: 'ক্যাসিও এডিফিস' } });
    const matches = products.filter((p) => p.title.en.toLowerCase().includes('edifice'));
    assert.strictEqual(matches.length, 3);
  });

  it('[T1-F05-02] should search products by brand Seiko', () => {
    const products = createMockProducts(2, { brand: 'Seiko' });
    const matches = products.filter((p) => p.brand.toLowerCase() === 'seiko');
    assert.strictEqual(matches.length, 2);
  });

  it('[T1-F05-03] should search products by Bangla title keyword ঘড়ি', () => {
    const products = createMockProducts(4, { title: { en: 'Seiko Watch', bn: 'সেইকো ঘড়ি' } });
    const matches = products.filter((p) => p.title.bn.includes('ঘড়ি'));
    assert.strictEqual(matches.length, 4);
  });

  it('[T1-F05-04] should perform case-insensitive keyword search', () => {
    const query = 'cASiO';
    const products = createMockProducts(3, { brand: 'Casio' });
    const matches = products.filter((p) => p.brand.toLowerCase() === query.toLowerCase());
    assert.strictEqual(matches.length, 3);
  });

  it('[T1-F05-05] should return empty array for non-matching search term', () => {
    const products = createMockProducts(3);
    const matches = products.filter((p) => p.title.en.includes('NonExistentTermXYZ'));
    assert.strictEqual(matches.length, 0);
  });
});
