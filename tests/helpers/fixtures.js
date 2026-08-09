/**
 * CROWN WATCH CO. — Test Data Fixture Factories
 * File Location: tests/helpers/fixtures.js
 */

/**
 * Generates a mock Product object with default values and optional overrides.
 * @param {Object} [overrides] - Attribute overrides
 * @returns {Object} Product object
 */
function createMockProduct(overrides = {}) {
  const uniqueId = `prod_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  return {
    id: uniqueId,
    sku: `CS-WATCH-${Math.floor(100 + Math.random() * 900)}`,
    title: {
      en: 'Casio Edifice EFR-539D',
      bn: 'ক্যাসিও এডিফিস ইএফআর-৫৩৯ডি'
    },
    slug: 'casio-edifice-efr-539d',
    brand: 'Casio',
    category: 'Watches',
    subcategory: 'Edifice',
    price: 14500,
    salePrice: 13500,
    stockQuantity: 12,
    isAuthentic: true,
    warrantyInfo: '2 Year Official Manufacturer Warranty',
    images: ['/images/casio-edifice-1.jpg', '/images/casio-edifice-2.jpg'],
    description: {
      en: 'Modern chronograph watch with solid stainless steel band and 100m water resistance.',
      bn: 'আধুনিক ক্রোনোগ্রাফ ঘড়ি উইথ সলিড স্টেইনলেস স্টিল ব্যান্ড এবং ১০০ মিটার ওয়াটার রেজিস্ট্যান্স।'
    },
    specifications: {
      Movement: 'Quartz Chronograph',
      CaseMaterial: 'Stainless Steel',
      WaterResistance: '100m / 10 ATM',
      DialColor: 'Black Gold'
    },
    rating: 4.9,
    reviewCount: 38,
    allowEngraving: true,
    engravingFeeBDT: 500,
    ...overrides
  };
}

/**
 * Generates a mock Order object with default values and optional overrides.
 * @param {Object} [overrides] - Attribute overrides
 * @returns {Object} Order object
 */
function createMockOrder(overrides = {}) {
  const uniqueId = `ord_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const orderNum = `CROWN-ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const district = (overrides.customerInfo && overrides.customerInfo.district) || overrides.district || 'Dhaka';
  const shippingFee = district.toLowerCase().includes('dhaka') ? 60 : 120;
  const subtotal = 14500;

  return {
    id: uniqueId,
    orderNumber: orderNum,
    customerInfo: {
      fullName: 'Rafiqul Islam',
      phone: '01711223344',
      address: 'House 15, Road 7, Sector 3, Uttara',
      district: district,
      ...(overrides.customerInfo || {})
    },
    items: [
      {
        productId: 'prod_101',
        title: 'Casio Edifice EFR-539D',
        price: 14500,
        quantity: 1,
        engravingText: 'Rafiq & Nusrat 2026'
      }
    ],
    subtotal: subtotal,
    shippingFee: shippingFee,
    discount: 0,
    totalAmount: subtotal + shippingFee,
    paymentMethod: 'bKash',
    paymentDetails: {
      senderPhone: '01711223344',
      trxId: '8N7A6W5E9'
    },
    paymentStatus: 'Verified',
    orderStatus: 'Processing',
    createdAt: new Date().toISOString(),
    ...overrides
  };
}

/**
 * Generates a mock Repair Ticket object with default values and optional overrides.
 * @param {Object} [overrides] - Attribute overrides
 * @returns {Object} RepairTicket object
 */
function createMockRepairTicket(overrides = {}) {
  const uniqueId = `rep_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const ticketNum = `CROWN-REP-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  return {
    id: uniqueId,
    ticketNumber: ticketNum,
    customerName: 'Kazi Mahbub',
    customerPhone: '01819887766',
    district: 'Chittagong',
    watchBrand: 'Seiko',
    watchModel: 'Seiko 5 Sports Automatic',
    watchType: 'Automatic',
    serviceRequested: 'Movement Overhaul & Calibration',
    problemDescription: 'Watch loses approximately 3 minutes daily.',
    estimatedCostRange: { min: 3000, max: 5000 },
    estimatedTurnaround: '3-5 Working Days',
    status: 'Diagnosing',
    timeline: [
      {
        status: 'Received',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        note: 'Watch received at Dhaka main service hub.'
      },
      {
        status: 'Diagnosing',
        timestamp: new Date().toISOString(),
        note: 'Technician opened caseback; movement amplitude inspection under way.'
      }
    ],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    ...overrides
  };
}

/**
 * Generates a mock Review object with default values and optional overrides.
 * @param {Object} [overrides] - Attribute overrides
 * @returns {Object} Review object
 */
function createMockReview(overrides = {}) {
  const uniqueId = `rev_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  return {
    id: uniqueId,
    productId: 'prod_101',
    customerName: 'Mahmudul Hasan',
    rating: 5,
    comment: 'Authentic Seiko watch with fast delivery to Sylhet. Excellent dark gold aesthetic packaging!',
    isVerifiedPurchase: true,
    status: 'Approved',
    createdAt: new Date().toISOString(),
    ...overrides
  };
}

/**
 * Generates a mock Coupon object.
 * @param {Object} [overrides] - Attribute overrides
 * @returns {Object} Coupon object
 */
function createMockCoupon(overrides = {}) {
  return {
    code: 'EID2026',
    discountType: 'percentage', // 'percentage' | 'fixed' | 'free_shipping'
    discountValue: 10, // 10% off
    minOrderBDT: 5000,
    isActive: true,
    ...overrides
  };
}

/**
 * Generates a mock 5-question Watch Finder Quiz response payload.
 * @param {Object} [overrides] - Attribute overrides
 * @returns {Object} Quiz answers payload
 */
function createMockQuizAnswers(overrides = {}) {
  return {
    answers: {
      q1_gender: 'Men',
      q2_style: 'Luxury Chronograph',
      q3_budget: '10000-25000',
      q4_movement: 'Automatic',
      q5_features: ['Water Resistance', 'Engraving'],
      ...(overrides.answers || {})
    },
    ...overrides
  };
}

module.exports = {
  createMockProduct,
  createMockOrder,
  createMockRepairTicket,
  createMockReview,
  createMockCoupon,
  createMockQuizAnswers
};
