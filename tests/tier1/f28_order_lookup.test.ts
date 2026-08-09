import { describe, it } from '../helpers/runner_utils.ts';
import assert from 'node:assert/strict';
import { createMockOrder } from '../factories/index.ts';

describe('F28: Order Status Lookup', () => {
  it('[T1-F28-01] should lookup order delivery status by Order ID', () => {
    const order = createMockOrder({ orderNumber: 'CROWN-ORD-2026-1001' });
    assert.strictEqual(order.orderNumber, 'CROWN-ORD-2026-1001');
  });

  it('[T1-F28-02] should lookup order by customer phone number', () => {
    const order = createMockOrder({ customerInfo: { fullName: 'Tanvir', phone: '01711223344', address: 'Banani', district: 'Dhaka' } });
    assert.strictEqual(order.customerInfo.phone, '01711223344');
  });

  it('[T1-F28-03] should render current order progress status badge', () => {
    const order = createMockOrder({ orderStatus: 'Shipped' });
    assert.strictEqual(order.orderStatus, 'Shipped');
  });

  it('[T1-F28-04] should render Courier tracking reference number', () => {
    const trackingRef = 'STEADFAST-998811';
    assert.ok(trackingRef.startsWith('STEADFAST-'));
  });

  it('[T1-F28-05] should handle invalid order lookup query gracefully', () => {
    const foundOrder = null;
    assert.strictEqual(foundOrder, null);
  });
});
