import BTween from 'b-tween';
import { isString, isWindow } from '../_util/is';

export function findNode(dom: HTMLElement | Document, selector: string): HTMLElement | null {
  // handle id start with number
  // e.g. id #123
  const s =
    isString(selector) && selector[0] === '#' ? `[id='${selector.replace('#', '')}']` : selector;
  try {
    return dom.querySelector(s);
  } catch (e) {
    console.error(e);
    return null;
  }
}

export function slide(el: HTMLElement, top: number, cb: Function) {
  const tween = new BTween({
    from: {
      scrollTop: el.scrollTop,
    },
    to: {
      scrollTop: top,
    },
    easing: 'quartOut',
    duration: 300,
    onUpdate: (keys) => {
      el.scrollTop = keys.scrollTop;
    },
    onFinish: () => {
      cb?.();
    },
  });
  tween.start();
}

export function getContainer(targetContainer?: string | HTMLElement | Window) {
  if (isString(targetContainer)) {
    return findNode(document, targetContainer);
  }
  return targetContainer || window;
}

export function getContainerElement(scrollContainer: HTMLElement | Window) {
  return isWindow(scrollContainer) ? document.documentElement || document.body : scrollContainer;
}
