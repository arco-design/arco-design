`````
组件 / 布局

# 布局 Layout

页面的基础布局框架，常与组件嵌套使用，构建页面整体布局。
`````

%%Content%%

## API

### Layout

|参数名|描述|类型|默认值|
|---|---|---|---|
|hasSider|表示子元素里有 Sider，一般不用指定。可用于服务端渲染时避免样式闪动|boolean |`-`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|

### Layout.Header

|参数名|描述|类型|默认值|
|---|---|---|---|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|

### Layout.Footer

|参数名|描述|类型|默认值|
|---|---|---|---|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|

### Layout.Content

|参数名|描述|类型|默认值|
|---|---|---|---|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|

### Layout.Sider

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|collapsed|当前收起状态|boolean |`-`|-|
|collapsible|是否可收起|boolean |`-`|-|
|defaultCollapsed|是否默认收起|boolean |`-`|-|
|reverseArrow|翻转折叠提示箭头的方向，当 Sider 在右边时可以使用|boolean |`-`|-|
|collapsedWidth|收缩宽度|number |`48`|-|
|onCollapse|展开-收起时的回调函数，有点击 trigger 以及响应式反馈两种方式可以触发|(collapse: boolean, type: 'clickTrigger' \| 'responsive') => void |`-`|-|
|theme|主题颜色|'dark' \| 'light' |`light`|-|
|trigger|自定义底部折叠触发器，设置为 null 时隐藏 trigger|string \| ReactNode |`-`|-|
|breakpoint|触发响应式布局的断点, 详见[响应式栅格](/react/components/Grid)|[GridResponsiveBreakpoint](#gridresponsivebreakpoint) |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|resizeBoxProps|可以接受 `ResizeBox` 所有参数，在伸缩开启时，可以通过 `resizeBoxProps` 对菜单栏的 `width` 进行受控展示或者与 `collapsed` 联动|[ResizeBoxProps](resize-box#resizebox) |`-`|2.34.0|
|resizeDirections|可以用 ResizeBox 替换原生的 `aside` 标签，这个参数即 ResizeBox的 `directions` 参数。详情请看 [ResizeBox](/react/components/resize-box)。|string[] |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|width|宽度|number \| string |`200`|-|
|onBreakpoint|触发响应式布局断点时的回调|(broken: boolean) => void |`-`|-|

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
