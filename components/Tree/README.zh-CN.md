`````
组件 / 数据展示

# 树 Tree

对于文件夹、分类目录、组织架构等层级较多的内容，树可以清楚显示他们的层级关系，并具有展开、收起、选择等交互功能。
`````

%%Content%%

## API

### Tree

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|style|节点样式|`CSSProperties`|`-`|-|
|className|节点类名|`string \| string[]`|`-`|-|
|size|不同尺寸|`'mini' \| 'small' \| 'default' \| 'large'`|`-`|-|
|blockNode|是否节点占据一行|`boolean`|`-`|-|
|autoExpandParent|是否自动展开父节点|`boolean`|`true`|-|
|multiple|是否支持多选|`boolean`|`-`|-|
|checkable|是否在节点前添加选框|`boolean`|`-`|-|
|draggable|是否可拖拽|`boolean`|`-`|-|
|allowDrop|是否允许拖拽时放置在该节点|`AllowDrop`|`() => true`|2.7.0|
|selectable|是否可以选择|`boolean`|`true`|-|
|checkStrictly|是否取消父子节点关联|`boolean`|`-`|-|
|checkedStrategy|定制回填方式 <br/> all: 返回所有选中的节点<br/> parent: 父子节点都选中时只返回父节点 <br/> child: 只返回子节点|`SHOW_ALL \| SHOW_PARENT \| SHOW_CHILD`|`all`|-|
|defaultSelectedKeys|默认选中的树节点|`string[]`|`-`|-|
|selectedKeys|选中的树节点。（受控）|`string[]`|`-`|-|
|defaultCheckedKeys|默认选中复选框的树节点|`string[]`|`-`|-|
|checkedKeys|选中复选框的树节点。（受控）|`string[]`|`-`|-|
|halfCheckedKeys|半选状态的节点.仅在 checkable 且 checkStrictly 时生效|`string[]`|`-`|2.27.0|
|defaultExpandedKeys|默认展开的节点。|`string[]`|`-`|-|
|expandedKeys|展开的节点，(受控)。|`string[]`|`-`|-|
|treeData|可以通过传入`treeData`,生成对应的树结构|`TreeDataType[]`|`-`|-|
|fieldNames|指定 key，title，isLeaf，disabled，children 对应的字段|`FieldNamesType`|`-`|2.11.0|
|icons|定制节点图标|`\| ((nodeProps: NodeProps) => {dragIcon?: ReactNode;switcherIcon?: ReactNode;loadingIcon?: ReactNode;})\| {dragIcon?: ReactNode;switcherIcon?: ReactNode;loadingIcon?: ReactNode;}`|`FieldNamesType`|2.9.0|
|virtualListProps|传递虚拟列表属性，传入此参数以开启虚拟滚动|`AvailableVirtualListProps`|`-`|2.11.0|
|renderExtra|渲染额外节点|`(props: NodeProps) => ReactNode`|`-`|-|
|renderTitle|自定义 title 的渲染|`(props: NodeProps) => ReactNode`|`-`|-|
|showLine|是否展示连接线|`boolean`|`-`|-|
|loadMore|异步加载数据的回调，返回一个 `Promise`。|`(node: NodeInstance) => Promise<void>`|`-`|-|
|onSelect|点击树节点的回调|`(selectedKeys: string[],extra: {selected: boolean;selectedNodes: NodeInstance[];node: NodeInstance;e: Event;}) => void`|`-`|-|
|onCheck|点击树节点复选框的回调|`(checkedKeys: string[],extra: {node: NodeInstance;checkedNodes: NodeInstance[];checked: boolean;halfCheckedKeys: string[]; // version 2.27.0halfCheckedNodes: NodeInstance[]; // version 2.27.0e: Event;}) => void`|`-`|-|
|onExpand|点击展开/关闭的回调|`(expandedKeys: string[],exra?: { expanded: boolean; node: NodeInstance; expandedNodes: NodeInstance[] }) => void`|`-`|-|
|onDragStart|节点开始拖拽的回调|`(e: DragEvent<HTMLSpanElement>, node: NodeInstance) => void`|`-`|-|
|onDragEnd|节点结束拖拽的回调|`(e: DragEvent<HTMLSpanElement>, node: NodeInstance) => void`|`-`|-|
|onDragOver|节点被拖拽至可释放目标上时的回调|`(e: DragEvent<HTMLSpanElement>, node: NodeInstance) => void`|`-`|-|
|onDragLeave|节点离开可释放目标上时的回调|`(e: DragEvent<HTMLSpanElement>, node: NodeInstance) => void`|`-`|-|
|onDrop|节点在可释放目标上释放时的回调|`(info: {e: DragEvent<HTMLSpanElement>;dragNode: NodeInstance \| null;dropNode: NodeInstance \| null;dropPosition: number;}) => void`|`-`|-|

### Tree.Node

|参数名|描述|类型|默认值|
|---|---|---|---|
|style|节点样式|`CSSProperties`|`-`|
|className|节点类名|`string \| string[]`|`-`|
|title|该节点显示的标题|`string \| ReactNode`|`-`|
|selectable|是否允许选中|`boolean`|`true`|
|disabled|是否禁用节点|`boolean`|`-`|
|disableCheckbox|是否禁用复选框|`boolean`|`-`|
|icon|该节点个性化显示的图标|`ReactNode`|`-`|
|checkable|是否显示多选框|`boolean`|`-`|
|isLeaf|是否是叶子节点。动态加载时有效|`boolean`|`-`|
|icons|定制节点图标，优先级高于 Tree。同时设置 Tree 上的 icons 属性时候，将会进行合并。|`TreeProps['icons']`|`-`|
|draggable|当前节点是否可拖拽|`boolean`|`-`|

### VirtualListProps

|参数名|描述|类型|默认值|
|------|:----------:|:--------:|-----:|
|height|可视区高度 (`2.11.0` 开始支持如 `80%` 的 `string` 类型)|`number`|`200`|
|threshold|自动开启虚拟滚动的元素数量阈值，传入`null`以禁用虚拟滚动。|`number`\|`null`|`100`|
|isStaticItemHeight|是否为相同高度的静态元素|`boolean`|`true`|


FieldNamesType

```js
type FieldNamesType = {
  // 指定 key 在 treeData 中对应的字段
  key?: string;
  // 指定 title 在 treeData 中对应的字段
  title?: string;
  disabled?: string;
  children?: string;
  isLeaf?: string;
  disableCheckbox?: string;
  checkable?: string;
};
```

## 常见问题

1. `Tree` 设置了`autoExpandParent=true`，但没有默认展开全部节点？

  `autoExpandParent` 仅在 `Tree` 第一次挂载的时候生效。如果数据是从远程获取，可以在数据获取完成后，再去渲染 `Tree` 组件。
