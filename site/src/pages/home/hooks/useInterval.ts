import { useRef, useEffect } from 'react';

export function useInterval(callback: Function, delay: null | number) {
  const refIntervalId = useRef(null);
  const refSavedCallback = useRef<Function>();

  const setUpInterval = () => {
    if (delay !== null) {
      refIntervalId.current = setInterval(() => {
        refSavedCallback.current();
      }, delay);
    }
  };

  const cleanUpInterval = () => {
    refIntervalId.current && clearInterval(refIntervalId.current);
  };

  const resetInterval = () => {
    cleanUpInterval();
    setUpInterval();
  };

  // Remember the latest function.
  useEffect(() => {
    refSavedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    setUpInterval();
    return cleanUpInterval;
  }, [delay]);

  return resetInterval;
}
