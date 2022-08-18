`````
Component / Data Display

# Carousel

Carousel is used to display multiple contents such as pictures, videos, or embedded frames on a rotating timer. It supports both automatic playback and manual switching.
`````

%%Content%%

## API

### Carousel

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|miniRender|Whether to render only the minimum number of children that meet the animation effect|boolean |`-`|2.21.0|
|currentIndex|The index of current slide which starts from 0|number |`0`|-|
|moveSpeed|The duration of the slide movement(ms)|number |`500`|-|
|timingFunc|How intermediate values are calculated for CSS properties being affected by a transition effect.[transition-timing-function](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function)|string |`cubic-bezier(0.34, 0.69, 0.1, 1)`|-|
|animation|The animation of the slide movement|'slide' \| 'card' \| 'fade' |`slide`|-|
|direction|The direction of the slide movement|'horizontal' \| 'vertical' |`horizontal`|-|
|indicatorPosition|Position of indication|'bottom' \| 'top' \| 'left' \| 'right' \| 'outer' |`bottom`|-|
|indicatorType|Type of indicator|'line' \| 'dot' \| 'slider' \| 'never' |`dot`|-|
|showArrow|When to show the switch trigger|'always' \| 'hover' \| 'never' |`always`|-|
|trigger|How to trigger the slide switch, click/hover the indicator|'click' \| 'hover' |`click`|-|
|arrowClassName|The additional css class for switch trigger|string \| string[] |`-`|-|
|autoPlay|Whether to scroll automatically, or pass in `{ interval: the time interval for switching (default: 3000),hoverToPause: whether to pause switching while hover (default: true) }` for configuration (object is supported from `2.14.0`)|boolean \| { interval?: number; hoverToPause?: boolean } |`-`|-|
|carousel|Carousel reference for imperative API calls.|MutableRefObject&lt;[CarouselHandle](#carouselhandle)&gt; |`-`|2.16.1|
|className|Additional css class|string \| string[] |`-`|-|
|icons|Customize icons|{prev?: ReactNode;next?: ReactNode;} |`-`|2.25.0|
|indicatorClassName|The additional css class for indicator|string \| string[] |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
|onChange|Callback when slide changes.|(index: number, prevIndex: number, isManual: boolean) => void |`-`|`isManual` in 2.4.0|

### CarouselHandle

```js
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
```

## Common Problems

### Flashes after the animation ends

If the child element is transparent, there may be a flickering problem caused by browser rendering after the `Carousel` page is completed. At this time, you can try to add a background color to the child element to solve it. Refer to this [ISSUE](https://github.com/arco-design/arco-design/issues/97).
