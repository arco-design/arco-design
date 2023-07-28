`````
Component / Data Display

# Descriptions

Generally used to display information on the detail page.
`````

%%Content%%

## API

### Descriptions

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|border|Whether to display the border|boolean |`-`|-|
|layout|Layout arrangement|'horizontal' \| 'vertical' \| 'inline-horizontal' \| 'inline-vertical' |`horizontal`|-|
|size|Size of the list|'mini' \| 'small' \| 'medium' \| 'default' \| 'large' |`-`|-|
|tableLayout|The `layout-fixed` of the table style in the description. The width will be evenly distributed when it's set to `fixed`.|'auto' \| 'fixed' |`auto`|2.6.0|
|colon|The content displayed after the label text, generally configured as `:`|ReactNode |`-`|-|
|title|Title of the description|ReactNode |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|column|Number of data columns in a row, with one data counted as one column. Can be set with a number or object.Use object format such as `{ xs: 1, md: 2, lg: 3 }` for responsive arrangement|\| number\| {xs?: number;sm?: number;md?: number;lg?: number;xl?: number;xxl?: number;xxxl?: number;} |`3`|-|
|data|Data of the description|[DataType](#datatype) |`-`|-|
|labelStyle|Style of label|CSSProperties |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
|valueStyle|Style of value|CSSProperties |`-`|-|

### DataType

```js
export type DataType = {
  key?: React.Key;
  label?: ReactNode;
  value?: ReactNode;
  span?: number;
}[];
```
