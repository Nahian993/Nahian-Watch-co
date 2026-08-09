/**
 * CROWN WATCH CO. — Opaque-Box Domain Test Validation Helpers
 * File Location: tests/helpers/domain_validators.js
 */

const VALID_REPAIR_STATUSES = [
  'Received',
  'Diagnosing',
  'Servicing',
  'Awaiting Parts',
  'Completed',
  'Delivered'
];

/**
 * Validates whether a string adheres to BDT currency formatting.
 * Supported formats: "৳ 12,500", "৳12,500", "৳ 1,25,000", "৳ 500", "৳ 0"
 * @param {string} str - Formatted BDT currency string
 * @returns {boolean}
 */
function validateBDTFormat(str) {
  if (typeof str !== 'string' || !str.trim()) return false;
  const regex = /^(?:৳\s?|\u09F3\s?)\d{1,3}(?:,?\d{2,3})*(?:\.\d{2})?$/;
  return regex.test(str.trim());
}

/**
 * Parses a BDT currency string into a raw numeric value.
 * Example: "৳ 12,500" -> 12500, "৳ 1,250.50" -> 1250.5
 * @param {string|number} str - Formatted BDT currency string or number
 * @returns {number}
 */
function parseBDTAmount(str) {
  if (typeof str === 'number') return str;
  if (typeof str !== 'string') return 0;
  const cleaned = str.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) || 0;
}

/**
 * Validates a Bangladeshi mobile phone number.
 * Accepts: "01712345678", "+8801712345678", "8801812345678"
 * Valid operator prefixes: 013, 014, 015, 016, 017, 018, 019 followed by 8 digits.
 * @param {string} phone - Phone number string
 * @returns {boolean}
 */
function validateBDPhone(phone) {
  if (typeof phone !== 'string') return false;
  const regex = /^(?:\+?88)?01[3-9]\d{8}$/;
  return regex.test(phone.trim());
}

/**
 * Validates an MFS (bKash / Nagad / Rocket) Transaction ID.
 * Format: 8 to 12 uppercase/mixed alphanumeric characters (e.g. "8N7A6W5E9", "TRX98765432")
 * @param {string} trxId - MFS Transaction ID string
 * @returns {boolean}
 */
function validateMFSTrxID(trxId) {
  if (typeof trxId !== 'string') return false;
  const regex = /^[A-Za-z0-9]{8,12}$/;
  return regex.test(trxId.trim());
}

/**
 * Calculates expected district delivery fee based on customer district and coupon.
 * Rule: Dhaka = ৳60, Outside Dhaka (63 districts) = ৳120.
 * @param {string} district - Customer district name
 * @param {boolean} [isFreeShippingCoupon=false] - Whether a free shipping coupon was applied
 * @returns {number}
 */
function calculateExpectedShippingFee(district, isFreeShippingCoupon = false) {
  if (isFreeShippingCoupon) return 0;
  if (typeof district !== 'string' || !district.trim()) return 120; // default nationwide
  const normalized = district.trim().toLowerCase();
  return normalized.includes('dhaka') ? 60 : 120;
}

/**
 * Validates that an order shipping fee matches the expected district delivery rule.
 * @param {string} district - Customer district name
 * @param {number} actualFee - Calculated shipping fee
 * @param {boolean} [isFreeShippingCoupon=false] - Whether free shipping applies
 * @returns {boolean}
 */
function validateDistrictShippingFee(district, actualFee, isFreeShippingCoupon = false) {
  const expected = calculateExpectedShippingFee(district, isFreeShippingCoupon);
  return actualFee === expected;
}

/**
 * Validates Repair Ticket ID format.
 * Format: "CROWN-REP-XXXX" or "CROWN-REP-2026-XXXX" (4 to 6 digit/char suffix)
 * @param {string} ticketId - Repair ticket ID
 * @returns {boolean}
 */
function validateRepairTicketFormat(ticketId) {
  if (typeof ticketId !== 'string') return false;
  const regex = /^CROWN-REP-(?:20\d{2}-)?\d{4,6}$/i;
  return regex.test(ticketId.trim());
}

/**
 * Validates a repair ticket object structure and status timeline.
 * @param {Object} ticket - Repair ticket object
 * @returns {boolean}
 */
function validateRepairTicket(ticket) {
  if (!ticket || typeof ticket !== 'object') return false;
  if (!validateRepairTicketFormat(ticket.ticketNumber || ticket.id)) return false;
  if (!VALID_REPAIR_STATUSES.includes(ticket.status)) return false;
  if (!validateBDPhone(ticket.customerPhone)) return false;
  if (!ticket.customerName || !ticket.watchBrand || !ticket.watchModel) return false;
  if (!ticket.estimatedCostRange || typeof ticket.estimatedCostRange.min !== 'number') return false;

  if (Array.isArray(ticket.timeline)) {
    for (const entry of ticket.timeline) {
      if (!entry.status || !VALID_REPAIR_STATUSES.includes(entry.status)) return false;
      if (!entry.timestamp) return false;
    }
  }
  return true;
}

/**
 * Validates embedded Schema.org JSON-LD structure.
 * @param {Object} jsonLd - JSON-LD object or parsed JSON
 * @param {string} expectedType - Expected @type (e.g. "Product", "LocalBusiness", "RepairService")
 * @returns {boolean}
 */
function validateSchemaJSONLD(jsonLd, expectedType) {
  if (!jsonLd || typeof jsonLd !== 'object') return false;
  if (jsonLd['@context'] !== 'https://schema.org') return false;
  if (jsonLd['@type'] !== expectedType) return false;
  return true;
}

/**
 * Validates Schema.org Product structured data specifically.
 * @param {Object} jsonLd - Product JSON-LD object
 * @returns {boolean}
 */
function validateProductSchemaJSONLD(jsonLd) {
  if (!validateSchemaJSONLD(jsonLd, 'Product')) return false;
  if (!jsonLd.name || !jsonLd.description || !jsonLd.sku) return false;
  if (!jsonLd.offers || jsonLd.offers['@type'] !== 'Offer') return false;
  if (jsonLd.offers.priceCurrency !== 'BDT' || typeof jsonLd.offers.price !== 'number') return false;
  return true;
}

module.exports = {
  validateBDTFormat,
  parseBDTAmount,
  validateBDPhone,
  validateMFSTrxID,
  calculateExpectedShippingFee,
  validateDistrictShippingFee,
  validateRepairTicketFormat,
  validateRepairTicket,
  validateSchemaJSONLD,
  validateProductSchemaJSONLD,
  VALID_REPAIR_STATUSES
};
