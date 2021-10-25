import { isArray, isObject } from '../_util/is';

export const normalizeValueToArray = (val): string[] => {
  let value = val;
  if (!isArray(val)) {
    value = val === null || val === undefined ? [] : [val];
  }
  return value.map((x) => {
    if (isObject(x)) {
      return x.value;
    }
    return x;
  });
};
