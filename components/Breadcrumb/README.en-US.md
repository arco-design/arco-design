`````
Component / Navigation

# Breadcrumb

Used to display the location of the current page and quickly return to the history page.
`````

%%Content%%

## API

### Breadcrumb

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|
|className|Additional css class|`string \| string[]`|`-`|
|separator|Custom separator|`string \| ReactNode`|`<IconObliqueLine />`|
|routes|Set drop-down menu|`RouteProps[]`|`-`|
|maxCount|Max count of `Breadcrumb.Item` to show.|`number`|`-`|
|itemRender|Custom render function for `Breadcrumb.Item`|`(route: RouteProps, routes: RouteProps[], paths: string[]) => ReactNode`|`-`|

### Breadcrumb.Item

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|
|className|Additional css class|`string \| string[]`|`-`|
|droplist|The dropdown menu|`DropdownProps['droplist']`|`-`|
|dropdownProps|The dropdown props [DropdownProps](/react/components/dropdown)|`DropdownProps`|`-`|
