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
|hasSider|Indicates that there is a `Sider` in the children. Generally no need to specify.It's used to avoid flicker during server-side rendering|boolean |`-`|
|className|Additional css class|string \| string[] |`-`|
|style|Additional style|CSSProperties |`-`|

### Layout.Header

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|className|Additional css class|string \| string[] |`-`|
|style|Additional style|CSSProperties |`-`|

### Layout.Footer

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|className|Additional css class|string \| string[] |`-`|
|style|Additional style|CSSProperties |`-`|

### Layout.Content

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|className|Additional css class|string \| string[] |`-`|
|style|Additional style|CSSProperties |`-`|

### Layout.Sider

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|collapsed|Whether sider is collapsed|boolean |`-`|-|
|collapsible|Whether sider can be collapsed|boolean |`-`|-|
|defaultCollapsed|Whether sider is collapsed by default|boolean |`-`|-|
|reverseArrow|Reverse the direction of the fold arrow, can be used when sider is on the right|boolean |`-`|-|
|collapsedWidth|Width of collapsed sider|number |`48`|-|
|onCollapse|Callback when sider collapse state changes|(collapse: boolean, type: 'clickTrigger' \| 'responsive') => void |`-`|-|
|theme|Theme of layout|'dark' \| 'light' |`light`|-|
|trigger|Customize the trigger element to collapse sider at bottom. Set it to `null` to hide the trigger|string \| ReactNode |`-`|-|
|breakpoint|Breakpoint in responsive layout. See details [Grid](/react/components/Grid)|[GridResponsiveBreakpoint](#gridresponsivebreakpoint) |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|resizeBoxProps|All props of `ResizeBox` can be accepted. The `width` of the menu bar can be displayed in a controlled manner through `resizeBoxProps` or linked with `collapsed`|[ResizeBoxProps](resize-box#resizebox) |`-`|2.34.0|
|resizeDirections|You can replace the native `aside` tag with `ResizeBox`, under which case this param will be the `directions` property of `ResizeBox`.See details [ResizeBox](/react/components/resize-box).|string[] |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
|width|Width of sider|number \| string |`200`|-|
|onBreakpoint|Callback when responsive layout breakpoint is triggered|(broken: boolean) => void |`-`|-|

### GridResponsiveBreakpoint

```js
export type GridResponsiveBreakpoint =
  | "xxxl"
  | "xxl"
  | "xl"
  | "lg"
  | "md"
  | "sm"
  | "xs";
```
