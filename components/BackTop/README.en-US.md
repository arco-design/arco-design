`````
Component / Other

# BackTop

`BackTop` makes it easy to go back to the top of the page.
`````

%%Content%%

## API

### BackTop

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|duration|Duration to scroll to the top|number |`400`|
|visibleHeight|When scrolling to this height, display the back to top button.|number |`400`|
|easing|Scroll to the top of the easing method type, all types: [easing](https://github.com/PengJiyuan/b-tween).|string |`quartOut`|
|className|Additional css class|string \| string[] |`-`|
|style|Additional style|CSSProperties |`-`|
|onClick|Callback when you click to return to the top.|() => void |`-`|
|target|Set the element whose scroll event needs to be listened to. The value is a function that returns the corresponding `DOM` element|() => HTMLElement \| Window |`() => window`|
