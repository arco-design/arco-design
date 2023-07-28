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
|affix|Whether to wrap anchor within [Affix](/react/components/affix)|boolean |`true`|-|
|animation|Whether to enable smooth scrolling|boolean |`true`|-|
|hash|Whether to change the URL hash|boolean |`true`|-|
|lineless|Whether to hide axis line of the left|boolean |`-`|-|
|offsetBottom|Offset from the bottom of the viewport (in pixels). i.e. `Affix`'s `offsetBottom` props|number |`-`|-|
|offsetTop|Offset from the top of the viewport (in pixels). i.e. `Affix`'s `offsetTop` props|number |`-`|-|
|targetOffset|The offset of the baseline relative to the top of the container.The value is half of the height of the scrolling container if not specified.The status of the anchor will be updated when the anchor reaches or leaves the baseline.|number |`-`|2.22.0|
|boundary|Scrolling boundary.For number values, the target element stops scrolling when reaches the bounding distance.For `end`, `start`, `center`, the target scrolls to the bottom, top, and center of the container.|number \| 'end' \| 'start' \| 'center' \| 'nearest' |`start`|-|
|direction|Direction|'vertical' \| 'horizontal' |`vertical`|2.51.0|
|affixStyle|The style to be applied to `Affix`|CSSProperties |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|scrollContainer|Scrolling container. Pass in selector or DOM Element|string \| HTMLElement \| Window |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
|onChange|Callback fired when anchor state changes|(newLink: string, oldLink: string) => void |`-`|-|
|onSelect|Callback fired when anchor is clicked|(newLink: string, oldLink: string) => void |`-`|-|

### Anchor.Link

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|href|The target that the hyperlink points to|string |`#`|
|title|The content of the hyperlink|string \| ReactNode |`-`|
|className|Additional css class|string \| string[] |`-`|
|style|Additional style|CSSProperties |`-`|
