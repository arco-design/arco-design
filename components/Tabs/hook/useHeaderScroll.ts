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
  onScrollStart?: () => void;
  onScrollEnd?: () => void;
}) {
  const {
    headerWrapperRef,
    headerOffset,
    align,
    isScrollable,
    direction,
    onScroll,
    onScrollStart,
    onScrollEnd,
  } = props;

  const headerOffsetRef = useRef(headerOffset);
  headerOffsetRef.current = headerOffset;

  const rafIdRef = useRef<number | null>(null);
  const endTimerRef = useRef<number | null>(null);
  const scrollingRef = useRef(false);
  const pendingOffsetRef = useRef<{ x: number; y: number } | null>(null);

  const scheduleScrollEnd = () => {
    if (endTimerRef.current != null) {
      window.clearTimeout(endTimerRef.current);
    }
    endTimerRef.current = window.setTimeout(() => {
      scrollingRef.current = false;
      if (onScrollEnd) onScrollEnd();
      endTimerRef.current = null;
    }, 80);
  };

  function scheduleOffset(offsetX: number, offsetY: number) {
    if (!isScrollable) return;
    pendingOffsetRef.current = { x: offsetX, y: offsetY };

    if (!scrollingRef.current) {
      scrollingRef.current = true;
      if (onScrollStart) onScrollStart();
    }

    if (rafIdRef.current == null) {
      rafIdRef.current = window.requestAnimationFrame(() => {
        rafIdRef.current = null;
        const pending = pendingOffsetRef.current;
        if (pending) {
          let offset = 0;
          if (direction === 'vertical') {
            offset = headerOffsetRef.current + pending.y;
          } else {
            offset =
              align === 'left'
                ? headerOffsetRef.current + pending.x
                : headerOffsetRef.current - pending.x;
          }
          if (onScroll) onScroll(offset);
          pendingOffsetRef.current = null;
        }
        scheduleScrollEnd();
      });
    } else {
      scheduleScrollEnd();
    }
  }

  function onOffset(offsetX: number, offsetY: number) {
    scheduleOffset(offsetX, offsetY);
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
    off(window, 'touchend', onTouchMoveEnd);
    scheduleScrollEnd();
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
    if (!scrollingRef.current) {
      scrollingRef.current = true;
      if (onScrollStart) onScrollStart();
    }
  };

  const eventProxy = useRef<{ onWheel: WheelEventHandler; onTouchStart: TouchEventHandler }>(null);
  eventProxy.current = { onWheel, onTouchStart };

  useEffect(() => {
    const node = headerWrapperRef.current as unknown as HTMLElement;
    if (!node) return;
    const wheelListener = (e: WheelEvent) => {
      eventProxy.current.onWheel(e);
    };
    const touchStartListener = (e: TouchEvent) => {
      eventProxy.current.onTouchStart(e);
    };
    on(node, 'wheel', wheelListener, { passive: false });
    on(node, 'touchstart', touchStartListener, { passive: true });

    return () => {
      off(node, 'wheel', wheelListener);
      off(node, 'touchstart', touchStartListener);
      off(document.documentElement, 'touchmove', onTouchMove);
      off(window, 'touchend', onTouchMoveEnd);
      if (rafIdRef.current != null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (endTimerRef.current != null) {
        window.clearTimeout(endTimerRef.current);
        endTimerRef.current = null;
      }
      pendingOffsetRef.current = null;
      scrollingRef.current = false;
    };
  }, [headerWrapperRef.current, isScrollable]);
}
