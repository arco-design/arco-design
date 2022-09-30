import { useCallback, KeyboardEventHandler } from 'react';
import { Enter, ArrowDown, ArrowUp, ArrowLeft, ArrowRight } from '../keycode';

type CallBackEventType =
  | 'onPressEnter'
  | 'onArrowUp'
  | 'onArrowLeft'
  | 'onArrowRight'
  | 'onArrowDown';

export default function useKeyboardEvent(props?: { onKeyDown?: KeyboardEventHandler }) {
  const getEventListeners = useCallback(
    (callbacks: { [key in CallBackEventType]?: (e) => void }) => {
      return {
        onKeyDown: (e) => {
          const keyCode = e.keyCode || e.which;

          if (keyCode === Enter.code) {
            callbacks.onPressEnter?.(e);
          }
          if (keyCode === ArrowDown.code) {
            callbacks.onArrowDown?.(e);
          }
          if (keyCode === ArrowLeft.code) {
            callbacks.onArrowLeft?.(e);
          }
          if (keyCode === ArrowRight.code) {
            callbacks.onArrowRight?.(e);
          }
          if (keyCode === ArrowUp.code) {
            callbacks.onArrowUp?.(e);
          }
          props?.onKeyDown?.(e);
        },
      };
    },
    []
  );
  return getEventListeners;
}
