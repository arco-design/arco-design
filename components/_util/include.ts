// return an object with specify keys
export default function include<T extends object, K extends keyof T>(
  obj: T,
  keys: Array<K | string>
): Partial<T> /** TODO: Pick */ {
  const clone = {};
  Object.keys(obj).forEach((key) => {
    if (keys.indexOf(key) !== -1) {
      clone[key] = obj[key];
    }
  });
  return clone;
}
