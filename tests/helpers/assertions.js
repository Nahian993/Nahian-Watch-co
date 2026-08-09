/**
 * CROWN WATCH CO. — Custom Domain Assertion Helpers
 * File Location: tests/helpers/assertions.js
 * Extends harness assertions with clear, domain-specific failure messages.
 */

const assertNode = require('assert');
const {
  validateBDTFormat,
  parseBDTAmount,
  validateBDPhone,
  validateMFSTrxID,
  validateDistrictShippingFee,
  validateRepairTicketFormat,
  validateSchemaJSONLD
} = require('./domain_validators');

function assertBDTFormat(actualStr, expectedAmount = null) {
  assertNode.ok(
    validateBDTFormat(actualStr),
    `Expected valid BDT currency format (e.g. "৳ 12,500"), but got: "${actualStr}"`
  );
  if (expectedAmount !== null && expectedAmount !== undefined) {
    const parsed = parseBDTAmount(actualStr);
    assertNode.strictEqual(
      parsed,
      expectedAmount,
      `Expected BDT amount value to be ${expectedAmount}, but parsed ${parsed} from "${actualStr}"`
    );
  }
}

function assertBDPhone(phoneStr) {
  assertNode.ok(
    validateBDPhone(phoneStr),
    `Expected valid Bangladeshi phone number starting with 01[3-9] (11 digits), but got: "${phoneStr}"`
  );
}

function assertMFSTrxID(trxId, provider = null) {
  assertNode.ok(
    validateMFSTrxID(trxId),
    `Expected valid MFS TrxID (8-12 alphanumeric characters)${provider ? ` for ${provider}` : ''}, but got: "${trxId}"`
  );
}

function assertDistrictShippingFee(district, actualFee, isFreeShippingCoupon = false) {
  assertNode.ok(
    validateDistrictShippingFee(district, actualFee, isFreeShippingCoupon),
    `Expected shipping fee for district "${district}" to match rule (Dhaka=৳60, Outside=৳120), but got: ৳${actualFee}`
  );
}

function assertRepairTicketFormat(ticketId) {
  assertNode.ok(
    validateRepairTicketFormat(ticketId),
    `Expected valid repair ticket format "CROWN-REP-XXXX" or "CROWN-REP-YYYY-XXXX", but got: "${ticketId}"`
  );
}

function assertSchemaJSONLD(jsonLdObject, expectedType) {
  assertNode.ok(
    validateSchemaJSONLD(jsonLdObject, expectedType),
    `Expected Schema.org JSON-LD with @context "https://schema.org" and @type "${expectedType}"`
  );
}

module.exports = {
  assertBDTFormat,
  assertBDPhone,
  assertMFSTrxID,
  assertDistrictShippingFee,
  assertRepairTicketFormat,
  assertSchemaJSONLD
};
