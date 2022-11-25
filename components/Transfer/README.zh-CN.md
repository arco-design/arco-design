`````
组件 / 数据输入

# 数据穿梭框 Transfer

两栏布局的多选组件，将元素从一栏即时移到另一栏。
`````

%%Content%%

## API

### Transfer

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|disabled|禁用穿梭框|boolean |`-`|-|
|draggable|列表内条目是否可拖拽|boolean |`-`|-|
|oneWay|单向|boolean |`-`|-|
|onChange|选中项在两栏之间转移时的回调|(newTargetKeys: string[], direction: 'source' \| 'target', moveKeys: string[]) => void |`-`|-|
|onSearch|搜索框输入进行搜索时回调函数|(value: string, type?: 'source' \| 'target') => void |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|dataSource|穿梭框数据源，其中一部分会被渲染到左边一栏，targetKeys 中指定的除外|[TransferItem](#transferitem)[] |`-`|-|
|defaultSelectedKeys|默认的 `selectKeys`|string[] |`[]`|-|
|defaultTargetKeys|默认的 `targetKeys`|string[] |`[]`|-|
|listStyle|左右两栏框的样式，通过数组为左右列表传入不同属性|CSSProperties \| CSSProperties[] |`-`|Array format in '2.40.0'|
|onDragEnd|节点结束拖拽的回调|(e: DragEvent&lt;HTMLSpanElement&gt;, item: [TransferItem](#transferitem)) =&gt; void |`-`|-|
|onDragLeave|节点离开可释放目标上时的回调|(e: DragEvent&lt;HTMLSpanElement&gt;, item: [TransferItem](#transferitem)) =&gt; void |`-`|-|
|onDragOver|节点被拖拽至可释放目标上时的回调|(e: DragEvent&lt;HTMLSpanElement&gt;, item: [TransferItem](#transferitem)) =&gt; void |`-`|-|
|onDragStart|节点开始拖拽的回调|(e: DragEvent&lt;HTMLSpanElement&gt;, item: [TransferItem](#transferitem)) =&gt; void |`-`|-|
|onDrop|节点在可释放目标上释放时的回调|(info: {e: DragEvent&lt;HTMLSpanElement&gt;;dragItem: [TransferItem](#transferitem);dropItem: [TransferItem](#transferitem);dropPosition: number;}) =&gt; void |`-`|-|
|operationStyle|穿梭中间操作部分的样式|CSSProperties |`-`|-|
|operationTexts|穿梭按钮的文案数组，顺序从上至下|string[] \| ReactNode[] |`-`|-|
|pagination|是否使用翻页，也可传入 `Pagination` 的配置，通过数组为左右列表传入不同属性|boolean \| [PaginationProps](pagination#pagination) \| Array&lt;boolean \| [PaginationProps](pagination#pagination)&gt; |`-`|Array format in '2.40.0'|
|searchPlaceholder|搜索框默认提示文字，通过数组为左右列表传入不同属性|string \| string[] |`-`|Array format in '2.40.0'|
|selectedKeys|当前应该有哪些项被选中|string[] |`-`|-|
|showFooter|左右两栏是否显示底部重置按钮，通过数组为左右列表传入不同属性|boolean \| ReactNode \| Array&lt;boolean \| ReactNode&gt; |`-`|ReactNode in `2.11.0`, array format in '2.40.0'|
|showSearch|左右两栏是否显示搜索框，通过数组为左右列表传入不同属性|boolean \| [InputProps](input#input) \| Array&lt;boolean \| [InputProps](input#input)&gt; |`-`|Array format in '2.40.0'|
|simple|简单模式|\| boolean\| {retainSelectedItems?: boolean;} |`-`|`retainSelectedItems` in '2.21.0'|
|style|节点样式|CSSProperties |`-`|-|
|targetKeys|渲染到右边一栏数据的 key 集合|string[] |`-`|-|
|titleTexts|穿梭框左右栏标题数组。(函数写法 `2.18.0` 开始支持)|Array&lt;[TransferListTitle](#transferlisttitle)&gt; |`['Source', 'Target']`|-|
|virtualListProps|传递虚拟滚动属性。|[AvailableVirtualListProps](#availablevirtuallistprops) |`-`|2.42.0|
|children|自定义列表渲染函数|(props: [TransferCustomListProps](#transfercustomlistprops)) => ReactNode |`-`|-|
|filterOption|搜索框筛选算法|(inputValue: string, item: [TransferItem](#transferitem)) => boolean |`(inputValue, item) => item.value.indexOf(inputValue) !== -1`|-|
|onResetData|点击重置按钮后的回调|() => void |`-`|-|
|onSelectChange|数据项选中状态发生改变的回调|(leftSelectedKeys: string[], rightSelectedKeys: string[]) => void |`-`|-|
|render|每行数据渲染函数|(item: [TransferItem](#transferitem)) => any |`-`|-|

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

### AvailableVirtualListProps

```js
export type AvailableVirtualListProps = Pick<
  VirtualListProps<any>,
  "height" | "itemHeight" | "threshold" | "isStaticItemHeight" | "scrollOptions"
>;
```

### Transfer.Item

|Property|Description|Type|Default|
|---|:---:|:---:|---:|
|key|选项的键值（唯一标识符）|`string` **(required)**|`-`|
|value|选项对应的值|`string` **(required)**|`-`|
|disabled|是否禁用此选项|`boolean`|`-`|
