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
|miniRender|是否仅渲染满足动画效果的最少数量的 children|boolean |`-`|2.21.0|
|currentIndex|当前展示索引|number |`0`|-|
|moveSpeed|幻灯片移动速率(ms)|number |`500`|-|
|timingFunc|过渡速度曲线, 默认匀速 [transition-timing-function](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function)|string |`cubic-bezier(0.34, 0.69, 0.1, 1)`|-|
|animation|切换动画|'slide' \| 'card' \| 'fade' |`slide`|-|
|direction|幻灯片移动方向|'horizontal' \| 'vertical' |`horizontal`|-|
|indicatorPosition|指示器位置|'bottom' \| 'top' \| 'left' \| 'right' \| 'outer' |`bottom`|-|
|indicatorType|指示器类型，可为小方块和小圆点或不显示|'line' \| 'dot' \| 'slider' \| 'never' |`dot`|-|
|showArrow|切换箭头显示时机|'always' \| 'hover' \| 'never' |`always`|-|
|trigger|幻灯片切换触发方式, click/hover 指示器|'click' \| 'hover' |`click`|-|
|arrowClassName|切换箭头样式|string \| string[] |`-`|-|
|autoPlay|是否自动循环展示，或者传入 `{ interval: 自动切换的时间间隔(默认: 3000), hoverToPause: 鼠标悬浮时是否暂停自动切换(默认: true) }` 进行高级配置 (`2.14.0` 支持传入对象)|boolean \| { interval?: number; hoverToPause?: boolean } |`-`|-|
|carousel|用于获得带有 API 方法的 Carousel 引用。|MutableRefObject&lt;[CarouselHandle](#carouselhandle)&gt; |`-`|2.16.1|
|className|节点类名|string \| string[] |`-`|-|
|icons|自定义图标|{prev?: ReactNode;next?: ReactNode;} |`-`|2.25.0|
|indicatorClassName|指示器的样式|string \| string[] |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|onChange|幻灯片发生切换时的回调函数。|(index: number, prevIndex: number, isManual: boolean) => void |`-`|`isManual` in 2.4.0|

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

## 常见问题

### 动画结束后闪动

如果子元素是透明的，`Carousel` 翻页完成之后可能出现由于浏览器渲染导致的闪动问题，此时可以尝试为子元素添加背景色解决。参考此 [ISSUE](https://github.com/arco-design/arco-design/issues/97)。
