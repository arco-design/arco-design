---
file: interface
---

`````
Component / Data Display

# List

The most basic list display, which can carry text/pictures/paragraphs, and is often used in the data display page.
`````

%%Content%%

## API

%%Props%%

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
