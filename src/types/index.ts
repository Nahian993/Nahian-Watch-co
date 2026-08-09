export type Language = 'en' | 'bn';

export type WatchBrand = string;
export type ProductCategory = 'Watches' | 'watches' | 'Smartwatches' | 'smartwatches' | 'Calculators' | 'calculators' | 'Accessories' | 'accessories' | 'Couple Sets' | 'couple-sets' | 'Eyewear' | 'eyewear' | 'Bracelets' | 'bracelets';

export interface LocalizedString {
  en: string;
  bn: string;
}

export type BilingualText = LocalizedString;

export interface Product {
  id: string;
  sku: string;
  title: LocalizedString;
  slug: string;
  brand: WatchBrand;
  category: ProductCategory;
  subcategory: string;
  price: number;
  salePrice?: number;
  stockQuantity: number;
  isAuthentic: boolean;
  warrantyInfo: LocalizedString;
  images: string[];
  description: LocalizedString;
  specifications: Record<string, string>;
  rating: number;
  reviewCount: number;
  allowEngraving: boolean;
  engravingFeeBDT?: number;
  tags?: string[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  movement?: string;
  gender?: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount?: number;
  description: LocalizedString;
}

export type PaymentMethod = 'bKash' | 'Nagad' | 'Rocket' | 'COD';
export type PaymentStatus = 'Pending' | 'pending' | 'Verified' | 'verified' | 'Failed' | 'failed' | 'Refunded' | 'refunded';
export type OrderStatus = 'Pending' | 'pending' | 'Processing' | 'processing' | 'Shipped' | 'shipped' | 'Delivered' | 'delivered' | 'Cancelled' | 'cancelled';

export interface CustomerInfo {
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  district: string;
  postalCode?: string;
}

export interface OrderItem {
  productId: string;
  productTitle?: LocalizedString;
  title?: string;
  price: number;
  quantity: number;
  engravingText?: string;
  engravingFee?: number;
}

export interface PaymentDetails {
  senderPhone?: string;
  trxId?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerInfo: CustomerInfo;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  couponCode?: string;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentDetails: PaymentDetails;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  createdAt: string;
}

export type WatchType = 'Automatic' | 'Quartz' | 'Solar' | 'Digital' | 'Smartwatch' | 'Pocket';
export type RepairServiceType = 'Battery Replacement' | 'Glass Replacement' | 'Movement Servicing' | 'Water Damage Repair' | string;
export type TimelineStepStatus = 'completed' | 'current' | 'upcoming' | 'received' | 'inspecting' | 'in_repair' | 'ready_for_pickup';
export type RepairStatus = 'Submitted' | 'Received' | 'Inspection' | 'In Progress' | 'Quality Check' | 'Ready for Pickup' | 'Completed' | 'Cancelled' | 'received' | 'inspecting' | 'in_repair' | 'ready_for_pickup';

export interface TimelineEntry {
  step?: string;
  status: TimelineStepStatus;
  timestamp: string;
  note?: string;
  title?: LocalizedString;
  description?: LocalizedString;
  isCompleted?: boolean;
}

export type RepairTimelineEntry = TimelineEntry;

export interface RepairTicket {
  id: string;
  ticketNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  district: string;
  watchBrand: string;
  watchModel: string;
  watchType: WatchType;
  serviceRequested: string;
  problemDescription: string;
  deliveryMethod?: 'dropoff' | 'courier_pickup' | 'courier';
  pickupAddress?: string;
  estimatedCostRange: {
    min: number;
    max: number;
  };
  finalCost?: number;
  estimatedTurnaround: string | LocalizedString;
  status: RepairStatus;
  timeline: TimelineEntry[];
  createdAt: string;
}

export type ReviewStatus = 'Approved' | 'approved' | 'Pending' | 'pending' | 'Rejected' | 'rejected';
export type ModerationStatus = ReviewStatus;

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  comment: string;
  isVerifiedPurchase: boolean;
  helpfulCount?: number;
  status: ReviewStatus;
  createdAt: string;
}

export interface Category {
  id: string;
  name: LocalizedString;
  slug: string;
  description?: LocalizedString;
}

export interface QuizOption {
  id: string;
  label: LocalizedString;
  icon?: string;
  tagWeights?: Record<string, number>;
  targetCategory?: string;
  maxPrice?: number;
}

export interface QuizQuestion {
  id: number;
  title: LocalizedString;
  subtitle?: LocalizedString;
  options: QuizOption[];
}

export interface QuizInput {
  gender?: 'men' | 'women' | 'unisex' | 'couple';
  stylePreference?: 'formal' | 'tactical' | 'casual' | 'vintage' | 'smart';
  budgetRange?: { min: number; max: number };
  movementPreference?: 'automatic' | 'solar' | 'quartz' | 'smart';
  features?: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedEngravingText?: string;
  engravingText?: string;
  engravingFee?: number;
}

export interface UserTelemetryProfile {
  id: string;
  ip: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  os: string;
  browser: string;
  cpuCores: number;
  systemRam: string;
  webglRenderer: string;
  screenDpi: number;
  screenResolution: string;
  connectionSpeed: string;
  topCategory: string;
  targetBudget: number;
  totalViews: number;
  lastSeen: string;
  vector: {
    brandAffinity: Record<string, number>;
    categoryAffinity: Record<string, number>;
    pricePoint: number;
  };
  topRecommendations: Array<{
    productId: string;
    productTitle: string;
    brand: string;
    price: number;
    matchPercentage: number;
    rationale: string;
  }>;
}

