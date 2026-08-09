import { CartItem, Coupon, Product } from '@/types';

export const DHAKA_DELIVERY_FEE = 60;
export const OUTSIDE_DHAKA_DELIVERY_FEE = 120;

export function getProductPrice(product: Product): number {
  return product.salePrice ?? product.price;
}

export function getLineTotal(item: Pick<CartItem, 'product' | 'quantity' | 'engravingFee'>): number {
  return (getProductPrice(item.product) + (item.engravingFee ?? 0)) * item.quantity;
}

export function getCartSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + getLineTotal(item), 0);
}

export function getShippingFee(district: string, hasItems = true): number {
  if (!hasItems) return 0;
  const normalized = district.trim().toLowerCase();
  if (!normalized) return OUTSIDE_DHAKA_DELIVERY_FEE;
  const isDhaka = (normalized.includes('dhaka') || normalized.includes('ঢাকা')) && !normalized.includes('outside') && !normalized.includes('বাইরে');
  return isDhaka ? DHAKA_DELIVERY_FEE : OUTSIDE_DHAKA_DELIVERY_FEE;
}

export function getCouponDiscount(subtotal: number, coupon: Coupon | null): number {
  if (!coupon || (coupon.minOrderAmount && subtotal < coupon.minOrderAmount)) return 0;
  if (coupon.discountType === 'percentage') {
    return Math.round((subtotal * coupon.discountValue) / 100);
  }
  return Math.min(subtotal, coupon.discountValue);
}

export function calculateCartTotals(items: CartItem[], district: string, coupon: Coupon | null) {
  const subtotal = getCartSubtotal(items);
  const discount = getCouponDiscount(subtotal, coupon);
  const shippingFee = getShippingFee(district, items.length > 0);
  return {
    subtotal,
    discount,
    shippingFee,
    total: Math.max(0, subtotal - discount + shippingFee),
  };
}
