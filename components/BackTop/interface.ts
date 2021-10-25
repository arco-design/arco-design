import { CSSProperties } from 'react';

/**
 * @title BackTop
 */
export interface BackTopProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 当滚动到这个高度时，显示返回顶部按钮。
   * @en When scrolling to this height, display the back to top button.
   * @defaultValue 400
   */
  visibleHeight?: number;
  /**
   * @zh 设置需要监听其滚动事件的元素，值为一个返回对应 `DOM` 元素的函数。
   * @en Set the element whose scroll event needs to be listened to. The value is a function that returns the corresponding `DOM` element
   * @defaultValue () => window
   */
  target?: () => HTMLElement | Window;
  /**
   * @zh 点击返回顶部时的回调函数。
   * @en Callback when you click to return to the top.
   */
  onClick?: () => void;
  /**
   * @zh 滚动到顶部的缓动方式类型, 所有类型：[easing](https://github.com/PengJiyuan/b-tween)。
   * @en Scroll to the top of the easing method type, all types: [easing](https://github.com/PengJiyuan/b-tween).
   * @defaultValue quartOut
   */
  easing?: string;
  /**
   * @zh 滚动到顶部的时间。
   * @en Duration to scroll to the top
   * @defaultValue 400
   */
  duration?: number;
}
