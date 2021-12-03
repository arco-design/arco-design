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
|style|节点样式|`CSSProperties`|`-`|-|
|className|节点类名|`string \| string[]`|`-`|-|
|gutter|栅格间隔，单位是`px` 栅格间隔。可传入响应式对象写法 { xs: 4, sm: 6, md: 12}，传入数组 [ 水平间距， 垂直间距 ] 来设置两个方向。|`GridRowGutter \| Array<GridRowGutter>`|`0`|vertical gutter in 2.5.0|
|div|开启这个选项 `<Row>` 和 `<Col>` 都会被当作 div 而不会附带任何 Grid 相关的类和样式|`boolean`|`-`|-|
|align|竖直对齐方式 ( `align-items` )|`'start' \| 'center' \| 'end' \| 'stretch'`|`start`|-|
|justify|水平对齐方式 (`justify-content`)|`'start' \| 'center' \| 'end' \| 'space-around' \| 'space-between'`|`start`|-|

### Col

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|style|节点样式|`CSSProperties`|`-`|-|
|className|节点类名|`string \| string[]`|`-`|-|
|span|栅格占位格数|`number`|`24`|-|
|offset|栅格左侧的间隔格数，间隔内不可以有栅格|`number`|`-`|-|
|order|对元素进行排序|`number`|`-`|-|
|push|对元素进行排序|`number`|`-`|2.20.0|
|pull|对元素进行排序|`number`|`-`|2.20.0|
|xs|< 576px 响应式栅格|`number \| { [key: string]: any }`|`-`|-|
|sm|>= 576px 响应式栅格|`number \| { [key: string]: any }`|`-`|-|
|md|>= 768px 响应式栅格|`number \| { [key: string]: any }`|`-`|-|
|lg|>= 992px 响应式栅格|`number \| { [key: string]: any }`|`-`|-|
|xl|>= 1200px 响应式栅格|`number \| { [key: string]: any }`|`-`|-|
|xxl|>= 1600px 响应式栅格|`number \| { [key: string]: any }`|`-`|-|
|flex|设置 flex 布局属性|`FlexType`|`-`|2.26.0|

```ts
type FlexType = number | string | 'auto' | 'none';
```
