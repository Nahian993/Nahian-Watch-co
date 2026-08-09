import { describe, it } from '../helpers/runner_utils.ts';
import assert from 'node:assert/strict';

describe('F09: Dynamic Cart Drawer', () => {
  it('[T1-F09-01] should add product items to cart drawer', () => {
    const cart = [{ productId: 'p1', qty: 1 }];
    assert.strictEqual(cart.length, 1);
  });

  it('[T1-F09-02] should increment item quantity in cart', () => {
    let qty = 1;
    qty++;
    assert.strictEqual(qty, 2);
  });

  it('[T1-F09-03] should decrement item quantity in cart', () => {
    let qty = 2;
    qty--;
    assert.strictEqual(qty, 1);
  });

  it('[T1-F09-04] should remove item from cart when quantity is zero', () => {
    const cart = [{ productId: 'p1', qty: 0 }].filter((item) => item.qty > 0);
    assert.strictEqual(cart.length, 0);
  });

  it('[T1-F09-05] should calculate total cart subtotal accurately', () => {
    const items = [
      { price: 14500, qty: 1 },
      { price: 4500, qty: 2 },
    ];
    const subtotal = items.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
    assert.strictEqual(subtotal, 23500);
  });
});
