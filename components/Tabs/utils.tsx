import { Enter } from '../_util/keycode';

export const getRectDiff = (node: HTMLElement, parentNode: HTMLElement) => {
  const nodeRect = node.getBoundingClientRect();
  const parentRect = parentNode.getBoundingClientRect();
  const scaleXRaw = parentRect.width ? parentNode.offsetWidth / parentRect.width : 1;
  const scaleYRaw = parentRect.height ? parentNode.offsetHeight / parentRect.height : 1;
  const scaleX = Math.abs(scaleXRaw - 1) < 0.01 ? 1 : scaleXRaw;
  const scaleY = Math.abs(scaleYRaw - 1) < 0.01 ? 1 : scaleYRaw;

  return {
    left: (nodeRect.left - parentRect.left) * scaleX,
    top: (nodeRect.top - parentRect.top) * scaleY,
    right: (nodeRect.right - parentRect.right) * scaleX,
    bottom: (nodeRect.bottom - parentRect.bottom) * scaleY,
  };
};

// 浏览器默认行为影响，比如说input的autofocus，会导致wrapper自动滚动到focus元素
// 需要手动校准一下
// https://github.com/arco-design/arco-design/issues/422

export const updateScrollOffset = (
  parentNode: HTMLElement,
  direction: 'horizontal' | 'vertical'
) => {
  const scrollLeft = parentNode.scrollLeft;
  const scrollTop = parentNode.scrollTop;

  if (direction === 'horizontal' && scrollLeft) {
    parentNode.scrollTo({ left: -1 * scrollLeft });
  }
  if (direction === 'vertical' && scrollTop) {
    parentNode.scrollTo({ top: -1 * scrollTop });
  }
};

export const getKeyDownEvent = ({ onPressEnter }) => {
  return {
    onKeyDown: (e) => {
      const keyCode = e.keyCode || e.which;
      if (keyCode === Enter.code) {
        onPressEnter(e);
      }
    },
  };
};
