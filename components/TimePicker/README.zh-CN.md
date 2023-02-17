`````
组件 / 数据输入

# 时间选择器 TimePicker

在弹出面板上选择时间，以便捷完成时间输入的控件。
`````

%%Content%%

## API

### Picker

`TimePicker` 和 `RangePicker` 的通用属性

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|allowClear|允许清除|boolean |`true`|-|
|disableConfirm|禁用确认步骤，开启后直接点选时间不需要点击确认按钮。|boolean |`-`|2.12.0|
|disabled|是否禁用|boolean |`-`|-|
|editable|是否可手动输入|boolean |`true`|-|
|error|是否是错误状态。(废弃，下个大版本移除，使用 status='error' 替代)|boolean |`-`|-|
|hideDisabledOptions|隐藏禁止选择的选项|boolean |`-`|-|
|popupVisible|控制弹出框打开或者关闭|boolean |`-`|-|
|scrollSticky|时间列在滚动的时候自动吸附和选中|boolean |`true`|2.23.0|
|unmountOnExit|是否在关闭后销毁 dom 结构|boolean |`-`|-|
|use12Hours|12 小时制|boolean |`-`|-|
|utcOffset|设置时区偏移，如果需要 utc 时间则设置为 0。|number |`-`|-|
|format|展示日期的格式，参考[dayjs](https://github.com/iamkun/dayjs)|string |`HH:mm:ss`|-|
|timezone|设置时区, 如果设置了 `utcOffset`，则以 `utcOffset` 为准。|string |`-`|-|
|position|弹出的框的位置|'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br' |`bl`|-|
|size|输入框尺寸|'mini' \| 'small' \| 'default' \| 'large' |`-`|-|
|status|状态|'error' \| 'warning' |`-`|2.45.0|
|extra|底部附加内容|ReactNode |`-`|-|
|prefix|前缀|ReactNode |`-`|2.43.0|
|triggerElement|触发元素。|ReactNode |`-`|2.38.0|
|className|节点类名|string \| string[] |`-`|-|
|icons|用于配置图标|{ inputSuffix?: ReactNode } |`-`|-|
|placeholder|提示文案|string \| string[] |`-`|-|
|step|设置 时 / 分 / 秒 的选择间隔|{ hour?: number; minute?: number; second?: number } |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|triggerProps|可以传入 `Trigger` 组件的参数|Partial&lt;[TriggerProps](trigger#trigger)&gt; |`-`|-|
|disabledHours|禁用的部分小时选项|() => number[] |`-`|-|
|disabledMinutes|禁用的部分分钟选项|(selectedHour) => number[] |`-`|-|
|disabledSeconds|禁用的部分秒数选项|(selectedHour, selectedMinute) => number[] |`-`|-|
|getPopupContainer|弹出框挂载的父节点|(node: HTMLElement) => Element |`-`|-|
|onClear|点击清除按钮的回调|() => void |`-`|-|

### TimePicker

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|showNowBtn|是否显示选择当前时间的按钮|boolean |`true`|2.21.0|
|defaultValue|默认时间|[CalendarValue](#calendarvalue) |`-`|-|
|value|组件的值，受控模式|[CalendarValue](#calendarvalue) |`-`|-|
|onChange|选择时间时的回调|(valueString: string, value: Dayjs) => void |`-`|-|
|onSelect|组件值发生改变时的回调|(valueString: string, value: Dayjs) => void |`-`|-|

### TimePicker.RangePicker

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|order|起止时间是否自动排序|boolean |`true`|2.21.0|
|defaultValue|默认时间|[CalendarValue](#calendarvalue)[] |`-`|-|
|placeholder|提示文案|string[] |`-`|-|
|value|日历组件的值|[CalendarValue](#calendarvalue)[] |`-`|-|
|onChange|日历组件值发生改变时的回调|(valueString: string[], value: Dayjs[]) => void |`-`|-|
|onSelect|选择日期时的回调|(valueString: string[], value: Dayjs[]) => void |`-`|-|

### CalendarValue

```js
export type CalendarValue = Dayjs | Date | string | number;
```
