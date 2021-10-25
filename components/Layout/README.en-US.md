`````
Component / Layout

# Layout

The basic layout framework which is often nested with components to build the overall layout of the page.
`````

%%Content%%

## API

### Layout

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|
|className|Additional css class|`string \| string[]`|`-`|
|hasSider|Indicates that there is a `Sider` in the children. Generally no need to specify.It's used to avoid flicker during server-side rendering|`boolean`|`-`|

### Layout.Header

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|className|Additional css class|`string \| string[]`|`-`|
|style|Additional style|`CSSProperties`|`-`|

### Layout.Footer

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|className|Additional css class|`string \| string[]`|`-`|
|style|Additional style|`CSSProperties`|`-`|

### Layout.Content

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|className|Additional css class|`string \| string[]`|`-`|
|style|Additional style|`CSSProperties`|`-`|

### Layout.Sider

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|
|className|Additional css class|`string \| string[]`|`-`|
|theme|Theme of layout|`'dark' \| 'light'`|`light`|
|collapsed|Whether sider is collapsed|`boolean`|`-`|
|collapsible|Whether sider can be collapsed|`boolean`|`-`|
|collapsedWidth|Width of collapsed sider|`number`|`48`|
|defaultCollapsed|Whether sider is collapsed by default|`boolean`|`-`|
|reverseArrow|Reverse the direction of the fold arrow, can be used when sider is on the right|`boolean`|`-`|
|trigger|Customize the trigger element to collapse sider at bottom. Set it to `null` to hide the trigger|`string \| React.ReactNode`|`-`|
|width|Width of sider|`number \| string`|`200`|
|breakpoint|Breakpoint in responsive layout. See details [Grid](/react/components/Grid)|`'xxl' \| 'xl' \| 'lg' \| 'md' \| 'sm' \| 'xs'`|`-`|
|onBreakpoint|Callback when responsive layout breakpoint is triggered|`(broken: boolean) => void`|`-`|
|onCollapse|Callback when sider collapse state changes|`(collapse: boolean, type: 'clickTrigger' \| 'responsive') => void`|`-`|
|resizeDirections|You can replace the native `aside` tag with `ResizeBox`, under which case this param will be the `directions` property of `ResizeBox`.See details [ResizeBox](/react/components/resize-box).|`string[]`|`-`|
