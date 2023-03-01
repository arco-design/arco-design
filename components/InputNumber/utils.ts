/**
 * Judge whether a number is scientific notation
 */
export function isE(number: string | number) {
  return !Number.isNaN(Number(number)) && String(number).includes('e');
}

/**
 * Judge whether BigInt is supported by current env
 */
export function supportBigInt() {
  return typeof BigInt === 'function';
}

/**
 * Get precision of a number, include scientific notation like 1e-10
 */
export function getNumberPrecision(number: string | number) {
  const numStr: string = String(number);

  if (isE(number)) {
    let precision = Number(numStr.slice(numStr.indexOf('e-') + 2));
    numStr.replace(/\.(\d+)/, (_, $1) => {
      precision += $1.length;
      return _;
    });
    return precision;
  }

  return numStr.includes('.') && validateNumber(numStr)
    ? numStr.length - numStr.indexOf('.') - 1
    : 0;
}

/**
 * Convert number to non-scientific notation
 */
export function toSafeString(number: number | string): string {
  let nativeNumberStr: string = String(number);

  if (isE(number)) {
    if (number < Number.MIN_SAFE_INTEGER) {
      return supportBigInt() ? BigInt(number).toString() : Number.MIN_SAFE_INTEGER.toString();
    }

    if (number > Number.MAX_SAFE_INTEGER) {
      return supportBigInt() ? BigInt(number).toString() : Number.MAX_SAFE_INTEGER.toString();
    }

    // This may lose precision, but foFixed must accept argument in the range 0-100
    const precision = getNumberPrecision(nativeNumberStr);
    nativeNumberStr = Number(number).toFixed(Math.min(100, precision));
  }

  return trimNumber(nativeNumberStr).fullStr;
}

/**
 * Judge whether a number is valid
 */
export function validateNumber(num: string | number) {
  if (typeof num === 'number') {
    return !Number.isNaN(num);
  }

  if (!num) {
    return false;
  }

  return (
    // 1.1
    /^\s*-?\d+(\.\d+)?\s*$/.test(num) ||
    // 1.
    /^\s*-?\d+\.\s*$/.test(num) ||
    // .1
    /^\s*-?\.\d+\s*$/.test(num)
  );
}

export function trimNumber(numStr: string) {
  let str = numStr.trim();
  let negative = false;

  str = str
    // Remove negative-label(-) at head.
    .replace(/^-/, () => {
      negative = true;
      return '';
    })
    // Remove useless 0 at decimal end. `1.00100` => `1.001`
    .replace(/(\.\d*[^0])0*$/, '$1')
    // Remove useless decimal.
    .replace(/\.0*$/, '')
    // Remove useless 0 at head.
    .replace(/^0+/, '')
    // Add 0 before empty dot. `.1` => `0.1`
    .replace(/^\./, '0.');

  const trimStr = str || '0';
  const [integerStr = '0', decimalStr = '0'] = trimStr.split('.');

  if (integerStr === '0' && decimalStr === '0') {
    negative = false;
  }

  const negativeStr = negative ? '-' : '';

  return {
    negative,
    negativeStr,
    trimStr,
    integerStr,
    decimalStr,
    fullStr: `${negativeStr}${trimStr}`,
  };
}
