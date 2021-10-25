`````
Component / Feedback

# Spin

Used for the loading state of pages. When part of the page is waiting for asynchronous data or is in the rendering process, appropriate loading amimation will effectively alleviate user anxiety.
`````

%%Content%%

## API

### Spin

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|
|className|Additional css class|`string \| string[]`|`-`|
|loading|Whether is loading status|`boolean`|`-`|
|size|The size of loading icon|`number`|`-`|
|icon|Customize icon which will be rotated automatically.|`ReactNode`|`-`|
|element|Customize element which won't be rotated automatically, such as image/gif.|`ReactNode`|`-`|
|tip|Customize description content when Spin has children|`string \| ReactNode`|`-`|
|delay|Specifies a delay(ms) for loading state|`number`|`-`|
|dot|Whether to use dot type animation|`boolean`|`-`|
