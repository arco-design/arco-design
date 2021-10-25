// delete keys from object
export default function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: Array<K | string> // string 为了某些没有声明的属性被omit
): Omit<T, K> {
  const clone = {
    ...obj,
  };
  keys.forEach((key) => {
    if ((key as K) in clone) {
      delete clone[key as K];
    }
  });
  return clone;
}
