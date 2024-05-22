import { useRef, useCallback } from 'react';

export default function usePersistCallback<T extends (...args: any[]) => any>(fn: T) {
  const ref = useRef<T>();

  ref.current = fn;

  return useCallback<T>(
    // @ts-ignore
    (...args) => {
      const fn = ref.current;
      return fn && fn(...args);
    },
    [ref]
  );
}
