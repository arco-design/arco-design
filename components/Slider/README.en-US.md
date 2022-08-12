`````
Component / Data Entry

# Slider

A Slider component for displaying current value and intervals in range.
`````

%%Content%%

## API

### Slider

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|disabled|Whether to disable the component|boolean |`-`|-|
|onlyMarkValue|Whether only the mark value can be selected|boolean |`-`|-|
|reverse|Reverse axis, default `true` in `rtl`|boolean |`-`|-|
|showTicks|Whether to display step tick marks|boolean |`-`|-|
|tooltipVisible|If true, `Tooltip` will show always, or it will hidden anyway,even if dragging or hovering|boolean |`-`|-|
|vertical|Whether to display the slider in the vertical direction|boolean |`-`|-|
|max|Maximum value of sliding range|number |`100`|-|
|min|Minimum value of sliding range|number |`0`|-|
|step|Slide the value of one step|number |`1`|-|
|tooltipPosition|The position of the tooltip|\| 'top'\| 'tl'\| 'tr'\| 'bottom'\| 'bl'\| 'br'\| 'left'\| 'lt'\| 'lb'\| 'right'\| 'rt'\| 'rb' |`-`|-|
|formatTooltip|Format the content of `tooltip`|(value: number) => string \| ReactNode |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|defaultValue|To set default value|number \| number[] |`-`|-|
|marks|The labels on the render ruler. `marks` is an Object, it's `key` is an integer within [min, max].|Record&lt;number, ReactNode&gt; |`-`|-|
|range|Whether to allow range selection|boolean \| { draggableBar: boolean } |`-`|2.14.0|
|showInput|Whether to display the input box. If `onlyMarkValue` is `true`, the input box will always be hidden. Accepts `props` for `InputNumber`.|boolean \| [InputNumberProps](input-number#inputnumber) \| [InputNumberProps](input-number#inputnumber)[] |`-`|`InputNumberProps` in `2.32.0`|
|style|Additional style|CSSProperties |`-`|-|
|value|To set value|number \| number[] |`-`|-|
|getIntervalConfig|For interval configuration, returns the interval step size and the ratio of the width relative to the entire sliding axis (e.g. 0.5 or "50%"). **Only valid in `marks` scene**|(range: number[],index: number) => { step?: number; width?: number \| string } |`-`|2.30.0|
|getTooltipContainer|The parent node which the `tooltip` will be rendered to|() => Element |`-`|-|
|onAfterChange|Callback when `onmouseup` is fired|(val: number \| number[]) => void |`-`|2.20.0|
|onChange|Callback when the user changed the slider's value|(val: number \| number[]) => void |`-`|-|
