import { db } from '../../src/lib/db';

describe('Database Storage Helper', () => {
  beforeEach(() => {
    db.reset();
  });

  describe('Products CRUD', () => {
    it('initializes with 22 authentic seed products', () => {
      const products = db.getProducts();
      expect(products.length).toBeGreaterThanOrEqual(22);
    });

    it('filters products by brand correctly', () => {
      const casioWatches = db.getProducts({ brand: 'Casio' });
      expect(casioWatches.every((p) => p.brand === 'Casio')).toBe(true);
      expect(casioWatches.length).toBeGreaterThan(0);
    });

    it('filters products by category correctly', () => {
      const calculators = db.getProducts({ category: 'Calculators' });
      expect(calculators.every((p) => p.category.toLowerCase() === 'calculators')).toBe(true);
      expect(calculators.length).toBeGreaterThanOrEqual(3);
    });

    it('filters products by search query across title and SKU', () => {
      const searchGshock = db.getProducts({ search: 'G-Shock' });
      expect(searchGshock.length).toBeGreaterThan(0);

      const searchSku = db.getProducts({ search: 'CAS-FX991EX' });
      expect(searchSku.length).toBe(1);
    });

    it('sorts products by price low-to-high and high-to-low', () => {
      const asc = db.getProducts({ sort: 'price-asc' });
      const desc = db.getProducts({ sort: 'price-desc' });

      const firstAscPrice = asc[0].salePrice ?? asc[0].price;
      const lastAscPrice = asc[asc.length - 1].salePrice ?? asc[asc.length - 1].price;
      expect(firstAscPrice).toBeLessThanOrEqual(lastAscPrice);

      const firstDescPrice = desc[0].salePrice ?? desc[0].price;
      const lastDescPrice = desc[desc.length - 1].salePrice ?? desc[desc.length - 1].price;
      expect(firstDescPrice).toBeGreaterThanOrEqual(lastDescPrice);
    });

    it('creates, updates, and deletes a product', () => {
      const newProd = db.createProduct({
        sku: 'TEST-SKU-001',
        title: { en: 'Test Watch', bn: 'টেস্ট ঘড়ি' },
        slug: 'test-watch',
        brand: 'Other',
        category: 'Watches',
        subcategory: 'Test',
        price: 5000,
        stockQuantity: 10,
        isAuthentic: true,
        warrantyInfo: { en: '1 Year Warranty', bn: '১ বছরের ওয়ারেন্টি' },
        images: ['https://example.com/image.jpg'],
        description: { en: 'Test description', bn: 'টেস্ট বিবরণ' },
        specifications: { Movement: 'Quartz' },
        rating: 5.0,
        reviewCount: 1,
        allowEngraving: true,
      });

      expect(newProd.id).toBeDefined();
      expect(db.getProductById(newProd.id)).toBeDefined();

      const updated = db.updateProduct(newProd.id, { price: 6000 });
      expect(updated?.price).toBe(6000);

      const deleted = db.deleteProduct(newProd.id);
      expect(deleted).toBe(true);
      expect(db.getProductById(newProd.id)).toBeUndefined();
    });
  });

  describe('Orders CRUD', () => {
    it('retrieves seed orders and supports order creation', () => {
      const orders = db.getOrders();
      expect(orders.length).toBeGreaterThanOrEqual(3);

      const newOrder = db.createOrder({
        customerInfo: {
          fullName: 'Test Customer',
          phone: '01711223344',
          address: 'Test Address',
          district: 'Dhaka',
        },
        items: [],
        subtotal: 10000,
        shippingFee: 60,
        discount: 0,
        totalAmount: 10060,
        paymentMethod: 'bKash',
        paymentDetails: { senderPhone: '01711223344', trxId: 'BKASH99999' },
        paymentStatus: 'Verified',
        orderStatus: 'Pending',
      });

      expect(newOrder.orderNumber).toContain('CROWN-ORD-2026-');
      expect(db.getOrderByNumber(newOrder.orderNumber)).toBeDefined();

      const updated = db.updateOrderStatus(newOrder.id, 'Processing');
      expect(updated?.orderStatus).toBe('Processing');
    });
  });

  describe('Repairs CRUD', () => {
    it('retrieves repair tickets and creates new booking ticket', () => {
      const repairs = db.getRepairs();
      expect(repairs.length).toBeGreaterThanOrEqual(3);

      const ticket = db.createRepairTicket({
        customerName: 'Test Repair Customer',
        customerPhone: '01812345678',
        district: 'Chittagong',
        watchBrand: 'Casio',
        watchModel: 'Edifice EFR-539D',
        watchType: 'Quartz',
        serviceRequested: 'Glass Polish',
        problemDescription: 'Scratched mineral crystal',
        estimatedCostRange: { min: 1000, max: 2000 },
        estimatedTurnaround: '2-3 Business Days',
      });

      expect(ticket.ticketNumber).toContain('CROWN-REP-2026-');
      expect(ticket.status).toBe('Submitted');
      expect(ticket.timeline.length).toBe(6);
      expect(db.getRepairByTicketNumber(ticket.ticketNumber)).toBeDefined();
    });
  });

  describe('Reviews CRUD', () => {
    it('supports creating and moderating customer reviews', () => {
      const review = db.createReview({
        productId: 'prod-001',
        customerName: 'Reviewer Test',
        rating: 5,
        comment: 'Great product!',
        isVerifiedPurchase: true,
      });

      expect(review.status).toBe('Pending');

      const approved = db.moderateReview(review.id, 'Approved');
      expect(approved?.status).toBe('Approved');
    });
  });

  describe('Test Isolation with reset()', () => {
    it('resets state completely to initial seed values', () => {
      db.createProduct({
        sku: 'TEMP-SKU',
        title: { en: 'Temp', bn: 'টেম্প' },
        slug: 'temp',
        brand: 'Other',
        category: 'Watches',
        subcategory: 'Temp',
        price: 100,
        stockQuantity: 1,
        isAuthentic: true,
        warrantyInfo: { en: 'None', bn: 'নেই' },
        images: [],
        description: { en: 'Temp', bn: 'টেম্প' },
        specifications: {},
        rating: 1,
        reviewCount: 0,
        allowEngraving: false,
      });

      db.reset();
      expect(db.getProducts().find((p) => p.sku === 'TEMP-SKU')).toBeUndefined();
    });
  });
});
