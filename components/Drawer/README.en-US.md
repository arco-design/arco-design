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
|autoFocus|Whether to focus on the first focusable element by default. Only works when `focusLock` is turned on.|boolean |`true`|2.13.0|
|closable|Whether to show the close button on top-right of the drawer dialog|boolean |`true`|-|
|confirmLoading|Whether the OK button is in loading state|boolean |`-`|-|
|escToExit|Whether to enable pressing `ESC` to close the drawer.|boolean |`true`|2.10.0|
|focusLock|Whether to lock the focus in the drawer box.|boolean |`true`|2.13.0|
|mask|Whether to show mask|boolean |`true`|-|
|maskClosable|Whether to close the drawer when the mask is clicked|boolean |`true`|-|
|mountOnEnter|Whether to render the drawer component only when it is opened initially.|boolean |`true`|-|
|unmountOnExit|Whether to unmount component when hidden|boolean |`-`|-|
|visible|Visibility of the drawer|boolean |`-`|-|
|zIndex|Set the zIndex of the drawer|number |`-`|2.42.0|
|placement|The placement of the drawer: `top` `right` `bottom` `left`|'top' \| 'right' \| 'bottom' \| 'left' |`right`|-|
|cancelText|Text of the Cancel button|ReactNode |`-`|-|
|closeIcon|Custom the close button on top-right of the drawer dialog|ReactNode |`-`|2.49.0|
|footer|The footer element. Drawer will not render the footer element when `footer` is `null`|ReactNode |`-`|-|
|okText|Text of the OK button|ReactNode |`-`|-|
|title|The title element. Drawer will not render the title element when `title` is `null`|ReactNode |`-`|-|
|bodyStyle|The additional css style for content|CSSProperties |`-`|2.9.0|
|cancelButtonProps|The props of `cancel` button|ButtonProps |`-`|2.26.0|
|className|Additional css class|string \| string[] |`-`|-|
|headerStyle|The additional css style for header|CSSProperties |`-`|2.9.0|
|height|The height of the drawer dialog. Only works when `placement` is `top` or `bottom`|string \| number |`250`|-|
|maskStyle|Style of the drawer mask|CSSProperties |`-`|-|
|okButtonProps|The props of `ok` button|ButtonProps |`-`|2.26.0|
|style|Additional style|CSSProperties |`-`|-|
|width|The width of the drawer dialog. Only works when `placement` is `left` or `right`|string \| number |`250`|-|
|wrapClassName|The additional class name of the container of the drawer dialog|string \| string[] |`-`|-|
|afterClose|Callback when drawer is closed|() => void |`-`|-|
|afterOpen|Callback when drawer is opened|() => void |`-`|-|
|getChildrenPopupContainer|Set the mount node for popup such as `Select`, `Tooltip`, etc. Default to the drawer dialog.|(node: HTMLElement) => Element |`-`|-|
|getPopupContainer|Parent node which the drawer should be rendered to.|() => Element |`() => document.body`|-|
|onCancel|Callback when the Cancel button is clicked|(e: MouseEvent \| Event) => void |`-`|-|
|onOk|Callback when the OK button is clicked|(e: Event) => void |`-`|-|
