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
|style|Additional style|CSSProperties |`-`|
|className|Additional css class|string \| string[] |`-`|
|separator|Custom separator|string \| ReactNode |`<IconObliqueLine />`|
|routes|Set drop-down menu|[RouteProps](#routeprops)[] |`-`|
|maxCount|Max count of `Breadcrumb.Item` to show.|number |`-`|
|itemRender|Custom render function for `Breadcrumb.Item`|(route: [RouteProps](#routeprops), routes: [RouteProps](#routeprops)[], paths: string[]) => ReactNode |`-`|

### Breadcrumb.Item

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|style|Additional style|CSSProperties |`-`|
|className|Additional css class|string \| string[] |`-`|
|droplist|The dropdown menu|[DropdownProps](dropdown#dropdown)['droplist'] |`-`|
|dropdownProps|The dropdown props [DropdownProps](/react/components/dropdown)|[DropdownProps](dropdown#dropdown) |`-`|

### RouteProps

```js
export interface RouteProps {
  path: string;
  breadcrumbName: string;
  children?: Array<{
    path: string;
    breadcrumbName: string;
  }>;
}
```
