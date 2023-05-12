`````
组件 / 布局

# 栅格 Grid

栅格可以有效的保证页面的一致性、逻辑性、加强团队协作和统一。
`````

%%Content%%

## API

### Row

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|div|开启这个选项 `<Row>` 和 `<Col>` 都会被当作 div 而不会附带任何 Grid 相关的类和样式|boolean |`-`|-|
|align|竖直对齐方式 ( `align-items` )|'start' \| 'center' \| 'end' \| 'stretch' |`start`|-|
|justify|水平对齐方式 (`justify-content`)|'start' \| 'center' \| 'end' \| 'space-around' \| 'space-between' |`start`|-|
|className|节点类名|string \| string[] |`-`|-|
|gutter|栅格间隔，单位是`px` 栅格间隔。可传入响应式对象写法 { xs: 4, sm: 6, md: 12}，传入数组 [ 水平间距， 垂直间距 ] 来设置两个方向。|[GridRowGutter](#gridrowgutter) \| Array&lt;[GridRowGutter](#gridrowgutter)&gt; |`0`|vertical gutter in 2.5.0|
|style|节点样式|CSSProperties |`-`|-|

### Col

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|offset|栅格左侧的间隔格数，间隔内不可以有栅格|number |`-`|-|
|order|对元素进行排序|number |`-`|-|
|pull|对元素进行排序|number |`-`|2.20.0|
|push|对元素进行排序|number |`-`|2.20.0|
|span|栅格占位格数|number |`24`|-|
|className|节点类名|string \| string[] |`-`|-|
|flex|设置 flex 布局属性|[FlexType](#flextype) |`-`|2.26.0|
|lg|>= 992px 响应式栅格|number \| { [key: string]: any } |`-`|-|
|md|>= 768px 响应式栅格|number \| { [key: string]: any } |`-`|-|
|sm|>= 576px 响应式栅格|number \| { [key: string]: any } |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|xl|>= 1200px 响应式栅格|number \| { [key: string]: any } |`-`|-|
|xs|< 576px 响应式栅格|number \| { [key: string]: any } |`-`|-|
|xxl|>= 1600px 响应式栅格|number \| { [key: string]: any } |`-`|-|
|xxxl|>= 2000px 响应式栅格|number \| { [key: string]: any } |`-`|2.40.0|

### Grid

|参数名|描述|类型|默认值|
|---|---|---|---|
|collapsed|是否折叠|boolean |`false`|
|collapsedRows|折叠时显示的行数|number |`1`|
|className|节点类名|string \| string[] |`-`|
|colGap|列与列之间的间距|number \| [ResponsiveValue](grid#responsivevalue) |`0`|
|cols|每一行展示的列数|number \| [ResponsiveValue](grid#responsivevalue) |`24`|
|rowGap|行与行之间的间距|number \| [ResponsiveValue](grid#responsivevalue) |`0`|
|style|节点样式|CSSProperties |`-`|

### GridItem

|参数名|描述|类型|默认值|
|---|---|---|---|
|suffix|是否是后缀元素|boolean |`false`|
|className|节点类名|string \| string[] |`-`|
|offset|左侧的间隔格数|number \| [ResponsiveValue](grid#responsivevalue) |`0`|
|span|跨越的格数|number \| [ResponsiveValue](grid#responsivevalue) |`1`|
|style|节点样式|CSSProperties |`-`|

### ResponsiveValue

|参数名|描述|类型|默认值|
|---|---|---|---|
|lg|>= 992px 响应式配置|number |`-`|
|md|>= 768px 响应式配置|number |`-`|
|sm|>= 576px 响应式配置|number |`-`|
|xl|>= 1200px 响应式配置|number |`-`|
|xs|< 576px 响应式配置|number |`-`|
|xxl|>= 1600px 响应式配置|number |`-`|
|xxxl|>= 2000px 响应式栅格|number |`-`|

### GridRowGutter

```js
export type GridRowGutter =
  | number
  | Partial<Record<GridResponsiveBreakpoint, number>>;
```

### FlexType

```js
export type FlexType = string | number | "auto" | "none";
```
