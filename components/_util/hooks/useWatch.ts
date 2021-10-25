import { ComponentState, PropsWithoutRef, useEffect } from 'react';
import usePrevious from './usePrevious';

export default function useWatch<T>(
  value: PropsWithoutRef<T> | ComponentState,
  callback: (value, prevValue) => void
) {
  const prevValue = usePrevious(value);
  useEffect(() => {
    if (value !== prevValue) {
      callback(value, prevValue);
    }
  }, [value]);
}
