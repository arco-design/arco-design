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
|destroyOnHide|Whether to destroy the DOM structure in the TabPane when the tab is hidden. This attribute of `TabPane` has higher priority than `Tabs`.|boolean |`-`|-|
|editable|Whether to allow adding or subtracting tabs. It only effect when `type` is `card` or `card-gutter`.|boolean |`-`|-|
|headerPadding|Whether there is a horizontal margin on the tab. It only effect when `type` is `line` or `text`|boolean |`true`|2.6.0|
|justify|Height to fill the container, Only effective in horizontal mode.|boolean |`-`|-|
|lazyload|When set to `true`, hidden tabs will not be rendered when the component is mounted.|boolean |`true`|-|
|showAddButton|Whether to show the new button(Only effect when `editable` is `true`)|boolean |`true`|-|
|activeTab|The key of the currently selected tab|string |`-`|-|
|defaultActiveTab|The Tab selected by default. If not specified, the first one is selected|string |`-`|-|
|direction|The Direction of tabs. ** Warn: Please use `tabPosition` instead.**|'horizontal' \| 'vertical' |`-`|-|
|inkBarSize|custom the size of underline|{ width?: CSSProperties['width']; height?: CSSProperties['height'] } |`-`|2.54.0|
|overflow|When there are too many tabs, select scroll or drop-down to display tabs|'scroll' \| 'dropdown' |`scroll`|-|
|scrollPosition|The scroll position of the selected tab, the default auto will scroll the activeTab to the visible area, but will not adjust the position intentionally|'start' \| 'end' \| 'center' \| 'auto' \| number |`auto`|2.25.0|
|size|Size of tabs|'mini' \| 'small' \| 'default' \| 'large' |`-`|-|
|tabPosition|Position of tabs|'left' \| 'right' \| 'top' \| 'bottom' |`top`|-|
|type|Type of tabs|'line' \| 'card' \| 'card-gutter' \| 'text' \| 'rounded' \| 'capsule' |`line`|-|
|addButton|Custom add button|ReactNode |`-`|2.16.0|
|deleteButton|Custom delete button|ReactNode |`-`|2.16.0|
|extra|Additional on the right side of the tab|ReactNode |`-`|-|
|animation|Whether to turn on the transition animation|boolean \| { tabPane?: boolean; inkBar?: boolean } |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|icons|Tab header edit/scroll/dropdown icon configuration. You can set it to `null` for icons you don't want to display|{add?: ReactNode;delete?: ReactNode;prev?: ReactNode;next?: ReactNode;dropdown?: ReactNode;} |`-`|2.15.0, `prev`,`next`,`dropdown` in `2.47.0`|
|scrollAfterEdit|Whether to automatically scroll to the selected label after the label is dynamically increased or decreased (only effective when `editable` is `true`)|{delete?: boolean;add?: boolean;} |`{ add: true, delete: true }`|2.25.0|
|style|Additional style|CSSProperties |`-`|-|
|onAddTab|Callback when click Add Button|() => void |`-`|-|
|onChange|Callback when `activeTab` changed|(key: string) => void |`-`|-|
|onClickTab|Callback when click Tab|(key: string) => void |`-`|-|
|onDeleteTab|Callback when click Delete Button|(key: string) => void |`-`|-|
|renderTabHeader|Custom Tab Header|(tabProps: [TabsProps](tabs#tabs), DefaultTabHeader: typeof TabHeader) => ReactElement |`-`|-|
|renderTabTitle|Customize tab header|(tabTitle: ReactNode,info: {key: string \| number;isActive: boolean;disabled: boolean;editable: boolean;}) => ReactNode |`-`|-|

### Tabs.TabPane

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|closable|Whether to allow the tab to be closed when `editable="true"`|boolean |`-`|
|destroyOnHide|Whether to destroy the DOM structure in the TabPane when the tab is hidden.This option has priority over the `destroyOnHide` property of `Tabs`|boolean |`-`|
|disabled|Whether the TabPane is disabled|boolean |`-`|
|title|The title of Tab|string \| ReactNode  **(Required)**|`-`|
|className|Additional css class|string \| string[] |`-`|
|style|Additional style|CSSProperties |`-`|
