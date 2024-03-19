import React, { ReactElement, ReactNode, cloneElement, isValidElement, useCallback } from 'react';
import { callbackOriginRef } from '../react-dom';
import { supportRef } from '../is';

export default function useOverrideRef<T>(): [
  (originNode) => ReactNode,
  React.MutableRefObject<T>
] {
  const ref = React.useRef<T>(null);

  const overrideNode = useCallback((originNode) => {
    if (isValidElement(originNode) && supportRef(originNode)) {
      return cloneElement(originNode as ReactElement, {
        ref: (node: T) => {
          ref.current = node;
          callbackOriginRef(originNode, node);
        },
      });
    }
    return originNode;
  }, []);

  return [overrideNode, ref];
}
