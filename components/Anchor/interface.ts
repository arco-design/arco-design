import { ReactNode, CSSProperties } from 'react';

/**
 * @title Anchor
 */
export interface AnchorProps {
  className?: string | string[];
  style?: CSSProperties;
  /**
   * @zh 是否平滑滚动
   * @en Whether to enable smooth scrolling
   * @defaultValue true
   */
  animation?: boolean;
  /**
   * @zh 方向
   * @en Direction
   * @defaultValue vertical
   * @version 2.51.0
   */
  direction?: 'vertical' | 'horizontal';
  /**
   * @zh 滚动容器。传入选择器或者dom元素。
   * @en Scrolling container. Pass in selector or DOM Element
   */
  scrollContainer?: string | HTMLElement | Window;
  /**
   * @zh
   * 滚动边界值，设置该值为数字后，将会在距离滚动容器 boundary 距离时停止滚动。
   * 设置为 end, start, center，目标元素将会对应滚动到底部，顶部，中间位置。
   * @en
   * Scrolling boundary.
   * For number values, the target element stops scrolling when reaches the bounding distance.
   * For `end`, `start`, `center`, the target scrolls to the bottom, top, and center of the container.
   * @defaultValue start
   */
  boundary?: number | 'end' | 'start' | 'center' | 'nearest';
  /**
   * @zh 是否改变 hash，设置为 `false` 点击锚点不会改变页面 hash。
   * @en Whether to change the URL hash
   * @defaultValue true
   */
  hash?: boolean;
  /**
   * @zh 是否固定。当设置为 `true`时，锚点组件将会嵌套在[固钉](/react/components/affix) 组件内
   * @en Whether to wrap anchor within [Affix](/react/components/affix)
   * @defaultValue true
   */
  affix?: boolean;
  /**
   * @zh 通过该属性可以设置 `Affix` 组件的样式
   * @en The style to be applied to `Affix`
   */
  affixStyle?: CSSProperties;
  /**
   * @zh 距离窗口顶部达到指定偏移量后触发。即 `Affix` 固钉组件的 `offsetTop` 属性
   * @en Offset from the top of the viewport (in pixels). i.e. `Affix`'s `offsetTop` props
   */
  offsetTop?: number;
  /**
   * @zh 距离窗口底部达到指定偏移量后触发。 `Affix` 固钉组件的 `offsetBottom` 属性
   * @en Offset from the bottom of the viewport (in pixels). i.e. `Affix`'s `offsetBottom` props
   */
  offsetBottom?: number;
  /**
   * @zh 滚动时锚点改变或点击锚点时触发
   * @en Callback fired when anchor state changes
   */
  onChange?: (newLink: string, oldLink: string) => void;
  /**
   * @zh 点击锚点时候触发
   * @en Callback fired when anchor is clicked
   */
  onSelect?: (newLink: string, oldLink: string) => void;
  /**
   * @zh 没有左侧轴线的样式。
   * @en Whether to hide axis line of the left
   */
  lineless?: boolean;
  /**
   * @version 2.22.0
   * @zh 容器中基准线的位置相对容器顶部的偏移量，在没有设置的时候，取值为滚动容器高度的一半。当锚点到达或离开基准线的时候会更新锚点的状态。
   * @en The offset of the baseline relative to the top of the container.
   * The value is half of the height of the scrolling container if not specified.
   * The status of the anchor will be updated when the anchor reaches or leaves the baseline.
   */
  targetOffset?: number;
}

/**
 * @title Anchor.Link
 */
export interface AnchorLinkProps {
  className?: string | string[];
  style?: CSSProperties;
  /**
   * @zh 锚点链接
   * @en The target that the hyperlink points to
   * @defaultValue #
   */
  href?: string;
  /**
   * @zh 文本内容。可以是字符串或者自定义节点。
   * @en The content of the hyperlink
   */
  title?: string | ReactNode;
}
