import { CSSProperties, MutableRefObject, ReactNode } from 'react';

export type CarouselHandle = {
  dom: HTMLElement;
  goto: (options: {
    /** 目标索引 */
    index: number;
    /** 是否为逆向 */
    isNegative?: boolean;
    /** 是否由用户触发，将决定 onChange 回调的第三个参数 */
    isManual?: boolean;
    /** 是否重置自动播放的 interval */
    resetAutoPlayInterval?: boolean;
  }) => void;
};

/**
 * @title Carousel
 */
export interface CarouselProps {
  style?: CSSProperties;
  className?: string | string[];
  children?: ReactNode;
  /**
   * @zh 当前展示索引
   * @en The index of current slide which starts from 0
   * @defaultValue 0
   */
  currentIndex?: number;
  /**
   * @zh
   * 是否自动循环展示，或者传入 `{ interval: 自动切换的时间间隔(默认: 3000), hoverToPause: 鼠标悬浮时是否暂停自动切换(默认: true) }` 进行高级配置 (`2.14.0` 支持传入对象)
   * @en
   * Whether to scroll automatically, or pass in `{ interval: the time interval for switching (default: 3000),
   * hoverToPause: whether to pause switching while hover (default: true) }` for configuration (object is supported from `2.14.0`)
   */
  autoPlay?: boolean | { interval?: number; hoverToPause?: boolean };
  /**
   * @zh
   * 是否仅渲染满足动画效果的最少数量的 children
   * @en
   * Whether to render only the minimum number of children that meet the animation effect
   * @version 2.21.0
   */
  miniRender?: boolean;
  // TODO: 3.x 移除此参数
  autoPlaySpeed?: number;
  /**
   * @zh 幻灯片移动速率(ms)
   * @en The duration of the slide movement(ms)
   * @defaultValue 500
   */
  moveSpeed?: number;
  /**
   * @zh 切换动画
   * @en The animation of the slide movement
   * @defaultValue slide
   */
  animation?: 'slide' | 'card' | 'fade';
  /**
   * @zh 幻灯片切换触发方式, click/hover 指示器
   * @en How to trigger the slide switch, click/hover the indicator
   * @defaultValue click
   */
  trigger?: 'click' | 'hover';
  /**
   * @zh 幻灯片移动方向
   * @en The direction of the slide movement
   * @defaultValue horizontal
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * @zh 切换箭头显示时机
   * @en When to show the switch trigger
   * @defaultValue always
   */
  showArrow?: 'always' | 'hover' | 'never';
  /**
   * @zh 切换箭头样式
   * @en The additional css class for switch trigger
   */
  arrowClassName?: string | string[];
  /**
   * @zh 自定义图标
   * @en Customize icons
   * @version 2.25.0
   */
  icons?: {
    prev?: ReactNode;
    next?: ReactNode;
  };
  /**
   * @zh 指示器类型，可为小方块和小圆点或不显示
   * @en Type of indicator
   * @defaultValue dot
   */
  indicatorType?: 'line' | 'dot' | 'slider' | 'never';
  /**
   * @zh 指示器位置
   * @en Position of indication
   * @defaultValue bottom
   */
  indicatorPosition?: 'bottom' | 'top' | 'left' | 'right' | 'outer';
  /**
   * @zh 指示器的样式
   * @en The additional css class for indicator
   */
  indicatorClassName?: string | string[];
  /**
   * @zh
   * 过渡速度曲线, 默认匀速 [transition-timing-function](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function)
   * @en
   * How intermediate values are calculated for CSS properties being affected by a transition effect.
   * [transition-timing-function](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function)
   * @defaultValue cubic-bezier(0.34, 0.69, 0.1, 1)
   */
  timingFunc?: string;
  /**
   * @zh 幻灯片发生切换时的回调函数。
   * @en Callback when slide changes.
   * @version `isManual` in 2.4.0
   */
  onChange?: (index: number, prevIndex: number, isManual: boolean) => void;
  /**
   * @zh 用于获得带有 API 方法的 Carousel 引用。
   * @en Carousel reference for imperative API calls.
   * @version 2.16.1
   */
  carousel?: MutableRefObject<CarouselHandle>;
}

export interface CarouselArrowProps
  extends Pick<CarouselProps, 'direction' | 'showArrow' | 'icons'> {
  className?: string | string[];
  prev?: (e: any) => any;
  next?: (e: any) => any;
}

export interface CarouselIndicatorProps {
  className?: string | string[];
  count: number;
  activeIndex?: number;
  type?: CarouselProps['indicatorType'];
  position?: CarouselProps['indicatorPosition'];
  trigger?: CarouselProps['trigger'];
  onSelectIndex?: (e: number) => void;
}
