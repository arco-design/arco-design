`````
Component / Data Display

# Tabs

Organize content in the same view, and view content one view at a time. You can switch tabs to view other content.
`````

%%Content%%

## API

### Tabs

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|defaultActiveTab|The Tab selected by default. If not specified, the first one is selected|`string`|`-`|-|
|activeTab|The key of the currently selected tab|`string`|`-`|-|
|animation|Whether to turn on the transition animation|`boolean \| { tabPane?: boolean; inkBar?: boolean }`|`-`|-|
|tabPosition|Position of tabs|`'left' \| 'right' \| 'top' \| 'bottom'`|`top`|-|
|direction|The Direction of tabs. ** Warn: Please use `tabPosition` instead.**|`'horizontal' \| 'vertical'`|`-`|-|
|size|Size of tabs|`'mini' \| 'small' \| 'default' \| 'large'`|`-`|-|
|type|Type of tabs|`'line' \| 'card' \| 'card-gutter' \| 'text' \| 'rounded' \| 'capsule'`|`line`|-|
|headerPadding|Whether there is a horizontal margin on the tab. It only effect when `type` is `line` or `text`|`boolean`|`true`|2.6.0|
|overflow|When there are too many tabs, select scroll or drop-down to display tabs|`'scroll' \| 'dropdown'`|`scroll`|-|
|editable|Whether to allow adding or subtracting tabs. It only effect when `type` is `card` or `card-gutter`.|`boolean`|`-`|-|
|showAddButton|Whether to show the new button(Only effect when `editable` is `true`)|`boolean`|`true`|-|
|icons|Icon configuration|`{add?: ReactNode;delete?: ReactNode;}`|`-`|2.15.0|
|extra|Additional on the right side of the tab|`ReactNode`|`-`|-|
|destroyOnHide|Whether to destroy the DOM structure in the TabPane when the tab is hidden. This attribute of `TabPane` has higher priority than `Tabs`.|`boolean`|`-`|-|
|lazyload|When set to `true`, hidden tabs will not be rendered when the component is mounted.|`boolean`|`true`|-|
|justify|Height to fill the container, Only effective in horizontal mode.|`boolean`|`-`|-|
|deleteButton|Custom delete button|`ReactNode`|`-`|2.16.0|
|addButton|Custom add button|`ReactNode`|`-`|2.16.0|
|onChange|Callback when `activeTab` changed|`(key: string) => void`|`-`|-|
|onClickTab|Callback when click Tab|`(key: string) => void`|`-`|-|
|onAddTab|Callback when click Add Button|`() => void`|`-`|-|
|onDeleteTab|Callback when click Delete Button|`(key: string) => void`|`-`|-|
|renderTabHeader|Custom Tab Header|`(tabProps: TabsProps, DefaultTabHeader: typeof TabHeader) => React.ReactElement`|`-`|-|
|renderTabTitle|Customize tab header|`(tabTitle: ReactNode,info: {key: string \| number;isActive: boolean;disabled: boolean;editable: boolean;}) => ReactNode`|`-`|-|

### Tabs.TabPane

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|
|className|Additional css class|`string \| string[]`|`-`|
|title|The title of Tab|`string \| ReactNode` **(Required)**|`-`|
|destroyOnHide|Whether to destroy the DOM structure in the TabPane when the tab is hidden.This option has priority over the `destroyOnHide` property of `Tabs`|`boolean`|`-`|
|disabled|Whether the TabPane is disabled|`boolean`|`-`|
|closable|Whether to allow the tab to be closed when `editable="true"`|`boolean`|`-`|
