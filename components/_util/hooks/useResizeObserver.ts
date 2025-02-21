import { useRef } from 'react';
import ResizeObserverPolyfill from 'resize-observer-polyfill';

export default function useResizeObserver(onResize: (entry: ResizeObserverEntry[]) => void) {
  const resizeObserver = useRef<ResizeObserver>();

  const destroyObserver = () => {
    if (resizeObserver.current) {
      resizeObserver.current.disconnect();
      resizeObserver.current = null;
    }
  };

  const createObserver = (elem: Element) => {
    if (elem) {
      if (resizeObserver.current) {
        destroyObserver();
      }
      const ResizeObserver =
        typeof window !== 'undefined' && window.ResizeObserver
          ? window.ResizeObserver
          : ResizeObserverPolyfill;
      resizeObserver.current = new ResizeObserver(onResize);
      resizeObserver.current.observe(elem);
    }
  };

  return {
    currentOr: resizeObserver.current,
    cor: createObserver,
    dor: destroyObserver,
  };
}
