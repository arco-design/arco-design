`````
组件 / 数据展示

# 数值显示 Statistic

突出展示某个或某组数字、带描述的统计类数据。
`````

%%Content%%

## API
### Statistic

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|countUp|数字动态变大|boolean |`-`|-|
|groupSeparator|显示千位分割符|boolean |`-`|-|
|loading|数字是否加载中|boolean |`-`|2.20.0|
|countDuration|动态变大的过渡时间 (ms)|number |`2000`|-|
|countFrom|从什么数字开始动态变大|number |`0`|-|
|precision|数字精度|number |`-`|-|
|format|[dayjs](https://github.com/iamkun/dayjs)'s format|string |`-`|-|
|renderFormat|自定义 render 函数。`formattedValue` 表示格式化后的值。|(value: [StatisticProps](statistic#statistic)['value'], formattedValue: string) => ReactNode |`-`|2.36.0|
|extra|在数值下展示额外内容|ReactNode |`-`|-|
|prefix|前缀|string \| ReactNode |`-`|-|
|suffix|后缀|string \| ReactNode |`-`|-|
|title|数值的标题|string \| ReactNode |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|styleDecimal|数值小数部分的样式|CSSProperties |`-`|2.47.0|
|styleValue|数值的样式|CSSProperties |`-`|-|
|value|数值|string \| number \| Dayjs |`-`|-|

### Statistic.Countdown

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|start|是否开始倒计时，默认为 `true`，可以通过设置该值控制倒计时的时机|boolean |`true`|-|
|format|[dayjs](https://github.com/iamkun/dayjs)'s format|string |`HH:mm:ss`|-|
|title|数值的标题|string \| ReactNode |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|now|用于修正初始化时间显示不正确|number \| string \| Date \| Dayjs |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|styleValue|数值的样式|CSSProperties |`-`|-|
|value|倒计时的时间|number \| string \| Date \| Dayjs |`-`|-|
|onFinish|倒计时完成后触发的回调|() => void |`-`|-|
|renderFormat|自定义 render 函数。`valueDiff` 表示两个时间的时间差，`formattedDiff` 表示格式化后的时间差，|(valueDiff: number, formattedDiff: string) => ReactNode |`-`|2.36.0|
