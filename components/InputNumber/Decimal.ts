import { toSafeString, trimNumber, validateNumber } from './utils';

export class Decimal {
  origin = '';

  isNegative: boolean;

  isEmpty: boolean;

  isNaN: boolean;

  integer: bigint;

  decimal: bigint;

  decimalLen: number;

  static from(value: string | number) {
    return new Decimal(value);
  }

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

  get mark() {
    return this.isNegative ? '-' : '';
  }

  get integerStr() {
    return this.integer.toString();
  }

  get decimalStr() {
    return this.decimal.toString().padStart(this.decimalLen, '0');
  }

  private alignDecimal(decimalLength: number): bigint {
    return BigInt(`${this.mark}${this.integerStr}${this.decimalStr.padEnd(decimalLength, '0')}`);
  }

  negate() {
    const clone = new Decimal(this.toString());
    clone.isNegative = !clone.isNegative;
    return clone;
  }

  add(value: string | number): Decimal {
    const offset = new Decimal(value);

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

    return new Decimal(
      `${hydrateValueStr.slice(0, -maxDecimalLength)}.${hydrateValueStr.slice(-maxDecimalLength)}`
    );
  }

  equals(target: Decimal) {
    return this.toString() === target?.toString();
  }

  less(target: Decimal) {
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
        : trimNumber(`${this.mark}${this.integerStr}.${this.decimalStr}`).fullStr
      : this.origin;
    return typeof precision === 'number' ? Decimal.toFixed(result, precision) : result;
  }

  /**
   * Replace String.prototype.toFixed like Math.round
   * If cutOnly is true, just slice the tail
   * e.g. Decimal.toFixed(0.15) will return 0.2, not 0.1
   */
  static toFixed(numStr: string, precision?: number, cutOnly = false): string {
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
        const advancedDecimal = Decimal.from(numStr).add(
          `${negativeStr}0.${'0'.repeat(precision)}${10 - advancedNum}`
        );
        return Decimal.toFixed(advancedDecimal.toString(), precision, cutOnly);
      }

      return precision === 0
        ? numberWithoutDecimal
        : `${numberWithoutDecimal}${separator}${decimalStr
            .padEnd(precision, '0')
            .slice(0, precision)}`;
    }

    return `${numberWithoutDecimal}${precisionDecimalStr === '.0' ? '' : precisionDecimalStr}`;
  }
}
