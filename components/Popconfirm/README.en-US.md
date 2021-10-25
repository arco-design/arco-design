`````
Component / Data Feedback

# Popconfirm

A simple confirmation box of an action.
`````

%%Content%%

## API

### Popconfirm

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|getPopupContainer|The parent node which the confirmation box will be rendered to.|`(node: HTMLElement) => Element`|`-`|-|
|position|The position of the confirmation box relative to the target.|`\| 'top'\| 'tl'\| 'tr'\| 'bottom'\| 'bl'\| 'br'\| 'left'\| 'lt'\| 'lb'\| 'right'\| 'rt'\| 'rb'`|`top`|-|
|title|Title of Popconfirm|`ReactNode`|`-`|-|
|disabled|whether to disabled|`boolean`|`-`|2.11.0|
|cancelText|The text of the cancel button|`string`|`-`|-|
|okText|The text of the ok button|`string`|`-`|-|
|okType|The type of the ok button|`ButtonProps['type']`|`primary`|-|
|okButtonProps|The props of the ok button|`ButtonProps`|`-`|-|
|cancelButtonProps|The props of the cancel button|`ButtonProps`|`-`|-|
|onOk|Callback when click the ok button|`() => void`|`-`|-|
|onCancel|Callback when click the cancel button|`() => void`|`-`|-|
|defaultPopupVisible|Whether the confirmation box is visible by default|`boolean`|`-`|-|
|popupVisible|Whether the confirmation box is visible|`boolean`|`-`|-|
|onVisibleChange|Callback when the visibility of the confirmation box is changed|`(visible: boolean) => void`|`-`|-|
|icon|Customize icon of the confirmation box|`ReactNode`|`<IconExclamationCircleFill />`|-|
|unmountOnExit|Whether to destroy the confirmation box when hidden|`boolean`|`true`|-|
|trigger|Trigger mode|`TriggerProps['trigger']`|`click`|-|
|triggerProps|The Props of the `Trigger` component|`Partial<TriggerProps>`|`-`|-|
|autoFocus|Whether to automatically focus the first focusable element in the confirmation box|`boolean`|`-`|-|
|focusLock|Whether to lock the focus in the confirmation box|`boolean`|`-`|-|
