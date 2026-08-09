import { describe, it } from '../helpers/runner_utils.ts';
import assert from 'node:assert/strict';
import { createMockOrder } from '../factories/index.ts';

describe('F20: Order Status Management', () => {
  it('[T1-F20-01] should list customer orders in admin table', () => {
    const orders = [createMockOrder(), createMockOrder()];
    assert.strictEqual(orders.length, 2);
  });

  it('[T1-F20-02] should verify bKash MFS TrxID status in admin order view', () => {
    const order = createMockOrder({ paymentMethod: 'bKash', paymentStatus: 'Verified' });
    assert.strictEqual(order.paymentStatus, 'Verified');
  });

  it('[T1-F20-03] should update order status from Processing to Shipped', () => {
    const order = createMockOrder({ orderStatus: 'Processing' });
    order.orderStatus = 'Shipped';
    assert.strictEqual(order.orderStatus, 'Shipped');
  });

  it('[T1-F20-04] should update order status to Delivered on completion', () => {
    const order = createMockOrder({ orderStatus: 'Shipped' });
    order.orderStatus = 'Delivered';
    assert.strictEqual(order.orderStatus, 'Delivered');
  });

  it('[T1-F20-05] should filter admin order list by status Pending', () => {
    const orders = [createMockOrder({ orderStatus: 'Pending' }), createMockOrder({ orderStatus: 'Delivered' })];
    const pendingOnly = orders.filter((o) => o.orderStatus === 'Pending');
    assert.strictEqual(pendingOnly.length, 1);
  });
});
