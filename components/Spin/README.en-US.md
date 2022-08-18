`````
Component / Feedback

# Spin

Used for the loading state of pages. When part of the page is waiting for asynchronous data or is in the rendering process, appropriate loading amimation will effectively alleviate user anxiety.
`````

%%Content%%

## API

### Spin

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|block|Whether it is a block-level element|boolean |`-`|2.29.0|
|dot|Whether to use dot type animation|boolean |`-`|-|
|loading|Whether is loading status (Only works when `Spin` has children))|boolean |`-`|-|
|delay|Specifies a delay(ms) for loading state|number |`-`|-|
|size|The size of loading icon|number |`-`|-|
|element|Customize element which won't be rotated automatically, such as image/gif.|ReactNode |`-`|-|
|icon|Customize icon which will be rotated automatically.|ReactNode |`-`|-|
|tip|Customize description content when Spin has children|string \| ReactNode |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
