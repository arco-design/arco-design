import { useRef, useMemo } from 'react';

export default function useHandler<T extends (...args: any[]) => any>(fn: T) {
  const fnRef = useRef({
    originalFn: fn,
    fn: (...args: Parameters<T>): ReturnType<T> => fnRef.current.originalFn.apply(undefined, args),
  });
  // why not use `fnRef.current.originalFn = fn` ?
  // because there is a bug. when the user opens chrome react devtool and selects the component, the function is not executed properly.
  // https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberHooks.js#L2096
  fnRef.current.originalFn = useMemo(() => fn, [fn]);
  return fnRef.current.fn;
}
