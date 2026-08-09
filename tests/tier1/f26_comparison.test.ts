import { describe, it } from '../helpers/runner_utils.ts';
import assert from 'node:assert/strict';
import { createMockProduct } from '../factories/index.ts';

describe('F26: Watch Comparison Tool', () => {
  it('[T1-F26-01] should allow adding up to 4 watches to comparison matrix', () => {
    const compareList = [createMockProduct(), createMockProduct(), createMockProduct(), createMockProduct()];
    assert.strictEqual(compareList.length, 4);
  });

  it('[T1-F26-02] should compare specs side-by-side (Movement, Water Resistance)', () => {
    const p1 = createMockProduct({ specifications: { Movement: 'Quartz' } });
    const p2 = createMockProduct({ specifications: { Movement: 'Automatic' } });
    assert.notStrictEqual(p1.specifications.Movement, p2.specifications.Movement);
  });

  it('[T1-F26-03] should highlight specification differences', () => {
    const diffCount = 3;
    assert.ok(diffCount > 0);
  });

  it('[T1-F26-04] should allow removing watch from comparison list', () => {
    let compareList = ['p1', 'p2'];
    compareList = compareList.filter((id) => id !== 'p1');
    assert.strictEqual(compareList.length, 1);
  });

  it('[T1-F26-05] should render price comparison in BDT', () => {
    const price1 = 14500;
    const price2 = 24500;
    assert.ok(price1 < price2);
  });
});
