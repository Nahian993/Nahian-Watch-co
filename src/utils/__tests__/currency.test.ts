import {
  formatBDT,
  formatPrice,
  convertDigitsToBangla,
  calculateShippingFee,
  validateBDPhone,
  validateTrxID,
} from '../currency';

describe('Currency & Utility Functions', () => {
  describe('convertDigitsToBangla', () => {
    it('converts English digits to Bangla digits correctly', () => {
      expect(convertDigitsToBangla('0123456789')).toBe('০১২৩৪৫৬৭৮৯');
      expect(convertDigitsToBangla('12,500')).toBe('১২,৫০-'.replace('-', '০'));
    });
  });

  describe('formatBDT / formatPrice', () => {
    it('formats positive BDT prices in English', () => {
      expect(formatBDT(12500, 'en')).toBe('৳ 12,500');
      expect(formatPrice(14500, 'en')).toBe('৳ 14,500');
      expect(formatBDT(500, 'en')).toBe('৳ 500');
    });

    it('formats positive BDT prices in Bangla', () => {
      expect(formatBDT(12500, 'bn')).toBe('৳ ১২,৫০-'.replace('-', '০'));
      expect(formatPrice(14500, 'bn')).toBe('৳ ১৪,৫০-'.replace('-', '০'));
    });

    it('handles zero correctly', () => {
      expect(formatBDT(0, 'en')).toBe('৳ 0');
      expect(formatBDT(0, 'bn')).toBe('৳ ০');
    });

    it('handles null, undefined, and NaN gracefully', () => {
      expect(formatBDT(null, 'en')).toBe('৳ 0');
      expect(formatBDT(undefined, 'bn')).toBe('৳ ০');
      expect(formatBDT(NaN, 'en')).toBe('৳ 0');
    });

    it('handles negative numbers correctly', () => {
      expect(formatBDT(-500, 'en')).toBe('-৳ 500');
      expect(formatBDT(-500, 'bn')).toBe('-৳ ৫০০');
    });
  });

  describe('calculateShippingFee', () => {
    it('returns 60 for Dhaka locations in English or Bangla', () => {
      expect(calculateShippingFee('Dhaka')).toBe(60);
      expect(calculateShippingFee('Dhaka North')).toBe(60);
      expect(calculateShippingFee('ঢাকা')).toBe(60);
    });

    it('returns 120 for non-Dhaka districts', () => {
      expect(calculateShippingFee('Chittagong')).toBe(120);
      expect(calculateShippingFee('Sylhet')).toBe(120);
      expect(calculateShippingFee('Rajshahi')).toBe(120);
    });

    it('returns 120 as default if empty district provided', () => {
      expect(calculateShippingFee('')).toBe(120);
    });
  });

  describe('validateBDPhone', () => {
    it('validates valid Bangladeshi mobile numbers', () => {
      expect(validateBDPhone('01711000000')).toBe(true);
      expect(validateBDPhone('+8801811000000')).toBe(true);
      expect(validateBDPhone('8801911000000')).toBe(true);
      expect(validateBDPhone('01300000000')).toBe(true);
    });

    it('rejects invalid mobile numbers', () => {
      expect(validateBDPhone('12345')).toBe(false);
      expect(validateBDPhone('01200000000')).toBe(false); // 012 not valid BD mobile prefix
      expect(validateBDPhone('')).toBe(false);
    });
  });

  describe('validateTrxID', () => {
    it('validates valid MFS Transaction IDs', () => {
      expect(validateTrxID('8A9B7C6D5E')).toBe(true);
      expect(validateTrxID('BKASH12345')).toBe(true);
    });

    it('rejects invalid Transaction IDs', () => {
      expect(validateTrxID('123')).toBe(false); // too short
      expect(validateTrxID('THIS_IS_TOO_LONG_TRX_ID_12345')).toBe(false);
      expect(validateTrxID('')).toBe(false);
    });
  });
});
