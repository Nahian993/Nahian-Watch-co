import { Product, Order, RepairTicket, Review, UserTelemetryProfile } from '@/types';
import { initialProducts } from '@/data/products';
import { initialOrders } from '@/data/orders';
import { initialRepairs } from '@/data/repairs';
import { initialReviews } from '@/data/reviews';

export class Database {
  private products: Product[] = [];
  private orders: Order[] = [];
  private repairs: RepairTicket[] = [];
  private reviews: Review[] = [];

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.products = JSON.parse(JSON.stringify(initialProducts));
    this.orders = JSON.parse(JSON.stringify(initialOrders));
    this.repairs = JSON.parse(JSON.stringify(initialRepairs));
    this.reviews = JSON.parse(JSON.stringify(initialReviews));
  }

  // --- PRODUCTS CRUD ---
  public getProducts(filters?: {
    category?: string;
    brand?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
  }): Product[] {
    let result = [...this.products];
    if (!filters) return result;

    if (filters.category && filters.category !== 'All') {
      result = result.filter(
        (p) => p.category.toLowerCase() === filters.category!.toLowerCase()
      );
    }

    if (filters.brand && filters.brand !== 'All') {
      result = result.filter(
        (p) => p.brand.toLowerCase() === filters.brand!.toLowerCase()
      );
    }

    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.en.toLowerCase().includes(q) ||
          p.title.bn.includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    if (filters.minPrice !== undefined) {
      result = result.filter((p) => (p.salePrice ?? p.price) >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      result = result.filter((p) => (p.salePrice ?? p.price) <= filters.maxPrice!);
    }

    if (filters.sort) {
      switch (filters.sort) {
        case 'price-asc':
          result.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
          break;
        case 'price-desc':
          result.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          result.sort((a, b) => {
            const numA = parseInt(a.id.replace(/\D/g, '') || '0', 10);
            const numB = parseInt(b.id.replace(/\D/g, '') || '0', 10);
            return numB - numA;
          });
          break;
      }
    }

    return result;
  }

  public getProductBySlug(slug: string): Product | undefined {
    return this.products.find((p) => p.slug === slug);
  }

  public getProductById(id: string): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  public createProduct(productData: Omit<Product, 'id'>): Product {
    const nextNum = this.products.length + 1;
    const id = `prod-${nextNum.toString().padStart(3, '0')}`;
    const newProduct: Product = { ...productData, id };
    this.products.push(newProduct);
    return newProduct;
  }

  public updateProduct(id: string, updates: Partial<Product>): Product | undefined {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return undefined;
    this.products[index] = { ...this.products[index], ...updates };
    return this.products[index];
  }

  public deleteProduct(id: string): boolean {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return false;
    this.products.splice(index, 1);
    return true;
  }

  // --- ORDERS CRUD ---
  public getOrders(): Order[] {
    return [...this.orders];
  }

  public getOrderById(id: string): Order | undefined {
    return this.orders.find((o) => o.id === id);
  }

  public getOrderByNumber(orderNumber: string): Order | undefined {
    const num = orderNumber.trim().toUpperCase();
    return this.orders.find((o) => o.orderNumber.toUpperCase() === num);
  }

  public createOrder(
    orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>
  ): Order {
    const count = 8801 + this.orders.length;
    const id = `ord-${(this.orders.length + 1).toString().padStart(3, '0')}`;
    const orderNumber = `CROWN-ORD-2026-${count}`;
    const newOrder: Order = {
      ...orderData,
      id,
      orderNumber,
      createdAt: new Date().toISOString(),
    };
    this.orders.unshift(newOrder);
    return newOrder;
  }

  public updateOrderStatus(
    id: string,
    orderStatus: Order['orderStatus'],
    paymentStatus?: Order['paymentStatus']
  ): Order | undefined {
    const order = this.orders.find((o) => o.id === id || o.orderNumber === id);
    if (!order) return undefined;
    order.orderStatus = orderStatus;
    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }
    return order;
  }

  // --- REPAIRS CRUD ---
  public getRepairs(): RepairTicket[] {
    return [...this.repairs];
  }

  public getRepairByTicketNumber(ticketNumber: string): RepairTicket | undefined {
    const search = ticketNumber.trim().toUpperCase();
    return this.repairs.find(
      (r) => r.ticketNumber.toUpperCase() === search || r.id.toUpperCase() === search
    );
  }

  public createRepairTicket(
    ticketData: Omit<RepairTicket, 'id' | 'ticketNumber' | 'createdAt' | 'timeline' | 'status'>
  ): RepairTicket {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const id = `rep-${(this.repairs.length + 1).toString().padStart(3, '0')}`;
    const ticketNumber = `CROWN-REP-2026-${randomSuffix}`;
    const newTicket: RepairTicket = {
      ...ticketData,
      id,
      ticketNumber,
      status: 'Submitted',
      createdAt: new Date().toISOString(),
      timeline: [
        {
          step: 'Ticket Created',
          status: 'completed',
          timestamp: new Date().toISOString(),
          note: 'Booking request submitted successfully by customer online.',
        },
        {
          step: 'Watch Received at Workshop',
          status: 'current',
          timestamp: 'Pending Arrival',
          note: 'Awaiting watch arrival at Crown Watch Service Hub.',
        },
        {
          step: 'Master Technician Inspection',
          status: 'upcoming',
          timestamp: 'Scheduled',
        },
        {
          step: 'Servicing & Repair In Progress',
          status: 'upcoming',
          timestamp: 'Scheduled',
        },
        {
          step: 'Water Resistance & Pressure Test',
          status: 'upcoming',
          timestamp: 'Scheduled',
        },
        {
          step: 'Ready for Pickup / Dispatch',
          status: 'upcoming',
          timestamp: 'Scheduled',
        },
      ],
    };
    this.repairs.unshift(newTicket);
    return newTicket;
  }

  public updateRepairTicket(
    id: string,
    updates: Partial<RepairTicket>
  ): RepairTicket | undefined {
    const ticket = this.repairs.find(
      (r) => r.id === id || r.ticketNumber === id
    );
    if (!ticket) return undefined;
    Object.assign(ticket, updates);
    return ticket;
  }

  // --- REVIEWS CRUD ---
  public getReviews(productId?: string, statusOnly?: Review['status']): Review[] {
    let result = [...this.reviews];
    if (productId) {
      result = result.filter((r) => r.productId === productId);
    }
    if (statusOnly) {
      result = result.filter((r) => r.status === statusOnly);
    }
    return result;
  }

  public createReview(
    reviewData: Omit<Review, 'id' | 'createdAt' | 'status'>
  ): Review {
    const id = `rev-${(this.reviews.length + 1).toString().padStart(3, '0')}`;
    const newReview: Review = {
      ...reviewData,
      id,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    this.reviews.push(newReview);
    return newReview;
  }

  public moderateReview(id: string, status: 'Approved' | 'Rejected'): Review | undefined {
    const review = this.reviews.find((r) => r.id === id);
    if (!review) return undefined;
    review.status = status;
    return review;
  }

  // --- USER TELEMETRY & IP INTELLIGENCE ---
  private telemetryProfiles: UserTelemetryProfile[] = [];

  public getTelemetryProfiles(): UserTelemetryProfile[] {
    return [...this.telemetryProfiles].sort(
      (a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime()
    );
  }

  public getTelemetryProfileByIp(ip: string): UserTelemetryProfile | undefined {
    return this.telemetryProfiles.find((p) => p.ip === ip);
  }

  public saveTelemetryProfile(profile: UserTelemetryProfile): UserTelemetryProfile {
    const existingIndex = this.telemetryProfiles.findIndex((p) => p.ip === profile.ip);
    if (existingIndex >= 0) {
      const existing = this.telemetryProfiles[existingIndex];
      const updated: UserTelemetryProfile = {
        ...existing,
        ...profile,
        totalViews: (existing.totalViews || 1) + 1,
        lastSeen: new Date().toISOString(),
      };
      this.telemetryProfiles[existingIndex] = updated;
      return updated;
    } else {
      const newProfile: UserTelemetryProfile = {
        ...profile,
        totalViews: 1,
        lastSeen: new Date().toISOString(),
      };
      this.telemetryProfiles.push(newProfile);
      return newProfile;
    }
  }

  public clearTelemetryProfiles(): void {
    this.telemetryProfiles = [];
  }
}

export const db = new Database();
