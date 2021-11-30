import { useEffect, useRef } from 'react';

interface Option {
  hidden: boolean;
}

export default function useOverflowHidden(getContainer: () => HTMLElement, { hidden }: Option) {
  const needResetContainerStyle = useRef<boolean>(false);
  const originContainerStyle = useRef<Partial<CSSStyleDeclaration>>({});

  const getScrollBarWidth = (element: HTMLElement) => {
    return element.tagName === 'BODY'
      ? window.innerWidth - (document.body.clientWidth || document.documentElement.clientWidth)
      : element.offsetWidth - element.clientWidth;
  };

  const setContainerStyle = () => {
    const container = getContainer();
    if (container && container.style.overflow !== 'hidden') {
      const originStyle = container.style;
      needResetContainerStyle.current = true;

      // 记录并设置宽度
      const containerScrollBarWidth = getScrollBarWidth(container);
      if (containerScrollBarWidth) {
        originContainerStyle.current.width = originStyle.width;
        container.style.width = `calc(${
          container.style.width || '100%'
        } - ${containerScrollBarWidth}px)`;
      }

      // 记录并设置overflow
      originContainerStyle.current.overflow = originStyle.overflow;
      container.style.overflow = 'hidden';
    }
  };

  const resetContainerStyle = () => {
    if (needResetContainerStyle.current && getContainer()) {
      const container = getContainer();
      const originStyle = originContainerStyle.current;
      Object.keys(originStyle).forEach((i) => (container.style[i] = originStyle[i]));
    }
    needResetContainerStyle.current = false;
    originContainerStyle.current = {};
  };

  useEffect(() => {
    hidden ? setContainerStyle() : resetContainerStyle();

    return () => {
      resetContainerStyle();
    };
  }, [getContainer, hidden]);

  return [resetContainerStyle, setContainerStyle];
}
