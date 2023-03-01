import {
  toSafeString,
  trimNumber,
  validateNumber,
  getNumberPrecision,
  supportBigInt,
} from './utils';

export interface Decimal {
  readonly isEmpty: boolean;
  readonly isNaN: boolean;
  readonly isInvalid: boolean;
  toNumber: () => number;
  toString: (option?: { safe: boolean; precision?: number }) => string;
  equals: (target: Decimal) => boolean;
  less: (target: Decimal) => boolean;
  negate: () => Decimal;
  add: (target: string | number) => Decimal;
}

class BigIntDecimal implements Decimal {
  readonly isEmpty: boolean;

  readonly isNaN: boolean;

  private readonly isNegative: boolean;

  private readonly origin: string = '';

  private readonly integer: bigint;

  private readonly decimal: bigint;

  private readonly decimalLen: number;

  constructor(value: string | number) {
    this.origin = String(value);

    if ((!value && value !== 0) || !this.origin.trim()) {
      this.isEmpty = true;
      return;
    }

    if (value === '-') {
      this.isNaN = true;
      return;
    }

    const safeValueString = toSafeString(value);
    if (validateNumber(safeValueString)) {
      const { negative, trimStr } = trimNumber(safeValueString);
      const [integerStr, decimalStr = '0'] = trimStr.split('.');
      this.isNegative = negative;
      this.integer = BigInt(integerStr);
      this.decimal = BigInt(decimalStr);
      this.decimalLen = decimalStr.length;
    } else {
      this.isNaN = true;
    }
  }

  get isInvalid() {
    return this.isEmpty || this.isNaN;
  }

  private getMark() {
    return this.isNegative ? '-' : '';
  }

  private getIntegerStr() {
    return this.integer.toString();
  }

  private getDecimalStr() {
    return this.decimal.toString().padStart(this.decimalLen, '0');
  }

  private alignDecimal(decimalLength: number): bigint {
    return BigInt(
      `${this.getMark()}${this.getIntegerStr()}${this.getDecimalStr().padEnd(decimalLength, '0')}`
    );
  }

  negate() {
    const numStr = this.toString();
    return new BigIntDecimal(numStr.startsWith('-') ? numStr.slice(1) : `-${numStr}`);
  }

  add(value: string | number): BigIntDecimal {
    const offset = new BigIntDecimal(value);

    if (offset.isInvalid) {
      return this;
    }

    if (this.isInvalid) {
      return offset;
    }

    const maxDecimalLength = Math.max(this.decimalLen, offset.decimalLen);
    const thisAlignedDecimal = this.alignDecimal(maxDecimalLength);
    const offsetAlignedDecimal = offset.alignDecimal(maxDecimalLength);
    const valueStr = (thisAlignedDecimal + offsetAlignedDecimal).toString();
    const { negativeStr, trimStr } = trimNumber(valueStr);
    const hydrateValueStr = `${negativeStr}${trimStr.padStart(maxDecimalLength + 1, '0')}`;

    return new BigIntDecimal(
      `${hydrateValueStr.slice(0, -maxDecimalLength)}.${hydrateValueStr.slice(-maxDecimalLength)}`
    );
  }

  equals(target: BigIntDecimal) {
    return this.toString() === target?.toString();
  }

  less(target: BigIntDecimal) {
    return this.isInvalid || target.isInvalid
      ? false
      : this.add(target.negate().toString()).toNumber() < 0;
  }

  toNumber(): number {
    return this.isNaN ? NaN : Number(this.toString());
  }

  toString(options: { safe: boolean; precision?: number } = { safe: true }): string {
    const { safe, precision } = options;
    const result = safe
      ? this.isInvalid
        ? ''
        : trimNumber(`${this.getMark()}${this.getIntegerStr()}.${this.getDecimalStr()}`).fullStr
      : this.origin;
    return typeof precision === 'number' ? toFixed(result, precision) : result;
  }
}

class NumberDecimal implements Decimal {
  readonly isEmpty: boolean;

  readonly isNaN: boolean;

  private readonly origin: string = '';

  private readonly number: number;

  constructor(value: string | number) {
    this.origin = String(value);
    this.number = Number(value);

    if ((!value && value !== 0) || !this.origin.trim()) {
      this.isEmpty = true;
    } else {
      this.isNaN = Number.isNaN(this.number);
    }
  }

  get isInvalid() {
    return this.isEmpty || this.isNaN;
  }

  negate() {
    return new NumberDecimal(-this.toNumber());
  }

  equals(target: NumberDecimal) {
    return this.toNumber() === target?.toNumber();
  }

  less(target: NumberDecimal) {
    return this.isInvalid || target.isInvalid
      ? false
      : this.add(target.negate().toString()).toNumber() < 0;
  }

  add(value: string | number): NumberDecimal {
    const offset = new NumberDecimal(value);

    if (offset.isInvalid) {
      return this;
    }

    if (this.isInvalid) {
      return offset;
    }

    const result = this.number + offset.number;
    if (result > Number.MAX_SAFE_INTEGER) {
      return new NumberDecimal(Number.MAX_SAFE_INTEGER);
    }

    if (result < Number.MIN_SAFE_INTEGER) {
      return new NumberDecimal(Number.MIN_SAFE_INTEGER);
    }

    const maxPrecision = Math.max(
      getNumberPrecision(this.number),
      getNumberPrecision(offset.number)
    );
    return new NumberDecimal(result.toFixed(maxPrecision));
  }

  toNumber() {
    return this.number;
  }

  toString(options: { safe: boolean; precision?: number } = { safe: true }) {
    const { safe, precision } = options;
    const result = safe ? (this.isInvalid ? '' : toSafeString(this.number)) : this.origin;
    return typeof precision === 'number' ? toFixed(result, precision) : result;
  }
}

export function getDecimal(value: string | number): Decimal {
  return supportBigInt() ? new BigIntDecimal(value) : new NumberDecimal(value);
}

/**
 * Replace String.prototype.toFixed like Math.round
 * If cutOnly is true, just slice the tail
 * e.g. Decimal.toFixed(0.15) will return 0.2, not 0.1
 */
export function toFixed(numStr: string, precision?: number, cutOnly = false): string {
  if (numStr === '') {
    return '';
  }

  const separator = '.';
  const { negativeStr, integerStr, decimalStr } = trimNumber(numStr);
  const precisionDecimalStr = `${separator}${decimalStr}`;
  const numberWithoutDecimal = `${negativeStr}${integerStr}`;

  if (precision >= 0) {
    const advancedNum = Number(decimalStr[precision]);
    if (advancedNum >= 5 && !cutOnly) {
      const advancedDecimal = getDecimal(numStr).add(
        `${negativeStr}0.${'0'.repeat(precision)}${10 - advancedNum}`
      );
      return toFixed(advancedDecimal.toString(), precision, cutOnly);
    }

    return precision === 0
      ? numberWithoutDecimal
      : `${numberWithoutDecimal}${separator}${decimalStr
          .padEnd(precision, '0')
          .slice(0, precision)}`;
  }

  return `${numberWithoutDecimal}${precisionDecimalStr === '.0' ? '' : precisionDecimalStr}`;
}
