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
|style|节点样式|CSSProperties |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|size|不同尺寸|'mini' \| 'small' \| 'default' \| 'large' |`-`|-|
|blockNode|是否节点占据一行|boolean |`-`|-|
|autoExpandParent|是否自动展开父节点|boolean |`true`|-|
|multiple|是否支持多选|boolean |`-`|-|
|checkable|是否在节点前添加选框|boolean |`-`|-|
|draggable|是否可拖拽|boolean |`-`|-|
|allowDrop|是否允许拖拽时放置在该节点。 (`dragNode` in `2.23.0`)|[AllowDrop](#allowdrop) |`() => true`|2.7.0|
|selectable|是否可以选择|boolean |`true`|-|
|checkStrictly|是否取消父子节点关联|boolean |`-`|-|
|checkedStrategy|定制回填方式 <br/> all: 返回所有选中的节点<br/> parent: 父子节点都选中时只返回父节点 <br/> child: 只返回子节点|SHOW_ALL \| SHOW_PARENT \| SHOW_CHILD |`all`|-|
|defaultSelectedKeys|默认选中的树节点|string[] |`-`|-|
|selectedKeys|选中的树节点。（受控）|string[] |`-`|-|
|defaultCheckedKeys|默认选中复选框的树节点|string[] |`-`|-|
|checkedKeys|选中复选框的树节点。（受控）|string[] |`-`|-|
|halfCheckedKeys|半选状态的节点.仅在 checkable 且 checkStrictly 时生效|string[] |`-`|2.27.0|
|defaultExpandedKeys|默认展开的节点。|string[] |`-`|-|
|expandedKeys|展开的节点，(受控)。|string[] |`-`|-|
|treeData|可以通过传入`treeData`,生成对应的树结构|[TreeDataType](#treedatatype)[] |`-`|-|
|fieldNames|指定 key，title，isLeaf，disabled，children 对应的字段|[FieldNamesType](#fieldnamestype) |`-`|2.11.0|
|icons|定制节点图标|\| ((nodeProps: [NodeProps](tree#treenode)) => {dragIcon?: ReactNode;switcherIcon?: ReactNode;loadingIcon?: ReactNode;})\| {dragIcon?: ReactNode;switcherIcon?: ReactNode;loadingIcon?: ReactNode;} |`FieldNamesType`|2.9.0|
|virtualListProps|传递虚拟列表属性，传入此参数以开启虚拟滚动|[AvailableVirtualListProps](#availablevirtuallistprops) |`-`|2.11.0|
|renderExtra|渲染额外节点|(props: [NodeProps](tree#treenode)) => ReactNode |`-`|-|
|renderTitle|自定义 title 的渲染|(props: [NodeProps](tree#treenode)) => ReactNode |`-`|-|
|showLine|是否展示连接线|boolean |`-`|-|
|actionOnClick|点击节点时对应的操作，可以是选中，复选选中，展开/收起|[ActionOnClick](#actiononclick) \| [ActionOnClick](#actiononclick)[] |`-`|select|
|loadMore|异步加载数据的回调，返回一个 `Promise`。|(node: [NodeInstance](#nodeinstance)) =&gt; Promise&lt;void&gt; |`-`|-|
|onSelect|点击树节点的回调|(selectedKeys: string[],extra: {selected: boolean;selectedNodes: [NodeInstance](#nodeinstance)[];node: [NodeInstance](#nodeinstance);e: Event;}) => void |`-`|-|
|onCheck|点击树节点复选框的回调|(checkedKeys: string[],extra: {node: [NodeInstance](#nodeinstance);checkedNodes: [NodeInstance](#nodeinstance)[];checked: boolean;halfCheckedKeys: string[];halfCheckedNodes: [NodeInstance](#nodeinstance)[];e: Event;}) => void |`-`|-|
|onExpand|点击展开/关闭的回调|(expandedKeys: string[],exra?: { expanded: boolean; node: [NodeInstance](#nodeinstance); expandedNodes: [NodeInstance](#nodeinstance)[] }) => void |`-`|-|
|onDragStart|节点开始拖拽的回调|(e: DragEvent&lt;HTMLSpanElement&gt;, node: [NodeInstance](#nodeinstance)) =&gt; void |`-`|-|
|onDragEnd|节点结束拖拽的回调|(e: DragEvent&lt;HTMLSpanElement&gt;, node: [NodeInstance](#nodeinstance)) =&gt; void |`-`|-|
|onDragOver|节点被拖拽至可释放目标上时的回调|(e: DragEvent&lt;HTMLSpanElement&gt;, node: [NodeInstance](#nodeinstance)) =&gt; void |`-`|-|
|onDragLeave|节点离开可释放目标上时的回调|(e: DragEvent&lt;HTMLSpanElement&gt;, node: [NodeInstance](#nodeinstance)) =&gt; void |`-`|-|
|onDrop|节点在可释放目标上释放时的回调|(info: {e: DragEvent&lt;HTMLSpanElement&gt;;dragNode: [NodeInstance](#nodeinstance) \| null;dropNode: [NodeInstance](#nodeinstance) \| null;dropPosition: number;}) =&gt; void |`-`|-|

### Tree.Node

|参数名|描述|类型|默认值|
|---|---|---|---|
|style|节点样式|CSSProperties |`-`|
|className|节点类名|string \| string[] |`-`|
|title|该节点显示的标题|string \| ReactNode |`-`|
|selectable|是否允许选中|boolean |`true`|
|disabled|是否禁用节点|boolean |`-`|
|disableCheckbox|是否禁用复选框|boolean |`-`|
|icon|该节点个性化显示的图标|ReactNode |`-`|
|checkable|是否显示多选框|boolean |`-`|
|isLeaf|是否是叶子节点。动态加载时有效|boolean |`-`|
|icons|定制节点图标，优先级高于 Tree。同时设置 Tree 上的 icons 属性时候，将会进行合并。|[TreeProps](tree#tree)['icons'] |`-`|
|draggable|当前节点是否可拖拽|boolean |`-`|

### AllowDrop

```js
export type AllowDrop = (options: {
  dropNode: NodeInstance;
  dragNode: NodeInstance | null;
  dropPosition: number;
}) => boolean;
```

### TreeDataType

```js
export type TreeDataType = NodeProps & {
  key?: string;
  _index?: number;
  children?: TreeDataType[];
  [key: string]: any;
};
```

### FieldNamesType

```js
export type FieldNamesType = {
  key?: string;
  title?: string;
  disabled?: string;
  children?: string;
  isLeaf?: string;
  disableCheckbox?: string;
  checkable?: string;
};
```

### AvailableVirtualListProps

```js
export type AvailableVirtualListProps = Pick<
  VirtualListProps<any>,
  "height" | "itemHeight" | "threshold" | "isStaticItemHeight" | "scrollOptions"
>;
```

### ActionOnClick

```js
export type ActionOnClick = "select" | "check" | "expand";
```

### NodeInstance

```js
export type NodeInstance = React.ReactElement<
  PropsWithChildren<NodeProps>,
  typeof TreeNode
>;
```

### VirtualListProps

|参数名|描述|类型|默认值|
|------|:----------:|:--------:|-----:|
|height|可视区高度 (`2.11.0` 开始支持如 `80%` 的 `string` 类型)|`number`|`200`|
|threshold|自动开启虚拟滚动的元素数量阈值，传入`null`以禁用虚拟滚动。|`number`\|`null`|`100`|
|isStaticItemHeight|是否为相同高度的静态元素|`boolean`|`true`|

## 常见问题

1. `Tree` 设置了`autoExpandParent=true`，但没有默认展开全部节点？

  `autoExpandParent` 仅在 `Tree` 第一次挂载的时候生效。如果数据是从远程获取，可以在数据获取完成后，再去渲染 `Tree` 组件。
