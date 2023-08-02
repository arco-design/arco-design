import { useRef, useEffect, DependencyList } from 'react';

export default function useUpdate(fn: () => void, deps: DependencyList = []) {
  const isDidMount = useRef(false);

  useEffect(() => {
    if (isDidMount.current) {
      fn();
    } else {
      isDidMount.current = true;
    }
  }, deps);
}
