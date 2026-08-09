import { formatBDT, convertDigitsToBangla } from '@/lib/formatters';
import { isValidBDPhone, isValidMFSTrxID } from '@/lib/validators';

export { formatBDT, convertDigitsToBangla };

export function formatPrice(amount: number | null | undefined, lang: 'en' | 'bn' = 'en'): string {
  return formatBDT(amount, lang);
}

export function calculateShippingFee(district: string): number {
  if (!district) return 120;
  const normalized = district.trim().toLowerCase();
  const isDhaka = (normalized.includes('dhaka') || normalized.includes('ঢাকা')) && !normalized.includes('outside') && !normalized.includes('বাইরে');
  return isDhaka ? 60 : 120;
}

export function validateBDPhone(phone: string): boolean {
  return isValidBDPhone(phone);
}

export function validateTrxID(trxId: string): boolean {
  return isValidMFSTrxID(trxId);
}
