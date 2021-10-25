import { useEffect, useState } from 'react';

function useStateWithPromise<T>(defaultVal: T): [T, (updater: any) => Promise<T>] {
  const [state, setState] = useState({
    value: defaultVal,
    resolve: (e) => {
      // eslint-disable-next-line no-unused-expressions
      e;
    },
  });

  useEffect(() => {
    state.resolve(state.value);
  }, [state]);

  return [
    state.value,
    (updater) => {
      return new Promise((resolve) => {
        setState((prevState) => {
          let nextVal = updater;
          if (typeof updater === 'function') {
            nextVal = updater(prevState.value);
          }
          return {
            value: nextVal,
            resolve,
          };
        });
      });
    },
  ];
}

export default useStateWithPromise;
