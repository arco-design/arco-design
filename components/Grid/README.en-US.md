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
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|gutter|Spacing between grids, could be a number or a object like { xs: 8, sm: 16, md: 24}.Or you can use array to make horizontal and vertical spacing work at the same time [horizontal, vertical]|`GridRowGutter \| Array<GridRowGutter>`|`0`|vertical gutter in 2.5.0|
|div|If true, `<Row>` and `<Col>` will be treated as a div without any Grid related classes and styles|`boolean`|`-`|-|
|align|Vertical alignment, same as css `align-items`|`'start' \| 'center' \| 'end' \| 'stretch'`|`start`|-|
|justify|Horizontal alignment, same as css `justify-content`|`'start' \| 'center' \| 'end' \| 'space-around' \| 'space-between'`|`start`|-|

### Col

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|span|Raster number of cells to occupy|`number`|`24`|-|
|offset|The number of cells to offset Col from the left|`number`|`-`|-|
|order|Raster order|`number`|`-`|-|
|push|Raster order|`number`|`-`|2.20.0|
|pull|Raster order|`number`|`-`|2.20.0|
|xs|`screen < 576px`|`number \| { [key: string]: any }`|`-`|-|
|sm|`screen >= 576px`|`number \| { [key: string]: any }`|`-`|-|
|md|`screen >= 768px`|`number \| { [key: string]: any }`|`-`|-|
|lg|`screen >= 992px`|`number \| { [key: string]: any }`|`-`|-|
|xl|`screen >= 1200px`|`number \| { [key: string]: any }`|`-`|-|
|xxl|`screen >= 1600px`|`number \| { [key: string]: any }`|`-`|-|
