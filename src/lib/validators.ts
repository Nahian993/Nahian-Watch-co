export function normalizeBDPhone(phone: string): string {
  if (!phone) return '';
  return phone.replace(/[\s\-]/g, '');
}

export function isValidBDPhone(phone: string): boolean {
  if (!phone) return false;
  const clean = normalizeBDPhone(phone);
  const bdPhoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
  return bdPhoneRegex.test(clean);
}

export function isValidMFSTrxID(trxId: string): boolean {
  if (!trxId) return false;
  const clean = trxId.trim();
  const mfsRegex = /^[A-Za-z0-9]{8,14}$/;
  return mfsRegex.test(clean);
}

export const isValidTrxID = isValidMFSTrxID;

export function calculateShippingFee(district: string): number {
  if (!district) return 120;
  const normalized = district.trim().toLowerCase();
  const isDhaka = (normalized.includes('dhaka') || normalized.includes('ঢাকা')) && !normalized.includes('outside') && !normalized.includes('বাইরে');
  return isDhaka ? 60 : 120;
}
