import { padStart } from '../_util/pad';

// https://github.com/ant-design/ant-design/blob/master/components/statistic/utils.tsx
const units: [string, number][] = [
  ['Y', 1000 * 60 * 60 * 24 * 365], // years
  ['M', 1000 * 60 * 60 * 24 * 30], // months
  ['D', 1000 * 60 * 60 * 24], // days
  ['H', 1000 * 60 * 60], // hours
  ['m', 1000 * 60], // minutes
  ['s', 1000], // seconds
  ['S', 1], // million seconds
];

export function getDateString(millisecond: number, format: string) {
  let leftMillisecond: number = millisecond;
  return units.reduce((current, [name, unit]) => {
    if (current.indexOf(name) !== -1) {
      const value = Math.floor(leftMillisecond / unit);
      leftMillisecond -= value * unit;
      return current.replace(new RegExp(`${name}+`, 'g'), (match: string) => {
        const len = match.length;
        return padStart(value.toString(), len, '0');
      });
    }
    return current;
  }, format);
}
