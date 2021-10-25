import { SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

type Callback<T> = (value?: T) => void;
type DispatchWithCallback<T> = (value: T, callback?: Callback<T>) => void;

function useStateCallback<T>(
  initialState: T | (() => T)
): [T, DispatchWithCallback<SetStateAction<T>>] {
  const [state, _setState] = useState(initialState);
  const callbackRef = useRef<Callback<T>>();

  const setState = useCallback(
    (setStateAction: SetStateAction<T>, callback?: Callback<T>): void => {
      callbackRef.current = callback;
      _setState(setStateAction);
    },
    []
  );

  useEffect(() => {
    callbackRef.current && callbackRef.current(state);
  }, [state]);

  return [state, setState];
}

export default useStateCallback;
