`````
Component / Data Display

# Tooltip

A simple text popup tip.
`````

%%Content%%

## API

### Tooltip

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|trigger|Trigger mode|`TriggerProps['trigger']`|`hover`|-|
|content|The content shown in popup|`ReactNode`|`-`|-|
|color|background color of the popup-layer|`string`|`-`|2.22.0|
|getPopupContainer|The parent node which the popup will be rendered to.|`(node: HTMLElement) => Element`|`-`|-|
|position|The position of the popup relative to the target.|`\| 'top'\| 'tl'\| 'tr'\| 'bottom'\| 'bl'\| 'br'\| 'left'\| 'lt'\| 'lb'\| 'right'\| 'rt'\| 'rb'`|`top`|-|
|mini|Whether show mini style|`boolean`|`-`|-|
|unmountOnExit|Whether to destroy the popup when hidden|`boolean`|`true`|-|
|defaultPopupVisible|Whether the popup is visible by default|`boolean`|`-`|-|
|popupVisible|Whether the popup is visible|`boolean`|`-`|-|
|onVisibleChange|Callback when the visibility of the popup is changed|`(visible: boolean) => void`|`-`|-|
|popupHoverStay|Whether the popup is visible when the mouse hovers over the popup|`boolean`|`true`|-|
|blurToHide|Whether close the popup when the target element losing focus|`boolean`|`true`|-|
|disabled|Whether disable popup|`boolean`|`-`|-|
|triggerProps|The Props of the `Trigger` component|`Partial<TriggerProps>`|`-`|-|
|childrenPrefix|Set an additional class name(`${childrenPrefix}-open`) for the container of the popup.|`string`|`-`|-|
