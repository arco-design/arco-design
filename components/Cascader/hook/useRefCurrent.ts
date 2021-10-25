import { DependencyList, useRef } from 'react';
import useForceUpdate from '../../_util/hooks/useForceUpdate';
import useUpdate from '../../_util/hooks/useUpdate';

function useCurrentRef<T>(initFunc: () => T, deps: DependencyList): T {
  const ref = useRef<T>(null);
  const forceUdpate = useForceUpdate();

  if (!ref.current) {
    ref.current = initFunc();
  }

  useUpdate(() => {
    ref.current = initFunc();
    forceUdpate();
  }, [...deps]);

  return ref.current;
}

export default useCurrentRef;
