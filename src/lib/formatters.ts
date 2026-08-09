export const BANGLA_DIGITS: Record<string, string> = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
};

export function convertDigitsToBangla(str: string | number): string {
  return String(str).replace(/[0-9]/g, (digit) => BANGLA_DIGITS[digit] || digit);
}

export function formatBDT(
  amount: number | null | undefined,
  lang: 'en' | 'bn' = 'en'
): string {
  if (amount === null || amount === undefined || isNaN(Number(amount))) {
    return lang === 'bn' ? '৳ ০' : '৳ 0';
  }

  const num = Math.round(Number(amount));
  const isNegative = num < 0;
  const absStr = Math.abs(num).toString();

  let formattedNumber = '';
  if (absStr.length <= 3) {
    formattedNumber = absStr;
  } else {
    const lastThree = absStr.substring(absStr.length - 3);
    const otherDigits = absStr.substring(0, absStr.length - 3);
    const formattedOthers = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    formattedNumber = `${formattedOthers},${lastThree}`;
  }

  const prefix = isNegative ? '-৳ ' : '৳ ';

  if (lang === 'bn') {
    return `${prefix}${convertDigitsToBangla(formattedNumber)}`;
  }

  return `${prefix}${formattedNumber}`;
}
