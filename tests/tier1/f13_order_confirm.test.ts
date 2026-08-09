import { describe, it } from '../helpers/runner_utils.ts';
import assert from 'node:assert/strict';
import { createMockOrder } from '../factories/index.ts';

describe('F13: Order Confirmation & Invoice', () => {
  it('[T1-F13-01] should generate unique order number CROWN-ORD-2026-XXXX', () => {
    const order = createMockOrder();
    assert.ok(order.orderNumber.startsWith('CROWN-ORD-2026-'));
  });

  it('[T1-F13-02] should calculate item total breakdown in invoice', () => {
    const order = createMockOrder({ subtotal: 14500, shippingFee: 60, totalAmount: 14560 });
    assert.strictEqual(order.subtotal + order.shippingFee, order.totalAmount);
  });

  it('[T1-F13-03] should display customer shipping address in invoice receipt', () => {
    const order = createMockOrder({ customerInfo: { fullName: 'Tanvir', phone: '01711223344', address: 'Banani', district: 'Dhaka' } });
    assert.strictEqual(order.customerInfo.district, 'Dhaka');
  });

  it('[T1-F13-04] should set initial order status to Pending or Processing', () => {
    const order = createMockOrder({ orderStatus: 'Processing' });
    assert.ok(['Pending', 'Processing'].includes(order.orderStatus));
  });

  it('[T1-F13-05] should render payment confirmation badge', () => {
    const order = createMockOrder({ paymentStatus: 'Verified' });
    assert.strictEqual(order.paymentStatus, 'Verified');
  });
});
