import { Enter } from '../_util/keycode';

export const getRectDiff = (node: HTMLElement, parentNode: HTMLElement) => {
  const nodeRect = node.getBoundingClientRect();
  const parentRect = parentNode.getBoundingClientRect();
  const scaleX = parentNode.offsetWidth / parentRect.width;
  const scaleY = parentNode.offsetHeight / parentRect.height;

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
