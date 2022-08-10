`````
Component / Other

# Affix

Pin the elements to the visible range. When the content area is relatively long and the page needs to scroll, the Affix can fix the element on the screen. Often used for side menu and button group.
`````

%%Content%%

## API

### Affix

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|offsetBottom|Offset from the bottom of the viewport (in pixels)|number |`-`|-|
|offsetTop|Offset from the top of the viewport (in pixels)|number |`0`|-|
|affixClassName|ClassName of the fixed element.|string \| string[] |`-`|2.8.0|
|affixStyle|Style of the fixed elements. Don't set `position` `top` `width` `height` attributes as they are used for positioning when the element is fixed.|CSSProperties |`-`|2.8.0|
|className|Additional css class|string \| string[] |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
|onChange|Callback fired when Affix state is changed|(affixed: boolean) => void |`-`|-|
|target|Specifies the scrollable area DOM Element|() => HTMLElement \| null \| Window |`() => window`|-|
|targetContainer|Outer scrollable DOM element of `target`. `Affix` will listen to the container's scroll event and update the its position correspondingly.It's to solve the problem that Affix may escape the container when the container is not `window`.|() => HTMLElement \| null \| Window |`-`|-|
