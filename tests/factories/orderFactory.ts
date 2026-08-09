/**
 * Order Factory for E2E Test Suite
 */

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  engravingText?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerInfo: {
    fullName: string;
    phone: string;
    address: string;
    district: string;
  };
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  totalAmount: number;
  paymentMethod: 'bKash' | 'Nagad' | 'Rocket' | 'COD';
  paymentDetails: {
    senderPhone?: string;
    trxId?: string;
  };
  paymentStatus: 'Pending' | 'Verified' | 'Failed' | 'Refunded';
  orderStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
}

/**
 * Creates a mock Order object with sensible defaults and optional overrides.
 */
export function createMockOrder(overrides?: Partial<Order>): Order {
  const uniqueId = `ord_${Date.now()}_${Math.floor(100 + Math.random() * 900)}`;
  const district = overrides?.customerInfo?.district || 'Dhaka';
  const shippingFee = district.toLowerCase() === 'dhaka' ? 60 : 120;

  return {
    id: uniqueId,
    orderNumber: `CROWN-ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    customerInfo: {
      fullName: 'Tanvir Ahmed',
      phone: '01711223344',
      address: 'House 42, Road 11, Banani',
      district,
    },
    items: [
      {
        productId: 'prod_1',
        title: 'Casio Edifice Chronograph EFR-539D',
        price: 14500,
        quantity: 1,
        engravingText: 'T.A. 2026',
      },
    ],
    subtotal: 14500,
    shippingFee,
    discount: 0,
    totalAmount: 14500 + shippingFee,
    paymentMethod: 'bKash',
    paymentDetails: {
      senderPhone: '01711223344',
      trxId: '8N7A6W5E9',
    },
    paymentStatus: 'Verified',
    orderStatus: 'Processing',
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

/**
 * Generates an array of mock Order objects.
 */
export function createMockOrders(count: number, overrides?: Partial<Order>): Order[] {
  return Array.from({ length: count }, (_, idx) =>
    createMockOrder({
      id: `ord_mock_${idx + 1}`,
      orderNumber: `CROWN-ORD-2026-${2000 + idx}`,
      ...overrides,
    })
  );
}
