import { Review } from '../types';

export const initialReviews: Review[] = [
  {
    id: 'rev-001',
    productId: 'prod-001',
    customerName: 'Mahmud Hassan',
    rating: 5,
    comment: 'Authentic G-Shock! Delivery was super fast within Dhaka (received in less than 24 hours). Engraving on backplate looks incredible.',
    isVerifiedPurchase: true,
    status: 'approved',
    createdAt: '2026-08-01T12:00:00Z',
    helpfulCount: 14,
  },
  {
    id: 'rev-002',
    productId: 'prod-002',
    customerName: 'Kazi Farhan',
    rating: 5,
    comment: 'The Seiko 5 automatic is 100% genuine. Checked with official serial number. Crown Watch Co. has been our family shop since my father purchased his Seiko in 1988!',
    isVerifiedPurchase: true,
    status: 'approved',
    createdAt: '2026-08-02T15:30:00Z',
    helpfulCount: 22,
  },
  {
    id: 'rev-003',
    productId: 'prod-004',
    customerName: 'Shahriar Kabir',
    rating: 5,
    comment: 'Genuine FX-991CW with Bangladesh official warranty hologram. Allowed in BUET admission exam.',
    isVerifiedPurchase: true,
    status: 'approved',
    createdAt: '2026-08-03T09:15:00Z',
    helpfulCount: 9,
  },
];

export const sampleReviews = initialReviews;
