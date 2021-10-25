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
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|currentIndex|The index of current slide which starts from 0|`number`|`0`|-|
|autoPlay|Whether to scroll automatically, or pass in `{ interval: the time interval for switching (default: 3000),hoverToPause: whether to pause switching while hover (default: true) }` for configuration (object is supported from `2.14.0`)|`boolean \| { interval?: number; hoverToPause?: boolean }`|`-`|-|
|miniRender|Whether to render only the minimum number of children that meet the animation effect|`boolean`|`-`|2.21.0|
|moveSpeed|The duration of the slide movement(ms)|`number`|`500`|-|
|animation|The animation of the slide movement|`'slide' \| 'card' \| 'fade'`|`slide`|-|
|trigger|How to trigger the slide switch, click/hover the indicator|`'click' \| 'hover'`|`click`|-|
|direction|The direction of the slide movement|`'horizontal' \| 'vertical'`|`horizontal`|-|
|showArrow|When to show the switch trigger|`'always' \| 'hover' \| 'never'`|`always`|-|
|arrowClassName|The additional css class for switch trigger|`string \| string[]`|`-`|-|
|indicatorType|Type of indicator|`'line' \| 'dot' \| 'slider' \| 'never'`|`dot`|-|
|indicatorPosition|Position of indication|`'bottom' \| 'top' \| 'left' \| 'right' \| 'outer'`|`bottom`|-|
|indicatorClassName|The additional css class for indicator|`string \| string[]`|`-`|-|
|timingFunc|How intermediate values are calculated for CSS properties being affected by a transition effect.[transition-timing-function](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function)|`string`|`cubic-bezier(0.34, 0.69, 0.1, 1)`|-|
|onChange|Callback when slide changes.|`(index: number, prevIndex: number, isManual: boolean) => void`|`-`|`isManual` in 2.4.0|
|carousel|Carousel reference for imperative API calls.|`MutableRefObject<CarouselHandle>`|`-`|2.16.1|
