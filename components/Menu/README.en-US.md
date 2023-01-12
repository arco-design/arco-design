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
|accordion|Whether to render as Accordion|boolean |`-`|-|
|autoOpen|Whether to expand all multi-level menus by default|boolean |`-`|-|
|autoScrollIntoView|Whether to automatically scroll the selected item to the visible area|boolean |`-`|-|
|collapse|Whether to collapse the menu horizontally|boolean |`-`|-|
|hasCollapseButton|Whether built-in folding button|boolean |`-`|-|
|selectable|Whether is the menu item selectable|boolean |`true`|-|
|levelIndent|Indentation between levels|number |`-`|-|
|mode|Mode of Menu|'vertical' \| 'horizontal' \| 'pop' \| 'popButton' |`vertical`|-|
|theme|Theme of Menu|'light' \| 'dark' |`light`|-|
|className|Additional css class|string \| string[] |`-`|-|
|defaultOpenKeys|The initially opened menu item's key array|string[] |`-`|-|
|defaultSelectedKeys|The initially selected menu item's key array|string[] |`-`|-|
|ellipsis|Whether the horizontal menu automatically collapses when it overflows|\| boolean\| {text?: ReactNode;} |`true`|2.24.0|
|icons|Customize icons|{horizontalArrowDown?: ReactNode \| null;popArrowRight?: ReactNode \| null;collapseDefault?: ReactNode \| null;collapseActive?: ReactNode \| null;} |`-`|-|
|openKeys|Opened menu item's key array|string[] |`-`|-|
|scrollConfig|Scroll to the configuration item in the visible area and receive all the parameters of[scroll-into-view-if-needed](https://github.com/stipsan/scroll-into-view-if-needed)|{ [key: string]: any } |`-`|-|
|selectedKeys|Selected menu item's key array|string[] |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
|tooltipProps|Pass all `Tooltip` component properties|Partial&lt;[TooltipProps](tooltip#tooltip)&gt; |`-`|-|
|triggerProps|Pass all `Trigger` component properties|Partial&lt;[TriggerProps](trigger#trigger)&gt; |`-`|-|
|onClickMenuItem|Click menu item callback|(key: string, event, keyPath: string[]) => any |`-`|`event` in 2.15.0, `keyPath` in 2.19.0|
|onClickSubMenu|Callback when click sub menu|(key: string, openKeys: string[], keyPath: string[]) => void |`-`|`keyPath` in 2.19.0|
|onCollapseChange|Callback when menu collapse status changed|(collapse: boolean) => void |`-`|-|

### Menu.SubMenu

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|selectable|Whether to use the subMenu header as a menu item which can be selected|boolean |`-`|-|
|key|Unique ID of the subMenu|string  **(Required)**|`-`|-|
|title|Title of the subMenu|string \| ReactNode |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
|triggerProps|Pass all `Trigger` component properties|Partial&lt;[TriggerProps](trigger#trigger)&gt; |`-`|2.19.0|
|popup|Whether to force the use of popup mode, parameter `level` indicates the level of current subMenu.|boolean \| ((level: number) => boolean) |`-`|2.8.0|

### Menu.ItemGroup

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|title|Title of the menu item group|string \| ReactNode |`-`|
|className|Additional css class|string \| string[] |`-`|
|style|Additional style|CSSProperties |`-`|

### Menu.Item

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|disabled|Whether the item is disabled|boolean |`-`|-|
|key|Unique ID of the menu item|string  **(Required)**|`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
|wrapper|Configure the outermost label, which can be an html label or a component|string \| React.FC&lt;any&gt; \| React.ComponentClass&lt;any&gt; |`div`|2.16.0|
