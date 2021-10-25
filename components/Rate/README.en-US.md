`````
Component / Data Entry

# Rate

Rate is used for scoring.
`````

%%Content%%

## API

### Rate

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|
|className|Additional css class|`string \| string[]`|`-`|
|defaultValue|To set default value|`number`|`-`|
|character|The custom character of rate|`ReactNode \| ((index: number) => ReactNode)`|`<IconStarFill />`|
|count|Star count|`number`|`5`|
|value|To set value|`number`|`-`|
|tooltips|Customize tooltip by each character|`string[]`|`-`|
|allowHalf|Whether to allow half selection|`boolean`|`-`|
|allowClear|Whether to allow clear when click again|`boolean`|`-`|
|readonly|Whether is readonly|`boolean`|`-`|
|disabled|Whether is disabled|`boolean`|`-`|
|grading|Whether to show score with smiley icon|`boolean`|`-`|
|onChange|Callback when score is changed|`(value: number) => void`|`-`|
|onHoverChange|Callback when the score user hovered is changed|`(value: number) => void`|`-`|
