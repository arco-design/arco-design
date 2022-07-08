`````
Component / General

# Button

A button is a command component to trigger an operation.
`````

%%Content%%

## API

### Button

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|disabled|Whether to disable the button|boolean |`-`|
|iconOnly|Whether to show icon only, in which case the button width and height are equal. If `icon` is specified and there are no children, `iconOnly` defaults to `true`|boolean |`-`|
|loading|Whether the button is in the loading state|boolean |`-`|
|loadingFixedWidth|The width of the button remains unchanged on loading|boolean |`-`|
|long|Whether the width of the button should adapt to the container.|boolean |`-`|
|href|The button behaves like `<a>` with href as target url.|string |`-`|
|target|The target attribute of the link, which takes effect when href exists.|string |`-`|
|htmlType|html button type|'button' \| 'submit' \| 'reset' |`button`|
|shape|Three button shapes are available: `circle`, `round` and `square`|'circle' \| 'round' \| 'square' |`square`|
|size|Size of the button|'mini' \| 'small' \| 'default' \| 'large' |`default`|
|status|Status of the button|'warning' \| 'danger' \| 'success' \| 'default' |`default`|
|type|A variety of button types are available: `primary`, `secondary`, `dashed`,`text`, `linear` and `default` which is the secondary.|'default' \| 'primary' \| 'secondary' \| 'dashed' \| 'text' \| 'outline' |`default`|
|icon|Icon of the button|ReactNode |`-`|
|anchorProps|The native attribute of the link, which takes effect when href exists|HTMLProps&lt;HTMLAnchorElement&gt; |`-`|
|className|Additional css class|string \| string[] |`-`|
|style|Additional style|CSSProperties |`-`|
|onClick|Callback fired when the button is clicked|(e: Event) => void |`-`|
