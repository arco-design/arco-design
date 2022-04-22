`````
组件 / 数据输入

# 滑动输入条 Slider

滑动型输入器，展示当前值和可选范围。
`````

%%Content%%

## API

### Slider

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|style|节点样式|`CSSProperties`|`-`|-|
|className|节点类名|`string \| string[]`|`-`|-|
|tooltipVisible|控制 tooltip 的展示。设置为 `true` 时，将一直展示 tooltip。设置为 `false` 时，将一直隐藏 tooltip。|`boolean`|`-`|-|
|tooltipPosition|tooltip 的位置|`\| 'top'\| 'tl'\| 'tr'\| 'bottom'\| 'bl'\| 'br'\| 'left'\| 'lt'\| 'lb'\| 'right'\| 'rt'\| 'rb'`|`-`|-|
|disabled|是否禁用|`boolean`|`-`|-|
|min|滑动范围最小值|`number`|`0`|-|
|max|滑动范围最大值|`number`|`100`|-|
|range|是否是范围选择|`boolean \| { draggableBar: boolean }`|`-`|2.14.0|
|step|步长|`number`|`1`|-|
|showTicks|是否显示步长刻度线|`boolean`|`-`|-|
|marks|标签。是一个对象。key 为在[min, max]内的整数。|`Record<number, ReactNode>`|`-`|-|
|getIntervalConfig|针对区间配置，返回区间步长和相对于整个滑动轴的宽度比例(如 0.5 或 "50%")。**只在`marks`场景下生效**|`(range: number[],index: number) => { step?: number; width?: number \| string }`|`-`|2.30.0|
|onlyMarkValue|只能选择标签值，此时step将会被忽略|`boolean`|`-`|-|
|defaultValue|默认值|`number \| number[]`|`-`|-|
|value|值|`number \| number[]`|`-`|-|
|vertical|是否竖直方向|`boolean`|`-`|-|
|showInput|是否展示输入框，`onlyMarkValue` 为 `true` 时输入框始终隐藏。可接受 `InputNumber` 的 `props`。|`boolean \| InputNumberProps \| InputNumberProps[]`|`-`|`InputNumberProps` in `2.32.0`|
|getTooltipContainer|设置 `tooltip` 所插入的父元素|`() => Element`|`-`|-|
|formatTooltip|格式化 `tooltip` 内容|`(value: number) => string \| ReactNode`|`-`|-|
|reverse|反向坐标轴|`boolean`|`-`|-|
|onAfterChange|触发时机在 `mouseup`，参数是当前值|`(val: number \| number[]) => void`|`-`|2.20.0|
|onChange|选择值变化时触发|`(val: number \| number[]) => void`|`-`|-|
