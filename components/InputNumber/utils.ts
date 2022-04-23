// Replace number.toFixed with Math.round
export function toFixed(number: number, precision: number): string {
  const pow = 10 ** precision;
  return (Math.round(number * pow) / pow).toFixed(precision);
}
