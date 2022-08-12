import { useCallback, useEffect, useState } from 'react';

function isWindow(el: any): el is Window {
  return el === window;
}

function getTargetRect(target: HTMLElement | Window) {
  return isWindow(target)
    ? {
        top: 0,
        bottom: window.innerHeight,
      }
    : target.getBoundingClientRect();
}

export default function UserNavbarBorderStyle() {
  const [border, setBorder] = useState(false);

  const onScrollHandler = useCallback(() => {
    const top = getTargetRect(document.body).top;
    if (top !== 0 && !border) {
      setBorder(true);
    }
    if (top === 0 && border) {
      setBorder(false);
    }
  }, [border]);

  useEffect(() => {
    window.addEventListener('scroll', onScrollHandler);

    return () => {
      window.removeEventListener('scroll', onScrollHandler);
    };
  }, [onScrollHandler]);

  return border ? {} : { borderBottom: 'none' };
}
