`````
Component / Data Display

# List

The most basic list display, which can carry text/pictures/paragraphs, and is often used in the data display page.
`````

%%Content%%

## API

### List

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|className|Additional css class|`string \| string[]`|`-`|-|
|style|Additional style|`CSSProperties`|`-`|-|
|wrapperStyle|The additional css style to wrapper element|`CSSProperties`|`-`|-|
|wrapperClassName|The additional css class to wrapper element|`string \| string[]`|`-`|-|
|dataSource|Data source for list rendering. When `children` exist, this parameter can be omitted (`dataSource` has higher priority)|`T[]`|`-`|-|
|render|Customize list item when using dataSource|`(item: T, index: number) => ReactNode`|`-`|-|
|children|Child element of List. when dataSource and render exist, do not use this parameter|`ReactNode`|`-`|-|
|size|Size of List|`'small' \| 'default' \| 'large'`|`-`|-|
|header|List header|`ReactNode`|`-`|-|
|footer|List footer|`ReactNode`|`-`|-|
|pagination|Whether to divide into pages, you can also pass in the configuration of `Pagination`|`boolean \| PaginationProps`|`-`|-|
|bordered|Whether to render border|`boolean`|`true`|-|
|split|Whether to render the split under the list item|`boolean`|`true`|-|
|grid|The grid type of list|`ListGridProps`|`-`|`column` in 2.20.0|
|loading|Whether to show a loading indicator while the contents of the list are being fetched|`boolean`|`-`|-|
|hoverable|Whether list items have hover style|`boolean`|`2.9.0`|-|
|onReachBottom|Callback when the list scroll to the bottom|`(currentPage: number) => void`|`-`|-|
|offsetBottom|The distance threshold to trigger the `onReachBottom`|`number`|`0`|-|
|defaultCurrent|To set default current page|`number`|`1`|-|
|throttleDelay|Interval of throttle for `onListScroll`|`number`|`500`|-|
|listRef|Reference to the current list|`MutableRefObject<ListHandle>`|`-`|2.20.0|
|onListScroll|Callback when list is scrolling. When onReachBottom cannot meet your usage, can customize scroll monitor function|`(elem: Element) => void`|`-`|-|
|scrollLoading|Set the content to be at the list bottom when you load data during scrolling|`string \| ReactNode`|`-`|-|
|noDataElement|Content displayed when there is no data|`ReactNode`|`-`|-|
|virtualListProps|Pass the virtual-list properties, pass in this parameter to turn on virtual scrolling|`AvailableVirtualListProps`|`-`|2.11.0|

### List.Item

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|
|className|Additional css class|`string \| string[]`|`-`|
|actions|The list operation group of list item|`ReactNode[]`|`-`|
|extra|The extra content of list item which is on the far right|`ReactNode`|`-`|
|actionLayout|The position of the list operation group. `horizontal` - right, `vertical` - below.|`'horizontal' \| 'vertical'`|`horizontal`|

### List.Item.Meta

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|className|Additional css class|`string \| string[]`|`-`|
|style|Additional style|`CSSProperties`|`-`|
|title|The title of list item|`ReactNode`|`-`|
|avatar|The avatar of list item|`ReactNode`|`-`|
|description|The description of list item|`ReactNode`|`-`|

### `<ListGridProps>`

|Property|Description|Type|Default|
|---|:---:|:---:|---:|
|gutter|Spacing between grids|`number`|`-`|
|span|Raster number of cells to occupy|`number`|`-`|
|xs|`span` for `xs`|`number`|`-`|
|sm|`span` for `sm`|`number`|`-`|
|md|`span` for `md`|`number`|`-`|
|lg|`span` for `lg`|`number`|`-`|
|xl|`span` for `xl`|`number`|`-`|
|xxl|`span` for `xxl`|`number`|`-`|

### VirtualListProps

|Property|Description|Type|Default|
|---|:---:|:---:|---:|
|height|Viewable area height (`2.11.0` starts to support `string` type such as `80%`)|`number`| `200` |
|threshold|The threshold of the number of elements that automatically enable virtual scrolling, pass in `null` to disable virtual scrolling.|`number` \| `null`| `100` |
|isStaticItemHeight|Whether it is a static element of the same height|`boolean`|`true`|
