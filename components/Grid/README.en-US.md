`````
Component / Layout

# Grid

Grid can effectively ensure the consistency and logic of the page, strengthen teamwork and unity.
`````

%%Content%%

## API

### Row

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|div|If true, `<Row>` and `<Col>` will be treated as a div without any Grid related classes and styles|boolean |`-`|-|
|align|Vertical alignment, same as css `align-items`|'start' \| 'center' \| 'end' \| 'stretch' |`start`|-|
|justify|Horizontal alignment, same as css `justify-content`|'start' \| 'center' \| 'end' \| 'space-around' \| 'space-between' |`start`|-|
|className|Additional css class|string \| string[] |`-`|-|
|gutter|Spacing between grids, could be a number or a object like { xs: 8, sm: 16, md: 24}.Or you can use array to make horizontal and vertical spacing work at the same time [horizontal, vertical]|[GridRowGutter](#gridrowgutter) \| Array&lt;[GridRowGutter](#gridrowgutter)&gt; |`0`|vertical gutter in 2.5.0|
|style|Additional style|CSSProperties |`-`|-|

### Col

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|offset|The number of cells to offset Col from the left|number |`-`|-|
|order|Raster order|number |`-`|-|
|pull|Raster order|number |`-`|2.20.0|
|push|Raster order|number |`-`|2.20.0|
|span|Raster number of cells to occupy|number |`24`|-|
|className|Additional css class|string \| string[] |`-`|-|
|flex|Set flex layout properties|[FlexType](#flextype) |`-`|2.26.0|
|lg|`screen >= 992px`|number \| { [key: string]: any } |`-`|-|
|md|`screen >= 768px`|number \| { [key: string]: any } |`-`|-|
|sm|`screen >= 576px`|number \| { [key: string]: any } |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
|xl|`screen >= 1200px`|number \| { [key: string]: any } |`-`|-|
|xs|`screen < 576px`|number \| { [key: string]: any } |`-`|-|
|xxl|`screen >= 1600px`|number \| { [key: string]: any } |`-`|-|
|xxxl|`screen >= 2000px`|number \| { [key: string]: any } |`-`|2.40.0|

### Grid

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|collapsed|Whether to collapsed|boolean |`false`|
|collapsedRows|Number of rows displayed when collapsed|number |`1`|
|className|Additional css class|string \| string[] |`-`|
|colGap|The space in column-to-column|number \| [ResponsiveValue](grid#responsivevalue) |`0`|
|cols|Number of columns displayed in each row|number \| [ResponsiveValue](grid#responsivevalue) |`24`|
|rowGap|The space in row-to-row|number \| [ResponsiveValue](grid#responsivevalue) |`0`|
|style|Additional style|CSSProperties |`-`|

### GridItem

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|suffix|Is it a suffix element|boolean |`false`|
|className|Additional css class|string \| string[] |`-`|
|offset|Number of grids on the left|number \| [ResponsiveValue](grid#responsivevalue) |`0`|
|span|Number of grids spanned|number \| [ResponsiveValue](grid#responsivevalue) |`1`|
|style|Additional style|CSSProperties |`-`|

### ResponsiveValue

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|lg|>= 992px responsive configuration|number |`-`|
|md|>= 768px responsive configuration|number |`-`|
|sm|>= 576px responsive configuration|number |`-`|
|xl|>= 1200px responsive configuration|number |`-`|
|xs|< 576px responsive configuration|number |`-`|
|xxl|>= 1600px responsive configuration|number |`-`|
|xxxl|`screen >= 2000px`|number |`-`|

### GridRowGutter

```js
export type GridRowGutter =
  | number
  | Partial<Record<GridResponsiveBreakpoint, number>>;
```

### FlexType

```js
export type FlexType = string | number | "auto" | "none";
```
