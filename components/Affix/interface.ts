import { CSSProperties } from 'react';

/**
 * @title Affix
 */
export interface AffixProps {
  className?: string | string[];
  style?: CSSProperties;
  /**
   * @zh 给 `fixed` 的元素设置 className。
   * @en ClassName of the fixed element.
   * @version 2.8.0
   */
  affixClassName?: string | string[];
  /**
   * @zh
   * 给 `fixed` 的元素设置 style，注意不要设置 `position` `top` `width` `height`， 因为这几个属性是在元素 fixed 时候用于定位的。
   * @en Style of the fixed elements. Don't set `position` `top` `width` `height` attributes as they are used for positioning when the element is fixed.
   * @version 2.8.0
   */
  affixStyle?: CSSProperties;
  /**
   * @zh 距离窗口顶部达到指定偏移量后触发
   * @en Offset from the top of the viewport (in pixels)
   * @defaultValue 0
   */
  offsetTop?: number;
  /**
   * @zh 距离窗口底部达到指定偏移量后触发
   * @en Offset from the bottom of the viewport (in pixels)
   */
  offsetBottom?: number;
  /**
   * @zh 滚动容器
   * @en Specifies the scrollable area DOM Element
   * @defaultValue () => window
   */
  target?: () => HTMLElement | null | Window;
  /**
   * @zh
   * `target` 的外层滚动元素。`Affix` 将会监听该元素的滚动事件，并实时更新固钉的位置。
   * 主要是为了解决 `target` 属性指定为非 `window` 元素时，如果外层元素滚动，可能会导致固钉跑出容器问题。
   * @en
   * Outer scrollable DOM element of `target`. `Affix` will listen to the container's scroll event and update the its position correspondingly.
   * It's to solve the problem that Affix may escape the container when the container is not `window`.
   */
  targetContainer?: () => HTMLElement | null | Window;
  /**
   * @zh 固定状态发生改变时触发
   * @en Callback fired when Affix state is changed
   */
  onChange?: (affixed: boolean) => void;
}
