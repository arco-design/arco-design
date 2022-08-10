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
|disabled|Whether is disabled|boolean |`-`|-|
|draggable|Whether the items in the list can be dragged|boolean |`-`|-|
|oneWay|Whether to allow only one-way movement|boolean |`-`|-|
|searchPlaceholder|Placeholder of search box|string |`-`|-|
|onChange|Callback when the transfer between columns is complete|(newTargetKeys: string[], direction: 'source' \| 'target', moveKeys: string[]) => void |`-`|-|
|onSearch|Callback when value of search box is changed|(value: string, type?: 'source' \| 'target') => void |`-`|-|
|showFooter|Whether to display the reset-button in columns|boolean \| ReactNode |`-`|ReactNode in `2.11.0`|
|className|Additional css class|string \| string[] |`-`|-|
|dataSource|Used for setting the source data|[TransferItem](#transferitem)[] |`-`|-|
|defaultSelectedKeys|Initial set of keys of selected items|string[] |`[]`|-|
|defaultTargetKeys|Initial set of keys of items that are listed on the target column|string[] |`[]`|-|
|listStyle|The additional css style of columns|CSSProperties |`-`|-|
|onDragEnd|Callback when the user has finished dragging a transfer item|(e: DragEvent&lt;HTMLSpanElement&gt;, item: [TransferItem](#transferitem)) =&gt; void |`-`|-|
|onDragLeave|Callback when a draggable item leaves a valid drop target|(e: DragEvent&lt;HTMLSpanElement&gt;, item: [TransferItem](#transferitem)) =&gt; void |`-`|-|
|onDragOver|Callback when a draggable item is being dragged over a valid drop target|(e: DragEvent&lt;HTMLSpanElement&gt;, item: [TransferItem](#transferitem)) =&gt; void |`-`|-|
|onDragStart|Callback when user start to drag a transfer item|(e: DragEvent&lt;HTMLSpanElement&gt;, item: [TransferItem](#transferitem)) =&gt; void |`-`|-|
|onDrop|Callback when draggable item is dropped in a `<div>` element|(info: {e: DragEvent&lt;HTMLSpanElement&gt;;dragItem: [TransferItem](#transferitem);dropItem: [TransferItem](#transferitem);dropPosition: number;}) =&gt; void |`-`|-|
|operationStyle|The additional css style of operation buttons|CSSProperties |`-`|-|
|operationTexts|Texts of buttons that are used to transfer item|string[] \| ReactNode[] |`-`|-|
|pagination|Whether to divide into pages, you can also pass in the configuration of `Pagination`|boolean \| [PaginationProps](pagination#pagination) |`-`|-|
|selectedKeys|Set of keys of selected items|string[] |`-`|-|
|showSearch|Whether to display the search box in columns|boolean \| [InputProps](input#input) |`-`|-|
|simple|Whether to automatically move an item when it is selected|\| boolean\| {retainSelectedItems?: boolean;} |`-`|`retainSelectedItems` in '2.21.0'|
|style|Additional style|CSSProperties |`-`|-|
|targetKeys|Set of keys of items that are listed on the target column|string[] |`-`|-|
|titleTexts|Title list of Transfer columns. (`2.18.0` began to support function)|Array&lt;[TransferListTitle](#transferlisttitle)&gt; |`['Source', 'Target']`|-|
|children|Customize render list|(props: [TransferCustomListProps](#transfercustomlistprops)) => ReactNode |`-`|-|
|filterOption|A function to determine whether an item should show in search result list|(inputValue: string, item: [TransferItem](#transferitem)) => boolean |`(inputValue, item) => item.value.indexOf(inputValue) !== -1`|-|
|onResetData|Callback when reset-button is clicked|() => void |`-`|-|
|onSelectChange|Callback when selected items are changed|(leftSelectedKeys: string[], rightSelectedKeys: string[]) => void |`-`|-|
|render|A function to generate the item shown on a column.|(item: [TransferItem](#transferitem)) => any |`-`|-|

### TransferCustomListProps

```js
export interface TransferCustomListProps
  extends Pick<
    TransferListProps,
    | "disabled"
    | "listType"
    | "selectedKeys"
    | "validKeys"
    | "selectedDisabledKeys"
  > {
  filteredItems: TransferItem[];
  onItemSelect: (key: string, selected: boolean) => void;
  onItemRemove: (key: string) => void;
  onItemSelectAll: (keys: string[], selected: boolean) => void;
}
```

### TransferItem

```js
export type TransferItem = {
  key: string;
  value: string;
  disabled?: boolean;
};
```

### TransferListTitle

```js
type TransferListTitle =
  | string
  | ((params: {
      countTotal: number;
      countSelected: number;
      clear: () => void;
      checkbox: ReactNode;
      searchInput: ReactNode;
    }) => ReactNode);
```

### Transfer.Item

|Property|Description|Type|Default|
|---|:---:|:---:|---:|
|key|Unique identifier of transfer item|`string` **(Required)**|`-`|
|value|Value of transfer item|`string` **(Required)**|`-`|
|disabled|Whether this item is disabled|`boolean`|`-`|
