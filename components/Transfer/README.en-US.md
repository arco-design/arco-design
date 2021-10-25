`````
Component / Data Entry

# Transfer

A two-column multi-select component that moves elements from one column to another in real time.
`````

%%Content%%

## API

### Transfer

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|children|Customize render list|`(props: TransferCustomListProps) => ReactNode`|`-`|-|
|dataSource|Used for setting the source data|`TransferItem[]`|`-`|-|
|defaultTargetKeys|Initial set of keys of items that are listed on the target column|`string[]`|`[]`|-|
|defaultSelectedKeys|Initial set of keys of selected items|`string[]`|`[]`|-|
|targetKeys|Set of keys of items that are listed on the target column|`string[]`|`-`|-|
|selectedKeys|Set of keys of selected items|`string[]`|`-`|-|
|titleTexts|Title list of Transfer columns. (`2.18.0` began to support function)|`Array<TransferListTitle>`|`['Source', 'Target']`|-|
|operationTexts|Texts of buttons that are used to transfer item|`string[] \| ReactNode[]`|`-`|-|
|searchPlaceholder|Placeholder of search box|`string`|`-`|-|
|disabled|Whether is disabled|`boolean`|`-`|-|
|oneWay|Whether to allow only one-way movement|`boolean`|`-`|-|
|simple|Whether to automatically move an item when it is selected|`\| boolean\| {retainSelectedItems?: boolean;}`|`-`|`retainSelectedItems` in '2.21.0'|
|draggable|Whether the items in the list can be dragged|`boolean`|`-`|-|
|showSearch|Whether to display the search box in columns|`boolean`|`-`|-|
|showFooter|Whether to display the reset-button in columns|`boolean \| ReactNode`|`-`|ReactNode in `2.11.0`|
|pagination|Whether to divide into pages, you can also pass in the configuration of `Pagination`|`boolean \| PaginationProps`|`-`|-|
|listStyle|The additional css style of columns|`CSSProperties`|`-`|-|
|operationStyle|The additional css style of operation buttons|`CSSProperties`|`-`|-|
|render|A function to generate the item shown on a column.|`(item: TransferItem) => any`|`-`|-|
|filterOption|A function to determine whether an item should show in search result list|`(inputValue: string, item: TransferItem) => boolean`|`(inputValue, item) => item.value.indexOf(inputValue) !== -1`|-|
|onChange|Callback when the transfer between columns is complete|`(newTargetKeys: string[], direction: 'source' \| 'target', moveKeys: string[]) => void`|`-`|-|
|onSelectChange|Callback when selected items are changed|`(leftSelectedKeys: string[], rightSelectedKeys: string[]) => void`|`-`|-|
|onSearch|Callback when value of search box is changed|`(value: string, type?: 'source' \| 'target') => void`|`-`|-|
|onResetData|Callback when reset-button is clicked|`() => void`|`-`|-|
|onDragStart|Callback when user start to drag a transfer item|`(e: DragEvent<HTMLSpanElement>, item: TransferItem) => void`|`-`|-|
|onDragEnd|Callback when the user has finished dragging a transfer item|`(e: DragEvent<HTMLSpanElement>, item: TransferItem) => void`|`-`|-|
|onDragLeave|Callback when a draggable item leaves a valid drop target|`(e: DragEvent<HTMLSpanElement>, item: TransferItem) => void`|`-`|-|
|onDragOver|Callback when a draggable item is being dragged over a valid drop target|`(e: DragEvent<HTMLSpanElement>, item: TransferItem) => void`|`-`|-|
|onDrop|Callback when draggable item is dropped in a `<div>` element|`(info: {e: DragEvent<HTMLSpanElement>;dragItem: TransferItem;dropItem: TransferItem;dropPosition: number;}) => void`|`-`|-|

### Transfer.Item

|Property|Description|Type|Default|
|---|:---:|:---:|---:|
|key|Unique identifier of transfer item|`string` **(Required)**|`-`|
|value|Value of transfer item|`string` **(Required)**|`-`|
|disabled|Whether this item is disabled|`boolean`|`-`|
