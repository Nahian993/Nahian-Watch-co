/**
 * Data Generators Helper for E2E Tests
 */

/**
 * Generates a realistic mock MFS (bKash / Nagad / Rocket) transaction ID.
 * Example format: "8N7A6W5E9" (9 uppercase alphanumeric characters).
 */
export function generateTrxID(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 9; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generates a valid Bangladeshi mobile phone number (+8801XXXXXXXXX or 01XXXXXXXXX).
 * Example: "01712345678" or "+8801812345678".
 */
export function generateBDPhone(withCountryCode: boolean = false): string {
  const prefixes = ['017', '018', '019', '013', '014', '015', '016'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = Math.floor(10000000 + Math.random() * 90000000).toString().substring(0, 8);
  const localNumber = `${prefix}${suffix}`;
  return withCountryCode ? `+88${localNumber}` : localNumber;
}

/**
 * Generates a standard CROWN WATCH CO. Order Number.
 * Example format: "CROWN-ORD-2026-1001".
 */
export function generateOrderNumber(): string {
  const year = 2026;
  const randomId = Math.floor(1000 + Math.random() * 9000);
  return `CROWN-ORD-${year}-${randomId}`;
}

/**
 * Generates a standard CROWN WATCH CO. Repair Ticket Number.
 * Example format: "CROWN-REP-2026-8941".
 */
export function generateRepairTicketNumber(): string {
  const year = 2026;
  const randomId = Math.floor(1000 + Math.random() * 9000);
  return `CROWN-REP-${year}-${randomId}`;
}
