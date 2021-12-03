`````
组件 / 数据展示

# 标签页 Tabs

将内容组织同一视图中，一次可查看一个视图内容。查看其他内容可切换选项卡查看。
`````

%%Content%%

## API

### Tabs

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|style|节点样式|`CSSProperties`|`-`|-|
|className|节点类名|`string \| string[]`|`-`|-|
|defaultActiveTab|默认选中的标签选项卡，如不指定默认选择第一个|`string`|`-`|-|
|activeTab|当前选中的 tab 的 key|`string`|`-`|-|
|animation|是否开启过渡效果|`boolean \| { tabPane?: boolean; inkBar?: boolean }`|`-`|-|
|tabPosition|选项卡位置|`'left' \| 'right' \| 'top' \| 'bottom'`|`top`|-|
|direction|标签选项卡的方向是水平还是竖直，分别对应 `horizontal `和 `vertical`。** 注意： 已废弃，使用 tabPosition 替代。**|`'horizontal' \| 'vertical'`|`-`|-|
|size|有四个尺寸供选择，分别为`mini`, `small`, `default`, `large`|`'mini' \| 'small' \| 'default' \| 'large'`|`-`|-|
|type|标签选项卡的类型|`'line' \| 'card' \| 'card-gutter' \| 'text' \| 'rounded' \| 'capsule'`|`line`|-|
|headerPadding|选项卡头部是否存在水平边距。仅对 `type`等于 `line`、`text`类型的选项卡生效|`boolean`|`true`|2.6.0|
|overflow|标签页较多时候，选择滚动/下拉菜单形式展示 tab|`'scroll' \| 'dropdown'`|`scroll`|-|
|editable|是否允许增减标签。只在 `type` 为 `card` 或 `card-gutter` 时候生效。|`boolean`|`-`|-|
|showAddButton|是否显示新增按钮（仅在`editable`为`true`时生效）|`boolean`|`true`|-|
|icons|图标配置|`{add?: ReactNode;delete?: ReactNode;}`|`-`|2.15.0|
|scrollAfterEdit|是否在标签增减后，自动进行滚动调整(`editable`为`true`时生效）|`{delete?: boolean;add?: boolean;}`|`{ add: true, delete: true }`|2.25.0|
|extra|显示在标签页右侧的附加|`ReactNode`|`-`|-|
|destroyOnHide|是否销毁隐藏标签页的节点, `TabPane` 的该属性优先级高于 `Tabs`。|`boolean`|`-`|-|
|lazyload|设置为 `true` 时，将不会在组件挂载的时候渲染被隐藏的标签页。|`boolean`|`true`|-|
|justify|高度撑满容器，只在水平模式下生效。（默认的高度是又撑起的。）|`boolean`|`-`|-|
|deleteButton|自定义删除按钮|`ReactNode`|`-`|2.16.0|
|addButton|自定义新增按钮|`ReactNode`|`-`|2.16.0|
|scrollPosition|被选中 tab 的滚动位置，默认 auto 即会将 activeTab 滚动到可见区域，但不会特意做位置调整|`'start' \| 'end' \| 'center' \| 'auto' \| number`|`auto`|2.25.0|
|onChange|`activeTab` 改变的回调|`(key: string) => void`|`-`|-|
|onClickTab|点击选项卡的回调|`(key: string) => void`|`-`|-|
|onAddTab|点击新增 tab 按钮的回调|`() => void`|`-`|-|
|onDeleteTab|点击删除按钮的回调|`(key: string) => void`|`-`|-|
|renderTabHeader|自定义选项卡头部|`(tabProps: TabsProps, DefaultTabHeader: typeof TabHeader) => React.ReactElement`|`-`|-|
|renderTabTitle|自定义单个选项卡头部|`(tabTitle: ReactNode,info: {key: string \| number;isActive: boolean;disabled: boolean;editable: boolean;}) => ReactNode`|`-`|-|

### Tabs.TabPane

|参数名|描述|类型|默认值|
|---|---|---|---|
|style|节点样式|`CSSProperties`|`-`|
|className|节点类名|`string \| string[]`|`-`|
|title|选项卡的标题显示|`string \| ReactNode` **(必填)**|`-`|
|destroyOnHide|选项卡隐藏的时候是否销毁标签页内的DOM结构，优先级高于 `Tabs` 的 `destroyOnHide` 属性|`boolean`|`-`|
|disabled|是否禁用|`boolean`|`-`|
|closable|动态增减标签页时是否允许关闭当前标签页|`boolean`|`-`|
