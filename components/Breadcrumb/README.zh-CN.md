`````
组件 / 导航

# 面包屑 Breadcrumb

面包屑是辅助导航模式，用于识别页面在层次结构内的位置，并根据需要向上返回。
`````

%%Content%%

## API

### Breadcrumb

|参数名|描述|类型|默认值|
|---|---|---|---|
|maxCount|最多渲染的面包屑数量|number |`-`|
|separator|指定分割符|string \| ReactNode |`<IconObliqueLine />`|
|className|节点类名|string \| string[] |`-`|
|routes|直接设置下拉菜单|[RouteProps](#routeprops)[] |`-`|
|style|节点样式|CSSProperties |`-`|
|itemRender|routes 时生效，自定义渲染面包屑|(route: [RouteProps](#routeprops), routes: [RouteProps](#routeprops)[], paths: string[]) => ReactNode |`-`|

### Breadcrumb.Item

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|href|超链接地址|string |`-`|2.40.0|
|droplist|下拉菜单的内容，等同于下拉菜单组件的 droplist 属性|[DropdownProps](dropdown#dropdown)['droplist'] |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|dropdownProps|下拉菜单的属性 [DropdownProps](/react/components/dropdown)|[DropdownProps](dropdown#dropdown) |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|tagName|标签名，可以是 html 标签或是组件|string \| React.FC&lt;any&gt; \| React.ComponentClass&lt;any&gt; |`div`|2.40.0|
|onClick|点击回调|(e: any) => void |`-`|2.40.0|

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
