import { useRef } from 'react';
import { isServerRendering } from '../dom';
import { isUndefined } from '../is';

export const supportIntersectionObserver =
  !isServerRendering && !isUndefined(window?.IntersectionObserver);

function useIntersectionObserver(
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
) {
  const intersectionObserver = useRef<IntersectionObserver>();

  const destroyObserver = () => {
    if (intersectionObserver.current) {
      intersectionObserver.current.disconnect();
      intersectionObserver.current = null;
    }
  };

  const createObserver = (elem: Element) => {
    if (elem) {
      destroyObserver();
      if (supportIntersectionObserver) {
        intersectionObserver.current = new IntersectionObserver(callback, options);
        intersectionObserver.current.observe(elem);
      }
    }
  };

  return {
    observer: intersectionObserver.current,
    cor: createObserver,
    dor: destroyObserver,
  };
}

export default useIntersectionObserver;
