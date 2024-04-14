`````
Component / Feedback

# Watermark

Watermark component. `2.56.0` supported

`````

%%Content%%

## API

### Watermark

2.56.0

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|rotate|Single watermark rotation angle|number |`-20`|
|image|Watermark image source has higher priority than text content|string |`-`|
|className|Additional css class|string \| string[] |`-`|
|content|The text content of the watermark|string \| string[] |`-`|
|fontStyle|Watermark text style|{color?: string;fontFamily?: string;fontSize?: number \| string;fontWeight?: number \| string;} |`{color:`rgba(0, 0, 0, 0.12)`, fontFamily: `sans-serif`, fontSize: `14px`, fontWeight: `normal` }`|
|gap|spacing between watermarks|[number, number] |`[100, 100]`|
|height|The height of a single watermark|number \| string |`-`|
|offset|The offset of the watermark relative to the `container` container.|[number, number] |`[`gaps[0] / 2`, `gaps[1] / 2`]`|
|style|Additional style|CSSProperties |`-`|
|width|The width of a single watermark. The default is 100 for `image` and the text width for content.|number \| string |`-`|
|zIndex|zIndex|string \| number |`-`|
|getContainer|The container `wrapper` that adds a watermark will display the watermark `dom` as the first child node of the `container`.|() => HTMLElement |`-`|
