`````
组件 / 数据输入

# 颜色选择器 ColorPicker

用于选择和展示颜色
`````

%%Content%%

## API
### ColorPicker

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|defaultPopupVisible|默认弹出框是打开还是关闭|boolean |`-`|-|
|disabled|禁用|boolean |`-`|-|
|disabledAlpha|禁用透明通道|boolean |`-`|-|
|popupVisible|弹出框是打开还是关闭。(受控)|boolean |`-`|-|
|showHistory|显示历史颜色|boolean |`-`|-|
|showPreset|显示预设颜色|boolean |`-`|-|
|showText|显示颜色值|boolean |`-`|-|
|unmountOnExit|隐藏后是否销毁 DOM 结构|boolean |`true`|-|
|defaultValue|默认值|string \| [GradientColor](#gradientcolor)[] |`-`|-|
|value|颜色值，受控模式|string \| [GradientColor](#gradientcolor)[] |`-`|-|
|mode|单一颜色或渐变色模式|[ColorPickerMode](#colorpickermode) \| [ColorPickerMode](#colorpickermode)[] |`single`|-|
|format|颜色值的格式|'hex' \| 'rgb' |`-`|-|
|size|输入框的尺寸|[InputProps](input#input)['size'] |`default`|-|
|className|节点类名|string \| string[] |`-`|-|
|historyColors|历史颜色的颜色数组|string[] |`-`|-|
|presetColors|预设颜色的颜色数组|string[] |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|triggerProps|可以接受所有 Trigger 组件的 Props|Partial&lt;[TriggerProps](trigger#trigger)&gt; |`-`|-|
|onChange|颜色值改变时触发|(value: string \| [GradientColor](#gradientcolor)[]) => void |`-`|-|
|onVisibleChange|下拉框收起展开时触发。|(visible: boolean) => void |`-`|-|
|renderFooter|自定义面板底部内容|() => ReactNode |`-`|2.62.0|
|triggerElement|自定义触发元素。|ReactNode \| ((params: { value: string \| [GradientColor](#gradientcolor)[] }) => ReactNode) |`-`|2.60.0|

### GradientColor

```js
export interface GradientColor {
  color: string;
  percent: number;
}
```

### ColorPickerMode

```js
export enum ColorPickerMode {
  Single = "single",
  Gradient = "gradient",
}
```
