`````
Component / Other

# Anchor

By the Anchor can quickly find the information content of the current page.
`````

%%Content%%

## API

### Anchor

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|className|Additional css class|`string \| string[]`|`-`|-|
|style|Additional style|`CSSProperties`|`-`|-|
|animation|Whether to enable smooth scrolling|`boolean`|`true`|-|
|scrollContainer|Scrolling container. Pass in selector or DOM Element|`string \| HTMLElement \| Window`|`-`|-|
|boundary|Scrolling boundary.For number values, the target element stops scrolling when reaches the bounding distance.For `end`, `start`, `center`, the target scrolls to the bottom, top, and center of the container.|`number \| 'end' \| 'start' \| 'center' \| 'nearest'`|`start`|-|
|hash|Whether to change the URL hash|`boolean`|`true`|-|
|affix|Whether to wrap anchor within [Affix](/react/components/affix)|`boolean`|`true`|-|
|affixStyle|The style to be applied to `Affix`|`CSSProperties`|`-`|-|
|offsetTop|Offset from the top of the viewport (in pixels). i.e. `Affix`'s `offsetTop` props|`number`|`-`|-|
|offsetBottom|Offset from the bottom of the viewport (in pixels). i.e. `Affix`'s `offsetBottom` props|`number`|`-`|-|
|onChange|Callback fired when anchor state changes|`(newLink: string, oldLink: string) => void`|`-`|-|
|onSelect|Callback fired when anchor is clicked|`(newLink: string, oldLink: string) => void`|`-`|-|
|lineless|Whether to hide axis line of the left|`boolean`|`-`|-|
|targetOffset|The offset of the baseline relative to the top of the container.The value is half of the height of the scrolling container if not specified.The status of the anchor will be updated when the anchor reaches or leaves the baseline.|`number`|`-`|2.22.0|

### Anchor.Link

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|className|Additional css class|`string \| string[]`|`-`|
|style|Additional style|`CSSProperties`|`-`|
|href|The target that the hyperlink points to|`string`|`#`|
|title|The content of the hyperlink|`string \| React.ReactNode`|`-`|
