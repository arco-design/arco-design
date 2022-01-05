`````
Component / Navigation

# Menu

A component to organize, arrange, and display a list of options.
`````

%%Content%%

## API

### Menu

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|theme|Theme of Menu|`'light' \| 'dark'`|`light`|-|
|mode|Mode of Menu|`'vertical' \| 'horizontal' \| 'pop' \| 'popButton'`|`vertical`|-|
|levelIndent|Indentation between levels|`number`|`-`|-|
|icons|Customize icons|`{horizontalArrowDown?: ReactNode \| null;popArrowRight?: ReactNode \| null;collapseDefault?: ReactNode \| null;collapseActive?: ReactNode \| null;}`|`-`|-|
|autoOpen|Whether to expand all multi-level menus by default|`boolean`|`-`|-|
|collapse|Whether to collapse the menu horizontally|`boolean`|`-`|-|
|accordion|Whether to render as Accordion|`boolean`|`-`|-|
|selectable|Whether is the menu item selectable|`boolean`|`true`|-|
|ellipsis|Whether the horizontal menu automatically collapses when it overflows|`boolean`|`true`|2.24.0|
|autoScrollIntoView|Whether to automatically scroll the selected item to the visible area|`boolean`|`-`|-|
|hasCollapseButton|Whether built-in folding button|`boolean`|`-`|-|
|defaultSelectedKeys|The initially selected menu item's key array|`string[]`|`-`|-|
|defaultOpenKeys|The initially opened menu item's key array|`string[]`|`-`|-|
|selectedKeys|Selected menu item's key array|`string[]`|`-`|-|
|openKeys|Opened menu item's key array|`string[]`|`-`|-|
|onClickMenuItem|Click menu item callback|`(key: string, event, keyPath: string[]) => any`|`-`|`event` in 2.15.0, `keyPath` in 2.19.0|
|onClickSubMenu|Callback when click sub menu|`(key: string, openKeys: string[], keyPath: string[]) => void`|`-`|`keyPath` in 2.19.0|
|onCollapseChange|Callback when menu collapse status changed|`(collapse: boolean) => void`|`-`|-|
|scrollConfig|Scroll to the configuration item in the visible area and receive all the parameters of[scroll-into-view-if-needed](https://github.com/stipsan/scroll-into-view-if-needed)|`{ [key: string]: any }`|`-`|-|
|triggerProps|Pass all `Trigger` component properties|`Partial<TriggerProps>`|`-`|-|
|tooltipProps|Pass all `Tooltip` component properties|`Partial<TooltipProps>`|`-`|-|

### Menu.SubMenu

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|title|Title of the subMenu|`string \| ReactNode`|`-`|-|
|key|Unique ID of the subMenu|`string` **(Required)**|`-`|-|
|selectable|Whether to use the subMenu header as a menu item which can be selected|`boolean`|`-`|-|
|popup|Whether to force the use of popup mode, parameter `level` indicates the level of current subMenu.|`boolean \| ((level: number) => boolean)`|`-`|2.8.0|
|triggerProps|Pass all `Trigger` component properties|`Partial<TriggerProps>`|`-`|2.19.0|

### Menu.ItemGroup

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|
|className|Additional css class|`string \| string[]`|`-`|
|title|Title of the menu item group|`string \| ReactNode`|`-`|

### Menu.Item

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|key|Unique ID of the menu item|`string` **(Required)**|`-`|-|
|disabled|Whether the item is disabled|`boolean`|`-`|-|
|wrapper|Configure the outermost label, which can be an html label or a component|`string \| React.FC<any> \| React.ComponentClass<any>`|`div`|2.16.0|
