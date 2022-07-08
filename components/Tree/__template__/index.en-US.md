---
file: interface
---

`````
Component / Data Display

# Tree

For content with many levels, such as folders, catalogs, and organizational structures, the tree can clearly show their hierarchical relationship, and has interactive functions such as expanding, collapsing, and selecting.
`````

%%Content%%

## API

%%Props%%

### VirtualListProps

|Property|Description|Type|Default|
|---|:---:|:---:|---:|
|height|Viewable area height (`2.11.0` starts to support `string` type such as `80%`)|`number`| `200` |
|threshold|The threshold of the number of elements that automatically enable virtual scrolling, pass in `null` to disable virtual scrolling.|`number` \| `null`| `100` |
|isStaticItemHeight|Whether it is a static element of the same height|`boolean`|`true`|
