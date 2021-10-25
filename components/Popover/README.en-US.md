`````
Component / Data Display

# Popover

A floating card popped by hovering, focusing, or clicking on a element.
`````

%%Content%%

## API

### Popover

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|title|Title of the popup card|`ReactNode`|`-`|-|
|disabled|Whether to disabled|`boolean`|`-`|2.11.0|
|triggerProps|The Props of the `Trigger` component|`Partial<TriggerProps>`|`-`|-|
|getPopupContainer|The parent node which the popup will be rendered to.|`(node: HTMLElement) => Element`|`-`|-|
|color|background color of the popup-layer|`string`|`-`|2.22.0|
|position|The position of the popup relative to the target.|`\| 'top'\| 'tl'\| 'tr'\| 'bottom'\| 'bl'\| 'br'\| 'left'\| 'lt'\| 'lb'\| 'right'\| 'rt'\| 'rb'`|`top`|-|
|popupVisible|Whether the popup is visible|`boolean`|`-`|-|
|unmountOnExit|Whether to destroy the popup when hidden|`boolean`|`true`|-|
|onVisibleChange|Callback when the visibility of the popup is changed|`(visible: boolean) => void`|`-`|-|
|trigger|Trigger mode|`TriggerProps['trigger']`|`hover`|-|
|content|The content shown in popup|`ReactNode`|`-`|-|
|defaultPopupVisible|Whether the popup is visible by default|`boolean`|`-`|-|
|popupHoverStay|Whether the popup is visible when the mouse hovers over the popup|`boolean`|`true`|-|
|blurToHide|Whether close the popup when the target element losing focus|`boolean`|`true`|-|
|childrenPrefix|Set an additional class name(`${childrenPrefix}-open`) for the container of the popup.|`string`|`-`|-|
