import { CSSProperties } from 'react';
import { isServerRendering } from '../_util/dom';
import { isArray } from '../_util/is';
import { TriggerProps, MouseLocationType } from './interface';

// get element's position relative to root element
function getElementPosition(element: HTMLElement, elementRect: ChildRect, root?: Element) {
  if (!root || !element || isServerRendering) {
    return { left: 0, width: 0, height: 0, top: 0 };
  }
  // safari and chrome
  const bodyScroll = (direction) => document.documentElement[direction] || document.body[direction];
  const pageScrollTop =
    root === document.body ? bodyScroll('scrollTop') : (root as Element).scrollTop;
  const pageScrollLeft =
    root === document.body ? bodyScroll('scrollLeft') : (root as Element).scrollLeft;
  const { left, top, width, height } = elementRect;
  // custom container
  const rootLeft = root === document.body ? 0 : (root as Element).getBoundingClientRect().left;
  const rootTop = root === document.body ? 0 : (root as Element).getBoundingClientRect().top;

  const pTop = top + pageScrollTop - rootTop;
  const pLeft = left + pageScrollLeft - rootLeft;

  return {
    left: pLeft,
    top: pTop,
    width,
    height,
  };
}

const getInsideValue = function (min, max, value) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
};

const getPopupAlign = (
  propsPopupAlign: TriggerProps['popupAlign'],
  showArrow: boolean
): {
  left?: number;
  right?: number;
  bottom?: number;
  top?: number;
  horizontalOffset?: number;
  verticalOffset?: number;
} => {
  let horizontalOffset = 0;
  let verticalOffset = 0;
  let resultPopupAlign = {};
  if (!showArrow) {
    resultPopupAlign = { ...propsPopupAlign };
  } else {
    resultPopupAlign = {
      left: 12,
      right: 12,
      top: 12,
      bottom: 12,
      ...propsPopupAlign,
    };
  }

  for (const key in resultPopupAlign) {
    if (isArray(resultPopupAlign[key])) {
      let index = 0;
      // top,bottom 时候，第二个参数是纵向偏移量
      if (['top', 'bottom'].indexOf(key) > -1) {
        index = 1;
        horizontalOffset = resultPopupAlign[key][0];
      } else {
        verticalOffset = resultPopupAlign[key][1];
      }
      resultPopupAlign[key] = resultPopupAlign[key][index];
    }
  }

  return {
    ...resultPopupAlign,
    horizontalOffset,
    verticalOffset,
  };
};

type ReturnType = {
  style?: CSSProperties;
  arrowStyle?: CSSProperties;
  realPosition?: TriggerProps['position'];
};

type ChildRect = {
  left: number;
  top: number;
  width: number;
  height: number;
  right: number;
  bottom: number;
};
const getChildRect = (child, mouseLocation): ChildRect => {
  return mouseLocation
    ? {
        left: mouseLocation.clientX,
        top: mouseLocation.clientY,
        width: 0,
        height: 0,
        right: mouseLocation.clientX,
        bottom: mouseLocation.clientY,
      }
    : child.getBoundingClientRect();
};

// popup 弹出层的尺寸。 https://github.com/arco-design/arco-design/issues/2132
const getContentSize = (content) => {
  const width = content.offsetWidth;
  const height = content.offsetHeight;
  return {
    width,
    height,
  };
};
export default (
  props: TriggerProps,
  content: HTMLElement,
  child: HTMLElement,
  mountContainer: Element,
  mouseLocation: MouseLocationType
): ReturnType => {
  const { autoAlignPopupWidth, autoAlignPopupMinWidth, alignPoint, style: propsStyle } = props;

  if (!child || !content || !mountContainer) {
    return {};
  }
  const style: { left?: number; top?: number } = {};

  // 如果跟随鼠标，相当于鼠标位置作为 child
  const childRect = getChildRect(child, alignPoint && mouseLocation);

  const { left, top, width, height } = getElementPosition(child, childRect, mountContainer);
  const popupAlign = getPopupAlign(props.popupAlign, props.showArrow);
  const alignLeft = popupAlign.left || 0;
  const alignRight = popupAlign.right || 0;
  const alignTop = popupAlign.top || 0;
  const alignBottom = popupAlign.bottom || 0;

  // 通过props.style 传递的width优先级更高
  if (autoAlignPopupWidth && propsStyle?.width === undefined) {
    content.style.width = `${child.offsetWidth}px`;
  }

  if (autoAlignPopupMinWidth) {
    content.style.minWidth = `${child.offsetWidth}px`;
  }

  const contentSize = getContentSize(content);

  let realPosition = props.position;
  const arrowStyle: { left?: number; top?: number } = {};

  const autoPosition = (direction) => {
    if (!props.autoFitPosition) {
      return;
    }
    // document.documentElement?.clientHeight 是为了排除横向滚动条的高度影响。
    const windowHeight = document.documentElement?.clientHeight || window.innerHeight;
    const windowWidth = document.documentElement?.clientWidth || window.innerWidth;

    let result = false; // 是否进行了位置调整
    // 视口左侧/顶部到 popupContainer 的距离
    const boundary = {
      left: left - childRect.left,
      top: top - childRect.top,
    };
    const { top: styleTop = 0, left: styleLeft = 0 } = style;

    // 水平方向微调
    if (direction === 'top' || direction === 'bottom') {
      if (boundary.left > styleLeft && childRect.right > 12) {
        // 左边被遮挡
        style.left = Math.max(boundary.left, left - contentSize.width);
        style.left = Math.max(style.left as number, left - contentSize.width + 24);
      } else if (
        styleLeft - boundary.left + contentSize.width > windowWidth &&
        windowWidth - childRect.left > 12
      ) {
        // 右侧被遮挡，右侧贴边。如果child在可视区内的宽度小于12，不进行位置调整
        style.left = Math.max(boundary.left, boundary.left + windowWidth - contentSize.width);
        style.left = Math.max(style.left as number, left - contentSize.width + 24);
      }
    }
    // 垂直方向微调
    if (direction === 'left' || direction === 'right') {
      if (boundary.top > styleTop && childRect.bottom > 12) {
        // 上面
        style.top = boundary.top;
        style.top = Math.max(style.top as number, top - contentSize.height + childRect.height / 2);
      } else if (
        styleTop - boundary.top + contentSize.height > windowHeight &&
        windowHeight - childRect.top > 12
      ) {
        // 向上微调位置，如果child在可视区内的高度小于12，不进行位置调整
        style.top = Math.max(boundary.top, boundary.top + windowHeight - contentSize.height);
        style.top = Math.max(style.top as number, top - contentSize.height + childRect.height / 2);
      }
    }
    if (direction === 'top' && boundary.top > styleTop) {
      // 上面被遮挡
      if (childRect.top < windowHeight - childRect.bottom) {
        // 放到下面
        style.top = Math.min(
          top + height + (alignTop || 0),
          boundary.top + windowHeight - contentSize.height
        );
        result = true;
      } else {
        // 贴顶部边界
        style.top = boundary.top;
      }
    }
    if (direction === 'bottom' && styleTop - boundary.top + contentSize.height > windowHeight) {
      // 下部分被遮挡
      if (windowHeight - childRect.bottom < childRect.top) {
        // 放到上面
        style.top = Math.max(top - contentSize.height - (alignBottom || 0), boundary.top);

        result = true;
      } else {
        // 贴底边界
        style.top = boundary.top + windowHeight - contentSize.height;
      }
    }
    if (direction === 'left' && boundary.left > styleLeft) {
      // 左边被遮挡
      if (childRect.left < windowWidth - childRect.right) {
        // 放到右边
        style.left = Math.min(
          width + left + alignRight,
          boundary.left + windowWidth - contentSize.width
        );
        result = true;
      } else {
        style.left = boundary.left;
      }
    }
    if (direction === 'right' && styleLeft - boundary.left + contentSize.width > windowWidth) {
      // 右边被遮挡
      if (windowWidth - childRect.right < childRect.left) {
        // 放到左边
        style.left = Math.max(left - contentSize.width - alignLeft, boundary.left);
        result = true;
      } else {
        // 贴左边界
        style.left = boundary.left + windowWidth - contentSize.width;
      }
    }

    // 限制在popupContainer中，左侧最小为 0px
    if (style.left < 0) {
      style.left = 0;
    } else {
      // 限制在popupContainer中，左侧最大为 mountContainer.scrollWidth - contentSize.width，保证弹出层在container内部
      const maxLeft = mountContainer.scrollWidth - contentSize.width;
      style.left = Math.min(maxLeft, style.left);
    }

    return result;
  };

  const horizontalOffset = popupAlign.horizontalOffset || 0;
  const verticalOffset = popupAlign.verticalOffset || 0;

  switch (props.position) {
    case 'top': {
      style.top = top - contentSize.height - alignTop;
      style.left = left + width / 2 - contentSize.width / 2;
      autoPosition('top') && (realPosition = 'bottom');
      style.left += horizontalOffset;

      const arrowLeft = left - Number(style.left) + width / 2;
      arrowStyle.left = getInsideValue(12, contentSize.width - 12, arrowLeft);
      break;
    }
    case 'tl':
      style.top = top - contentSize.height - alignTop;
      style.left = left;
      autoPosition('top') && (realPosition = 'bl');
      style.left += horizontalOffset;
      let arrowLeft = left - Number(style.left) + Math.min(width / 2, 50);
      arrowStyle.left = getInsideValue(12, contentSize.width - 12, arrowLeft);
      break;
    case 'tr':
      style.top = -content.clientHeight + top - alignTop;
      style.left = left + width - contentSize.width;
      autoPosition('top') && (realPosition = 'br');
      style.left += horizontalOffset;
      arrowLeft = left - Number(style.left) + Math.max(width / 2, width - 50);
      arrowStyle.left = getInsideValue(12, contentSize.width - 12, arrowLeft);
      break;
    case 'bottom': {
      style.top = height + top + alignBottom;
      style.left = left + width / 2 - contentSize.width / 2;
      autoPosition('bottom') && (realPosition = 'top');
      style.left += horizontalOffset;

      const arrowLeft = left - Number(style.left) + width / 2;
      arrowStyle.left = getInsideValue(12, contentSize.width - 12, arrowLeft);
      break;
    }
    case 'bl':
      style.top = height + top + alignBottom;
      style.left = left;
      autoPosition('bottom') && (realPosition = 'tl');
      style.left += horizontalOffset;
      arrowLeft = left - Number(style.left) + Math.min(width / 2, 50);
      arrowStyle.left = getInsideValue(12, contentSize.width - 12, arrowLeft);
      break;
    case 'br':
      style.top = height + top + alignBottom;
      style.left = left + width - contentSize.width;
      autoPosition('bottom') && (realPosition = 'tr');
      style.left += horizontalOffset;
      arrowLeft = left - Number(style.left) + Math.max(width / 2, width - 50);
      arrowStyle.left = getInsideValue(12, contentSize.width - 12, arrowLeft);
      break;
    case 'left': {
      style.top = top + height / 2 - contentSize.height / 2;
      style.left = left - contentSize.width - alignLeft;
      autoPosition('left') && (realPosition = 'right');
      style.top += verticalOffset;
      const arrowTop = top - Number(style.top) + height / 2;
      arrowStyle.top = getInsideValue(12, contentSize.height - 12, arrowTop);
      break;
    }

    case 'lt':
      style.top = top;
      style.left = left - contentSize.width - alignLeft;
      autoPosition('left') && (realPosition = 'rt');
      style.top += verticalOffset;
      let arrowTop = top - Number(style.top) + Math.min(height / 2, 50);
      arrowStyle.top = getInsideValue(12, contentSize.height - 12, arrowTop);
      break;
    case 'lb':
      style.top = top + height - contentSize.height;
      style.left = left - contentSize.width - alignLeft;
      autoPosition('left') && (realPosition = 'rb');
      style.top += verticalOffset;

      arrowTop = top - Number(style.top) + Math.max(height / 2, height - 50);
      arrowStyle.top = getInsideValue(12, contentSize.height - 12, arrowTop);
      break;
    case 'right': {
      style.top = top + height / 2 - contentSize.height / 2;
      style.left = width + left + alignRight;
      autoPosition('right') && (realPosition = 'left');
      style.top += verticalOffset;

      const arrowTop = top - Number(style.top) + height / 2;
      arrowStyle.top = getInsideValue(12, contentSize.height - 12, arrowTop);
      break;
    }
    case 'rt':
      style.top = top;
      style.left = width + left + alignRight;
      autoPosition('right') && (realPosition = 'lt');
      style.top += verticalOffset;

      arrowTop = top - Number(style.top) + Math.min(height / 2, 50);
      arrowStyle.top = getInsideValue(12, contentSize.height - 12, arrowTop);
      break;
    case 'rb':
      style.top = top + height - contentSize.height;
      style.left = width + left + alignRight;
      autoPosition('right') && (realPosition = 'lb');
      style.top += verticalOffset;

      arrowTop = top - Number(style.top) + Math.max(height / 2, height - 50);
      arrowStyle.top = getInsideValue(12, contentSize.height - 12, arrowTop);
      break;
    default:
      break;
  }

  return {
    style,
    arrowStyle,
    realPosition,
  };
};
