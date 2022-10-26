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
|maxCount|Max count of `Breadcrumb.Item` to show.|number |`-`|
|separator|Custom separator|string \| ReactNode |`<IconObliqueLine />`|
|className|Additional css class|string \| string[] |`-`|
|routes|Set drop-down menu|[RouteProps](#routeprops)[] |`-`|
|style|Additional style|CSSProperties |`-`|
|itemRender|Custom render function for `Breadcrumb.Item`|(route: [RouteProps](#routeprops), routes: [RouteProps](#routeprops)[], paths: string[]) => ReactNode |`-`|

### Breadcrumb.Item

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|href|href|string |`-`|2.40.0|
|droplist|The dropdown menu|[DropdownProps](dropdown#dropdown)['droplist'] |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|dropdownProps|The dropdown props [DropdownProps](/react/components/dropdown)|[DropdownProps](dropdown#dropdown) |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
|tagName|Configure the outermost label, which can be an html label or a component|string \| React.FC&lt;any&gt; \| React.ComponentClass&lt;any&gt; |`div`|2.40.0|
|onClick|click callback|(e: any) => void |`-`|2.40.0|

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
