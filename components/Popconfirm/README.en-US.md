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
|autoFocus|Whether to automatically focus the first focusable element in the confirmation box|boolean |`-`|-|
|defaultPopupVisible|Whether the confirmation box is visible by default|boolean |`-`|-|
|disabled|whether to disabled|boolean |`-`|2.11.0|
|focusLock|Whether to lock the focus in the confirmation box|boolean |`-`|-|
|popupVisible|Whether the confirmation box is visible|boolean |`-`|-|
|unmountOnExit|Whether to destroy the confirmation box when hidden|boolean |`true`|-|
|okType|The type of the ok button|ButtonProps['type'] |`primary`|-|
|position|The position of the confirmation box relative to the target.|\| 'top'\| 'tl'\| 'tr'\| 'bottom'\| 'bl'\| 'br'\| 'left'\| 'lt'\| 'lb'\| 'right'\| 'rt'\| 'rb' |`top`|-|
|trigger|Trigger mode|[TriggerProps](trigger#trigger)['trigger'] |`click`|-|
|cancelText|The text of the cancel button|ReactNode |`-`|-|
|icon|Customize icon of the confirmation box|ReactNode |`<IconExclamationCircleFill />`|-|
|okText|The text of the ok button|ReactNode |`-`|-|
|cancelButtonProps|The props of the cancel button|ButtonProps |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|okButtonProps|The props of the ok button|ButtonProps |`-`|-|
|onOk|Callback when click the ok button. Callback `event` params is supported in `2.29.0`|(e: React.MouseEvent) =&gt; Promise&lt;any&gt; \| void |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
|triggerProps|The Props of the `Trigger` component|Partial&lt;[TriggerProps](trigger#trigger)&gt; |`-`|-|
|content|Content of PopconfirmFunction types are supported in `2.48.0`|ReactNode \| (() => ReactNode) |`-`|2.44.0|
|getPopupContainer|The parent node which the confirmation box will be rendered to.|(node: HTMLElement) => Element |`-`|-|
|onCancel|Callback when click the cancel button. Callback `event` params is supported in `2.29.0`|(e: React.MouseEvent) => void |`-`|-|
|onVisibleChange|Callback when the visibility of the confirmation box is changed|(visible: boolean) => void |`-`|-|
|title|Title of Popconfirm. Function types are supported in `2.48.0`|ReactNode \| (() => ReactNode) |`-`|-|
