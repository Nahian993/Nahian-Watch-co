import { formatBDT, convertDigitsToBangla } from '../../src/lib/formatters';

describe('formatBDT Utility', () => {
  it('formats zero correctly in English and Bangla', () => {
    expect(formatBDT(0, 'en')).toBe('৳ 0');
    expect(formatBDT(0, 'bn')).toBe('৳ ০');
  });

  it('formats thousands correctly in English and Bangla', () => {
    expect(formatBDT(12500, 'en')).toBe('৳ 12,500');
    expect(formatBDT(12500, 'bn')).toBe('৳ ১২,৫০০');
  });

  it('formats 1 Lakh using South Asian grouping (1,00,000)', () => {
    expect(formatBDT(100000, 'en')).toBe('৳ 1,00,000');
    expect(formatBDT(100000, 'bn')).toBe('৳ ১,০০,০০০');
  });

  it('formats 1 Crore using South Asian grouping (1,00,00,000)', () => {
    expect(formatBDT(10000000, 'en')).toBe('৳ 1,00,00,000');
    expect(formatBDT(10000000, 'bn')).toBe('৳ ১,০০,০০,০০০');
  });

  it('handles negative numbers correctly', () => {
    expect(formatBDT(-1500, 'en')).toBe('-৳ 1,500');
    expect(formatBDT(-1500, 'bn')).toBe('-৳ ১,৫০০');
  });

  it('handles null, undefined, and NaN gracefully', () => {
    expect(formatBDT(null, 'en')).toBe('৳ 0');
    expect(formatBDT(undefined, 'bn')).toBe('৳ ০');
    expect(formatBDT(NaN, 'en')).toBe('৳ 0');
  });

  it('converts digits to Bangla correctly via convertDigitsToBangla', () => {
    expect(convertDigitsToBangla('1234567890')).toBe('১২৩৪৫৬৭৮৯০');
  });
});
