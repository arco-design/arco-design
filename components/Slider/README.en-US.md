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
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|tooltipVisible|If true, `Tooltip` will show always, or it will hidden anyway,even if dragging or hovering|`boolean`|`-`|-|
|tooltipPosition|The position of the tooltip|`\| 'top'\| 'tl'\| 'tr'\| 'bottom'\| 'bl'\| 'br'\| 'left'\| 'lt'\| 'lb'\| 'right'\| 'rt'\| 'rb'`|`-`|-|
|disabled|Whether to disable the component|`boolean`|`-`|-|
|min|Minimum value of sliding range|`number`|`0`|-|
|max|Maximum value of sliding range|`number`|`100`|-|
|range|Whether to allow range selection|`boolean \| { draggableBar: boolean }`|`-`|2.14.0|
|step|Slide the value of one step|`number`|`1`|-|
|showTicks|Whether to display step tick marks|`boolean`|`-`|-|
|marks|The labels on the render ruler. `marks` is an Object, it's `key` is an integer within [min, max].|`object`|`-`|-|
|onlyMarkValue|Whether only the mark value can be selected|`boolean`|`-`|-|
|defaultValue|To set default value|`number \| number[]`|`-`|-|
|value|To set value|`number \| number[]`|`-`|-|
|vertical|Whether to display the slider in the vertical direction|`boolean`|`-`|-|
|showInput|Whether to display the input box. If `onlyMarkValue` is `true`, the input box will always be hidden.|`boolean`|`-`|-|
|getTooltipContainer|The parent node which the `tooltip` will be rendered to|`() => Element`|`-`|-|
|formatTooltip|Format the content of `tooltip`|`(value: number) => string \| ReactNode`|`-`|-|
|reverse|Reverse axis|`boolean`|`-`|-|
|onAfterChange|Callback when `onmouseup` is fired|`(val: number \| number[]) => void`|`-`|2.20.0|
|onChange|Callback when the user changed the slider's value|`(val: number \| number[]) => void`|`-`|-|
