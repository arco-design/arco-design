import { useRef } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

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
