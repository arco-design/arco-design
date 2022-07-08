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
|allowClear|Whether to allow clear when click again|boolean |`-`|
|allowHalf|Whether to allow half selection|boolean |`-`|
|disabled|Whether is disabled|boolean |`-`|
|grading|Whether to show score with smiley icon|boolean |`-`|
|readonly|Whether is readonly|boolean |`-`|
|count|Star count|number |`5`|
|defaultValue|To set default value|number |`-`|
|value|To set value|number |`-`|
|className|Additional css class|string \| string[] |`-`|
|style|Additional style|CSSProperties |`-`|
|tooltips|Customize tooltip by each character|string[] |`-`|
|character|The custom character of rate|ReactNode \| ((index: number) => ReactNode) |`<IconStarFill />`|
|onChange|Callback when score is changed|(value: number) => void |`-`|
|onHoverChange|Callback when the score user hovered is changed|(value: number) => void |`-`|
