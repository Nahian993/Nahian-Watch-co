import { Order } from '../types';

export const initialOrders: Order[] = [
  {
    id: 'ord-001',
    orderNumber: 'CROWN-ORD-2026-8801',
    customerInfo: {
      fullName: 'Rafiqul Islam',
      phone: '01711998877',
      email: 'rafiqul@example.com',
      address: 'House 42, Road 11, Banani',
      district: 'Dhaka',
      postalCode: '1213',
    },
    items: [
      {
        productId: 'prod-001',
        title: 'Casio G-Shock CasiOak All Black (GA-2100-1A1)',
        price: 13800,
        quantity: 1,
        engravingText: 'RIF-1985',
        engravingFee: 300,
      },
    ],
    subtotal: 14100,
    shippingFee: 60,
    discount: 1000,
    couponCode: 'HERITAGE50',
    totalAmount: 13160,
    paymentMethod: 'bKash',
    paymentDetails: {
      senderPhone: '01711998877',
      trxId: '8A9B7C6D5E',
    },
    paymentStatus: 'verified',
    orderStatus: 'shipped',
    createdAt: '2026-08-05T14:20:00Z',
  },
  {
    id: 'ord-002',
    orderNumber: 'CROWN-ORD-2026-8802',
    customerInfo: {
      fullName: 'Nusrat Jahan',
      phone: '01811223344',
      email: 'nusrat@example.com',
      address: 'GEC Circle, Nasirabad',
      district: 'Chittagong',
      postalCode: '4000',
    },
    items: [
      {
        productId: 'prod-004',
        title: 'Casio ClassWiz FX-991CW Calculator',
        price: 3200,
        quantity: 2,
      },
    ],
    subtotal: 6400,
    shippingFee: 120,
    discount: 500,
    couponCode: 'EID2026',
    totalAmount: 6020,
    paymentMethod: 'COD',
    paymentDetails: {},
    paymentStatus: 'pending',
    orderStatus: 'processing',
    createdAt: '2026-08-06T18:10:00Z',
  },
  {
    id: 'ord-003',
    orderNumber: 'CROWN-ORD-2026-8803',
    customerInfo: {
      fullName: 'Tariqul Alam',
      phone: '01911334455',
      email: 'tariq@example.com',
      address: 'Zindabazar Point',
      district: 'Sylhet',
      postalCode: '3100',
    },
    items: [
      {
        productId: 'prod-002',
        title: 'Seiko 5 Automatic Military Canvas Black (SNK809)',
        price: 15900,
        quantity: 1,
      },
    ],
    subtotal: 15900,
    shippingFee: 120,
    discount: 0,
    totalAmount: 16020,
    paymentMethod: 'Nagad',
    paymentDetails: {
      senderPhone: '01911334455',
      trxId: 'NGD77665544',
    },
    paymentStatus: 'verified',
    orderStatus: 'delivered',
    createdAt: '2026-08-04T11:00:00Z',
  },
];

export const sampleOrders = initialOrders;
