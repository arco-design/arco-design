import { ComponentState, PropsWithoutRef, useState, useEffect } from 'react';

type Dependency<T> = PropsWithoutRef<T> | ComponentState;

export default function useComputedState<T>(computed: () => any, deps: Dependency<T>[]) {
  const [state, setState] = useState(computed());
  useEffect(() => {
    const newState = computed();
    setState(newState);
  }, [deps]);
  return state;
}
