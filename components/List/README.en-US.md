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
|bordered|Whether to render border|boolean |`true`|-|
|hoverable|Whether list items have hover style|boolean |`-`|2.9.0|
|loading|Whether to show a loading indicator while the contents of the list are being fetched|boolean |`-`|-|
|split|Whether to render the split under the list item|boolean |`true`|-|
|defaultCurrent|To set default current page|number |`1`|-|
|offsetBottom|The distance threshold to trigger the `onReachBottom`|number |`0`|-|
|throttleDelay|Interval of throttle for `onListScroll`|number |`500`|-|
|size|Size of List|'small' \| 'default' \| 'large' |`-`|-|
|children|Child element of List. when dataSource and render exist, do not use this parameter|ReactNode |`-`|-|
|footer|List footer|ReactNode |`-`|-|
|header|List header|ReactNode |`-`|-|
|noDataElement|Content displayed when there is no data|ReactNode |`-`|-|
|scrollLoading|Set the content to be at the list bottom when you load data during scrolling|string \| ReactNode |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|dataSource|Data source for list rendering. When `children` exist, this parameter can be omitted (`dataSource` has higher priority)|T[] |`-`|-|
|grid|The grid type of list|[ListGridProps](#listgridprops) |`-`|`column` in 2.20.0|
|listRef|Reference to the current list|MutableRefObject&lt;[ListHandle](#listhandle)&gt; |`-`|2.20.0|
|pagination|Whether to divide into pages, you can also pass in the configuration of `Pagination`|boolean \| [PaginationProps](pagination#pagination) |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
|virtualListProps|Pass the virtual-list properties, pass in this parameter to turn on virtual scrolling|[AvailableVirtualListProps](#availablevirtuallistprops) |`-`|2.11.0|
|wrapperClassName|The additional css class to wrapper element|string \| string[] |`-`|-|
|wrapperStyle|The additional css style to wrapper element|CSSProperties |`-`|-|
|onListScroll|Callback when list is scrolling. When onReachBottom cannot meet your usage, can customize scroll monitor function|(elem: Element) => void |`-`|-|
|onReachBottom|Callback when the list scroll to the bottom|(currentPage: number) => void |`-`|-|
|render|Customize list item when using dataSource|(item: T, index: number) => ReactNode |`-`|-|

### List.Item

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|actionLayout|The position of the list operation group. `horizontal` - right, `vertical` - below.|'horizontal' \| 'vertical' |`horizontal`|
|extra|The extra content of list item which is on the far right|ReactNode |`-`|
|actions|The list operation group of list item|ReactNode[] |`-`|
|className|Additional css class|string \| string[] |`-`|
|style|Additional style|CSSProperties |`-`|

### List.Item.Meta

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|avatar|The avatar of list item|ReactNode |`-`|
|description|The description of list item|ReactNode |`-`|
|title|The title of list item|ReactNode |`-`|
|className|Additional css class|string \| string[] |`-`|
|style|Additional style|CSSProperties |`-`|

### ListGridProps

```js
type ListGridProps = {
  column?: number;
} & Pick<RowProps, "gutter" | "justify" | "align"> &
  Pick<
    ColProps,
    "span" | "offset" | "order" | "pull" | "push" | GridResponsiveBreakpoint
  >;
```

### ListHandle

```js
export type ListHandle = {
  dom: HTMLDivElement;
  scrollIntoView: (index: number) => void;
};
```

### AvailableVirtualListProps

```js
export type AvailableVirtualListProps = Pick<
  VirtualListProps<any>,
  "height" | "itemHeight" | "threshold" | "isStaticItemHeight" | "scrollOptions"
>;
```

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
