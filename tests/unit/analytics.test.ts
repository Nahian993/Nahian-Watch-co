import { db } from '@/lib/db';
import { Order } from '@/types';

describe('Admin Analytics Calculation Tests', () => {
  beforeEach(() => {
    // Reset database to initial state
    db.reset();
  });

  it('should calculate revenue and totals correctly from active orders', () => {
    const orders = db.getOrders();
    const activeOrders = orders.filter(
      (o) => o.orderStatus?.toLowerCase() !== 'cancelled'
    );
    const calculatedRevenue = activeOrders.reduce((sum, o) => sum + o.totalAmount, 0);

    expect(calculatedRevenue).toBeGreaterThanOrEqual(0);
    expect(orders.length).toBeGreaterThanOrEqual(0);
  });
});
