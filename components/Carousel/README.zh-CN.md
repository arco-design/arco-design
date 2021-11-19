`````
组件 / 数据展示

# 图片轮播 Carousel

用于展示多张图片、视频或内嵌框架等内容的循环播放，支持系统自动播放或用户手动切换。
`````

%%Content%%

## API

### Carousel

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|style|节点样式|`CSSProperties`|`-`|-|
|className|节点类名|`string \| string[]`|`-`|-|
|currentIndex|当前展示索引|`number`|`0`|-|
|autoPlay|是否自动循环展示，或者传入 `{ interval: 自动切换的时间间隔(默认: 3000), hoverToPause: 鼠标悬浮时是否暂停自动切换(默认: true) }` 进行高级配置 (`2.14.0` 支持传入对象)|`boolean \| { interval?: number; hoverToPause?: boolean }`|`-`|-|
|miniRender|是否仅渲染满足动画效果的最少数量的 children|`boolean`|`-`|2.21.0|
|moveSpeed|幻灯片移动速率(ms)|`number`|`500`|-|
|animation|切换动画|`'slide' \| 'card' \| 'fade'`|`slide`|-|
|trigger|幻灯片切换触发方式, click/hover 指示器|`'click' \| 'hover'`|`click`|-|
|direction|幻灯片移动方向|`'horizontal' \| 'vertical'`|`horizontal`|-|
|showArrow|切换箭头显示时机|`'always' \| 'hover' \| 'never'`|`always`|-|
|arrowClassName|切换箭头样式|`string \| string[]`|`-`|-|
|icons|自定义图标|`{prev?: ReactNode;next?: ReactNode;}`|`-`|2.25.0|
|indicatorType|指示器类型，可为小方块和小圆点或不显示|`'line' \| 'dot' \| 'slider' \| 'never'`|`dot`|-|
|indicatorPosition|指示器位置|`'bottom' \| 'top' \| 'left' \| 'right' \| 'outer'`|`bottom`|-|
|indicatorClassName|指示器的样式|`string \| string[]`|`-`|-|
|timingFunc|过渡速度曲线, 默认匀速 [transition-timing-function](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function)|`string`|`cubic-bezier(0.34, 0.69, 0.1, 1)`|-|
|onChange|幻灯片发生切换时的回调函数。|`(index: number, prevIndex: number, isManual: boolean) => void`|`-`|`isManual` in 2.4.0|
|carousel|用于获得带有 API 方法的 Carousel 引用。|`MutableRefObject<CarouselHandle>`|`-`|2.16.1|
