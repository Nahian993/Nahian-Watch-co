import assert from 'node:assert/strict';

/**
 * Asserts string matches BDT currency format (e.g. "৳ 12,500" or "৳ 1,25,000")
 * and optionally validates exact expected numeric value.
 */
export function assertBDTFormat(formattedStr: string, expectedAmount?: number): void {
  assert.ok(formattedStr, 'BDT format string must not be empty');
  const cleanStr = formattedStr.trim();
  const regex = /^৳\s?[0-9]{1,3}(,[0-9]{2,3})*(\.[0-9]{2})?$/;
  assert.ok(regex.test(cleanStr), `Invalid BDT format: "${formattedStr}"`);

  if (expectedAmount !== undefined) {
    const numericValue = parseFloat(cleanStr.replace(/[^0-9.]/g, ''));
    assert.strictEqual(
      numericValue,
      expectedAmount,
      `BDT amount ${numericValue} does not match expected amount ${expectedAmount}`
    );
  }
}

/**
 * Asserts valid Bangladeshi mobile phone number (+8801XXXXXXXXX or 01XXXXXXXXX).
 */
export function assertBangladeshiPhone(phone: string): void {
  assert.ok(phone, 'Phone number must not be empty');
  const regex = /^(?:\+88)?01[3-9]\d{8}$/;
  assert.ok(regex.test(phone.trim()), `Invalid Bangladeshi phone number: "${phone}"`);
}

/**
 * Asserts valid MFS Transaction ID format (bKash / Nagad / Rocket: 8-12 uppercase alphanumeric).
 */
export function assertMFSTrxID(trxId: string, provider?: string): void {
  assert.ok(trxId, 'MFS TrxID must not be empty');
  const regex = /^[A-Z0-9]{8,12}$/;
  assert.ok(
    regex.test(trxId.trim()),
    `Invalid MFS TrxID: "${trxId}"${provider ? ` for provider ${provider}` : ''}`
  );
}

/**
 * Asserts district delivery fee rule (Dhaka = ৳60, Outside Dhaka = ৳120).
 */
export function assertDistrictShippingFee(district: string, fee: number): void {
  assert.ok(district, 'District must not be empty');
  const isDhaka = district.trim().toLowerCase() === 'dhaka';
  const expectedFee = isDhaka ? 60 : 120;
  assert.strictEqual(
    fee,
    expectedFee,
    `Shipping fee for district "${district}" should be ${expectedFee} BDT, got ${fee}`
  );
}

/**
 * Asserts Schema.org JSON-LD valid object structure and type.
 */
export function assertSchemaJSONLD(data: any, expectedType: string): void {
  assert.ok(data, 'JSON-LD data must not be null or undefined');
  assert.strictEqual(
    data['@context'],
    'https://schema.org',
    `Expected @context "https://schema.org", got "${data['@context']}"`
  );
  assert.strictEqual(
    data['@type'],
    expectedType,
    `Expected @type "${expectedType}", got "${data['@type']}"`
  );
}

/**
 * Asserts Repair Ticket ID format (e.g. CROWN-REP-2026-8941).
 */
export function assertRepairTicketFormat(ticketId: string): void {
  assert.ok(ticketId, 'Repair ticket ID must not be empty');
  const regex = /^CROWN-REP-(?:\d{4}-)?\d{4,6}$/;
  assert.ok(regex.test(ticketId.trim()), `Invalid repair ticket format: "${ticketId}"`);
}
