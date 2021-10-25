// only used by trigger. Plan to replace ../Portal

import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { isServerRendering } from '../_util/dom';
import useIsFirstRender from '../_util/hooks/useIsFirstRender';

export interface PortalProps {
  /** Portal 挂载的容器 */
  getContainer: () => HTMLElement;
  children?: React.ReactNode;
}

const Portal = (props: PortalProps) => {
  const { getContainer, children } = props;
  const containerRef = useRef<HTMLElement>();
  const isFirstRender = useIsFirstRender();

  if (isFirstRender && !isServerRendering) {
    containerRef.current = getContainer();
  }

  useEffect(() => {
    return () => {
      const container = containerRef.current;
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };
  }, []);

  return containerRef.current ? ReactDOM.createPortal(children, containerRef.current) : null;
};

export default Portal;
