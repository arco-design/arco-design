import { useRef, MutableRefObject, useEffect } from 'react';
import { on, off } from '../../_util/dom';

type WheelEventHandler = (e: WheelEvent) => void;
type TouchEventHandler = (e: TouchEvent) => void;

export default function useHeaderScroll<T extends HTMLElement>(props: {
  headerWrapperRef: MutableRefObject<T>;
  headerOffset: number;
  align: 'left' | 'right';
  direction: 'horizontal' | 'vertical';
  isScrollable: boolean;
  onScroll: (offset: number) => void | boolean;
}) {
  const { headerWrapperRef, headerOffset, align, isScrollable, direction, onScroll } = props;

  function onOffset(offsetX: number, offsetY) {
    let offset = 0;

    if (direction === 'vertical') {
      offset = headerOffset + offsetY;
    } else {
      offset = align === 'left' ? headerOffset + offsetX : headerOffset - offsetX;
    }

    onScroll && onScroll(offset);
  }

  // wheel
  const lastWheelDirectionRef = useRef('x');
  function onWheel(e: WheelEvent) {
    if (!isScrollable) return;

    e.preventDefault();

    const { deltaX, deltaY } = e;

    let offset = 0;

    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (absX === absY) {
      offset = lastWheelDirectionRef.current === 'x' ? deltaX : deltaY;
    } else if (absX > absY) {
      offset = deltaX;
      lastWheelDirectionRef.current = 'x';
    } else {
      offset = deltaY;
      lastWheelDirectionRef.current = 'y';
    }

    onOffset(offset, offset);
  }

  // touch
  const positionRef = useRef({
    clientX: 0,
    clientY: 0,
  });

  const getPosition = (e: TouchEvent) => {
    return e && e.touches && e.touches.length && e.touches[0];
  };

  const onTouchMove = (e: TouchEvent) => {
    if (e.cancelable) e.preventDefault();

    const position = getPosition(e);
    if (!position) return;

    const { clientX, clientY } = positionRef.current;

    // 往右移动的距离
    const offsetX = position.clientX - clientX;
    // 往下移动的距离
    const offsetY = position.clientY - clientY;

    onOffset(-offsetX, -offsetY);
  };

  const onTouchMoveEnd = () => {
    off(document.documentElement, 'touchmove', onTouchMove);
    off(document.documentElement, 'touchend', onTouchMoveEnd);
  };

  const onTouchStart = (e: TouchEvent) => {
    if (!isScrollable) return;

    const position = getPosition(e);
    if (!position) return;

    positionRef.current = {
      clientX: position.clientX,
      clientY: position.clientY,
    };

    on(document.documentElement, 'touchmove', onTouchMove, { passive: false });
    on(window, 'touchend', onTouchMoveEnd, { passive: false });
  };

  const eventProxy = useRef<{ onWheel: WheelEventHandler; onTouchStart: TouchEventHandler }>(null);
  eventProxy.current = { onWheel, onTouchStart };

  useEffect(() => {
    on(
      headerWrapperRef.current,
      'wheel',
      (e: WheelEvent) => {
        eventProxy.current.onWheel(e);
      },
      { passive: false }
    );
    on(
      headerWrapperRef.current,
      'touchstart',
      (e: TouchEvent) => {
        eventProxy.current.onTouchStart(e);
      },
      { passive: true }
    );
  }, [headerWrapperRef.current]);
}
