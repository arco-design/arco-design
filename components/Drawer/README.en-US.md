`````
Component / Feedback

# Drawer

A floating layer that slides in from the edge of the screen.
`````

%%Content%%

## API

### Drawer

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|wrapClassName|The additional class name of the container of the drawer dialog|`string \| string[]`|`-`|-|
|title|The title element. Drawer will not render the title element when `title` is `null`|`ReactNode`|`-`|-|
|footer|The footer element. Drawer will not render the footer element when `footer` is `null`|`ReactNode`|`-`|-|
|headerStyle|The additional css style for header|`CSSProperties`|`-`|2.9.0|
|bodyStyle|The additional css style for content|`CSSProperties`|`-`|2.9.0|
|maskStyle|Style of the drawer mask|`CSSProperties`|`-`|-|
|okText|Text of the OK button|`string`|`-`|-|
|cancelText|Text of the Cancel button|`string`|`-`|-|
|placement|The placement of the drawer: `top` `right` `bottom` `left`|`string`|`right`|-|
|width|The width of the drawer dialog. Only works when `placement` is `left` or `right`|`string \| number`|`250`|-|
|height|The height of the drawer dialog. Only works when `placement` is `top` or `bottom`|`string \| number`|`250`|-|
|escToExit|Whether to enable pressing `ESC` to close the drawer.|`boolean`|`true`|2.10.0|
|mask|Whether to show mask|`boolean`|`true`|-|
|visible|Visibility of the drawer|`boolean`|`-`|-|
|closable|Whether to show the close button on top-right of the drawer dialog|`boolean`|`true`|-|
|maskClosable|Whether to close the drawer when the mask is clicked|`boolean`|`true`|-|
|confirmLoading|Whether the OK button is in loading state|`boolean`|`-`|-|
|mountOnEnter|Whether to render the drawer component only when it is opened initially.|`boolean`|`true`|-|
|unmountOnExit|Whether to unmount component when hidden|`boolean`|`-`|-|
|onOk|Callback when the OK button is clicked|`() => void`|`-`|-|
|onCancel|Callback when the Cancel button is clicked|`() => void`|`-`|-|
|afterOpen|Callback when drawer is opened|`() => void`|`-`|-|
|afterClose|Callback when drawer is closed|`() => void`|`-`|-|
|getPopupContainer|Parent node which the drawer should be rendered to.|`() => Element`|`() => document.body`|-|
|getChildrenPopupContainer|Set the mount node for popup such as `Select`, `Tooltip`, etc. Default to the drawer dialog.|`(node: HTMLElement) => Element`|`-`|-|
|autoFocus|Whether to focus on the first focusable element by default. Only works when `focusLock` is turned on.|`boolean`|`-`|2.13.0|
|focusLock|Whether to lock the focus in the drawer box.|`boolean`|`-`|2.13.0|
