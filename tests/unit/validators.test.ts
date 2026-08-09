import {
  isValidBDPhone,
  isValidMFSTrxID,
  isValidTrxID,
  calculateShippingFee,
  normalizeBDPhone,
} from '../../src/lib/validators';

describe('Validator Utilities', () => {
  describe('isValidBDPhone', () => {
    it('validates standard 11-digit Bangladeshi mobile numbers', () => {
      expect(isValidBDPhone('01711000000')).toBe(true);
      expect(isValidBDPhone('01812345678')).toBe(true);
      expect(isValidBDPhone('01912345678')).toBe(true);
      expect(isValidBDPhone('01312345678')).toBe(true);
      expect(isValidBDPhone('01412345678')).toBe(true);
      expect(isValidBDPhone('01512345678')).toBe(true);
      expect(isValidBDPhone('01612345678')).toBe(true);
    });

    it('validates numbers with +880 and 880 prefixes', () => {
      expect(isValidBDPhone('+8801711000000')).toBe(true);
      expect(isValidBDPhone('8801812345678')).toBe(true);
    });

    it('normalizes spaces and hyphens before validating', () => {
      expect(isValidBDPhone('+880 1711-000000')).toBe(true);
      expect(normalizeBDPhone('01711 000 000')).toBe('01711000000');
    });

    it('rejects invalid prefixes or lengths', () => {
      expect(isValidBDPhone('01212345678')).toBe(false); // invalid operator 012
      expect(isValidBDPhone('0171100000')).toBe(false); // 10 digits
      expect(isValidBDPhone('017110000000')).toBe(false); // 12 digits
      expect(isValidBDPhone('')).toBe(false);
    });
  });

  describe('isValidMFSTrxID', () => {
    it('validates valid 8-14 alphanumeric MFS transaction IDs', () => {
      expect(isValidMFSTrxID('BKASH99281X')).toBe(true);
      expect(isValidMFSTrxID('NAGAD88271A')).toBe(true);
      expect(isValidMFSTrxID('TRX12345')).toBe(true); // 8 chars
      expect(isValidMFSTrxID('12345678901234')).toBe(true); // 14 chars
      expect(isValidTrxID('7X89A1B2C3')).toBe(true);
    });

    it('rejects invalid transaction IDs', () => {
      expect(isValidMFSTrxID('TRX123')).toBe(false); // too short (6)
      expect(isValidMFSTrxID('123456789012345')).toBe(false); // too long (15)
      expect(isValidMFSTrxID('BKASH-99281')).toBe(false); // special char
      expect(isValidMFSTrxID('')).toBe(false);
    });
  });

  describe('calculateShippingFee', () => {
    it('returns ৳60 for Dhaka city', () => {
      expect(calculateShippingFee('Dhaka')).toBe(60);
      expect(calculateShippingFee('dhaka')).toBe(60);
      expect(calculateShippingFee('ঢাকা')).toBe(60);
    });

    it('returns ৳120 for outside Dhaka districts', () => {
      expect(calculateShippingFee('Chittagong')).toBe(120);
      expect(calculateShippingFee('Sylhet')).toBe(120);
      expect(calculateShippingFee('Rajshahi')).toBe(120);
      expect(calculateShippingFee('')).toBe(120);
    });
  });
});
