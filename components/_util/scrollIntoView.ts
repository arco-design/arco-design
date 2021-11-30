import scrollIntoView, { Options } from 'scroll-into-view-if-needed';
import { isFunction } from './is';

export default function (node: HTMLElement, options?: Options) {
  if (node) {
    scrollIntoView(node, {
      block: 'start',
      behavior: 'instant',
      scrollMode: 'if-needed',
      ...options,
    });
    const height = node.offsetHeight;
    const { height: scaleHeight } = node.getBoundingClientRect();
    // trigger 带有scale动画，在 scrollIntoView 的时候，动画未执行完全，此时通过 getBoundingClientRect 获取到的 height 是 scale 后的高度。
    // 所以需要额外滚动一点距离。
    if (options && options.boundary && height !== scaleHeight) {
      // scrollIntoView 的 boundary是函数或者Element类型
      const parentNode = (
        isFunction(options.boundary) ? options.boundary(node) : options.boundary
      ) as HTMLElement;
      parentNode.scrollTop = Math.round(parentNode.scrollTop * (height / scaleHeight));
    }
  }
}
