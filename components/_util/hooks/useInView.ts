import { useCallback, useEffect, useState } from 'react';
import useIntersectionObserver, { supportIntersectionObserver } from './useIntersectionObserver';

interface UserInViewProps extends IntersectionObserverInit {
  onChange?: (inView: boolean, entry: IntersectionObserverEntry) => void;
  hasInView?: boolean;
  unobserverOnEnter?: boolean;
  target?: Element;
}

function useInView(props: UserInViewProps) {
  const { hasInView, unobserverOnEnter = true, onChange, target, ...rest } = props;
  // if intersect observer is not supported
  const [inView, setInView] = useState(supportIntersectionObserver ? hasInView : true);
  const observerCallback = useCallback<IntersectionObserverCallback>(
    ([entry], observer) => {
      const inThreshold = observer.thresholds.some((t) => entry.intersectionRatio >= t);
      const newInView = inThreshold && entry.isIntersecting;
      setInView(newInView);
      onChange?.(newInView, entry);
      if (newInView && unobserverOnEnter) {
        observer.unobserve(entry.target);
      }
    },
    [onChange, unobserverOnEnter]
  );

  const { cor, dor, observer } = useIntersectionObserver(observerCallback, rest);

  useEffect(() => {
    const noNeedObserver = hasInView && unobserverOnEnter;
    if (noNeedObserver) {
      dor();
    } else if (target) {
      cor(target);
    }
    return dor;
  }, [target, hasInView, unobserverOnEnter]);

  return {
    inView,
    observer,
  };
}

export default useInView;
